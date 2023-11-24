import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Matches } from 'class-validator';
import { Regex } from 'src/common/application/regex/regex.constants';
import { ScopeUser } from 'src/common/application/types/types.types';
import { IUserGroup } from 'src/sso/domain/models/user-group.model';

/** Keys To Omit */
type OmitKeys = Pick<IUserGroup, 'id'>;
type IUserGroupOmit = Omit<IUserGroup, keyof OmitKeys>;

export class CreateUserGroupDto implements IUserGroupOmit {
  @ApiProperty({ description: 'name of the user group', example: 'Admin' })
  @IsString()
  name: string;

  @ApiProperty({ description: `Admin's group`, example: `Admin's group` })
  @IsString()
  description: string;

  @ApiProperty({ description: `Hierarchy of user group 0 is the highest hierarchy, 10 the lowest`, example: 0 })
  @IsInt()
  hierarchy: number;

  @ApiProperty({ description: 'scope of user group', example: 'A' })
  @Matches(Regex.AOC, { message: `scope only accepts values: 'A', 'O', 'C'` })
  scope: ScopeUser;
}
