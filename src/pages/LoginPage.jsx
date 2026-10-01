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

function LoginPage() {
  const navigate = useNavigate();

  const { login: loginUser } = useContext(AuthContext);

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

      await loginUser({ login: login.trim(), password });

      navigate("/", { replace: true });
    } catch (requestError) {
      console.error("Ошибка входа:", requestError);

      const serverMessage = requestError.response?.data?.error;

      if (serverMessage) {
        setError(serverMessage);
      } else if (requestError.response?.status === 400) {
        setError("Неверный логин или пароль");
      } else if (requestError.message) {
        setError(requestError.message);
      } else {
        setError("Ошибка подключения к серверу");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthModal>
        <PageTitle>Вход</PageTitle>

        <Form onSubmit={handleSubmit}>
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
            {loading ? "Выполняется вход..." : "Войти"}
          </PrimaryButton>
        </Form>

        <Description>
          Нужно зарегистрироваться?{" "}
          <Link to="/register">Регистрируйтесь здесь</Link>
        </Description>
      </AuthModal>
    </AuthPage>
  );
}

export default LoginPage;
