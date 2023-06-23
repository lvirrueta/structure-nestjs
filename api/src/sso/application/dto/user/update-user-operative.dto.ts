import { ApiProperty } from '@nestjs/swagger';
import { CreateUserOperativeDto } from './create-user-operative.dto';
import { IUserOperative } from 'src/sso/domain/models/user/user-operative.model';
import { IsUUID } from 'class-validator';

/** Keys To Pick */
type PickKeys = Pick<IUserOperative, 'id'>;

export class UpdateUserOperativeDto extends CreateUserOperativeDto implements PickKeys {
  @ApiProperty({ description: 'id of the user', example: '2b415789-3bd6-49b0-b802-9b9fe00e2644' })
  @IsUUID()
  id: string;
}
