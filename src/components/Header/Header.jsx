import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import PopUser from "../PopUser/PopUser";

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

  const { user } = useContext(AuthContext);

  const togglePopUser = () => {
    setPopState((prev) => !prev);
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

            <UserName onClick={togglePopUser}>
              {user?.name || user?.login || "Пользователь"}
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
