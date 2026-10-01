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

function RegisterPage() {
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    login: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errors = {
      name: name.trim() ? "" : "Введите имя",
      login: login.trim() ? "" : "Введите логин",
      password: "",
    };

    if (!password.trim()) {
      errors.password = "Введите пароль";
    } else if (password.trim().length < 3) {
      errors.password = "Пароль должен содержать минимум 3 символа";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");

    const errors = validate();

    setFieldErrors(errors);

    if (errors.name || errors.login || errors.password) {
      return;
    }

    try {
      setLoading(true);

      await register({
        login: login.trim(),
        name: name.trim(),
        password: password.trim(),
      });

      navigate("/login");
    } catch (requestError) {
      setFormError(
        getErrorMessage(
          requestError,
          "Не удалось зарегистрироваться. Попробуйте ещё раз.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthModal>
        <PageTitle>Регистрация</PageTitle>

        <Form onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setFieldErrors((prev) => ({ ...prev, name: "" }));
            }}
          />
          {fieldErrors.name && <FieldError>{fieldErrors.name}</FieldError>}

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
