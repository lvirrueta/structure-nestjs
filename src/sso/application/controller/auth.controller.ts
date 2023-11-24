// Dependencies
import { Response } from 'express';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

// Services
import { AuthService } from 'src/sso/domain/service/auth.service';

// Model
import { AccessTokenApi } from '../swagger/auth-api';
import { JsonResponse } from 'src/common/application/model/json-response.class';
import { ApiJsonResponse } from 'src/common/application/decorator/api-response.decorator';

// DTO
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';

// Constants
import { Routes } from 'src/common/application/routes/routes.constants';
import { Public } from '../decorators/public.decorator';

@ApiExtraModels(AccessTokenApi)
@ApiTags(Routes.SSOAuthLogin.ApiTags)
@Controller(Routes.SSOAuthLogin.Controller)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** Log In */
  @Public()
  @Post(Routes.SSOAuthLogin.Login)
  @ApiOperation({ summary: 'Login to the application', description: 'return an access token & refresh token' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: AccessTokenApi })
  async logIn(@Res() response: Response, @Body() dto: LoginDto): Promise<JsonResponse<AccessTokenApi>> {
    const data = await this.authService.login(dto);
    const jsonResponse = new JsonResponse<AccessTokenApi>({ data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }

  /** Sign Up */
  @Public()
  @Post(Routes.SSOAuthLogin.SignUp)
  @ApiOperation({ summary: 'Sign up to the application', description: 'creates a customer user' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: AccessTokenApi })
  async signIn(@Res() response: Response, @Body() dto: SignupDto): Promise<JsonResponse<AccessTokenApi>> {
    const data = await this.authService.signup(dto);
    const jsonResponse = new JsonResponse<AccessTokenApi>({ data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }
}
