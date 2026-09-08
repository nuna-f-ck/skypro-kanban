import Card from '../Card/Card';

export function Column({ title, cards = [] }) {
  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{title}</p>
      </div>

      <div className="cards">
        {cards.map((card, index) => (
          <Card
            key={`${title}-${index}`}
            title={card.title}
            theme={card.theme}
            themeName={card.themeName}
            date={card.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;