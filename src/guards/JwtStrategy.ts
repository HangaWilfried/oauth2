import { SECRET } from "@/guards";

import { IAuth } from "@/interfaces";

import { CredentialDto, PayloadDto } from "@/dtos";

import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";

import { ExtractJwt, Strategy } from "passport-jwt";

import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject("AUTH") private authService: IAuth) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET,
    });
  }

  async validate(credential: CredentialDto): Promise<PayloadDto> {
    const payload = await this.authService.validateUser(credential);
    if (payload) return payload;
    else throw new UnauthorizedException();
  }
}
