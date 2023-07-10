// Dependencies
import { Inject, Injectable } from '@nestjs/common';

// Service
import { GenericService } from 'src/common/domain/service/generic.service';

// Repository
import { RoleRepository } from 'src/sso/infrastructure/repositories/role.repository';

// Entity
import { Role } from '../models/role.model';

// Interface
import { IRoleRepository } from '../irepositories/role.repository.interface';

// DTO
import { CreateRoleDto } from 'src/sso/application/dto/create-role.dto';
import { UpdateRoleDto } from 'src/sso/application/dto/update-role.dto';

@Injectable()
export class RoleService extends GenericService<CreateRoleDto, UpdateRoleDto, Role, IRoleRepository> {
  constructor(@Inject(RoleRepository) public readonly userInfoRepository: IRoleRepository) {
    super(userInfoRepository);
  }
}
