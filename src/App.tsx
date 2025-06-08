import s from "./App.module.scss";
import { Header } from "./components/Header";
import { Reviews } from "./components/Reviews";
import { Cart } from "./components/Cart";
import { Space } from "./components/Space";
import { Catalog } from "./components/Catalog";

function App() {
  return (
    <div className={s.container}>
      <div className={s.contentContainer}>
        <Header />
        <Space />
        <Reviews />
        <Space />
        <Cart />
        <Space />
        <Catalog />
      </div>
    </div>
  );
}

export default App;
