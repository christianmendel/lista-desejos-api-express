import { Usuario } from "../../models/usuario";

declare global {
  namespace Express {
    interface Request {
      _usuarioId: any;
      usuario: Usuario;
    }
  }
}
