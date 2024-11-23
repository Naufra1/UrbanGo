import { Request, Response, NextFunction } from "express";
import { errorMsg } from "../error/erroMsg.js";
import { DriverCheck } from "../controllers/driverCheck.js";
import { DistanceCheck } from "../controllers/distanceCheck.js";

export default function ValidateConfirm(app: any) {
  app.use(
    "/ride/confirm",
    async function (req: Request, res: Response, next: NextFunction) {
      const body = req.body;
      if (!body.origin || !body.destination || !req.body.customer_id) {
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }
      if (body.origin == body.destination) {
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }
      if (
        typeof body.distance != "number" ||
        typeof body.driver.id != "number" ||
        typeof body.value != "number"
      ) {
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }
      const driver = await DriverCheck(body.driver.id);

      if (
        !body.driver.id ||
        !driver ||
        !driver[0] ||
        driver[0].id != body.driver.id
      ) {
        return res.status(404).send({
          error_code: errorMsg.driver.code,
          error_description: errorMsg.driver.description,
        });
      }
      const distance = await DistanceCheck(body.distance);
      if (!distance || !distance[0] || distance[0].distance < body.distance) {
        return res.status(406).send({
          error_code: errorMsg.distance.code,
          error_description: errorMsg.distance.description,
        });
      }
      next();
    }
  );
}
