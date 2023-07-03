import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/common/application/types/types.types';
import { IUserInfo } from 'src/sso/domain/models/user-info.model';

export class UserInfoApi implements IUserInfo {
  @ApiProperty()
  id: ID;

  @ApiProperty()
  name: string;

  @ApiProperty()
  paternalName: string;

  @ApiProperty()
  maternalName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  dateBirth: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updateAt: string;
}
