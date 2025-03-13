# AI-Based To-Do List Assistant

An AI-powered To-Do List Assistant that allows users to manage their tasks using OpenAI's API. The assistant can add, view, search, and delete tasks stored in a PostgreSQL database using **Drizzle ORM**.

## Features
- AI-driven task management
- CRUD operations on todos
- Database integration with **Drizzle ORM**
- Interactive command-line interface
- Uses OpenAI API for natural language interaction

## Tech Stack
- **Node.js**
- **Drizzle ORM** (PostgreSQL)
- **OpenAI API**
- **readline-sync** (for CLI interaction)

## Project Structure
```
AI_based_todo/
│-- db/
│   ├── index.js         # Database connection
│   ├── schema.js        # Drizzle ORM schema for todos
│-- Functions/
│   ├── Methods.js       # CRUD operations for todos
│-- script.js            # Main application logic
│-- package.json         # Project dependencies
│-- README.md            # Documentation
```

## Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/SLANGERES/Todo_AI_Agent.git
   cd AI_based_todo
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```sh
   OPEN_AI_KEY=your_api_key_here
   ```
4. **Run the application:**
   ```sh
   node script.js
   ```

## Database Setup
- Ensure PostgreSQL is installed and running.
- Modify `db/index.js` to include your PostgreSQL connection details.
- Run database migrations using Drizzle ORM.

## Usage
1. Start the app with `node script.js`
2. The assistant will prompt you to enter tasks or manage them interactively.
3. Example interactions:
   ```sh
   >> Add a task for buying groceries.
   >> Search for 'shopping' tasks.
   ```

## API Functions
| Function | Description |
|----------|-------------|
| `getAllTodos()` | Fetch all todos from the database. |
| `createTodo(todo: string)` | Add a new task. |
| `deleteById(id: string)` | Delete a task by ID. |
| `searchTodo(query: string)` | Search for tasks by keyword. |

## License
This project is open-source and available under the MIT License.

---

**Contributions & Issues:** Feel free to contribute or report any issues by opening a pull request or issue on GitHub!
