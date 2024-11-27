import { useContext, useEffect, useState } from "react";
import { ViagemContext } from "../context/viagemContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../components/errorClientMsg";

export default function Confirmar() {
  const { information, setInformation, estimateDriver, setViagem, viagem } =
    useContext(ViagemContext);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState({
    error_code: "",
    error_description: "",
  });

  if (!information) {
    setInformation(true);
  }

  async function handleDriver(driver: any) {
    try {
      const updateViagem = {
        ...viagem,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: driver.value,
      };
      setViagem(updateViagem);

      const resp = await axios.patch(
        "http://localhost:8080/ride/confirm",
        updateViagem
      );

      console.log(resp)

      navigate("/historico");
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

  return (
    <div className="confimar-div">
      <ErrorModal
        error_code={error.error_code}
        error_description={error.error_description}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <h1>Escolhas o motorista</h1>
      <div className="cards">
        {estimateDriver.map((driver) => {
          return (
            <Card variant="elevation" className="card" key={driver.id}>
              <CardContent className="card-content">
                <Typography gutterBottom variant="h4">
                  {driver.name}
                </Typography>
                <Typography variant="h6">{driver.vehicle}</Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  Avaliação: {driver.review.rating}/5 - {driver.review.comment}
                </Typography>
                <Typography variant="body1">
                  Descrição: {driver.description}
                </Typography>
                <div className="card-value">
                  <Typography variant="h5">R${driver.value}</Typography>
                  <Button
                    name="Confirmar"
                    handleOnClick={(e) => handleDriver(driver)}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
