import { ChildEntity } from 'typeorm';
import { UserTypeEnum } from 'src/sso/domain/enum/user.enum';
import { IUserOperative, UserOperative } from 'src/sso/domain/models/user/user-operative.model';
import { UserEntity } from './user.entity';

@ChildEntity(UserTypeEnum.OPERATIVE)
export class UserOperativeEntity extends UserEntity implements IUserOperative {}
