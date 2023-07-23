// admin.middleware.ts

import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import RequestWithUser from "src/modules/authentication/requestWithUser.interface";
import { UserRole } from "src/modules/user/user.entity";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const userRole = req?.user?.roles;

    if (!userRole.includes(UserRole.Admin)) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền thực hiện hành động này." });
    }

    next();
  }
}
