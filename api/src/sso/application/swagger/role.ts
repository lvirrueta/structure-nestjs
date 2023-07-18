import { ApiProperty } from '@nestjs/swagger';
import { ID, ScopeUser } from 'src/common/application/types/types.types';
import { IRole } from 'src/sso/domain/models/role.model';

export class RoleApi implements IRole {
  @ApiProperty({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  id: ID;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  scope: ScopeUser;

  @ApiProperty()
  hierarchy: number;
}
