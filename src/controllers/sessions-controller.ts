import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/configs/auth";
import {sign} from "jsonwebtoken"

class SessionsController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;
    //simulação de um usuário recuperado de um BD
    const fakeUser = {
      id: "1",
      username: "renato",
      password: "123456",
    };

    if (username !== fakeUser.username || password !== fakeUser.password) {
      throw new AppError("Usuário e/ou passoword incorreta!", 401);
    }
    const {secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {
      expiresIn,
      subject: String(fakeUser.id)
    })

    return response.json({token});
  }
}

export { SessionsController };
