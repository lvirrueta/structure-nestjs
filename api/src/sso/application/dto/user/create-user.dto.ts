import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { IUser } from 'src/sso/domain/models/user/user.model';

// type ICreateTypePersonnelServiceDTO = Omit<ITypePersonnelServiceDTO, 'idTypePersonnelService'>;

/** Keys To Omit */
type OmitKeys = Pick<IUser, 'id' | 'createdAt' | 'updateAt'>;
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
}
