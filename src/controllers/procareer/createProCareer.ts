import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class RegisterProCareerController {
  async handle(request: Request, response: Response) {
    const { id_student, procareer } = request.body;

    const registerProCareer = await prismaClient.registerProCareer.create({
      data: {
        procareer: {
          create: {
            procareer,
          },
        },
        students: {
          connect: {
            id: id_student,
          },
        },
      },
    });
    return response.json(registerProCareer);
  }
}
