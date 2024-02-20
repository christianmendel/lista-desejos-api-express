import { ObjectId } from "mongodb";
import { getMongoClient } from "../../apis/mongo-api";
import { Usuario } from "../../models/usuario";
import { logger } from "../../utils/log/logger";

const mongoClient = getMongoClient();

export async function criarUsuarioService(user: Usuario) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("usuario")
      .insertOne(user);
  } catch (error) {
    logger.error(error);
  }
}

export async function obterUsuarioPorEmailService(email: string) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("usuario")
      .findOne({ email: email });
  } catch (error) {
    logger.error(error);
  }
}

export async function obterUsuarioPorIdService(id: ObjectId) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("usuario")
      .findOne({ _id: id });
  } catch (error) {
    logger.error(error);
  }
}

export async function apagarUsuarioService(id: ObjectId) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("usuario")
      .deleteOne({ _id: id });
  } catch (error) {
    logger.error(error);
  }
}

export async function editarUsuarioService(id: ObjectId, usuario: Usuario) {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("usuario")
      .updateOne({ _id: id }, { $set: { ...usuario } });
  } catch (error) {
    logger.error(error);
  }
}

export async function listarUsuariosService() {
  try {
    return await mongoClient
      .db("listaDesejo")
      .collection("usuario")
      .find()
      .toArray();
  } catch (error) {
    logger.error(error);
  }
}
