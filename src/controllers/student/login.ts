import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prismaClient from "../../database/prismaClient";
import generateAccessToken from "../../utils/generateToken";

export class LoginController {
  async handle(request: Request, response: Response) {
    const { login, password } = request.body;

    const loginUser = await prismaClient.studentModels.findFirst({
      where: { cpf: login },
    });
    if (!loginUser) {
      response
        .status(404)
        .setHeader("Content-Type", "application/json")
        .json({
          message: `CPF ${login} não está cadastrado em nossa base de dados.`,
        });
    } else {
      if (await bcrypt.compare(password, `${loginUser.password}`)) {
        const token = generateAccessToken({ cpf: login });
        response.json({ accessToken: token });
      } else {
        response
          .status(404)
          .setHeader("Content-Type", "application/json")
          .json({ message: "Senha incorreta!" });
      }
    }

    return response.json(LoginController);
  }
}
