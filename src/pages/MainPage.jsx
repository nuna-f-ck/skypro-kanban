import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import { getTasks } from "../services/tasks";
import {
  Page,
  CenterPage,
  PageTitle,
  Description,
} from "./pages.styled";

function MainPage({ isDarkMode, setIsDarkMode, setIsAuth }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadTasks() {
      try {
        const data = await getTasks();

        if (!ignore) {
          setTasks(data.tasks || []);
          setLoading(false);
        }
      } catch (requestError) {
        if (ignore) return;

        if (requestError.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsAuth(false);
          return;
        }

        setError("Не удалось загрузить задачи");
        setLoading(false);
      }
    }

    loadTasks();

    return () => {
      ignore = true;
    };
  }, [setIsAuth]);

  return (
    <Page>
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

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