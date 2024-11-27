import { useContext } from "react";
import { ViagemContext } from "../context/viagemContext";
import Input from "./input";
import Maps from "../utils/mapsApi";

type ShowInformationType = {
  showInformation: boolean;
};

export default function InformationBox({
  showInformation,
}: ShowInformationType) {
  const { viagem } = useContext(ViagemContext);
  return (
    <div className={`information-div show-information-${showInformation}`}>
      <div className="info-invisble-bar">
        <div className="info-endereço">
          <Input
            name={"Endereço de origem"}
            placeholder="Endereço de origem"
            disable={true}
            valor={viagem.origin}
            className="info-origem"
          />
          <Input
            name={"Endereço de destino"}
            placeholder="Endereço de destino"
            disable={true}
            valor={viagem.destination}
            className="info-destino"
          />
        </div>
        <div className="info-map">
          <Maps origin={viagem.origin} destination={viagem.destination} />
        </div>
      </div>
    </div>
  );
}
