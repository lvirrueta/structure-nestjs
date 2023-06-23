import { ChildEntity } from 'typeorm';
import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';
import { IUserCustomer, UserCustomer } from 'src/sso/domain/models/user/user-customer.model';
import { UserEntity } from './user.entity';

@ChildEntity(UserTypeEnum.CUSTOMER)
export class UserCustomerEntity extends UserEntity implements IUserCustomer {}
