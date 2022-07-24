import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ListSchoolHistoryController {
  async handle(request: Request, response: Response) {
    const { id_student } = request.body;

    const list = await prismaClient.registerSchoolHistory.findMany({
      where: {
        id_student,
      },
      select: {
        students: true,
        schoolhistory: true,
      },
    });
    return response.json(list);
  }
}
