import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CheckDatabase, InitializeDb } from "./config/configDb.js";
import RidesRoutes from "./routes/rides.js";
import ValidateEstimate from "./middleware/validateEstimate.js";

const app = express();
const port = 8080;
dotenv.config();

//Inicializando o banco de dados e o CORS
const fileExists = await CheckDatabase();
if (!fileExists) {
  InitializeDb();
}
app.use(cors(), express.json());

// Middlewares
ValidateEstimate(app);
//Rotas

RidesRoutes(app);

app.listen(port, () => {
  console.log(`Projeto rodando em http://localhost:${port}/`);
});

export default app;
