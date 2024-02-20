import { Request, Response } from "express";
import { decode } from "../config/auth";

export default async (req: Request, res: Response, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ notifications: "Sem Token" });
    }

    const decoded = await decode(authHeader);

    if (await decoded.isValid) {
      req._usuarioId = decoded.data._id;

      return next();
    }

    return res.status(401).json({ notifications: "Token Inválido" });
  } catch (err) {
    return res.status(500).json({ notifications: "Erro Interno" });
  }
};
