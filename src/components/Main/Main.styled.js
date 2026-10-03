import styled from "styled-components";

import { mobile } from "../../styles/breakpoints";

export const StyledMain = styled.main`
  width: 100%;
  min-height: calc(100vh - 70px);
  background-color: ${(props) => props.theme.mainBackground};
`;

export const MainBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;

  ${mobile} {
    /* снизу запас под закреплённую кнопку «Создать новую задачу» */
    padding: 0 0 calc(92px + env(safe-area-inset-bottom, 0px));
  }
`;

export const MainContent = styled.div`
  width: 100%;
  display: flex;

  /* на планшетах и узких экранах доска прокручивается вправо */
  overflow-x: auto;

  ${mobile} {
    flex-direction: column;
    overflow: visible;
  }
`;
