import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ProfileStudentController {
  async handle(request: Request, response: Response) {
    const { id_student } = request.body;
    const profile = await prismaClient.registerStudent.findFirst({
      where: {
        id: id_student,
      },
      select: {
        address: true,
        course: true,
        semester: true,
        students: true,
      },
    });
    return response.json(profile);
  }
}
