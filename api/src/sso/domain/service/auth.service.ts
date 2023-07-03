// Dependencies
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Repository
import { UserRepository } from 'src/sso/infrastructure/repositories/user/user.repository';

// IRepository
import { IUserRepository } from '../irepositories/user/i-user.repository.interface';

// Interface
import { IJwtPayload } from '../interface/i-jwt-payload';
import { IAccessToken } from '../interface/i-access-token';

// Types
import { ID } from 'src/common/application/types/types.types';

// DTO
import { LoginDto } from 'src/sso/application/dto/auth.dto';

// Constants
import { ThrowError } from 'src/utils/throwservererror';
import { Errors } from 'src/common/application/errors/errors.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    public readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async login(login: LoginDto): Promise<IAccessToken> {
    const { username, password: passwordLogin } = login;

    const user = await this.userRepository.findByUsername(username);
    const passwordUser = user?.password || '';

    if (bcrypt.compareSync(passwordLogin, passwordUser) && user) {
      return await this.generateJwtToken(user.id);
    } else {
      ThrowError.httpException(Errors.Auth.InvalidCredentials);
    }
  }

  private async generateJwtToken(userID: ID): Promise<IAccessToken> {
    const idToken = uuidv4();

    // TODO: save id token
    // await this.tokenRepository({userID: ID, accessTokenID: idToken});

    const payload: IJwtPayload = {
      userID,
      jti: idToken,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign({ jti: idToken }, { expiresIn: '90m' });

    return {
      accessToken,
      refreshToken,
    };
  }
}
