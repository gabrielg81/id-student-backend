import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ListStudentController {
  async handle(request: Request, response: Response) {
    const list = await prismaClient.studentModels.findMany({
      include: {
        CourseStudentModels: true,
        SemesterStudentModels: true,
      },
    });
    return response.json(list);
  }
}
