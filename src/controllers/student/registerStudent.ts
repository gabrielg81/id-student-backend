import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class RegisterStudentController {
  async handle(request: Request, response: Response) {
    const {
      codeStudent,
      name,
      id_course,
      id_semester,
      city,
      cpf,
      password,
      rg,
      sex,
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
      dateRevalidate,
      dateRegister,
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
              codeStudent,
              name,
              password,
              cpf,
              rg,
              sex,
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
              dateRevalidate,
              dateRegister,
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
              id: 1,
            },
          },
          semester: {
            connect: {
              id: 8,
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
