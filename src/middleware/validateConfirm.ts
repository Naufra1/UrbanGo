import { Request, Response, NextFunction } from "express";
import { errorMsg } from "../error/erroMsg.js";

export default function ValidateEstimate(app: any) {
  app.use(
    "/ride/confirm",
    function (req: Request, res: Response, next: NextFunction) {
      if (!req.body.origin || !req.body.destination || !req.body.customer_id) {
        console.log("Formulário não foi devidamente preenchido.");
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }
      if (req.body.origin == req.body.destination) {
        console.log("O endereço de origem não pode ser o mesmo do destino.");
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }
      // Colocar controller para encontrar motorista
      if (!req.body.driver.id) {
        return res.status(404).send({
          error_code: errorMsg.driver.code,
          error_description: errorMsg.driver.description,
        });
      }
      // Colocar controller para checar distancia
      if (!req.body.distance) {
        return res.status(406).send({
          error_code: errorMsg.distance.code,
          error_description: errorMsg.distance.description,
        });
      }
      next();
    }
  );
}
