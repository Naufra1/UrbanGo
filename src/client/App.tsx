import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Confirmar from "./pages/confirmar";
import Historico from "./pages/historico";
import Viagem from "./pages/viagem";
import NavigationBar from "./components/navigationBar";
import InformationBox from "./components/informationBar";
import { useContext } from "react";
import { ViagemContext } from "./context/viagemContext";

function App() {
  const { information } = useContext(ViagemContext);
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
      <InformationBox showInformation={information} />
    </BrowserRouter>
  );
}

export default App;
