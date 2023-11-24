import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ILogin } from 'src/sso/domain/models/auth.model';

export class LoginDto implements ILogin {
  @ApiProperty({ description: 'username of the user', example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'password of user', example: 'admin1234' })
  @IsString()
  password: string;
}
