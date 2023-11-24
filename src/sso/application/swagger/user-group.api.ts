import { ApiProperty } from '@nestjs/swagger';
import { ID, ScopeUser } from 'src/common/application/types/types.types';
import { IUserGroup } from 'src/sso/domain/models/user-group.model';

export class UserGroupApi implements IUserGroup {
  @ApiProperty({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  id: ID;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  hierarchy: number;

  @ApiProperty()
  scope: ScopeUser;
}
