import apiService from "./service";
import s from "./App.module.scss";
import { Header } from "./components/Header";

function App() {
  const get = () => {
    apiService.getProducts().then(console.log);
  };
  return (
    <div className={s.container}>
      <div className={s.contentContainer}>
        <Header />
        <button onClick={get}>Get</button>
      </div>
    </div>
  );
}

export default App;
