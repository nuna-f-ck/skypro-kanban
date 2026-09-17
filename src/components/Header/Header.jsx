import PopUser from "../PopUser/PopUser";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Container } from "../General/General.styled";

import {
  StyledHeader,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  HeaderBtnMainNew,
  UserName,
} from "./Header.styled";

export function Header({ isDarkMode, setIsDarkMode, setIsAuth }) {
  const [popState, setPopState] = useState(false);

  const togglePopUser = () => {
    setPopState(!popState);
  };

  return (
    <StyledHeader>
      <Container>
        <HeaderBlock>
          <HeaderLogo>
            <Link to="/">
              <img
                src={isDarkMode ? "/logo_dark.png" : "/logo.png"}
                alt="logo"
              />
            </Link>
          </HeaderLogo>

          <HeaderNav>
            <HeaderBtnMainNew as={Link} to="/card/add">
              Создать новую задачу
            </HeaderBtnMainNew>

            <UserName onClick={togglePopUser}>Ivan Ivanov</UserName>

            <PopUser
              popState={popState}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              setIsAuth={setIsAuth}
            />
          </HeaderNav>
        </HeaderBlock>
      </Container>
    </StyledHeader>
  );
}

export default Header;
