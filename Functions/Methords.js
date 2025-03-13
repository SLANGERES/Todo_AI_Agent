import { db } from '../db/index.js';
import { todosTable } from '../db/schema.js';
import { ilike, eq } from 'drizzle-orm';

export async function getAllTodos() {
    const todo = await db.select().from(todosTable);
    return todo;  
}

export async function createTodo(todoText) {
    const [data] = await db.insert(todosTable)
        .values({ todo: todoText })  
        .returning({ id: todosTable.id });

    return data?.id || null; 
}

export async function searchTodo(search) {
    const todo = await db
        .select()
        .from(todosTable)
        .where(ilike(todosTable.todo, `%${search}%`));  
    return todo;
}

export async function deleteById(id) {
    const todo = await db
        .delete(todosTable)
        .where(eq(todosTable.id, id))
        .returning();

    return todo.length ? todo[0] : null;  
}
