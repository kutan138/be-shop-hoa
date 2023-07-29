import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import DatabaseLogger from "src/database/logs/databaseLogger";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        logger: new DatabaseLogger(),
        host: configService.get("POSTGRES_ELEPHANT_HOST"),
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_ELEPHANT_DB"),
        password: configService.get("POSTGRES_ELEPHANT_PASSWORD"),
        database: configService.get("POSTGRES_ELEPHANT_DB"),
        entities: [__dirname + "/../**/*.entity.js"],
        migrations: [__dirname + "/../migrations/*{.js,.ts}"],
        cli: {
          migrationsDirs: __dirname + "/../migrations",
        },
        extra: {
          charset: "utf8mb4_unicode_ci",
        },
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
