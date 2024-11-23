import { Request, Response, NextFunction } from "express";
import { errorMsg } from "../error/erroMsg.js";

export default function ValidateEstimate(app: any) {
  app.use(
    "/ride/estimate",
    function (req: Request, res: Response, next: NextFunction) {
      if (
        // !req.body.origin.latitude ||
        // !req.body.origin.longitude ||
        // !req.body.destination.latitude ||
        // !req.body.destination.longitude ||
        !req.body.origin ||
        !req.body.destination ||
        !req.body.customer_id
      ) {
        console.log("Formulário não foi devidamente preenchido.");
        return res.status(400).send({
          error_code: errorMsg.invalid,
          error_description: "Formulário não foi devidamente preenchido.",
        });
      }
      if (
        // req.body.origin.latitude == req.body.destination.latitude &&
        // req.body.origin.longitude == req.body.destination.longitude
        req.body.origin == req.body.destination
      ) {
        console.log("O endereço de origem não pode ser o mesmo do destino.");
        return res.status(400).send({
          error_code: errorMsg.invalid,
          error_description:
            "O endereço de origem não pode ser o mesmo do destino.",
        });
      }
      next();
    }
  );
}
