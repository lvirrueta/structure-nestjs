// Depedencies
import { Module } from '@nestjs/common';

// Modules
import { CommonModule } from 'src/common/common.module';

// Controllers
import { AuthController } from './application/controller/auth.controller';
import { UserAdminController } from './application/controller/user/user-admin.controller';
import { UserCustomerController } from './application/controller/user/user-customer.controller';
import { UserOperativeController } from './application/controller/user/user-operative.controller';

// Services
import { AuthService } from './domain/service/auth.service';
import { UserAdminService } from './domain/service/user/user-admin.service';
import { UserCustomerService } from './domain/service/user/user-customer.service';
import { UserOperativeService } from './domain/service/user/user-operative.service';

// Repositories
import { UserRepository } from './infrastructure/repositories/user/user.repository';
import { UserAdminRepository } from './infrastructure/repositories/user/user-admin.repository';
import { UserCustomerRepository } from './infrastructure/repositories/user/user-customer.repository';
import { UserOperativeRepository } from './infrastructure/repositories/user/user-operative.repository';

@Module({
  imports: [CommonModule],
  controllers: [UserAdminController, UserOperativeController, UserCustomerController, AuthController],
  providers: [
    // Services
    AuthService,
    UserAdminService,
    UserCustomerService,
    UserOperativeService,

    // Repositories
    UserRepository,
    UserAdminRepository,
    UserCustomerRepository,
    UserOperativeRepository,
  ],
})
export class SSOModule {}
