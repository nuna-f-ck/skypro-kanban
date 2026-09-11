import Column from '../Column/Column';
import { cardList } from '../../data';

const colamnsNames = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово"
];

export function Main() {
  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {colamnsNames.map((status, index) => (
              <Column
                key={index}
                status={status}
                cards={cardList}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;