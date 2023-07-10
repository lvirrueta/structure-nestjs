import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';
import { IRole } from 'src/sso/domain/models/role.model';
import { getOptionsFromEnum } from 'src/utils/getOptionsFromEnum';

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

  @ApiProperty({ description: 'scope of role', example: UserTypeEnum.ADMIN, enum: { UserTypeEnum } })
  @IsEnum(UserTypeEnum, { message: `valid options for scope: ${getOptionsFromEnum(UserTypeEnum)}` })
  scope: UserTypeEnum;
}
