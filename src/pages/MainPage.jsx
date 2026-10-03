import { useContext, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import TaskContext from "../context/TaskContext";

import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

import {
  Page,
  CenterPage,
  Description,
  LoadingState,
  Spinner,
  EmptyState,
} from "./pages.styled";

function MainPage({ isDarkMode, setIsDarkMode }) {
  const { logout } = useContext(AuthContext);
  const { tasks, isLoaded, error, fetchTasks } = useContext(TaskContext);

  useEffect(() => {
    let ignore = false;

    fetchTasks().catch((requestError) => {
      if (ignore) return;

      if (requestError.response?.status === 401) {
        logout();
      }
    });

    return () => {
      ignore = true;
    };
  }, [fetchTasks, logout]);

  // Спиннер — только при самой первой загрузке доски. Когда задачи уже есть
  // (например, после создания или редактирования карточки), доска показывается
  // сразу, а данные обновляются в фоне.
  let content;

  if (!isLoaded && error) {
    content = (
      <CenterPage>
        <Description>{error}</Description>
      </CenterPage>
    );
  } else if (!isLoaded) {
    content = (
      <CenterPage>
        <LoadingState>
          <Spinner />
          Загрузка задач...
        </LoadingState>
      </CenterPage>
    );
  } else if (tasks.length === 0) {
    content = (
      <CenterPage>
        <EmptyState>Новых задач нет</EmptyState>
      </CenterPage>
    );
  } else {
    content = <Main tasks={tasks} />;
  }

  return (
    <Page>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {content}
    </Page>
  );
}

export default MainPage;
