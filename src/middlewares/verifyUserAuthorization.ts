import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

// verificar qual é o papel do usuário se ele tem autorização pra isso.
function verifyUserAuthorization(role: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    //verificar se ele não tem permissão
    if (!request.user || !role.includes(request.user?.role)) {
      throw new AppError("Unauthorize", 401);
    }

    return next();
  };
}

export { verifyUserAuthorization };
