import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
  Headers,
  ValidationPipe,
} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import RegisterDto from "./dto/register.dto";
import RequestWithUser from "./requestWithUser.interface";
import { LocalAuthenticationGuard } from "./localAuthentication.guard";
import JwtAuthenticationGuard from "./jwt-authentication.guard";
import { Response } from "express";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import LogInDto from "./dto/logIn.dto";
import { UserService } from "src/modules/user/user.service";
import JwtRefreshGuard from "./jwt-refresh.guard";

@Controller("authentication")
@ApiTags("authentication")
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UserService
  ) {}

  @Post("register")
  async register(@Body(new ValidationPipe()) registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("log-in")
  @ApiBody({ type: LogInDto })
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const { token: accessToken } =
      this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const { token: refreshToken } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    return { ...user, accessToken, refreshToken };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post("log-out")
  async logOut(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Headers() headers: Record<string, string>
  ) {
    await this.usersService.removeRefreshToken(request.user.id);
    headers["Set-Cookie"] = this.authenticationService.getCookieForLogOut();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post("refresh")
  refresh(@Req() request: RequestWithUser) {
    const { token } = this.authenticationService.getCookieWithJwtAccessToken(
      request.user.id
    );

    return { accessToken: token };
  }
}
