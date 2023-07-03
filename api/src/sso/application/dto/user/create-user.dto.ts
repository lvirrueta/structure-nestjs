import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { ID } from 'src/common/application/types/types.types';
import { IUser } from 'src/sso/domain/models/user/user.model';

// type ICreateTypePersonnelServiceDTO = Omit<ITypePersonnelServiceDTO, 'idTypePersonnelService'>;

/** Keys To Omit */
type OmitKeys = Pick<IUser, 'id' | 'createdAt' | 'updateAt' | 'userInfo'>;
type IUserOmit = Omit<IUser, keyof OmitKeys>;

export class CreateUserDto implements IUserOmit {
  @ApiProperty({ description: 'username of the user', example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'password of user', example: 'admin1234' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'hierarchy of the user, 0 is the highest hierarchy', example: 0 })
  @IsInt()
  hierarchy: number;

  @ApiPropertyOptional({ description: 'uuid of user info', example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  @IsUUID()
  @IsOptional()
  userInfoId: ID;
}
