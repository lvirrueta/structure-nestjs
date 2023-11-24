import { ApiProperty } from '@nestjs/swagger';
import { CreateUserAdminDto } from './create-user-admin.dto';
import { IUserAdmin } from 'src/sso/domain/models/user/user-admin.model';
import { IsUUID } from 'class-validator';

/** Keys To Pick */
type PickKeys = Pick<IUserAdmin, 'id'>;

export class UpdateUserAdminDto extends CreateUserAdminDto implements PickKeys {
  @ApiProperty({ description: 'id of the user', example: '2b415789-3bd6-49b0-b802-9b9fe00e2644' })
  @IsUUID()
  id: string;
}
