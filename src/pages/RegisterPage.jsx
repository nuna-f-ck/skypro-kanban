import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import {
  AuthPage,
  AuthModal,
  PageTitle,
  Form,
  Input,
  PrimaryButton,
  Description,
} from "./pages.styled";

function RegisterPage() {
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

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

      await register({ login, name, password });

      navigate("/login");
    } catch (requestError) {
      console.error("Ошибка регистрации:", requestError);

      const serverMessage = requestError.response?.data?.error;

      if (serverMessage) {
        setError(serverMessage);
      } else if (requestError.response?.status === 400) {
        setError("Не удалось зарегистрироваться. Проверьте введённые данные.");
      } else {
        setError("Не удалось зарегистрироваться. Попробуйте ещё раз.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthModal>
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
          Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
        </Description>
      </AuthModal>
    </AuthPage>
  );
}

export default RegisterPage;
