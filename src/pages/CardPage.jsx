import { Link, useParams } from "react-router-dom";

import Header from "../components/Header/Header";
import { cardList } from "../data";

import {
  Page,
  CenterPage,
  PageModal,
  PageTitle,
  Description,
  Input,
  Textarea,
  PrimaryButton,
} from "./pages.styled";

function CardPage({ isDarkMode, setIsDarkMode }) {
  const { id } = useParams();

  const card = cardList.find((item) => String(item.id) === id);

  if (!card) {
    return (
      <Page>
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        <CenterPage>
          <PageModal>
            <PageTitle>Задача не найдена</PageTitle>

            <Description>ID задачи: {id}</Description>

            <Link to="/">Вернуться на доску</Link>
          </PageModal>
        </CenterPage>
      </Page>
    );
  }

  return (
    <Page>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <CenterPage>
        <PageModal>
          <PageTitle>Редактирование задачи</PageTitle>

          <Description>ID задачи: {id}</Description>

          <Input type="text" defaultValue={card.title} />

          <Textarea
            defaultValue={`Категория: ${card.topic}\nСтатус: ${card.status}\nДата: ${card.date}`}
          />

          <PrimaryButton type="button">Сохранить</PrimaryButton>
        </PageModal>
      </CenterPage>
    </Page>
  );
}

export default CardPage;
