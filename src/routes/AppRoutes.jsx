import { useState } from "react";
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

const lightTheme = {
  body: "#F1F1F1",
  mainBackground: "#F1F1F1",
  headerBackground: "#FFFFFF",
  cardBackground: "#FFFFFF",
  title: "#000000",
  text: "#000000",
  userText: "#000000",
  topicColors: {
    purple: {
      bg: "#E9D4FF",
      text: "#9B51E0",
    },
    green: {
      bg: "#B4FDD1",
      text: "#06B16E",
    },
    orange: {
      bg: "#FFE4C7",
      text: "#FF6D00",
    },
  },
};

const darkTheme = {
  body: "#15171C",
  mainBackground: "#15171C",
  headerBackground: "#202229",
  cardBackground: "#202229",
  title: "#FFFFFF",
  text: "#FFFFFF",
  userText: "#FFFFFF",
  topicColors: {
    purple: {
      bg: "#9B51E0",
      text: "#E9D4FF",
    },
    green: {
      bg: "#06B16E",
      text: "#B4FDD1",
    },
    orange: {
      bg: "#FF6D00",
      text: "#FFE4C7",
    },
  },
};

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Wrapper>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage setIsAuth={setIsAuth} />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route
              path="/"
              element={
                <MainPage
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                  setIsAuth={setIsAuth}
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

            <Route
              path="/exit"
              element={<ExitPage setIsAuth={setIsAuth} />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  );
}

export default AppRoutes;
