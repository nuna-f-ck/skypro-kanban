import styled, { css } from "styled-components";

import { mobile } from "../../styles/breakpoints";

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

  ${mobile} {
    padding: 0;
  }
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

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  background-color: #565eef;
  color: #ffffff;
  border: none;

  font-size: 14px;
  line-height: 1;
  font-weight: 500;

  margin-right: 20px;

  &:hover {
    background-color: #33399b;
  }

  ${mobile} {
    ${(props) =>
      props.$hideOnMobile
        ? css`
            display: none;
          `
        : css`
            position: fixed;
            left: 16px;
            right: 16px;
            bottom: calc(16px + env(safe-area-inset-bottom, 0px));
            z-index: 5;

            width: auto;
            height: 44px;

            margin: 0;

            border-radius: 6px;

            font-size: 14px;
          `}
  }
`;

export const UserName = styled.p`
  color: ${(props) => props.theme.userText};
  cursor: pointer;
  font-size: 14px;

  ${mobile} {
    display: flex;
    align-items: center;
    gap: 7px;

    color: #565eef;

    &::after {
      content: "";

      width: 5px;
      height: 5px;

      border-right: 1.5px solid currentColor;
      border-bottom: 1.5px solid currentColor;

      transform: rotate(45deg) translateY(-2px);
    }
  }
`;
