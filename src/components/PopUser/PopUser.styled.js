import styled from "styled-components";

export const PopUserWrapper = styled.div`
  position: absolute;
  top: 61px;
  right: 0;
  z-index: 10;

  width: 213px;
  padding: 20px;

  background-color: ${(props) => props.theme.cardBackground};
  border: 0.7px solid #d4dbe5;
  border-radius: 10px;

  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
`;

export const UserName = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 4px;
`;

export const UserMail = styled.p`
  color: #94a6be;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
  margin-bottom: 10px;
`;

export const ThemeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const ThemeText = styled.p`
  color: ${(props) => props.theme.text};
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.14px;
`;

export const ThemeCheckbox = styled.input`
  position: relative;
  width: 24px;
  height: 13px;
  border-radius: 100px;

  background: #eaEEF6;

  outline: none;
  appearance: none;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: ${(props) => (props.checked ? "12px" : "1px")};

    width: 11px;
    height: 11px;

    border-radius: 50%;
    background-color: #565eef;

    transition: 0.2s;
  }
`;

export const LogoutButton = styled.button`
  width: 72px;
  height: 30px;

  background: transparent;
  color: #565eef;

  border-radius: 4px;
  border: 1px solid #565eef;

  cursor: pointer;

  & a {
    color: #565eef;
  }

  &:hover {
    background-color: #33399b;
    border-color: #33399b;

    & a {
      color: #ffffff;
    }
  }
`;