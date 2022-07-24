import { Request, Response } from "express";
import prismaClient from "../../database/prismaClient";

export class LogoutController {
  async handle(request: Request, response: Response) {
    return 0;
  }
}
