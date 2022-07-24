import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class RegisterProCareerController {
  async handle(request: Request, response: Response) {
    const { id_student, procareer } = request.body;

    const registerProCareer = await procareer.forEach(async (i: any) => {
      await prismaClient.registerProCareer.create({
        data: {
          procareer: {
            create: {
              dateClosing: i.dateClosing,
              dateInitiated: i.dateInitiated,
              procareer: i.procareer,
            },
          },
          students: {
            connect: {
              id: id_student,
            },
          },
        },
      });
    });

    return response.json(registerProCareer);
  }
}
