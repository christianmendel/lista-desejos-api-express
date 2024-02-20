import { verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { Usuario } from "../models/usuario";
import { obterUsuarioPorIdService } from "../services/Usuario/UsuarioService";
require("dotenv").config();

interface auth {
  secret: string;
  expiresIn: string;
}

const secret = process.env.SECRET || "";
const expiresIn = process.env.EXPIRESIN || "";

export default {
  secret: secret,
  expiresIn: expiresIn,
} as auth;

export async function decode(token: string): Promise<Result> {
  const validation = {
    isValid: false,
    data: {
      _id: "",
    },
  };
  try {
    const decoded = verify(token, secret);
    const { _id } = decoded as TokenPayload;

    const usuario: Usuario = (await obterUsuarioPorIdService(
      new ObjectId(_id)
    )) as Usuario;

    validation.isValid = usuario?._id ? true : false;
    validation.data = {
      _id,
    };
  } catch (err) {
    console.error("Token Inválido");
    return validation;
  }
  return validation;
}

interface TokenPayload {
  _id: string;
}

interface Data {
  _id: string;
}
interface Result {
  isValid: boolean;
  data: Data;
}
