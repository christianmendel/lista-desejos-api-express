import { ObjectId } from "mongodb";

export interface Usuario {
  _id: ObjectId | any;
  email: string;
  nome: string;
  senha: string;
}
