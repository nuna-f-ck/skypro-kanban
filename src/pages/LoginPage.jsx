import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import { getErrorMessage } from "../utils/getErrorMessage";

import {
  AuthPage,
  AuthModal,
  PageTitle,
  Form,
  Input,
  FieldError,
  PrimaryButton,
  Description,
} from "./pages.styled";

function LoginPage() {
  const navigate = useNavigate();

  const { login: loginUser } = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({ login: "", password: "" });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");

    const errors = {
      login: login.trim() ? "" : "Введите логин",
      password: password.trim() ? "" : "Введите пароль",
    };

    setFieldErrors(errors);

    if (errors.login || errors.password) {
      return;
    }

    try {
      setLoading(true);

      await loginUser({ login: login.trim(), password: password.trim() });

      navigate("/", { replace: true });
    } catch (requestError) {
      setFormError(getErrorMessage(requestError, "Неверный логин или пароль"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthModal>
        <PageTitle>Вход</PageTitle>

        <Form onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            placeholder="Эл. почта"
            value={login}
            onChange={(event) => {
              setLogin(event.target.value);
              setFieldErrors((prev) => ({ ...prev, login: "" }));
            }}
          />
          {fieldErrors.login && <FieldError>{fieldErrors.login}</FieldError>}

          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setFieldErrors((prev) => ({ ...prev, password: "" }));
            }}
          />
          {fieldErrors.password && (
            <FieldError>{fieldErrors.password}</FieldError>
          )}

          {formError && <Description>{formError}</Description>}

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
