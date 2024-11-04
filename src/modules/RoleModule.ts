import { Role } from "@/models";
import { OrmModule } from "@/modules";
import { RoleService } from "@/services";
import { RoleController } from "@/controllers";

import { DataSource } from "typeorm";
import { Module } from "@nestjs/common";

@Module({
  controllers: [RoleController],
  imports: [OrmModule],
  providers: [
    {
      provide: "ROLE_PROVIDER",
      useClass: RoleService,
    },
    {
      provide: "ROLE_REPOSITORY",
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(Role);
      },
      inject: ["DATA_SOURCE"],
    },
  ],
  exports: ["ROLE_PROVIDER"],
})
export class RoleModule {}
