import { Module } from '@nestjs/common';
import { ConfigAppModule } from './config/config.module';
import { SSOModule } from './sso/sso.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/application/exception/http-exception.filter';
import { JwtAuthGuard } from './sso/application/guards/jwt.auth.guard';

@Module({
  imports: [SSOModule, ConfigAppModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
