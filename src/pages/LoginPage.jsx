import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/auth";

import {
  CenterPage,
  PageModal,
  PageTitle,
  Form,
  Input,
  PrimaryButton,
  Description,
} from "./pages.styled";

function LoginPage({ setIsAuth }) {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!login.trim()) {
      setError("Введите логин");
      return;
    }

    if (!password.trim()) {
      setError("Введите пароль");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        login: login.trim(),
        password,
      });

      console.log("Ответ login:", data);
      const token = data?.user?.token;

      if (!token) {
        setError("Сервер не вернул токен авторизации");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setIsAuth(true);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Ошибка входа:", error);
      console.error("Ответ сервера:", error.response?.data);
      const serverMessage = error.response?.data?.error;
      if (serverMessage) {
        setError(serverMessage);
      } else if (error.response?.status === 400) {
        setError("Неверный логин или пароль");
      } else {
        setError("Ошибка подключения к серверу");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenterPage>
      <PageModal>
        <PageTitle>Вход</PageTitle>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />

          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <Description>{error}</Description>}

          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Выполняется вход..." : "Войти"}
          </PrimaryButton>
        </Form>

        <Description>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </Description>
      </PageModal>
    </CenterPage>
  );
}

export default LoginPage;
