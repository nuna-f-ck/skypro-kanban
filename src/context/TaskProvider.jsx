import { useCallback, useState } from "react";

import TaskContext from "./TaskContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasks";

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      const loadedTasks = data.tasks || [];

      setTasks(loadedTasks);

      return loadedTasks;
    } catch (requestError) {
      setError("Не удалось загрузить задачи");
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (task) => {
    const data = await createTask(task);
    const newTask = data.task || data;

    setTasks((prevTasks) => [...prevTasks, newTask]);

    return newTask;
  }, []);

  const editTask = useCallback(async (id, task) => {
    const data = await updateTask(id, task);
    const updatedTask = data.task || data;

    setTasks((prevTasks) =>
      prevTasks.map((item) => (item._id === id ? updatedTask : item)),
    );

    return updatedTask;
  }, []);

  const removeTask = useCallback(async (id) => {
    await deleteTask(id);

    setTasks((prevTasks) => prevTasks.filter((item) => item._id !== id));
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        editTask,
        removeTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export default TaskProvider;
