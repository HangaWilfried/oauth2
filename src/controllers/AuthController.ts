import { IAuth } from "@/interfaces";

import { CreateUserDto, CredentialDto } from "@/dtos";

import { Body, Controller, Inject, Post, Request } from "@nestjs/common";


@Controller("auth")
export class AuthController {
    constructor(@Inject("AUTH") private authservice: IAuth) {}

    @Post()
    login(@Body() credential: CredentialDto) {
        return this.authservice.doLogin(credential)
    }

    @Post()
    createAccount(@Body() user: CreateUserDto) {
        return this.authservice.doCreateAccount(user)
    }
}