// Dependencies
import { Response } from 'express';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';

// Services
import { AuthService } from 'src/sso/domain/service/auth.service';

// Model
import { AccessTokenApi } from '../swagger/auth-api';
import { JsonResponse } from 'src/common/application/model/json-response.class';
import { ApiJsonResponse } from 'src/common/application/decorator/api-response.decorator';

// DTO
import { LoginDto } from '../dto/auth.dto';

// Constants
import { Routes } from 'src/common/application/routes/routes.constants';

@ApiExtraModels(AccessTokenApi)
@ApiTags(Routes.SSOAuthLogin.ApiTags)
@Controller(Routes.SSOAuthLogin.Controller)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Routes.SSOAuthLogin.Login)
  @ApiJsonResponse({ status: HttpStatus.OK, type: AccessTokenApi })
  async create(@Res() response: Response, @Body() dto: LoginDto): Promise<JsonResponse<AccessTokenApi>> {
    const data = await this.authService.login(dto);
    const jsonResponse = new JsonResponse<AccessTokenApi>({ data });
    response.status(HttpStatus.OK).send(jsonResponse);
    return jsonResponse;
  }
}
