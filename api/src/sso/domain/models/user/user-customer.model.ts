/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserCustomerEntity } from 'src/sso/infrastructure/entities/user/user-customer.entity';
import { IUser, User } from './user.model';

export interface IUserCustomer extends IUser {}

export class UserCustomer extends UserCustomerEntity {}
