import PopBrowse from "./components/PopBrowse/PopBrowse";
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopExit from "./components/popups/PopExit";
import Content from "./components/Content/Content";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="wrapper">
      {/* Popups */}
      <PopExit />
      <PopNewCard />
      <PopBrowse />

      {/* Основная страница */}
      <Content loading={loading} />
    </div>
  );
}

export default App;
