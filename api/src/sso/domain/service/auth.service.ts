// Dependencies
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';

// Repository
import { TokenRepository } from 'src/sso/infrastructure/repositories/token.repository';
import { UserRepository } from 'src/sso/infrastructure/repositories/user/user.repository';
import { UserInfoRepository } from 'src/sso/infrastructure/repositories/user-info.repository';
import { UserCustomerRepository } from 'src/sso/infrastructure/repositories/user/user-customer.repository';

// IRepository
import { ITokenRepository } from '../irepositories/token.repository.interface';
import { IUserRepository } from '../irepositories/user/i-user.repository.interface';
import { IUserInfoRepository } from '../irepositories/user-info.repository.interface';
import { IUserCustomerRepository } from '../irepositories/user/i-user-customer.repository.interface';

// Interface
import { IJwtPayload } from '../interface/i-jwt-payload';
import { IAccessToken } from '../interface/i-access-token';

// Types
import { ID } from 'src/common/application/types/types.types';

// DTO
import { LoginDto } from 'src/sso/application/dto/login.dto';
import { SignupDto } from 'src/sso/application/dto/signup.dto';

// Constants
import { ThrowError } from 'src/utils/throwservererror';
import { Errors } from 'src/common/application/errors/errors.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserRepository)
    public readonly userRepository: IUserRepository,
    @Inject(TokenRepository)
    public readonly tokenRepository: ITokenRepository,
    @Inject(UserInfoRepository)
    public readonly userInfoRepository: IUserInfoRepository,
    @Inject(UserCustomerRepository)
    public readonly userCustomerRepository: IUserCustomerRepository,
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

  public async signup(dto: SignupDto): Promise<IAccessToken> {
    const { username, password, ...rest } = dto;
    const userInfoDto = { ...rest };

    const queryRunner = await this.userInfoRepository.createAndStartTransaction();

    try {
      const userInfo = await this.userInfoRepository.createEntity(userInfoDto, { queryRunner });
      const user = await this.userCustomerRepository.createEntity({ hierarchy: 10, password, username, userInfo }, { queryRunner });
      await this.userRepository.commitTransaction(queryRunner);
      return await this.generateJwtToken(user.id);
    } catch (error) {
      await this.userCustomerRepository.rollbackTransaction(queryRunner);
      throw error;
    } finally {
      await this.userCustomerRepository.releaseTransaction(queryRunner);
    }
  }

  private async generateJwtToken(userID: ID): Promise<IAccessToken> {
    const idToken = uuidv4();

    const payload: IJwtPayload = {
      userID,
      jti: idToken,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign({ jti: idToken }, { expiresIn: '90m' });

    await this.tokenRepository.createEntity({ userID, id: idToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}
