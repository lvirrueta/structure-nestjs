import { Module } from '@nestjs/common';
import { ConfigAppModule } from './config/config.module';
import { SSOModule } from './sso/sso.module';

@Module({
  imports: [SSOModule, ConfigAppModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
