import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

type MotoristaType = {
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  value: number;
  km: number;
};

export const path = "./src/server/config/database.db";

export async function CheckDatabase(): Promise<boolean> {
  if (!fs.existsSync(path)) {
    console.log("Banco de dados ainda não existe");
    return false;
  }

  console.log("Banco encontrado");

  const db = await open({
    filename: path,
    driver: sqlite3.Database,
  });

  try {
    const tableExists = await db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='driver';"
    );

    if (tableExists) {
      console.log("Banco de dados já existe com as tabelas");
      return true;
    } else {
      console.log("Banco de dados ainda não tem as tabelas");
      return false;
    }
  } catch (error) {
    console.error("Erro ao verificar banco", error);
    return false;
  } finally {
    console.log("Fechando...");
    await db.close();
  }
}
const drivers: MotoristaType[] = [
  {
    name: "Homer Simpson",
    description:
      "Olá! Sou Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
    rating: 2,
    comment:
      "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
    value: 2.5,
    km: 1,
  },
  {
    name: "Dominic Toretto",
    description:
      "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    vehicle: "Dodge Charger R/T 1970 modificado",
    rating: 4,
    comment:
      "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
    value: 5.0,
    km: 5,
  },
  {
    name: "James Bond",
    description:
      "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    vehicle: "Aston Martin DB5 clássico",
    rating: 5,
    comment:
      "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
    value: 10.0,
    km: 10,
  },
];

export function InitializeDb() {
  console.log("Inicializando o banco de dados...");
  const db = new sqlite3.Database(path);

  db.serialize(() => {
    // db.run(`CREATE TABLE IF NOT EXISTS user (
    //   id INTEGER PRIMARY KEY AUTOINCREMENT,
    //   name STRING
    // )`);
    // db.run(`INSERT INTO user (name) VALUES (?)`, "Gustavo");

    db.run(`CREATE TABLE IF NOT EXISTS driver (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name STRING NOT NULL,
      description STRING NOT NULL,
      vehicle STRING NOT NULL,
      rating INTEGER NOT NULL,
      comment STRING NOT NULL,
      value REAL NOT NULL,
      km REAL NOT NULL
    )`);
    drivers.forEach((driver) => {
      db.run(
        `INSERT INTO driver (name,description,vehicle,rating,comment,value,km) VALUES (?,?,?,?,?,?,?)`,
        [
          driver.name,
          driver.description,
          driver.vehicle,
          driver.rating,
          driver.comment,
          driver.value,
          driver.km,
        ]
      );
    });

    db.run(`CREATE TABLE IF NOT EXISTS viagem (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      driver_id INTEGER NOT NULL,
      customer_id STRING,
      origin STRING NOT NULL,
      destination STRING NOT NULL,
      distance REAL NOT NULL,
      duration STRING NOT NULL, 
      date TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
      value REAL NOT NULL,
      FOREIGN KEY (driver_id) REFERENCES driver (id)
    )`);
  });

  db.close((error) => {
    if (error) {
      console.error("Erro ao fechar o banco de dados:", error);
    } else {
      console.log("Banco de dados fechado com sucesso.");
    }
  });
}
