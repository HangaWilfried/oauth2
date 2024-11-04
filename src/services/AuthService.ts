import { toRoleDto } from "@/utils/method";

import { IAuth, IUser } from "@/interfaces";

import { 
    CredentialDto, 
    CreateUserDto, 
    PayloadDto, 
    UserDto 
} from "@/dtos";

import * as argon2 from "argon2"

import { JwtService } from "@nestjs/jwt";

import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class AuthService implements IAuth {
    constructor(
        @Inject("USER_PROVIDER") private userservice: IUser,
        private jwtservice: JwtService
    ) {}

    async validateUser(credential: CredentialDto): Promise<PayloadDto | null> {
        const user = await this.userservice.findByEmail(credential.username);
        let isPasswordOk = false;
        if (user) isPasswordOk = await argon2.verify(user.password, credential.password);
        
        if (isPasswordOk && user) {
            return {
                id: user.id,
                roles: user.roles.map(toRoleDto)
            }
        } return null
    }
    
    async doLogin(credential: CredentialDto): Promise<Record<string, string>> {
       return {
        access_token: this.jwtservice.sign(credential)
       } 
    }

    async doCreateAccount(user: CreateUserDto): Promise<void> {
        await this.userservice.createUser(user)
    }
}