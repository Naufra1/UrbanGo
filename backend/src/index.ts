import express from "express";
import cors from "cors";
import { InitializeDb, db } from "./config/configDb.js";

const app = express();
const port = 8080;

//Inicializando o banco de dados e o CORS
InitializeDb();
app.use(cors());

//Rotas


app.listen(port, () => {
  console.log(`Projeto rodando em http://localhost:${port}/`);
});
