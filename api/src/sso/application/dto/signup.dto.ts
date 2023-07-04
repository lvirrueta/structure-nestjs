import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { Regex } from 'src/common/application/regex/regex.constants';
import { ILogin } from 'src/sso/domain/models/auth.model';
import { IUserInfo } from 'src/sso/domain/models/user-info.model';

interface IRegisterUser extends ILogin, Pick<IUserInfo, 'dateBirth' | 'email' | 'maternalName' | 'paternalName' | 'name' | 'phone'> {}

export class SignupDto implements IRegisterUser {
  @ApiProperty({ description: 'name of the user', example: 'Armando' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'paternal name of the user', example: 'Virrueta' })
  @IsString()
  @IsOptional()
  paternalName: string;

  @ApiProperty({ description: 'maternal name of the user', example: 'Guzman' })
  @IsString()
  @IsOptional()
  maternalName: string;

  @ApiProperty({ description: 'email of the user', example: 'luis510vg@gmail.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'phone of the user', example: '+524434405739' })
  @Matches(Regex.E164, { message: `phone needs the code area` })
  phone: string;

  @ApiProperty({ description: 'birth date of the user', example: '1993-10-05' })
  @IsDateString()
  @IsOptional()
  dateBirth: string;

  @ApiProperty({ description: 'username of the user', example: 'admin' })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({ description: 'password of user', example: 'admin1234' })
  @IsString()
  @IsOptional()
  password: string;
}
