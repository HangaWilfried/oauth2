import { AuthService } from "@/services";
import { SECRET, JwtStrategy } from "@/guards";
import { AuthController } from "@/controllers";

import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "./UserModule";

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: "10800s" },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: "AUTH",
      useClass: AuthService,
    },
  ],
  exports: ["AUTH"],
})
export class AuthModule {}
