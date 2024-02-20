import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as Yup from "yup";
import { Desejo } from "../../models/desejo";
import {
  apagarDesejoService,
  criarDesejoService,
  editarDesejoService,
  listarDesejosCompradoService,
  listarDesejosService,
  obterDesejoPorIdService,
} from "../../services/Desejo/DesejoService";
import { logger } from "../../utils/log/logger";

export async function criarDesejoController(req: Request, res: Response) {
  try {
    const { nome, preco } = req.body;

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      preco: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ notifications: "Falha na validação" });
    }

    const desejo: Desejo = {
      nome,
      preco,
      _usuarioId: req._usuarioId,
    } as Desejo;

    const desejoInserido = await criarDesejoService(desejo);

    return res.send(desejoInserido);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function listarDesejosController(req: Request, res: Response) {
  try {
    const result: Desejo[] = (await listarDesejosService(
      req._usuarioId
    )) as Desejo[];

    if (!result?.length) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function listarDesejosCompradoController(
  req: Request,
  res: Response
) {
  try {
    const result: Desejo[] = (await listarDesejosCompradoService(
      req._usuarioId
    )) as Desejo[];

    if (!result?.length) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function obterDesejoController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const result: Desejo = (await obterDesejoPorIdService(
      new ObjectId(id)
    )) as Desejo;

    if (!result?._id) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    return res.status(200).json(result);
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function editarDesejoController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;

    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      preco: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ notifications: "Falha na validação" });
    }

    const result: Desejo = (await obterDesejoPorIdService(
      new ObjectId(id)
    )) as Desejo;

    if (!result?._id) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    if (result._usuarioId !== req._usuarioId) {
      return res.status(400).json({ notifications: "Usuário sem permissão" });
    }

    result.nome = nome;
    result.preco = preco;

    await editarDesejoService(new ObjectId(id), result);

    return res
      .status(200)
      .json({ notifications: "Registro salvo com sucesso" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function editarStatusCompradoDesejoController(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    const { comprado } = req.body;

    const schema = Yup.object().shape({
      comprado: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ notifications: "Falha na validação" });
    }

    const result: Desejo = (await obterDesejoPorIdService(
      new ObjectId(id)
    )) as Desejo;

    if (!result?._id) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    if (result._usuarioId !== req._usuarioId) {
      return res.status(400).json({ notifications: "Usuário sem permissão" });
    }

    result.comprado = comprado;

    await editarDesejoService(new ObjectId(id), result);

    return res
      .status(200)
      .json({ notifications: "Registro salvo com sucesso" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}

export async function apagarDesejoController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const result: Desejo = (await obterDesejoPorIdService(
      new ObjectId(id)
    )) as Desejo;

    if (!result?._id) {
      return res
        .status(400)
        .json({ notifications: "Nenhum registro encontrado" });
    }

    if (result._usuarioId !== req._usuarioId) {
      return res.status(400).json({ notifications: "Usuário sem permissão" });
    }

    await apagarDesejoService(new ObjectId(id));

    return res
      .status(200)
      .json({ notifications: "Registro apagado com sucesso" });
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ notifications: "Erro Interno" });
  }
}
