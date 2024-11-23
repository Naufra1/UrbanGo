type ErrorMsgType = {
  invalid: {
    code: string;
    description: string;
  };
  driver: {
    code: string;
    description: string;
  };
  invalid_driver: {
    code: string;
    description: string;
  };
  distance: {
    code: string;
    description: string;
  };
  rides: {
    code: string;
    description: string;
  };
};

export const errorMsg: ErrorMsgType = {
  invalid: {
    code: "INVALID_DATA",
    description: "Os dados fornecidos no corpo da requisição são inválidos",
  },
  driver: {
    code: "DRIVER_NOT_FOUND",
    description: "Motorista não encontrado",
  },
  invalid_driver: {
    code: "INVALID_DRIVER",
    description: "Motorista invalido",
  },
  distance: {
    code: "INVALID_DISTANCE",
    description: "Quilometragem inválida  para o motorista",
  },
  rides: {
    code: "NO_RIDES_FOUND",
    description: "Nenhum registro encontrado",
  },
};
