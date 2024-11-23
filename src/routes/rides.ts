import { Request, Response } from "express";
import { Estimate } from "../controllers/ridesController.js";
import getRoutesApi from "../maps/routesApi.js";
import { errorMsg } from "../error/erroMsg.js";

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

type EstimateResponse = {
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

export default function RidesRoutes(app: any): null {
  app.post("/ride/estimate", async (req: Request, res: Response) => {
    const ride: GoogleRouteType = {
      origin: {
        // location: {
        //   latLng: {
        //     latitude: req.body.origin.latitude,
        //     longitude: req.body.origin.longitude,
        //   },
        // },
        address: req.body.origin,
      },
      destination: {
        // location: {
        //   latLng: {
        //     latitude: req.body.destination.latitude,
        //     longitude: req.body.destination.longitude,
        //   },
        // },
        address: req.body.destination,
      },
      travelMode: "DRIVE",
    };

    try {
      const respRoutesApi = await getRoutesApi(ride);

      if (respRoutesApi?.status == 400) {
        return res.status(400).send({
          error_code: errorMsg.invalid,
          error_description: respRoutesApi.error_description,
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

      const responseJson: EstimateResponse = {
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
        error_code: errorMsg.invalid,
        error_description: "Endereço inválido",
      });
    }
  });

  app.patch("/ride/confirm", async (req: Request, res: Response) => {});
  return null;
}
