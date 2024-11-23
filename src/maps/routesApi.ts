import { errorMsg } from "../error/erroMsg.js";
import { GoogleRouteType } from "../routes/rides.js";
import axios from "axios";

export default async function getRoutesApi(ride: GoogleRouteType) {
  const key = process.env.GOOGLE_API_KEY;
  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";
  const payload: GoogleRouteType = {
    origin: {
      // location: {
      //   latLng: {
      //     latitude: ride.origin.location.latLng.latitude,
      //     longitude: ride.origin.location.latLng.longitude,
      //   },
      // },
      address: ride.origin.address,
    },
    destination: {
      // location: {
      //   latLng: {
      //     latitude: ride.destination.location.latLng.latitude,
      //     longitude: ride.destination.location.latLng.longitude,
      //   },
      // },
      address: ride.destination.address,
    },
    travelMode: "DRIVE",
  };

  try {
    const resp = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask":
          "routes.duration,routes.distanceMeters,routes.legs.startLocation,routes.legs.endLocation",
      },
    });

    console.log("Sucesso com a routes API", resp.data, resp.status);

    return {
      status: resp.status,
      data: resp.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data.error.message;

        console.error("Erro na requisição:", statusCode, responseData);

        return {
          error_code: errorMsg.invalid,
          error_description: responseData,
        };
      }
    }
  }
}
