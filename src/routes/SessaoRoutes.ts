import express from "express";
import { sessionLoginController } from "../controllers/Sessao/SessaoController";

const sessaoRoutes = express.Router();

sessaoRoutes.post("/session/login", sessionLoginController);

export default sessaoRoutes;
