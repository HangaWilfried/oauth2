import {
  Injectable,
  ExecutionContext
} from "@nestjs/common";

import { Scope } from "@/guards";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import {UserDto} from "@/dtos";


@Injectable()
export class ResourceGuard extends AuthGuard("jwt") {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {
    super()
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredScope = this.reflector.get(Scope, context.getHandler());
    if (requiredScope) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(" ")[1];

      const user = this.jwtService.decode(token) as UserDto; // will cause a problem because it's not a userDto

      const scopes = user.roles.flatMap((role) => role.scope.split(","))

      return scopes.includes(requiredScope)

    } return true;
  }
}
