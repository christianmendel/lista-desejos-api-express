import express from "express";
import {
  apagarDesejoController,
  criarDesejoController,
  editarDesejoController,
  editarStatusCompradoDesejoController,
  listarDesejosCompradoController,
  listarDesejosController,
  obterDesejoController,
} from "../controllers/Desejo/DesejoController";
import authMiddleware from "../middlewares/auth";

const desejoRoutes = express.Router();
desejoRoutes.get(
  "/desejo/comprado",
  authMiddleware,
  listarDesejosCompradoController
);

desejoRoutes.post("/desejo", authMiddleware, criarDesejoController);

desejoRoutes.get("/desejo/:id", authMiddleware, obterDesejoController);

desejoRoutes.get("/desejo", authMiddleware, listarDesejosController);

desejoRoutes.put("/desejo/:id", authMiddleware, editarDesejoController);

desejoRoutes.put(
  "/desejo/status/:id",
  authMiddleware,
  editarStatusCompradoDesejoController
);

desejoRoutes.delete("/desejo/:id", authMiddleware, apagarDesejoController);

export default desejoRoutes;
