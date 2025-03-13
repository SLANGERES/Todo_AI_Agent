import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import OpenAI from "openai";
import readlineSync from "readline-sync";
import { getAllTodos, createTodo, deleteById, searchTodo } from "./Functions/Methords.js";

// Initialize OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY, // Ensure correct env var
});

const tools = {
    getAllTodos: getAllTodos,
    createTodo: createTodo,
    deleteById: deleteById,
    searchTodo: searchTodo,
};

const System_Prompt = `
    You are an AI To-Do List Assistant with START, PLAN, ACTION, OBSERVATION, and OUTPUT State.
    Wait for the user prompt and first PLAN using available tools.
    After Planning, Take the action with appropriate tools and wait for Observation based on Action.
    Once you get the observations, Return the AI response based on START prompt and observations.

    You can manage tasks by adding, viewing, updating, and deleting them.
    You must strictly follow the JSON output format.

    Todo DB Schema:
    id: Int and Primary Key
    todo: String
    created_at: Date Time
    updated_at: Date Time

    Available Tools:
    getAllTodos(): Returns all the Todos from Database 
    createTodo(todo: string): Creates a new Todo in the DB and takes todo as a string
    deleteById(id: string): Deletes the todo by ID given in the DB 
    searchTodo(query: string): Searches for all todos matching the query string using iLike in DB

    EXAMPLE:
    START
    { "type": "user", "user": "Add a task for shopping groceries." }
    { "type": "plan", "plan": "I will try to get more context on what the user needs to shop." }
    { "type": "output", "output": "Can you tell me what all items you want to shop for?" }
    { "type": "user", "user": "I want to shop for milk, kurkure, lays and choco." } 
    { "type": "plan", "plan": "I will use createTodo to create a new Todo in DB." }
    { "type": "action", "function": "createTodo", "input": "Shopping for milk, kurkure, lays, and choco." }
    { "type": "observation", "observation": "2" }
    { "type": "output", "output": "Your todo has been added successfully." }
`;

const messages = [{ role: "system", content: System_Prompt }];

async function runChat() {
    while (true) {
        const query = readlineSync.question('>> ');
        const userMessage = {
            type: 'user',
            user: query,
        };
        messages.push({ role: 'user', content: JSON.stringify(userMessage) });

        while (true) {
            const chat = await client.chat.completions.create({
                model: "gpt-4o-mini",
                messages: messages,
                response_format: { type: 'json_object' },
            });

            const result = chat.choices[0].message.content;
            messages.push({ role: 'assistant', content: result });

            const action = JSON.parse(result);
            if (action.type === 'output') {
                console.log(action.output);
                break;
            } else if (action.type === "action") {
                const fn = tools[action.function];
                if (!fn) {
                    console.error("❌ Error: Invalid tool call -", action.function);
                    break;
                }
                const observation = await fn(action.input);
                const observationMessage = {
                    type: 'observation',
                    observation: observation,
                };
                messages.push({ role: 'user', content: JSON.stringify(observationMessage) });
            }
        }
    }
}

runChat();
