import { useContext, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import axios from "axios";
import { ViagemContext } from "../context/viagemContext";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../components/errorClientMsg";

export default function Viagem() {
  const { setEstimateDriver, setViagem, estimateDriver, viagem } =
    useContext(ViagemContext);
  const navigate = useNavigate();
  const [estimate, setEstimate] = useState({
    customer_id: "",
    origin: "",
    destination: "",
  });
  const [error, setError] = useState({
    error_code: "",
    error_description: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const { information, setInformation } = useContext(ViagemContext);

  if (information) {
    setInformation(false);
  }

  async function HandleOnClick() {
    try {
      const resp = await axios.post(
        "http://localhost:8080/ride/estimate",
        estimate
      );

      const drivers = resp.data.options;
      setEstimateDriver(drivers);

      const updateViagem = {
        ...viagem,
        customer_id: estimate.customer_id,
        origin: estimate.origin,
        destination: estimate.destination,
        distance: resp.data.distance,
        duration: resp.data.duration,
      };

      setViagem(updateViagem);

      navigate("/confirmar");
    } catch (error: any) {
      if (error.response) {
        setModalOpen(true);
        setError({
          error_code: error.response.data.error_code,
          error_description: error.response.data.error_description,
        });
        console.log(error.response.data);
      } else if (error.request) {
        console.log("Nenhuma resposta recebida:", error.request);
      } else {
        console.log("Erro ao configurar a requisição:", error.message);
      }
    }
  }

  function HandleUserChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEstimate((prevChange) => ({
      ...prevChange,
      customer_id: event.target.value,
    }));
  }
  function HandleOriginChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEstimate((prevChange) => ({
      ...prevChange,
      origin: event.target.value,
    }));
  }
  function HandleDestinationChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEstimate((prevChange) => ({
      ...prevChange,
      destination: event.target.value,
    }));
  }

  return (
    <div className="viagem-div">
      <ErrorModal
        error_code={error.error_code}
        error_description={error.error_description}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <h1>Faça a sua viagem</h1>
      <div className="viagem-customer_id">
        <Input
          name={"Usuário"}
          placeholder="Ex: Nome, Email, Número ou Cpf"
          handleOnChange={HandleUserChange}
        />
      </div>
      <div className="viagem-endereço">
        <div className="viagem-origem">
          <Input
            name={"Endereço de origem"}
            placeholder="Ex: Centro, Rio de Janeiro - RJ, Brasil"
            handleOnChange={HandleOriginChange}
          />
        </div>
        <div className="viagem-destino">
          <Input
            name={"Endereço de destino"}
            placeholder="Ex: Madureira, Rio de Janeiro - RJ, Brasil"
            handleOnChange={HandleDestinationChange}
          />
        </div>
      </div>
      <Button name="Estimar Valor" handleOnClick={HandleOnClick} />
    </div>
  );
}
