import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import MainPage from "./MainPage";

import {
  ExitOverlay,
  ExitModal,
  PageTitle,
  Actions,
  PrimaryButton,
  SecondaryButton,
} from "./pages.styled";

function ExitPage({ isDarkMode, setIsDarkMode }) {
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
    <>
      {/* затемнённая доска за окном подтверждения, как в макете */}
      <MainPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <ExitOverlay>
        <ExitModal role="dialog" aria-modal="true" aria-labelledby="exit-title">
          <PageTitle id="exit-title">Выйти из аккаунта?</PageTitle>

          <Actions>
            <PrimaryButton type="button" onClick={handleExit}>
              Да, выйти
            </PrimaryButton>

            <SecondaryButton type="button" onClick={handleCancel}>
              Нет, остаться
            </SecondaryButton>
          </Actions>
        </ExitModal>
      </ExitOverlay>
    </>
  );
}

export default ExitPage;
