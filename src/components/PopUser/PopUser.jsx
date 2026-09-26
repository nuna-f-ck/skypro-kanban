import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import {
  PopUserWrapper,
  UserName,
  UserMail,
  ThemeRow,
  ThemeText,
  ThemeCheckbox,
  LogoutButton,
} from "./PopUser.styled";

export function PopUser({ popState, isDarkMode, setIsDarkMode }) {
  const { user } = useContext(AuthContext);

  const togglePopUser = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (!popState) {
    return null;
  }

  return (
    <PopUserWrapper>
      <UserName>{user?.name || user?.login}</UserName>

      <UserMail>{user?.login}</UserMail>

      <ThemeRow>
        <ThemeText>Темная тема</ThemeText>

        <ThemeCheckbox
          type="checkbox"
          checked={isDarkMode}
          onChange={togglePopUser}
        />
      </ThemeRow>

      <LogoutButton as={Link} to="/exit">
        Выйти
      </LogoutButton>
    </PopUserWrapper>
  );
}

export default PopUser;
