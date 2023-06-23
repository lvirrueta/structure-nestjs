import { IUserCustomer, UserCustomer } from '../../models/user/user-customer.model';
import { IUserRepository } from './i-user.repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserCustomerRepository extends IUserRepository<UserCustomer, Partial<IUserCustomer>> {}
