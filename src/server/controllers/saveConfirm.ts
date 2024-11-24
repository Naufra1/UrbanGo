import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { ConfirmType } from "../routes/rides.js";
import { path } from "../config/configDb.js";

export async function SaveConfirm(confirmBody: ConfirmType) {
  try {
    const db = await open({
      filename: path,
      driver: sqlite3.Database,
    });

    const data = await db.all(
      `INSERT INTO viagem (driver_id,customer_id,origin,destination,distance,duration,value) VALUES (?,?,?,?,?,?,?)`,
      [
        confirmBody.driver_id,
        confirmBody.customer_id,
        confirmBody.origin,
        confirmBody.destination,
        confirmBody.distance,
        confirmBody.duration,
        confirmBody.value,
      ]
    );

    return true;
  } catch (error) {
    console.error("Erro ao acessar o banco de dados:", error);
    throw new Error("Não foi possível acessar o banco de dados.");
  }
}
