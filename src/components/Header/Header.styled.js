import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.headerBackground};
`;

export const HeaderBlock = styled.div`
  height: 70px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

export const HeaderLogo = styled.div`
  width: 85px;

  & img {
    display: block;
    width: 85px;
  }
`;

export const HeaderNav = styled.nav`
  max-width: 290px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderBtnMainNew = styled.button`
  width: 178px;
  height: 30px;
  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  margin-right: 20px;

  & a {
    color: #ffffff;
  }

  &:hover {
    background-color: #33399b;
  }
`;

export const UserName = styled.p`
  color: ${(props) => props.theme.userText};
  cursor: pointer;
  font-size: 14px;
`;