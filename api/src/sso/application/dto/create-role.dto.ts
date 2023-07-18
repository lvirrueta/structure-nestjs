import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Matches } from 'class-validator';
import { Regex } from 'src/common/application/regex/regex.constants';
import { ScopeUser } from 'src/common/application/types/types.types';
import { IRole } from 'src/sso/domain/models/role.model';

/** Keys To Omit */
type OmitKeys = Pick<IRole, 'id'>;
type IRoleOmit = Omit<IRole, keyof OmitKeys>;

export class CreateRoleDto implements IRoleOmit {
  @ApiProperty({ description: 'name of the role', example: 'Delete User' })
  @IsString()
  name: string;

  @ApiProperty({ description: `description of role`, example: `delete users` })
  @IsString()
  description: string;

  @ApiProperty({ description: `Hierarchy of role 0 is the highest hierarchy, 10 the lowest`, example: 0 })
  @IsInt()
  hierarchy: number;

  @ApiProperty({ description: 'scope of role', example: 'A' })
  @Matches(Regex.AOC, { message: `scope only accepts values: 'A', 'O', 'C'` })
  scope: ScopeUser;
}
