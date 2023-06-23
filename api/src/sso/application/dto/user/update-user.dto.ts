import { IUser } from 'src/sso/domain/models/user/user.model';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

/** Keys To Pick */
type PickKeys = Pick<IUser, 'id'>;

export class UpdateUserDto extends CreateUserDto implements PickKeys {
  @ApiProperty({ description: 'id of the user', example: '2b415789-3bd6-49b0-b802-9b9fe00e2644' })
  @IsUUID()
  id: string;
}
