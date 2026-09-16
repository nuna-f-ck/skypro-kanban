import Header from "../Header/Header";
import Main from "../Main/Main";
import { LoadingText } from "./Content.styled";

const Content = ({ loading, isDarkMode, setIsDarkMode }) => {
  return (
    <div>
      {loading ? (
        <LoadingText>Данные загружаются</LoadingText>
      ) : (
        <>
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Main />
        </>
      )}
    </div>
  );
};

export default Content;
