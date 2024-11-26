import { useState, createContext } from "react";

type ViagemContextType = {
  estimateDriver: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: { comment: string; rating: number };
    value: number;
  }[];
  setEstimateDriver: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        description: string;
        vehicle: string;
        review: { comment: string; rating: number };
        value: number;
      }[]
    >
  >;
  viagem: {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: { id: number; name: string };
    value: number;
  };
  setViagem: React.Dispatch<
    React.SetStateAction<{
      customer_id: string;
      origin: string;
      destination: string;
      distance: number;
      duration: string;
      driver: { id: number; name: string };
      value: number;
    }>
  >;
};

const defaultContext: ViagemContextType = {
  estimateDriver: [
    {
      id: 0,
      name: "",
      description: "",
      vehicle: "",
      review: { comment: "", rating: 0 },
      value: 0,
    },
  ],
  setEstimateDriver: () => {},
  viagem: {
    customer_id: "",
    origin: "",
    destination: "",
    distance: 0,
    duration: "",
    driver: { id: 0, name: "" },
    value: 0,
  },
  setViagem: () => {},
};

export const ViagemContext = createContext<ViagemContextType>(defaultContext);

export function ViagemProvider({ children }: any) {
  const [estimateDriver, setEstimateDriver] = useState([
    {
      id: 0,
      name: "",
      description: "",
      vehicle: "",
      review: {
        comment: "",
        rating: 0,
      },
      value: 0,
    },
  ]);
  const [viagem, setViagem] = useState({
    customer_id: "",
    origin: "",
    destination: "",
    distance: 0,
    duration: "",
    driver: {
      id: 0,
      name: "",
    },
    value: 0,
  });

  return (
    <ViagemContext.Provider
      value={{ estimateDriver, setEstimateDriver, viagem, setViagem }}
    >
      {children}
    </ViagemContext.Provider>
  );
}
