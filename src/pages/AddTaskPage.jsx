import { useNavigate } from "react-router-dom";

import Header from "../components/Header/Header";

import {
  Page,
  CenterPage,
  PageModal,
  PageTitle,
  Form,
  Input,
  Textarea,
  PrimaryButton,
} from "./pages.styled";

function AddTaskPage({ isDarkMode, setIsDarkMode }) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <Page>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <CenterPage>
        <PageModal>
          <PageTitle>Создание задачи</PageTitle>

          <Form onSubmit={handleSubmit}>
            <Input type="text" placeholder="Название задачи" />

            <Textarea placeholder="Описание задачи" />

            <PrimaryButton type="submit">Создать задачу</PrimaryButton>
          </Form>
        </PageModal>
      </CenterPage>
    </Page>
  );
}

export default AddTaskPage;
