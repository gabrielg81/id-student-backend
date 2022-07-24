import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ListProCareerController {
  async handle(request: Request, response: Response) {
    const { id_student } = request.body;

    const list = await prismaClient.registerProCareer.findMany({
      where: {
        id_student,
      },
      select: {
        procareer: true,
        students: true,
      },
    });
    return response.json(list);
  }
}
