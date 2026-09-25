import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsAuth(true);
    navigate("/", { replace: true });
  };

  return (
    <CenterPage>
      <PageModal>
        <PageTitle>Вход</PageTitle>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
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

          <PrimaryButton type="submit">Войти</PrimaryButton>
        </Form>

        <Description>
          Нужно зарегестрироваться?{" "}
          <Link to="/register">Регестрируйтесь здесь</Link>
        </Description>
      </PageModal>
    </CenterPage>
  );
}

export default LoginPage;
