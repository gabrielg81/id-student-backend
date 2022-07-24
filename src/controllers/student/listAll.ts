import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ListStudentController {
  async handle(request: Request, response: Response) {
    const list = await prismaClient.registerStudent.findMany({
      select: {
        address: true,
        course: true,
        semester: true,
        students: true,
      },
    });
    return response.json(list);
  }
}
