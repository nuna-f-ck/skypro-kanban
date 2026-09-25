import { Link } from "react-router-dom";

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
  const togglePopUser = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!popState) {
    return null;
  }

  return (
    <PopUserWrapper>
      <UserName>Ivan Ivanov</UserName>

      <UserMail>ivan.ivanov@gmail.com</UserMail>

      <ThemeRow>
        <ThemeText>
          <p>Темная тема</p>
        </ThemeText>

        <ThemeCheckbox
          type="checkbox"
          name="checkbox"
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
