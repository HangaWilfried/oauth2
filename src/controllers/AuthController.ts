import { IAuth } from "@/interfaces";

import { CreateUserDto, CredentialDto } from "@/dtos";

import { Body, Controller, Inject, Post } from "@nestjs/common";


@Controller("auth")
export class AuthController {
  constructor(@Inject("AUTH") private authService: IAuth) {}

  @Post("login")
  login(@Body() credential: CredentialDto) {
    return this.authService.doLogin(credential);
  }

  @Post("register")
  createAccount(@Body() user: CreateUserDto) {
    return this.authService.doCreateAccount(user);
  }
}
