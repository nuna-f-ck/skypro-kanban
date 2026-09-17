import { Link } from "react-router-dom";

import {
  CenterPage,
  PageModal,
  NotFoundTitle,
  NotFoundText,
  PrimaryButton,
} from "./pages.styled";

function NotFoundPage() {
  return (
    <CenterPage>
      <PageModal>
        <NotFoundTitle>404</NotFoundTitle>

        <NotFoundText>Страница не найдена</NotFoundText>

        <Link to="/">
          <PrimaryButton type="button">Вернуться на главную</PrimaryButton>
        </Link>
      </PageModal>
    </CenterPage>
  );
}

export default NotFoundPage;
