import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateUserInfoDto } from './create-user-info.dto';
import { IUserInfo } from 'src/sso/domain/models/user-info.model';

/** Keys To Pick */
type PickKeys = Pick<IUserInfo, 'id'>;

export class UpdateUserInfoDto extends CreateUserInfoDto implements PickKeys {
  @ApiProperty({ description: 'id of the user', example: '2b415789-3bd6-49b0-b802-9b9fe00e2644' })
  @IsUUID()
  id: string;
}
