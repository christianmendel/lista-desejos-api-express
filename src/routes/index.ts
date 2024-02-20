import { Router } from "express";
import desejoRoutes from "./DesejoRoutes";
import sessaoRoutes from "./SessaoRoutes";
import usuarioRoutes from "./UsuarioRoutes";

const routes = Router();

routes.use(sessaoRoutes);
routes.use(usuarioRoutes);
routes.use(desejoRoutes);

export default routes;
