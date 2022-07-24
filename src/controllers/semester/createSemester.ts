import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class CreateSemester {
  async handle(request: Request, response: Response) {
    const { semester } = request.body;

    const createSemester = await prismaClient.semesterStudentModels.create({
      data: {
        semester,
      },
    });
    return response.json(createSemester);
  }
}
