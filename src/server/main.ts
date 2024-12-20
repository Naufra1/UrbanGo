import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CheckDatabase, InitializeDb } from "./config/configDb.js";
import RidesRoutes from "./routes/rides.js";
import ValidateEstimate from "./middleware/validateEstimate.js";
import ValidateConfirm from "./middleware/validateConfirm.js";
import ValidateHistory from "./middleware/validateHistory.js";

const app = express();
dotenv.config();

//Inicializando o banco de dados e o CORS
const fileExists = await CheckDatabase();
if (!fileExists) {
  InitializeDb();
}
app.use(cors(), express.json());

// Middlewares
ValidateEstimate(app);
ValidateConfirm(app);
ValidateHistory(app);
//Rotas
RidesRoutes(app);

app.listen(8080, () => console.log("Rodando na porta 8080..."));
