import { useContext, useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ViagemContext } from "../context/viagemContext";
import axios from "axios";
import ErrorModal from "../components/errorClientMsg";
import Input from "../components/input";
import Button from "../components/button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export default function Historico() {
  const { information, setInformation } = useContext(ViagemContext);
  const [historicoIds, setHistoricoIds] = useState({
    customer_id: "",
    driver_id: "",
  });
  const [historicoViagens, setHistoricoViagens] = useState({
    customer_id: "",
    rides: [
      {
        id: 0,
        date: "",
        origin: "",
        destination: "",
        distance: 0,
        duration: "",
        driver: {
          id: 0,
          name: "",
        },
        value: 0,
      },
    ],
  });
  const [showViagens, setShowViagens] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState({
    error_code: "",
    error_description: "",
  });

  if (information) {
    setInformation(false);
  }

  async function HandleViagem() {
    if (historicoIds.customer_id === "") return;
    try {
      if (!historicoIds.driver_id) {
        const resp = await axios.get(
          `http://localhost:8080/ride/${historicoIds.customer_id}`
        );

        setHistoricoViagens(resp.data);
        setShowViagens(true);
        return null;
      }
      const resp = await axios.get(
        `http://localhost:8080/ride/${
          historicoIds.customer_id
        }?driver_id=${Number(historicoIds.driver_id)}`
      );

      setHistoricoViagens(resp.data);
      setShowViagens(true);
      return null;
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
    setHistoricoIds((prevChange) => ({
      ...prevChange,
      customer_id: event.target.value,
    }));
  }

  function HandleDriverChange(event: SelectChangeEvent) {
    setHistoricoIds((prevChange) => ({
      ...prevChange,
      driver_id: event.target.value,
    }));
  }

  return (
    <div className="historico-div">
      <ErrorModal
        error_code={error.error_code}
        error_description={error.error_description}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <h1>Histórico de viagens</h1>
      <div className="filter-div">
        <div className="filter-inputs">
          <div className="filter-user">
            <Input
              name={"Usuário"}
              placeholder="Ex: Nome, Email, Número ou Cpf"
              handleOnChange={HandleUserChange}
            />
          </div>
          <div className="filter-select">
            <FormControl fullWidth variant="outlined">
              <InputLabel
                id="driver-label"
                sx={{
                  color: "black",
                  "&.Mui-focused": {
                    color: "black",
                  },
                }}
              >
                Filtrar motorista
              </InputLabel>
              <Select
                labelId="driver-label"
                id="default"
                value={historicoIds.driver_id}
                onChange={HandleDriverChange}
                label="Filtrar motorista"
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                }}
              >
                <MenuItem value={""}>Sem Filtro</MenuItem>
                <MenuItem value={1}>Homer Simpson</MenuItem>
                <MenuItem value={2}>Dominic Toretto</MenuItem>
                <MenuItem value={3}>James Bond</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <Button name="Buscar" handleOnClick={HandleViagem} />
      </div>
      <div className="show-viagens">
        {showViagens ? (
          historicoViagens.rides.map((ride) => {
            return (
              <Accordion
                key={ride.id}
                slotProps={{ heading: { component: "h4" } }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  Viagem {ride.id}
                </AccordionSummary>
                <AccordionDetails className="accordion-body">
                  <div>
                    Nome do motorista: {ride.driver.name}
                    <br />
                    Endereço de origem: {ride.origin}
                    <br />
                    Endereço de destino: {ride.destination}
                    <br />
                    Data da viagem: {ride.date}
                  </div>
                  <div>
                    Distância: {ride.distance}
                    <br />
                    Tempo de viagem: {ride.duration}
                    <br />
                    Valor da viagem {ride.value}
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <div>
            Não há viagens disponíveis, clique em buscar para encontrar todas as
            viagens ou aplique o filtro antes para encontrar viagens específicas
          </div>
        )}
      </div>
    </div>
  );
}
