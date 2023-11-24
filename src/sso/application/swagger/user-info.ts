import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/common/application/types/types.types';
import { IUserInfo } from 'src/sso/domain/models/user-info.model';

export class UserInfoApi implements IUserInfo {
  @ApiProperty({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
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
