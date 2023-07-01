import { Module } from '@nestjs/common';
import { ConfigAppModule } from './config/config.module';
import { SSOModule } from './sso/sso.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/application/exception/http-exception.filter';

@Module({
  imports: [SSOModule, ConfigAppModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
