import { toRoleDto } from "@/utils/method";

import { IAuth, IUser } from "@/interfaces";

import { CredentialDto, CreateUserDto, PayloadDto } from "@/dtos";

import * as argon2 from "argon2";

import { JwtService } from "@nestjs/jwt";

import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService implements IAuth {
  constructor(
    @Inject("USER_PROVIDER") private userService: IUser,
    private jwtService: JwtService,
  ) {}

  async validateUser(credential: CredentialDto): Promise<PayloadDto | null> {
    const user = await this.userService.findByEmail(credential.username);
    let isPasswordOk = false;
    if (user)
      isPasswordOk = await argon2.verify(user.password, credential.password);

    if (isPasswordOk && user) {
      return {
        id: user.id,
        roles: user.roles.map(toRoleDto),
      };
    }
    return null;
  }

  async doLogin(credential: CredentialDto): Promise<Record<string, string>> {
    return {
      access_token: this.jwtService.sign({
        password: credential.password,
        username: credential.username
      }),
    };
  }

  doCreateAccount(user: CreateUserDto): Promise<string> {
    return this.userService.createUser(user);
  }
}
