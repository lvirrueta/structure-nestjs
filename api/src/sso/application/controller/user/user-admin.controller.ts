// Dependencies
import { Response } from 'express';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

// Controllers
import { GenericController } from 'src/common/application/controller/generic.controller';

// Services
import { UserAdminService } from 'src/sso/domain/service/user/user-admin.service';

// Model
import { UserApi } from '../../swagger/user/user-api';
import { UserAdmin } from 'src/sso/domain/models/user/user-admin.model';
import { JsonResponse } from 'src/common/application/model/json-response.class';
import { ApiJsonResponse } from 'src/common/application/decorator/api-response.decorator';

// DTO
import { CreateUserAdminDto } from '../../dto/user/create-user-admin.dto';
import { UpdateUserAdminDto } from '../../dto/user/update-user-admin.dto';

// Constants
import { Routes } from 'src/common/application/routes/routes.constants';
import { UUID } from 'src/common/application/types/types.types';

@ApiExtraModels(UserApi)
@ApiTags(Routes.SSOUserAdmin.ApiTags)
@Controller(Routes.SSOUserAdmin.Controller)
export class UserAdminController extends GenericController<CreateUserAdminDto, UpdateUserAdminDto, UserAdmin, UserAdminService> {
  constructor(private readonly userAdminService: UserAdminService) {
    super(userAdminService);
  }

  @Get(Routes.SSOUserAdmin.Detail)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async detail(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    return await super.serviceDetail(id, { response });
  }

  @Get(Routes.SSOUserAdmin.List)
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserApi] })
  async get(@Res() response: Response): Promise<JsonResponse<UserApi[]>> {
    return await super.serviceList({ response });
  }

  @Post(Routes.SSOUserAdmin.Create)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async create(@Res() response: Response, @Body() dto: CreateUserAdminDto): Promise<JsonResponse<UserApi>> {
    return await super.serviceCreate(dto, { response });
  }

  @Put(Routes.SSOUserAdmin.Update)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async update(@Res() response: Response, @Body() dto: UpdateUserAdminDto): Promise<JsonResponse<UserApi>> {
    return await super.serviceUpdate(dto, { response });
  }

  @Delete(Routes.SSOUserAdmin.Delete)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async delete(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    return await super.serviceDelete(id, { response });
  }
}
