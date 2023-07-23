// admin.middleware.ts

import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Roles } from "../enums/roles.enum";
import RequestWithUser from "src/modules/authentication/requestWithUser.interface";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const userRole = req?.user?.roles;

    if (!userRole.includes(Roles.Admin)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền thực hiện hành động này." });
    }

    next();
  }
}
