import { useCallback, useContext, useState } from "react";

import AuthContext from "./AuthContext";
import TaskContext from "./TaskContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasks";
import { getErrorMessage } from "../utils/getErrorMessage";

export function TaskProvider({ children }) {
  const { isAuth } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  // true после первой успешной загрузки: дальше доска показывается сразу,
  // а обновление с сервера идёт в фоне без экрана «Загрузка…»
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState("");

  // При выходе из аккаунта сбрасываем кэш задач, чтобы следующий пользователь
  // не увидел чужие карточки
  const [prevIsAuth, setPrevIsAuth] = useState(isAuth);

  if (prevIsAuth !== isAuth) {
    setPrevIsAuth(isAuth);

    if (!isAuth) {
      setTasks([]);
      setIsLoaded(false);
      setError("");
    }
  }

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      const loadedTasks = data.tasks || [];

      setTasks(loadedTasks);
      setIsLoaded(true);

      return loadedTasks;
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Не удалось загрузить задачи."));
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
        isLoaded,
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
