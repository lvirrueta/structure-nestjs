// Depedencies
import { Module } from '@nestjs/common';

// Modules
import { CommonModule } from 'src/common/common.module';

// Controllers
import { UserAdminController } from './application/controller/user/user-admin.controller';
import { UserCustomerController } from './application/controller/user/user-customer.controller';
import { UserOperativeController } from './application/controller/user/user-operative.controller';

// Services
import { UserAdminService } from './domain/service/user/user-admin.service';
import { UserCustomerService } from './domain/service/user/user-customer.service';
import { UserOperativeService } from './domain/service/user/user-operative.service';

// Repositories
import { UserAdminRepository } from './infrastructure/repositories/user/user-admin.repository';
import { UserCustomerRepository } from './infrastructure/repositories/user/user-customer.repository';
import { UserOperativeRepository } from './infrastructure/repositories/user/user-operative.repository';

@Module({
  imports: [CommonModule],
  controllers: [UserAdminController, UserOperativeController, UserCustomerController],
  providers: [
    // Services
    UserAdminService,
    UserCustomerService,
    UserOperativeService,

    // Repositories
    UserAdminRepository,
    UserCustomerRepository,
    UserOperativeRepository,
  ],
})
export class SSOModule {}
