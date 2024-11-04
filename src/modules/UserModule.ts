import { User } from "@/models";
import { OrmModule } from "@/modules";
import { RoleService, UserService } from "@/services";
import { UserController } from "@/controllers";

import { DataSource } from "typeorm";
import { Module } from "@nestjs/common";
import { RoleModule } from "./RoleModule";


@Module({
    controllers: [UserController],
    imports: [OrmModule, RoleModule],
    providers: [
        {
            provide: "USER_PROVIDER",
            useClass: UserService
        },
        {
            provide: 'USER_REPOSITORY',
            useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
            inject: ['DATA_SOURCE'],
        },
    ],
    exports: ["USER_PROVIDER"]
})
export class UserModule {}