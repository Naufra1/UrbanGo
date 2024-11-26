import { useContext, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import axios from "axios";
import { ViagemContext } from "../context/viagemContext";
import { useNavigate } from "react-router-dom";

export default function Viagem() {
  const { setEstimateDriver, setViagem, estimateDriver, viagem } =
    useContext(ViagemContext);
  const navigate = useNavigate();
  const [estimate, setEstimate] = useState({
    customer_id: "",
    origin: "",
    destination: "",
  });

  function HandleOnClick() {
    try {
      axios
        .post("http://localhost:8080/ride/estimate", estimate)
        .then((resp) => {
          console.log("DATA: ", resp.data);
          const drivers = resp.data.options;
          setEstimateDriver(drivers);

          setViagem((prevViagem) => ({
            ...prevViagem,
            customer_id: estimate.customer_id,
            origin: estimate.origin,
            destination: estimate.destination,
          }));
          navigate("/confirmar");
        });
    } catch (error) {
      console.log(error);
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
      <h1>Faça a sua viagem</h1>
      <div className="viagem-customer_id">
        <Input
          name={"Usuário:"}
          placeholder="Gustavo"
          handleOnChange={HandleUserChange}
        />
      </div>

      <div className="viagem-endereço">
        <div className="viagem-origem">
          <Input
            name={"Endereço de origem:"}
            placeholder="Centro, Rio de Janeiro - RJ, Brasil"
            handleOnChange={HandleOriginChange}
          />
        </div>
        <div className="viagem-destino">
          <Input
            name={"Endereço de destino:"}
            placeholder="Madureira, Rio de Janeiro - RJ, Brasil"
            handleOnChange={HandleDestinationChange}
          />
        </div>
      </div>
      <Button name="Estimar Valor" handleOnClick={HandleOnClick} />
    </div>
  );
}
