import express from "express";
import {
  criarUsuarioController,
  editarNomeUsuarioController,
  editarUsuarioController,
  listarUsuariosController,
  obterUsuarioController,
  obterUsuarioLogadoController,
} from "../controllers/Usuario/UsuarioController";
import authMiddleware from "../middlewares/auth";

const usuarioRoutes = express.Router();
usuarioRoutes.post("/usuario", criarUsuarioController);

usuarioRoutes.get(
  "/usuario/perfil",
  authMiddleware,
  obterUsuarioLogadoController
);

usuarioRoutes.get("/usuario/:id", authMiddleware, obterUsuarioController);

usuarioRoutes.get("/usuario", authMiddleware, listarUsuariosController);

usuarioRoutes.put("/usuario/:id", authMiddleware, editarUsuarioController);

usuarioRoutes.put(
  "/usuario/alterarNome/:id",
  authMiddleware,
  editarNomeUsuarioController
);

export default usuarioRoutes;
