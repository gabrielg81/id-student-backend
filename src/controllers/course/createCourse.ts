import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class CreateCourse {
  async handle(request: Request, response: Response) {
    const { course } = request.body;

    const createCourse = await prismaClient.courseStudentModels.create({
      data: {
        course,
      },
    });
    return response.json(createCourse);
  }
}
