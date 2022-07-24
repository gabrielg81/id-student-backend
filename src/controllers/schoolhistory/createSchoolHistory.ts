import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class RegisterSchoolHistoryController {
  async handle(request: Request, response: Response) {
    const { id_student, history } = request.body;

    const registerSchoolHistory =
      await prismaClient.registerSchoolHistory.create({
        data: {
          schoolhistory: {
            create: {
              history,
            },
          },
          students: {
            connect: {
              id: id_student,
            },
          },
        },
      });
    return response.json(registerSchoolHistory);
  }
}
