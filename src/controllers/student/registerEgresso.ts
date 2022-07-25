import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class EgressoController {
  async handle(request: Request, response: Response) {
    const {
      name,
      id_course,
      city,
      cpf,
      password,
      rg,
      birthDate,
      linkedin,
      photo,
      lattes,
      pronoun,
      contact,
      facebook,
      instagram,
      email,
      yearFinish,
      country,
      state,
    } = request.body;

    const verify = await prismaClient.studentModels.findFirst({
      where: {
        cpf,
      },
    });
    if (!verify) {
      const register = await prismaClient.registerStudent.create({
        data: {
          students: {
            create: {
              name,
              password,
              cpf,
              rg,
              birthDate,
              linkedin,
              photo,
              lattes,
              pronoun,
              contact,
              facebook,
              instagram,
              email,
              yearFinish,
            },
          },
          address: {
            create: {
              city,
              country,
              state,
            },
          },
          course: {
            connect: {
              id: id_course,
            },
          },
        },
      });
      return response
        .setHeader(
          "Access-Control-Allow-Headers",
          "X-Requested-With, content-type"
        )
        .json(register);
    } else {
      return response.json({
        message: `CPF ${cpf} já tem cadastro no sistema.`,
      });
    }
  }
}
