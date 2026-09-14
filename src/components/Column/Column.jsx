import Card from '../Card/Card';

export function Column({ status, cards = [] }) {
  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{status}</p>
      </div>

      <div className="cards">
        {cards.filter((card) => card.status == status).map((card) => (
          <Card
            key={card.id}
            title={card.title}
            topic={card.topic}
            date={card.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;