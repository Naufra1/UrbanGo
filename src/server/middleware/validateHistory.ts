import { Request, Response, NextFunction } from "express";
import { errorMsg } from "../error/erroMsg.js";
import { DriverCheck } from "../controllers/driverCheck.js";

export default function ValidateHistory(app: any) {
  app.use(
    "/ride/:customer_id?",
    async function (req: Request, res: Response, next: NextFunction) {
      const customer_id = req.params.customer_id;
      const driver_id = req.query.driver_id;

      if (!customer_id) {
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }

      if (!driver_id) {
        return next();
      }
      const driver_id_number = Number(driver_id);
      const driverData = await DriverCheck(driver_id_number);

      if (!driverData || !driverData[0]) {
        return res.status(404).send({
          error_code: errorMsg.driver.code,
          error_description: errorMsg.driver.description,
        });
      }
      return next();
    }
  );
}
