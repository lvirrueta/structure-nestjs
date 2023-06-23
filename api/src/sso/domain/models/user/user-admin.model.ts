/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserAdminEntity } from 'src/sso/infrastructure/entities/user/user-admin.entity';
import { IUser } from './user.model';

export interface IUserAdmin extends IUser {}

export class UserAdmin extends UserAdminEntity {}
