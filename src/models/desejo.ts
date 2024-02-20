import { ObjectId } from "mongodb";

export interface Desejo {
  _id: ObjectId | any;
  _usuarioId: string;
  nome: string;
  preco: string;
  comprado: boolean;
}
