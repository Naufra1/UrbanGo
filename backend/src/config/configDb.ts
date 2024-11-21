import sqlite3 from "sqlite3";

type MotoristaType = {
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  value: number;
  km: number;
};

export const db = new sqlite3.Database("./src/config/database.db", (error) => {
  if (error) {
    console.log("Erro ao iniciar banco de dados: ", error.message);
  } else {
    console.log("Banco iniciado com sucesso");
  }
});

const motoristas: MotoristaType[] = [
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

export function InitializeDb(): void {
  db.serialize(() => {
    // Cria a tabela e colocar um usuário
    db.run(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING
    )`);
    db.run(`INSERT INTO user (name) VALUES (?)`, "Gustavo");

    // Cria a tabela e coloca motoristas
    db.run(`CREATE TABLE IF NOT EXISTS motorista (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name STRING,
    description STRING,
    vehicle STRING,
    rating NUMBER,
    comment STRING,
    value NUMBER,
    km NUMBER
    )`);
    motoristas.forEach((motorista) => {
      db.run(
        `INSERT INTO motorista (name,description,vehicle,rating,comment,value,km) VALUES (?,?,?,?,?,?,?)`,
        [
          motorista.name,
          motorista.description,
          motorista.vehicle,
          motorista.rating,
          motorista.comment,
          motorista.value,
          motorista.km,
        ]
      );
    });

    // Cria a tabela
    db.run(`CREATE TABLE IF NOT EXISTS viagem (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    motorista_id INTEGER,
    user_id INTEGER,
    origin STRING NOT NULL,
    destination STRING NOT NULL,
    distance NUMBER,
    duration STRING,
    date DateTime,
    FOREIGN KEY (motorista_id) REFERENCES motorista (id),
    FOREIGN KEY (user_id) REFERENCES user (id)
    )`);
  });
}
