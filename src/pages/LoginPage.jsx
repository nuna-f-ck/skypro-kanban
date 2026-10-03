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
  FormError,
  PrimaryButton,
  Description,
} from "./pages.styled";

const CREDENTIALS_ERROR =
  "Введенные вами данные не распознаны. Проверьте свой логин и пароль и повторите попытку входа.";

function LoginPage() {
  const navigate = useNavigate();

  const { login: loginUser } = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({ login: "", password: "" });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // Сервер ответил, что логин/пароль не подошли: подсвечиваем оба поля красным,
  // кнопка «Войти» неактивна, пока пользователь не поправит данные (макет «Ошибка»)
  const hasCredentialsError = formError === CREDENTIALS_ERROR;

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
      setFormError(
        requestError.response
          ? CREDENTIALS_ERROR
          : getErrorMessage(requestError, CREDENTIALS_ERROR),
      );
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
            $error={Boolean(fieldErrors.login) || hasCredentialsError}
            onChange={(event) => {
              setLogin(event.target.value);
              setFieldErrors((prev) => ({ ...prev, login: "" }));
              setFormError("");
            }}
          />
          {fieldErrors.login && <FieldError>{fieldErrors.login}</FieldError>}

          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            $error={Boolean(fieldErrors.password) || hasCredentialsError}
            onChange={(event) => {
              setPassword(event.target.value);
              setFieldErrors((prev) => ({ ...prev, password: "" }));
              setFormError("");
            }}
          />
          {fieldErrors.password && (
            <FieldError>{fieldErrors.password}</FieldError>
          )}

          {formError && <FormError>{formError}</FormError>}

          <PrimaryButton type="submit" disabled={loading || hasCredentialsError}>
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
