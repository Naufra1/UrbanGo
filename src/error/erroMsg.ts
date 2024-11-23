type ErrorMsgType = {
  invalid: string;
  driver: string;
  distance: string;
  rides: string;
};

export const errorMsg: ErrorMsgType = {
  invalid: "INVALID_DATA",
  driver: "DRIVER_NOT_FOUND",
  distance: "INVALID_DISTANCE",
  rides: "NO_RIDES_FOUND",
};