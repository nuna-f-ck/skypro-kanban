import PopUser from "../PopUser/PopUser";
import { useState } from "react";
import { Container } from "../General/General.styled";
import {
  StyledHeader,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderBtnMainNew,
  UserName,
} from "./Header.styled";

export function Header({ isDarkMode, setIsDarkMode }) {
  const [popState, setPopState] = useState(false);

  const togglePopUser = () => {
    setPopState(!popState);
  };

  return (
    <StyledHeader>
      <Container>
        <HeaderBlock>
          <HeaderLogo>
            <a href="" target="_self">
              <img
                src={isDarkMode ? "/logo_dark.png" : "/logo.png"}
                alt="logo"
              />
            </a>
          </HeaderLogo>

          <HeaderNav>
            <HeaderBtnMainNew id="btnMainNew">
              <a href="#popNewCard">Создать новую задачу</a>
            </HeaderBtnMainNew>

            <UserName onClick={togglePopUser}>
              Ivan Ivanov
            </UserName>

            <PopUser
              popState={popState}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </StyledHeader>
  );
}

export default Header;