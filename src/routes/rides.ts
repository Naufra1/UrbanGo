import { Request, Response } from "express";
import { Estimate } from "../controllers/ridesController.js";
import getRoutesApi from "../maps/routesApi.js";
import { errorMsg } from "../error/erroMsg.js";
import { SaveConfirm } from "../controllers/saveConfirm.js";
import { getHistory } from "../controllers/getHistory.js";

export type GoogleRouteType = {
  origin: {
    // location: {
    //   latLng: {
    //     latitude: number;
    //     longitude: number;
    //   };
    // };
    address: string;
  };
  destination: {
    // location: {
    //   latLng: {
    //     latitude: number;
    //     longitude: number;
    //   };
    // };
    address: string;
  };
  travelMode: string;
};

type EstimateResponseType = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
      comment: string;
    };
    value: number;
  }[];
  routeResponse: object;
};

export type ConfirmType = {
  driver_id: number;
  customer_id: number;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
};

type HistoryType = {
  customer_id: string;
  rides: {
    id: number;
    date: Date;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: {
      id: number;
      name: string;
    };
    value: number;
  }[];
};

export default function RidesRoutes(app: any) {
  app.post("/ride/estimate", async (req: Request, res: Response) => {
    const body = req.body;
    const ride: GoogleRouteType = {
      origin: {
        // location: {
        //   latLng: {
        //     latitude: req.body.origin.latitude,
        //     longitude: req.body.origin.longitude,
        //   },
        // },
        address: body.origin,
      },
      destination: {
        // location: {
        //   latLng: {
        //     latitude: req.body.destination.latitude,
        //     longitude: req.body.destination.longitude,
        //   },
        // },
        address: body.destination,
      },
      travelMode: "DRIVE",
    };

    try {
      const respRoutesApi = await getRoutesApi(ride);

      if (respRoutesApi?.status == 400) {
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }

      const distance = respRoutesApi?.data.routes[0].distanceMeters / 1000;
      const responseData = await Estimate(distance);

      const drivers = responseData.map((driver) => {
        return {
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          review: {
            rating: driver.rating,
            comment: driver.comment,
          },
          value: driver.value * distance,
        };
      });

      const sortedDrivers = drivers.sort((a, b) => a.value - b.value);

      const responseJson: EstimateResponseType = {
        origin: {
          latitude:
            respRoutesApi?.data.routes[0].legs[0].startLocation.latLng.latitude,
          longitude:
            respRoutesApi?.data.routes[0].legs[0].startLocation.latLng
              .longitude,
        },
        destination: {
          latitude:
            respRoutesApi?.data.routes[0].legs[0].endLocation.latLng.latitude,
          longitude:
            respRoutesApi?.data.routes[0].legs[0].endLocation.latLng.longitude,
        },
        distance: distance,
        duration: respRoutesApi?.data.routes[0].duration,
        options: sortedDrivers,
        routeResponse: respRoutesApi?.data,
      };

      return res.status(200).send(responseJson);
    } catch (error) {
      console.log("Error na requisição: ", error);
      return res.status(400).send({
        error_code: errorMsg.invalid.code,
        error_description: errorMsg.invalid.description,
      });
    }
  });

  app.patch("/ride/confirm", async (req: Request, res: Response) => {
    const body = req.body;
    const confirm: ConfirmType = {
      driver_id: body.driver.id,
      customer_id: body.customer_id,
      origin: body.origin,
      destination: body.destination,
      distance: body.distance,
      duration: body.duration,
      value: body.value,
    };

    try {
      await SaveConfirm(confirm);
      return res.status(200).send({
        success: true,
      });
    } catch (error) {
      console.log("Error na requisição: ", error);
      return res.status(400).send({
        error_code: errorMsg.invalid.code,
        error_description: errorMsg.invalid.description,
      });
    }
  });

  app.get("/ride/:customer_id", async (req: Request, res: Response) => {
    const customer_id = req.params.customer_id;
    const driver_id = Number(req.query.driver_id);

    try {
      const historyData = await getHistory(customer_id, driver_id);
      if (!historyData[0]) {
        return res.status(400).send({
          error_code: errorMsg.invalid.code,
          error_description: errorMsg.invalid.description,
        });
      }

      const ridesHistory = historyData.map((history) => {
        return {
          id: history.id,
          date: history.date,
          origin: history.origin,
          destination: history.destination,
          distance: history.distance,
          duration: history.duration,
          driver: {
            id: history.driver_id,
            name: history.name,
          },
          value: history.value,
        };
      });

      const historyResponse: HistoryType = {
        customer_id: historyData[0].customer_id,
        rides: ridesHistory,
      };

      return res.status(200).send(historyResponse);
    } catch (error) {
      console.log("Error na requisição: ", error);
      return res.status(400).send({
        error_code: errorMsg.invalid.code,
        error_description: errorMsg.invalid.description,
      });
    }
  });
}
