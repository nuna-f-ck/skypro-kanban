import { useContext, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import TaskContext from "../context/TaskContext";

import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

import { Page, CenterPage, PageTitle, Description } from "./pages.styled";

function MainPage({ isDarkMode, setIsDarkMode }) {
  const { logout } = useContext(AuthContext);
  const { tasks, loading, error, fetchTasks } = useContext(TaskContext);

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

  return (
    <Page>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {loading ? (
        <CenterPage>
          <PageTitle>Загрузка...</PageTitle>
        </CenterPage>
      ) : error ? (
        <CenterPage>
          <Description>{error}</Description>
        </CenterPage>
      ) : (
        <Main tasks={tasks} />
      )}
    </Page>
  );
}

export default MainPage;
