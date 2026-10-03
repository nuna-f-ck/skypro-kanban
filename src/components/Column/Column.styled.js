import styled from "styled-components";

import { mobile } from "../../styles/breakpoints";

export const MainColumn = styled.div`
  width: 20%;
  min-width: 240px;
  margin: 0 auto;
  display: block;

  ${mobile} {
    width: 100%;
    min-width: 0;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  & p {
    color: #94a6be;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
  }

  ${mobile} {
    padding: 0 5px;
  }
`;

export const Cards = styled.div`
  width: 100%;
  display: block;
  position: relative;

  /* телефон: карточки колонки прокручиваются вправо (макет, пометка 17) */
  ${mobile} {
    display: flex;
    align-items: flex-start;

    margin: 0 -16px;
    width: calc(100% + 32px);
    padding: 0 11px 0 16px;

    overflow-x: auto;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;

    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
