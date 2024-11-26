import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Confirmar from "./pages/confirmar";
import Historico from "./pages/historico";
import Viagem from "./pages/viagem";
import NavigationBar from "./components/navigationBar";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Viagem />} />
          <Route path="/confirmar" element={<Confirmar />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
