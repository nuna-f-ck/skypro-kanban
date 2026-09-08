import Header from './components/Header/Header';
import Main from './components/Main/Main';
import PopBrowse from './components/PopBrowse/PopBrowse';
import PopNewCard from './components/PopNewCard/PopNewCard';
import PopExit from './components/popups/PopExit';

function App() {
  return (
    <div className="wrapper">
      {/* Popups */}
      <PopExit />
      <PopNewCard />
      <PopBrowse />

      {/* Основная страница */}
      <Header />
      <Main />
    </div>
  );
}

export default App;