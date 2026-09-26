import { api } from "./api"; 

export async function registerUser({ login, name, password }) {
  const response = await api.post("/user", {
    login: login.trim(),
    name: name.trim(),
    password,
  }, {
    headers: {
      // Принудительно отменяем автоматический Content-Type от Axios
      "Content-Type": null 
    }
  });
  return response.data;
}

export async function loginUser({ login, password }) {
  const response = await api.post("/user/login", {
    login: login.trim(),
    password,
  }, {
    headers: {
      // Здесь делаем то же самое
      "Content-Type": null 
    }
  });
  return response.data;
}