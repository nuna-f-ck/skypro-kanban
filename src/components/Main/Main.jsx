import Column from "../Column/Column";

import { Container } from "../General/General.styled";

import { StyledMain, MainBlock, MainContent } from "./Main.styled";

const columnsNames = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

export function Main({ tasks = [] }) {
  return (
    <StyledMain>
      <Container>
        <MainBlock>
          <MainContent>
            {columnsNames.map((status) => (
              <Column key={status} status={status} cards={tasks} />
            ))}
          </MainContent>
        </MainBlock>
      </Container>
    </StyledMain>
  );
}

export default Main;
