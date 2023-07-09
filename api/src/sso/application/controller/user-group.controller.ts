// Dependencies
import { Response } from 'express';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

// Controllers
import { GenericController } from 'src/common/application/controller/generic.controller';

// Services
import { UserGroupService } from 'src/sso/domain/service/user-group.service';

// Model
import { UserGroupApi } from '../swagger/user-group.api';
import { UserGroup } from 'src/sso/domain/models/user-group.model';
import { JsonResponse } from 'src/common/application/model/json-response.class';
import { ApiJsonResponse } from 'src/common/application/decorator/api-response.decorator';

// DTO
import { CreateUserGroupDto } from '../dto/create-user-group.dto';
import { UpdateUserGroupDto } from '../dto/update-user-group.dto';

// Constants
import { UUID } from 'src/common/application/types/types.types';
import { Routes } from 'src/common/application/routes/routes.constants';

@ApiExtraModels(UserGroupApi)
@ApiTags(Routes.SSOUserGroup.ApiTags)
@Controller(Routes.SSOUserGroup.Controller)
export class UserGroupController extends GenericController<CreateUserGroupDto, UpdateUserGroupDto, UserGroup, UserGroupService> {
  constructor(private readonly userGroupService: UserGroupService) {
    super(userGroupService);
  }

  @Get(Routes.SSOUserGroup.Detail)
  @ApiOperation({ summary: 'detail user group', description: 'obtain all the info of a usergroup' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserGroupApi })
  async detail(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserGroupApi>> {
    return await super.serviceDetail(id, { response });
  }

  @Get(Routes.SSOUserGroup.List)
  @ApiOperation({ summary: `list all user groups`, description: `list all users groups` })
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserGroupApi] })
  async get(@Res() response: Response): Promise<JsonResponse<UserGroupApi[]>> {
    return await super.serviceList({ response });
  }

  @Post(Routes.SSOUserGroup.Create)
  @ApiOperation({ summary: 'create user group', description: 'create user group' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserGroupApi })
  async create(@Res() response: Response, @Body() dto: CreateUserGroupDto): Promise<JsonResponse<UserGroupApi>> {
    return await super.serviceCreate(dto, { response });
  }

  @Put(Routes.SSOUserGroup.Update)
  @ApiOperation({ summary: 'update user group', description: 'update user group' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserGroupApi })
  async update(@Res() response: Response, @Body() dto: UpdateUserGroupDto): Promise<JsonResponse<UserGroupApi>> {
    return await super.serviceUpdate(dto, { response });
  }

  @Delete(Routes.SSOUserGroup.Delete)
  @ApiOperation({ summary: 'delete user group', description: 'delete user group' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserGroupApi })
  async delete(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserGroupApi>> {
    return await super.serviceDelete(id, { response });
  }
}
