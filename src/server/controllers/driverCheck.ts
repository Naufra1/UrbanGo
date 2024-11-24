import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { path } from "../config/configDb.js";

export async function DriverCheck(driver_id: number) {
  try {
    const db = await open({
      filename: path,
      driver: sqlite3.Database,
    });

    const data = await db.all(`SELECT id, name FROM driver WHERE id = ?`, [
      driver_id,
    ]);

    if (!data) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Erro ao acessar o banco de dados:", error);
    throw new Error("Não foi possível acessar o banco de dados.");
  }
}
