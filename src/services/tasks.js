import { api } from "./api";

// 1. Получение всех задач (GET данные не шлет, Content-Type не нужен)
export async function getTasks() {
  const response = await api.get("/kanban");
  return response.data;
}

// 2. Получение одной задачи по ID
export async function getTask(id) {
  const response = await api.get(`/kanban/${id}`);
  return response.data;
}

// 3. Создание задачи (Добавили отключение Content-Type)
export async function createTask(task) {
  const response = await api.post("/kanban", task, {
    headers: {
      "Content-Type": null,
    },
  });
  return response.data;
}

// 4. Изменение задачи (Добавили отключение Content-Type)
export async function updateTask(id, task) {
  const response = await api.put(`/kanban/${id}`, task, {
    headers: {
      "Content-Type": null,
    },
  });
  return response.data;
}

// 5. Удаление задачи
export async function deleteTask(id) {
  const response = await api.delete(`/kanban/${id}`);
  return response.data;
}
