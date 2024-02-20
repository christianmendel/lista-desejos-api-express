import { MongoClient } from "mongodb";
require("dotenv").config();

export default async function runAutoInserts() {
  const client = new MongoClient(process.env.MONGO_URI ?? "");

  try {
    await client.connect();
    console.log("Conectado ao MongoDB");
    const db = client.db("listaDesejo");
    const collectionUser = db.collection("usuario");

    const users = await collectionUser.find().toArray();

    if (!users?.length) {
      const result = await collectionUser.insertMany(dataToInsertUsuario);
      console.log(`${result.insertedCount} documentos inseridos com sucesso!`);
    }
  } catch (error) {
    console.error("Erro ao inserir documentos:", error);
  } finally {
    client.close();
  }
}

const dataToInsertUsuario = [
  {
    email: "admin@gmail.com",
    role: "admin",
    nome: "admin",
    senha: "$2a$08$ZpNUtELiMzPLF.wlHeCij.iPgZAwXR9SlXVT7bDaAVIKum92SHmaS",
  },
];
