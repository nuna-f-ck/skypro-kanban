import { Link } from "react-router-dom";

import {
  AuthPage,
  AuthModal,
  NotFoundTitle,
  NotFoundText,
  PrimaryButton,
} from "./pages.styled";

function NotFoundPage() {
  return (
    <AuthPage>
      <AuthModal>
        <NotFoundTitle>404</NotFoundTitle>

        <NotFoundText>Страница не найдена</NotFoundText>

        <Link to="/">
          <PrimaryButton type="button">Вернуться на главную</PrimaryButton>
        </Link>
      </AuthModal>
    </AuthPage>
  );
}

export default NotFoundPage;
