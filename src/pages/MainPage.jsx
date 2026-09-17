import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

import { Page, CenterPage, Description } from "./pages.styled";

function MainPage({ loading, isDarkMode, setIsDarkMode }) {
  if (loading) {
    return (
      <CenterPage>
        <Description>Данные загружаются</Description>
      </CenterPage>
    );
  }

  return (
    <Page>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      <Main />
    </Page>
  );
}

export default MainPage;
