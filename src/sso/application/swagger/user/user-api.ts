import { ApiProperty } from '@nestjs/swagger';
import { ID } from 'src/common/application/types/types.types';
import { IUserInfo } from 'src/sso/domain/models/user-info.model';
import { IUser } from 'src/sso/domain/models/user/user.model';
import { UserInfoApi } from '../user-info';

export class UserApi implements IUser {
  @ApiProperty({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  id: ID;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updateAt: string;

  @ApiProperty()
  hierarchy: number;

  @ApiProperty()
  userInfo: UserInfoApi;

  @ApiProperty({ example: 'c6f3da78-bb09-45c9-8350-d3ea987fb2b6' })
  userInfoId: ID;
}
