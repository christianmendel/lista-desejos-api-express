import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import * as Yup from "yup";
import auth from "../../config/auth";
import { Login } from "../../models/sessao";
import { TokenSession } from "../../models/token";
import { Usuario } from "../../models/usuario";
import { obterUsuarioPorEmailService } from "../../services/Usuario/UsuarioService";
import { logger } from "../../utils/log/logger";

export async function checkPassword(password: string, password_hash: string) {
  return bcrypt.compare(password, password_hash);
}

export async function sessionLoginController(req: Request, res: Response) {
  try {
    const { email, senha }: Login = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().required(),
      senha: Yup.string().required(),
    });

    const result: Usuario = (await obterUsuarioPorEmailService(
      email.toLocaleLowerCase()
    )) as Usuario;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ notifications: "Falha na validação" });
    }

    if (!result?._id) {
      return res
        .status(400)
        .json({ notifications: "Usuário ou senha incorreta" });
    }

    if (!(await checkPassword(senha, result.senha))) {
      return res
        .status(400)
        .json({ notifications: "Usuário ou senha incorreta" });
    }

    const _id = result._id.toHexString();

    const token: TokenSession = {
      user: {
        email: email.toLocaleLowerCase(),
      },
      token: Jwt.sign({ _id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    };

    return res.status(200).json(token);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}
