import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class CreateCourse {
  async handle(request: Request, response: Response) {
    const { value } = request.body;

    const createCourse = await prismaClient.courseStudentModels.create({
      data: {
        value,
      },
    });
    return response.json(createCourse);
  }
}
