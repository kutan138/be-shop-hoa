import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { UserService } from "../user/user.service";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token"
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      secretOrKey: configService.get("JWT_REFRESH_TOKEN_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.body.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException("Refresh token missing.");
    }

    return this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId
    );
  }
}
