// Imports
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, Logger } from '@nestjs/common';

// Repository
import { TokenRepository } from 'src/sso/infrastructure/repositories/token.repository';
import { UserRepository } from 'src/sso/infrastructure/repositories/user/user.repository';

// IRepository
import { ITokenRepository } from 'src/sso/domain/irepositories/token.repository.interface';
import { IUserRepository } from 'src/sso/domain/irepositories/user/i-user.repository.interface';

// Interface
import { IJwtPayload } from 'src/sso/domain/interface/i-jwt-payload';
import { IUserStrategy } from 'src/sso/domain/interface/i-user-strategy';

// Constants
import { ThrowError } from 'src/utils/throwservererror';
import { Errors } from 'src/common/application/errors/errors.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository) public readonly userRepository: IUserRepository,
    @Inject(TokenRepository)
    public readonly tokenRepository: ITokenRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.CONFIG_JWT_SECRET}`,
    });
  }

  public logger = new Logger(this.constructor.name);

  async validate(payload: IJwtPayload): Promise<IUserStrategy> {
    this.logger.log('validating...');
    const { userID, jti } = payload;

    const user = await this.userRepository.findOneEntity(userID);
    const token = await this.tokenRepository.findToken(jti);

    if (!user) {
      this.logger.error('valid token, but user does not exists on db');
      ThrowError.httpException(Errors.Auth.UserNotExistsOnDB);
    }

    if (!token) {
      this.logger.error('valid token, but token does not exists on db or it is expired');
      ThrowError.httpException(Errors.Auth.TokenExpired);
    }

    const userStrategy: IUserStrategy = {
      id: user.id,
      username: user.username,
    };

    this.logger.log('validation successful');
    this.logger.log('user strategy ->', userStrategy);
    return userStrategy;
  }
}
