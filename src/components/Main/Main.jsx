import Column from "../Column/Column";
import { cardList } from "../../data";
import { Container } from "../General/General.styled";
import {
  StyledMain,
  MainBlock,
  MainContent,
} from "./Main.styled";

const columnsNames = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

export function Main() {
  return (
    <StyledMain>
      <Container>
        <MainBlock>
          <MainContent>
            {columnsNames.map((status) => (
              <Column
                key={status}
                status={status}
                cards={cardList}
              />
            ))}
          </MainContent>
        </MainBlock>
      </Container>
    </StyledMain>
  );
}

export default Main;