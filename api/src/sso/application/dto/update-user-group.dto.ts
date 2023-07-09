import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IUserGroup } from 'src/sso/domain/models/user-group.model';
import { CreateUserGroupDto } from './create-user-group.dto';

/** Keys To Pick */
type PickKeys = Pick<IUserGroup, 'id'>;

export class UpdateUserGroupDto extends CreateUserGroupDto implements PickKeys {
  @ApiProperty({ description: 'id of the user', example: '2b415789-3bd6-49b0-b802-9b9fe00e2644' })
  @IsUUID()
  id: string;
}
