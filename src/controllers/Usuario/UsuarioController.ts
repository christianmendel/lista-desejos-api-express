import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as Yup from "yup";
import { Usuario } from "../../models/usuario";
import {
  criarUsuarioService,
  editarUsuarioService,
  listarUsuariosService,
  obterUsuarioPorEmailService,
  obterUsuarioPorIdService,
} from "../../services/Usuario/UsuarioService";
import { logger } from "../../utils/log/logger";

export async function criarUsuarioController(req: Request, res: Response) {
  try {
    const { email, nome, senha } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      nome: Yup.string().required(),
      senha: Yup.string().required().min(12),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ notifications: "Falha na validação" });
    }

    const cryptPassword = await bcrypt.hash(senha, 8);

    const user: Usuario = {
      email: email.toLocaleLowerCase(),
      nome,
      senha: cryptPassword,
    } as Usuario;

    const usuarioEmail = await obterUsuarioPorEmailService(email);

    if (usuarioEmail) {
      return res
        .status(400)
        .json({ notifications: "Usuário já cadastrado com esse email" });
    }

    const userInserido = await criarUsuarioService(user);

    return res.send(userInserido);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function listarUsuariosController(req: Request, res: Response) {
  try {
    const result: Usuario[] = (await listarUsuariosService()) as Usuario[];

    if (!result?.length) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    const resultMapped = result?.map((usuario) => {
      return {
        _id: usuario._id,
        email: usuario.email,
        nome: usuario.nome,
      };
    });

    return res.status(200).json(resultMapped);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function obterUsuarioController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const usuario: Usuario = (await obterUsuarioPorIdService(
      new ObjectId(id)
    )) as Usuario;

    const resultMapped = {
      _id: usuario._id,
      email: usuario.email,
      nome: usuario.nome,
    };

    return res.status(200).json(resultMapped);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function editarUsuarioController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email, nome } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string().required().min(5),
      nome: Yup.string().required().min(3),
      role: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ notifications: "Falha na validação" });
    }

    const result: Usuario = (await obterUsuarioPorIdService(
      new ObjectId(id)
    )) as Usuario;

    if (!result?._id) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    result.email = email;
    result.nome = nome;

    await editarUsuarioService(new ObjectId(id), result);

    return res
      .status(200)
      .json({ notifications: "Registro salvo com sucesso" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function obterUsuarioLogadoController(
  req: Request,
  res: Response
) {
  try {
    const result: Usuario = (await obterUsuarioPorIdService(
      new ObjectId(req._usuarioId)
    )) as Usuario;

    if (!result?._id) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    const resultMapped = {
      _id: result._id,
      email: result.email,
      nome: result.nome,
    };

    return res.status(200).json(resultMapped);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function editarNomeUsuarioController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    const schema = Yup.object().shape({
      nome: Yup.string().required().min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ notifications: "Falha na validação" });
    }

    const result: Usuario = (await obterUsuarioPorIdService(
      new ObjectId(id)
    )) as Usuario;

    if (!result?._id) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    if (result?._id?.toHexString() !== req._usuarioId) {
      return res.status(400).json({ notifications: "Usuário sem permissão" });
    }

    result.nome = nome;

    await editarUsuarioService(result._id, result);

    return res
      .status(200)
      .json({ notifications: "Registro salvo com sucesso" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}
