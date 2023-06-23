import { IUserAdmin, UserAdmin } from '../../models/user/user-admin.model';
import { IUserRepository } from './i-user.repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserAdminRepository extends IUserRepository<UserAdmin, Partial<IUserAdmin>> {
  testAdmin(): IUserAdmin;
}
