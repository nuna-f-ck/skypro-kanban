import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import {
  AuthPage,
  AuthModal,
  PageTitle,
  Actions,
  PrimaryButton,
  SecondaryButton,
} from "./pages.styled";

function ExitPage() {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const handleExit = () => {
    logout();

    navigate("/login", { replace: true });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <AuthPage>
      <AuthModal>
        <PageTitle>Выйти из аккаунта?</PageTitle>

        <Actions>
          <PrimaryButton type="button" onClick={handleExit}>
            Да, выйти
          </PrimaryButton>

          <SecondaryButton type="button" onClick={handleCancel}>
            Нет, остаться
          </SecondaryButton>
        </Actions>
      </AuthModal>
    </AuthPage>
  );
}

export default ExitPage;
