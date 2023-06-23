// Dependencies
import { Response } from 'express';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

// Controllers
import { GenericController } from 'src/common/application/controller/generic.controller';

// Services
import { UserOperativeService } from 'src/sso/domain/service/user/user-operative.service';

// Model
import { UserApi } from '../../swagger/user/user-api';
import { UserOperative } from 'src/sso/domain/models/user/user-operative.model';
import { JsonResponse } from 'src/common/application/model/json-response.class';
import { ApiJsonResponse } from 'src/common/application/decorator/api-response.decorator';

// DTO
import { CreateUserOperativeDto } from '../../dto/user/create-user-operative.dto';
import { UpdateUserOperativeDto } from '../../dto/user/update-user-operative.dto';

// Constants
import { Routes } from 'src/common/application/routes/routes.constants';
import { UUID } from 'src/common/application/types/types.types';

@ApiExtraModels(UserApi)
@ApiTags(Routes.SSOUserOperative.ApiTags)
@Controller(Routes.SSOUserOperative.Controller)
export class UserOperativeController extends GenericController<
  CreateUserOperativeDto,
  UpdateUserOperativeDto,
  UserOperative,
  UserOperativeService
> {
  constructor(private readonly userAdminService: UserOperativeService) {
    super(userAdminService);
  }

  @Get(Routes.SSOUserOperative.Detail)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async detail(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    return await super.serviceDetail(id, { response });
  }

  @Get(Routes.SSOUserOperative.List)
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserApi] })
  async get(@Res() response: Response): Promise<JsonResponse<UserApi[]>> {
    return await super.serviceList({ response });
  }

  @Post(Routes.SSOUserOperative.Create)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async create(@Res() response: Response, @Body() dto: CreateUserOperativeDto): Promise<JsonResponse<UserApi>> {
    return await super.serviceCreate(dto, { response });
  }

  @Put(Routes.SSOUserOperative.Update)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async update(@Res() response: Response, @Body() dto: UpdateUserOperativeDto): Promise<JsonResponse<UserApi>> {
    return await super.serviceUpdate(dto, { response });
  }

  @Delete(Routes.SSOUserOperative.Delete)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async delete(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    return await super.serviceDelete(id, { response });
  }
}
