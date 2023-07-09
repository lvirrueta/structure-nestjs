import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString } from 'class-validator';
import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';
import { IUserGroup } from 'src/sso/domain/models/user-group.model';
import { getOptionsFromEnum } from 'src/utils/getOptionsFromEnum';

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

  @ApiProperty({ description: 'scope of user group', example: UserTypeEnum.ADMIN, enum: { UserTypeEnum } })
  @IsEnum(UserTypeEnum, { message: `valid options for scope: ${getOptionsFromEnum(UserTypeEnum)}` })
  scope: UserTypeEnum;
}
