import s from "./App.module.scss";
import { Header } from "./components/Header";
import { Reviews } from "./components/Reviews";
import { Cart } from "./components/Cart";
import { Space } from "./components/Space";
import { Catalog } from "./components/Catalog";
import { PopupComponent } from "./components/PopupComponent";
import { Spinner } from "./components/Spinner";

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
        <PopupComponent />
        <Spinner />
      </div>
    </div>
  );
}

export default App;
