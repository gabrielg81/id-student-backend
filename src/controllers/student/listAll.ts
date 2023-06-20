import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class ListStudentController {
  async handle(request: Request, response: Response) {
    await prismaClient.registerStudent
      .findMany({
        select: {
          address: true,
          course: true,
          semester: true,
          students: true,
        },
      })
      .then((list) => {
        return response.json(list).status(200);
      })
      .catch((err) => {
        return response.status(401).json({ message: "error", code: err });
      });
  }
}
