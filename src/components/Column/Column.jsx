import Card from "../Card/Card";
import { MainColumn, ColumnTitle, Cards } from "./Column.styled";

export function Column({ status, cards = [] }) {
  return (
    <MainColumn>
      <ColumnTitle>
        <p>{status}</p>
      </ColumnTitle>

      <Cards>
        {cards
          .filter((card) => card.status === status)
          .map((card) => (
            <Card
              key={card.id}
              title={card.title}
              topic={card.topic}
              date={card.date}
            />
          ))}
      </Cards>
    </MainColumn>
  );
}

export default Column;