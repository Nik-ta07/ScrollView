import { API_ENDPOINTS } from "../config/api";
import { api } from "./apiClient";

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
};

export async function fetchTodos(): Promise<Todo[]> {
  return api<Todo[]>(API_ENDPOINTS.TODOS);
}

export async function fetchTodoById(id: number): Promise<Todo> {
  return api<Todo>(`${API_ENDPOINTS.TODOS}/${id}`);
}

export async function createTodo(payload: {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
}): Promise<Todo> {
  return api<Todo>(API_ENDPOINTS.TODOS, { method: "POST", body: payload });
}

export async function updateTodo(
  id: number,
  payload: Partial<Pick<Todo, "title" | "description" | "completed" | "priority">>
): Promise<Todo> {
  return api<Todo>(`${API_ENDPOINTS.TODOS}/${id}`, { method: "PUT", body: payload });
}

export async function deleteTodo(id: number): Promise<{ message: string }> {
  return api<{ message: string }>(`${API_ENDPOINTS.TODOS}/${id}`, { method: "DELETE" });
}


