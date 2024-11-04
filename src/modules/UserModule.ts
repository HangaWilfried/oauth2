import { User } from "@/models";
import { OrmModule } from "@/modules";
import { UserService } from "@/services";
import { UserController } from "@/controllers";

import { DataSource } from "typeorm";
import { Module } from "@nestjs/common";
import { RoleModule } from "./RoleModule";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [UserController],
  imports: [OrmModule, RoleModule, JwtModule],
  providers: [
    {
      provide: "USER_PROVIDER",
      useClass: UserService,
    },
    {
      provide: "USER_REPOSITORY",
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ["DATA_SOURCE"],
    },
  ],
  exports: ["USER_PROVIDER"],
})
export class UserModule {}
