import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IRole } from 'src/sso/domain/models/role.model';
import { CreateRoleDto } from './create-role.dto';

/** Keys To Pick */
type PickKeys = Pick<IRole, 'id'>;

export class UpdateRoleDto extends CreateRoleDto implements PickKeys {
  @ApiProperty({ description: 'id of the role', example: '2b415789-3bd6-49b0-b802-9b9fe00e2644' })
  @IsUUID()
  id: string;
}
