import styled from "styled-components";

export const StyledMain = styled.main`
  width: 100%;
  min-height: calc(100vh - 70px);
  background-color: ${(props) => props.theme.mainBackground};
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;
`;