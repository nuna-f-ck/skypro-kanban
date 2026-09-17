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

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/login");
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
            type="email"
            placeholder="Эл. почта"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <PrimaryButton type="submit">Зарегистрироваться</PrimaryButton>
        </Form>

        <Description>
          Уже есть аккаунт? <Link to="/login">Войдите здесь</Link>
        </Description>
      </PageModal>
    </CenterPage>
  );
}

export default RegisterPage;
