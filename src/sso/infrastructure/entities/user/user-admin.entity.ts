import { ChildEntity } from 'typeorm';
import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';
import { IUserAdmin, UserAdmin } from 'src/sso/domain/models/user/user-admin.model';
import { UserEntity } from './user.entity';

@ChildEntity(UserTypeEnum.ADMIN)
export class UserAdminEntity extends UserEntity implements IUserAdmin {}
