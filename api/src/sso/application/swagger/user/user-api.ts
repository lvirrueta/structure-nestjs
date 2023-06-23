import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/sso/domain/models/user/user.model';

export class UserApi implements IUser {
  @ApiProperty()
  id: string;

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
}
