import { Request, Response } from "express";

export class RevalidateStudentController {
  async handle(request: Request, response: Response) {
    return response.status(404).json("Revalidação indisponível");
  }
}
