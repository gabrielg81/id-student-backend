import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class CreateSemester {
  async handle(request: Request, response: Response) {
    const { value } = request.body;

    const createSemester = await prismaClient.semesterStudentModels.create({
      data: {
        value,
      },
    });
    return response.json(createSemester);
  }
}
