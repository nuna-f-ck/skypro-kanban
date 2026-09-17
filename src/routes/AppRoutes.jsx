import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle, Wrapper } from "../components/General/General.styled";

import PrivateRoute from "./PrivateRoute";

import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AddTaskPage from "../pages/AddTaskPage";
import CardPage from "../pages/CardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";

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

    topicColors: {
      orange: {
        bg: "#FFE4C2",
        text: "#FF6D00",
      },
      green: {
        bg: "#B4FDD1",
        text: "#06B16E",
      },
      purple: {
        bg: "#E9D4FF",
        text: "#9A48F1",
      },
    },
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

    topicColors: {
      orange: {
        bg: "#FF6D00",
        text: "#FFE4C2",
      },
      green: {
        bg: "#06B16E",
        text: "#B4FDD1",
      },
      purple: {
        bg: "#9A48F1",
        text: "#E9D4FF",
      },
    },
  },
};

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />

      <Wrapper>
        <Routes>
          {/* Открытые страницы */}
          <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />

          <Route path="/register" element={<RegisterPage />} />

          {/* Защищённые страницы */}
          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route
              path="/"
              element={
                <MainPage
                  loading={loading}
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
              }
            />

            <Route
              path="/card/add"
              element={
                <AddTaskPage
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
              }
            />

            <Route
              path="/card/:id"
              element={
                <CardPage
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
              }
            />

            <Route path="/exit" element={<ExitPage setIsAuth={setIsAuth} />} />
          </Route>

          {/* 404 */}
          <Route path="/404" element={<NotFoundPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  );
}

export default AppRoutes;
