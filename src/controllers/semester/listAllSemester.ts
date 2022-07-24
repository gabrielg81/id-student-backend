import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ListSemesterController {
  async handle(request: Request, response: Response) {
    const list = await prismaClient.semesterStudentModels.findMany();
    return response.json(list);
  }
}
