import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ListCourseController {
  async handle(request: Request, response: Response) {
    const list = await prismaClient.courseStudentModels.findMany();
    return response.json(list);
  }
}
