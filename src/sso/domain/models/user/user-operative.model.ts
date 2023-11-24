/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserOperativeEntity } from 'src/sso/infrastructure/entities/user/user-operative.entity';
import { IUser, User } from './user.model';

export interface IUserOperative extends IUser {}

export class UserOperative extends UserOperativeEntity {}
