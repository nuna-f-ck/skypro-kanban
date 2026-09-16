import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";

import { Wrapper, GlobalStyle } from "./components/General/General.styled";
import PopBrowse from "./components/PopBrowse/PopBrowse";
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopExit from "./components/popups/PopExit";
import Content from "./components/Content/Content";

const themes = {
  light: {
    bodyBackground: "#EAEEF6",
    mainBackground: "#EAEEF6",
    headerBackground: "#FFFFFF",
    cardBackground: "#FFFFFF",
    text: "#000000",
    title: "#000000",
    logo: "/logo.png",
    userText: "#000000",
  },

  dark: {
    bodyBackground: "#151419",
    mainBackground: "#151419",
    headerBackground: "#20202C",
    cardBackground: "#20202C",
    text: "#FFFFFF",
    title: "#FFFFFF",
    logo: "/logo_dark.png",
    userText: "#FFFFFF",
  },
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Wrapper>
        <PopExit />
        <PopNewCard />
        <PopBrowse />

        <Content
          loading={loading}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
