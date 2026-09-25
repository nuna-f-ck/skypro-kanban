import { useNavigate } from "react-router-dom";

import {
  CenterPage,
  PageModal,
  PageTitle,
  Actions,
  PrimaryButton,
  SecondaryButton,
} from "./pages.styled";

function ExitPage({ setIsAuth }) {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuth(false);

    navigate("/login", {
      replace: true,
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <CenterPage>
      <PageModal>
        <PageTitle>Выйти из аккаунта?</PageTitle>

        <Actions>
          <PrimaryButton type="button" onClick={handleExit}>
            Да, выйти
          </PrimaryButton>

          <SecondaryButton type="button" onClick={handleCancel}>
            Нет, остаться
          </SecondaryButton>
        </Actions>
      </PageModal>
    </CenterPage>
  );
}

export default ExitPage;
