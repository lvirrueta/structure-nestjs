// Imports
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';

// IRepository
import { IUserRepository } from 'src/sso/domain/irepositories/user/i-user.repository.interface';

// Repository
import { UserRepository } from 'src/sso/infrastructure/repositories/user/user.repository';

// Interface
import { IJwtPayload } from 'src/sso/domain/interface/i-jwt-payload';
import { IUserStrategy } from 'src/sso/domain/interface/i-user-strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository) public readonly userRepository: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.CONFIG_JWT_SECRET}`,
    });
  }

  public logger = new Logger(this.constructor.name);

  async validate(payload: IJwtPayload): Promise<IUserStrategy> {
    this.logger.log('validating...');
    const { userID } = payload;

    // TODO validate access token ID
    // accessTokenID = await this.tokenRepository(accessTokenID);
    const user = await this.userRepository.findOneEntity(userID);

    if (!user) {
      this.logger.log('valid token, but user does not exist on db');
      throw new UnauthorizedException();
    }

    const userStrategy: IUserStrategy = {
      id: user.id,
      username: user.password,
    };

    return userStrategy;
  }
}
