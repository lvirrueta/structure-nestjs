import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsString, Matches } from 'class-validator';
import { Regex } from 'src/common/application/regex/regex.constants';
import { IUserInfo } from 'src/sso/domain/models/user-info.model';

// type ICreateTypePersonnelServiceDTO = Omit<ITypePersonnelServiceDTO, 'idTypePersonnelService'>;

/** Keys To Omit */
type OmitKeys = Pick<IUserInfo, 'id' | 'createdAt' | 'updateAt'>;
type IUserInfoOmit = Omit<IUserInfo, keyof OmitKeys>;

export class CreateUserInfoDto implements IUserInfoOmit {
  @ApiProperty({ description: 'name of the user', example: 'Armando' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'paternal name of the user', example: 'Virrueta' })
  @IsString()
  paternalName: string;

  @ApiProperty({ description: 'maternal name of the user', example: 'Guzman' })
  @IsString()
  maternalName: string;

  @ApiProperty({ description: 'email of the user', example: 'luis510vg@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'birth date of the user', example: '1993-10-05' })
  @IsDateString()
  dateBirth: string;

  @ApiProperty({ description: 'email of the user', example: '+524434405739' })
  @Matches(Regex.E164, { message: `phone needs the code area` })
  phone: string;
}
