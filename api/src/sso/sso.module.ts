// Depedencies
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Modules
import { CommonModule } from 'src/common/common.module';

// Controllers
import { AuthController } from './application/controller/auth.controller';
import { UserInfoController } from './application/controller/user-info.controller';
import { UserAdminController } from './application/controller/user/user-admin.controller';
import { UserCustomerController } from './application/controller/user/user-customer.controller';
import { UserOperativeController } from './application/controller/user/user-operative.controller';

// Services
import { AuthService } from './domain/service/auth.service';
import { JwtStrategy } from './application/strategies/jwt-strategy';
import { UserInfoService } from './domain/service/user-info.service';
import { UserAdminService } from './domain/service/user/user-admin.service';
import { UserCustomerService } from './domain/service/user/user-customer.service';
import { UserOperativeService } from './domain/service/user/user-operative.service';

// Repositories
import { TokenRepository } from './infrastructure/repositories/token.repository';
import { UserRepository } from './infrastructure/repositories/user/user.repository';
import { UserInfoRepository } from './infrastructure/repositories/user-info.repository';
import { UserAdminRepository } from './infrastructure/repositories/user/user-admin.repository';
import { UserCustomerRepository } from './infrastructure/repositories/user/user-customer.repository';
import { UserOperativeRepository } from './infrastructure/repositories/user/user-operative.repository';

@Module({
  imports: [
    CommonModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('CONFIG_JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          },
        };
      },
    }),
  ],
  controllers: [UserAdminController, UserOperativeController, UserCustomerController, UserInfoController, AuthController],
  providers: [
    // Services
    JwtStrategy,
    AuthService,
    UserInfoService,
    UserAdminService,
    UserCustomerService,
    UserOperativeService,

    // Repositories
    UserRepository,
    TokenRepository,
    UserInfoRepository,
    UserAdminRepository,
    UserCustomerRepository,
    UserOperativeRepository,
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class SSOModule {}
