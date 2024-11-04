import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";

import { Role, User } from "@/models"


export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: configService.get<string>("db.sqlite.database")!,
        entities: [User, Role],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];


@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class OrmModule {}
