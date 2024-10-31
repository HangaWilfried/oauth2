import configuration from '@/configs'
import { RoleModule, UserModule } from "@/modules";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";


@Module({
  imports: [
    UserModule,
    RoleModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration]
    }),
  ],
})
export class AppModule {}
