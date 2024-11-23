import { open } from "sqlite";
import sqlite3 from "sqlite3";

const path = "./src/config/database.db";

export async function getHistory(customer_id: string, driver_id: number) {
  try {
    const db = await open({
      filename: path,
      driver: sqlite3.Database,
    });

    const data = await db.all(
      `SELECT viagem.*, viagem.driver_id AS driver_id, name FROM viagem JOIN driver ON viagem.driver_id = driver.id WHERE viagem.customer_id = ? AND (viagem.driver_id = ? OR ? IS NULL) ORDER BY viagem.date DESC`,
      [customer_id, driver_id, driver_id]
    );

    return data;
  } catch (error) {
    console.error("Erro ao acessar o banco de dados:", error);
    throw new Error("Não foi possível acessar o banco de dados.");
  }
}
