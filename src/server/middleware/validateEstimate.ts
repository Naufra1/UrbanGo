import { Request, Response, NextFunction } from "express";
import { errorMsg } from "../error/erroMsg.js";

export default function ValidateEstimate(app: any) {
  app.use(
    "/ride/estimate",
    function (req: Request, res: Response, next: NextFunction) {
      const body = req.body
      if (
        // !body.origin.latitude ||
        // !body.origin.longitude ||
        // !body.destination.latitude ||
        // !body.destination.longitude ||
        !body.origin ||
        !body.destination ||
        !body.customer_id
      ) {
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }
      if (
        // body.origin.latitude == body.destination.latitude &&
        // body.origin.longitude == body.destination.longitude
        body.origin == body.destination
      ) {
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }
      next();
    }
  );
}
