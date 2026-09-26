import { useCallback, useState } from "react";

import AuthContext from "./AuthContext";
import { loginUser, registerUser } from "../services/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null"),
  );

  const [isAuth, setIsAuth] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );

  const login = useCallback(async ({ login, password }) => {
    const data = await loginUser({ login, password });

    const token = data?.user?.token;

    if (!token) {
      throw new Error("Сервер не вернул токен авторизации");
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setIsAuth(true);

    return data;
  }, []);

  const register = useCallback(async ({ login, name, password }) => {
    return registerUser({ login, name, password });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuth(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
