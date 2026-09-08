import Column from '../Column/Column';

const columns = [
  {
    title: 'Без статуса',
    cards: [
      {
        theme: 'orange',
        themeName: 'Web Design',
        date: '30.10.23',
      },
      {
        theme: 'green',
        themeName: 'Research',
        date: '30.10.23',
      },
      {
        theme: 'orange',
        themeName: 'Web Design',
        date: '30.10.23',
      },
      {
        theme: 'purple',
        themeName: 'Copywriting',
        date: '30.10.23',
      },
      {
        theme: 'orange',
        themeName: 'Web Design',
        date: '30.10.23',
      },
    ],
  },

  {
    title: 'Нужно сделать',
    cards: [
      {
        theme: 'green',
        themeName: 'Research',
        date: '30.10.23',
      },
    ],
  },

  {
    title: 'В работе',
    cards: [
      {
        theme: 'green',
        themeName: 'Research',
        date: '30.10.23',
      },
      {
        theme: 'purple',
        themeName: 'Copywriting',
        date: '30.10.23',
      },
      {
        theme: 'orange',
        themeName: 'Web Design',
        date: '30.10.23',
      },
    ],
  },

  {
    title: 'Тестирование',
    cards: [
      {
        theme: 'green',
        themeName: 'Research',
        date: '30.10.23',
      },
    ],
  },

  {
    title: 'Готово',
    cards: [
      {
        theme: 'green',
        themeName: 'Research',
        date: '30.10.23',
      },
    ],
  },
];

export function Main() {
  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          <div className="main__content">
            {columns.map((column) => (
              <Column
                key={column.title}
                title={column.title}
                cards={column.cards}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;