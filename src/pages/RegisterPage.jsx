import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/auth";

import {
  CenterPage,
  PageModal,
  PageTitle,
  Form,
  Input,
  PrimaryButton,
  Description,
} from "./pages.styled";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Введите имя");
      return;
    }

    if (!login.trim()) {
      setError("Введите логин");
      return;
    }

    if (!password.trim()) {
      setError("Введите пароль");
      return;
    }

    if (password.length < 3) {
      setError("Пароль должен содержать минимум 3 символа");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        login,
        name,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      console.error("Ответ сервера:", error.response?.data);

      const serverMessage = error.response?.data?.error;

      if (serverMessage) {
        setError(serverMessage);
      } else if (error.response?.status === 400) {
        setError("Не удалось зарегистрироваться. Проверьте введённые данные.");
      } else {
        setError("Не удалось зарегистрироваться. Попробуйте ещё раз.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenterPage>
      <PageModal>
        <PageTitle>Регистрация</PageTitle>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <Input
            type="text"
            placeholder="Эл. почта"
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
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </PrimaryButton>
        </Form>

        <Description>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </Description>
      </PageModal>
    </CenterPage>
  );
}

export default RegisterPage;
