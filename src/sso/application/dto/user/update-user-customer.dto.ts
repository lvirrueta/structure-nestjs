import { ApiProperty } from '@nestjs/swagger';
import { CreateUserCustomerDto } from './create-user-customer.dto';
import { IUserCustomer } from 'src/sso/domain/models/user/user-customer.model';
import { IsUUID } from 'class-validator';

/** Keys To Pick */
type PickKeys = Pick<IUserCustomer, 'id'>;

export class UpdateUserCustomerDto extends CreateUserCustomerDto implements PickKeys {
  @ApiProperty({ description: 'id of the user', example: '2b415789-3bd6-49b0-b802-9b9fe00e2644' })
  @IsUUID()
  id: string;
}
