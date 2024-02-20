import { ObjectId } from "mongodb";
import { getMongoClient } from "../../apis/mongo-api";
import { Desejo } from "../../models/desejo";
import { logger } from "../../utils/log/logger";

const mongoClient = getMongoClient();

export async function criarDesejoService(desejo: Desejo) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("desejo")
      .insertOne(desejo);
  } catch (error) {
    logger.error(error);
  }
}

export async function obterDesejoPorIdService(id: ObjectId) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("desejo")
      .findOne({ _id: id });
  } catch (error) {
    logger.error(error);
  }
}

export async function apagarDesejoService(id: ObjectId) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("desejo")
      .deleteOne({ _id: id });
  } catch (error) {
    logger.error(error);
  }
}

export async function editarDesejoService(id: ObjectId, desejo: Desejo) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("desejo")
      .updateOne({ _id: id }, { $set: { ...desejo } });
  } catch (error) {
    logger.error(error);
  }
}

export async function listarDesejosService(usuarioId: string) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("desejo")
      .find({ _usuarioId: usuarioId })
      .toArray();
  } catch (error) {
    logger.error(error);
  }
}

export async function listarDesejosCompradoService(usuarioId: string) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("desejo")
      .find({ _usuarioId: usuarioId, comprado: true })
      .toArray();
  } catch (error) {
    logger.error(error);
  }
}
