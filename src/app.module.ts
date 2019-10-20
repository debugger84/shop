import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Config} from './config/service/config';
import {ConfigModule} from './config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (config: Config) => (config.defaultDbConfig),
          inject: [Config],
      }),
      UserModule,
      AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
