import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ListProCareerController {
  async handle(request: Request, response: Response) {
    const idStudent = request.params;

    const list = await prismaClient.professionalCareer.findMany({
      where: {
        id: idStudent,
      },
    });
    return response.json(list);
  }
}
