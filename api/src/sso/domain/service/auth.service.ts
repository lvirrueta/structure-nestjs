// Dependencies
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { UserRepository } from 'src/sso/infrastructure/repositories/user/user.repository';

// IRepository
import { IUserRepository } from '../irepositories/user/i-user.repository.interface';

// Interface
import { IAccessToken } from '../interface/i-access-token';

// DTO
import { LoginDto } from 'src/sso/application/dto/auth.dto';

// Constants
import { ThrowError } from 'src/utils/throwservererror';
import { Errors } from 'src/common/application/errors/errors.constants';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UserRepository) public readonly userRepository: IUserRepository) {}

  public async login(login: LoginDto): Promise<IAccessToken> {
    const { username, password: passwordLogin } = login;

    const user = await this.userRepository.findByUsername(username);
    const passwordUser = user?.password || '';

    if (bcrypt.compareSync(passwordLogin, passwordUser) && user) {
      return {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };
    }

    ThrowError.httpException(Errors.Auth.InvalidCredentials);
  }
}
