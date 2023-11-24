// Dependencies
import { Response } from 'express';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

// Controllers
import { GenericController } from 'src/common/application/controller/generic.controller';

// Services
import { UserInfoService } from 'src/sso/domain/service/user-info.service';

// Model
import { UserInfoApi } from '../swagger/user-info';
import { UserInfo } from 'src/sso/domain/models/user-info.model';
import { JsonResponse } from 'src/common/application/model/json-response.class';
import { ApiJsonResponse } from 'src/common/application/decorator/api-response.decorator';

// DTO
import { CreateUserInfoDto } from '../dto/create-user-info.dto';
import { UpdateUserInfoDto } from '../dto/update-user-info.dto';

// Constants
import { Routes } from 'src/common/application/routes/routes.constants';
import { UUID } from 'src/common/application/types/types.types';

@ApiExtraModels(UserInfoApi)
@ApiTags(Routes.SSOInfo.ApiTags)
@Controller(Routes.SSOInfo.Controller)
export class UserInfoController extends GenericController<CreateUserInfoDto, UpdateUserInfoDto, UserInfo, UserInfoService> {
  constructor(private readonly userInfoService: UserInfoService) {
    super(userInfoService);
  }

  @Get(Routes.SSOInfo.Detail)
  @ApiOperation({ summary: 'detail of info of one user', description: 'obtain all the info of a user by id' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserInfoApi })
  async detail(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserInfoApi>> {
    return await super.serviceDetail(id, { response });
  }

  @Get(Routes.SSOInfo.List)
  @ApiOperation({ summary: `list all user's info`, description: `list all user's info` })
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserInfoApi] })
  async get(@Res() response: Response): Promise<JsonResponse<UserInfoApi[]>> {
    return await super.serviceList({ response });
  }

  @Post(Routes.SSOInfo.Create)
  @ApiOperation({ summary: 'create user info', description: 'create user info' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserInfoApi })
  async create(@Res() response: Response, @Body() dto: CreateUserInfoDto): Promise<JsonResponse<UserInfoApi>> {
    return await super.serviceCreate(dto, { response });
  }

  @Put(Routes.SSOInfo.Update)
  @ApiOperation({ summary: 'update user info by id', description: 'update user info by id' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserInfoApi })
  async update(@Res() response: Response, @Body() dto: UpdateUserInfoDto): Promise<JsonResponse<UserInfoApi>> {
    return await super.serviceUpdate(dto, { response });
  }

  @Delete(Routes.SSOInfo.Delete)
  @ApiOperation({ summary: 'delete user info', description: 'delete user info' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserInfoApi })
  async delete(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserInfoApi>> {
    return await super.serviceDelete(id, { response });
  }
}
