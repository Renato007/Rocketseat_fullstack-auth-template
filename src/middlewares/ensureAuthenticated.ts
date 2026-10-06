import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/configs/auth";

interface TokenPayloard{
  role: string
  sub: string
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  //validar se esse token é valido
  verify(token, authConfig.jwt.secret);

  //Adicionar usuário autenticado à requisição
  // subject leva o id so usuário
  const { sub: user_id, role } = verify(token, authConfig.jwt.secret) as TokenPayloard;
  request.user = {
    id: String(user_id),
    role,
  };

  return next();
}

export { ensureAuthenticated };
