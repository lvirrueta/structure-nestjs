// Dependencies
import { Response } from 'express';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

// Controllers
import { GenericController } from 'src/common/application/controller/generic.controller';

// Services
import { RoleService } from 'src/sso/domain/service/role.service';

// Model
import { RoleApi } from '../swagger/role';
import { Role } from 'src/sso/domain/models/role.model';
import { JsonResponse } from 'src/common/application/model/json-response.class';
import { ApiJsonResponse } from 'src/common/application/decorator/api-response.decorator';

// DTO
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

// Constants
import { Routes } from 'src/common/application/routes/routes.constants';
import { UUID } from 'src/common/application/types/types.types';

@ApiExtraModels(RoleApi)
@ApiTags(Routes.SSORole.ApiTags)
@Controller(Routes.SSORole.Controller)
export class RoleController extends GenericController<CreateRoleDto, UpdateRoleDto, Role, RoleService> {
  constructor(private readonly roleService: RoleService) {
    super(roleService);
  }

  @Get(Routes.SSORole.Detail)
  @ApiOperation({ summary: 'detail of role', description: 'obtain all the info of a role' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: RoleApi })
  async detail(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<RoleApi>> {
    return await super.serviceDetail(id, { response });
  }

  @Get(Routes.SSORole.List)
  @ApiOperation({ summary: `list all roles`, description: `list all roles` })
  @ApiJsonResponse({ status: HttpStatus.OK, type: [RoleApi] })
  async get(@Res() response: Response): Promise<JsonResponse<RoleApi[]>> {
    return await super.serviceList({ response });
  }

  @Post(Routes.SSORole.Create)
  @ApiOperation({ summary: 'create a role', description: 'create a role' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: RoleApi })
  async create(@Res() response: Response, @Body() dto: CreateRoleDto): Promise<JsonResponse<RoleApi>> {
    return await super.serviceCreate(dto, { response });
  }

  @Put(Routes.SSORole.Update)
  @ApiOperation({ summary: 'update a role', description: 'update a role' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: RoleApi })
  async update(@Res() response: Response, @Body() dto: UpdateRoleDto): Promise<JsonResponse<RoleApi>> {
    return await super.serviceUpdate(dto, { response });
  }

  @Delete(Routes.SSORole.Delete)
  @ApiOperation({ summary: 'delete a role', description: 'delete a role' })
  @ApiJsonResponse({ status: HttpStatus.OK, type: RoleApi })
  async delete(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<RoleApi>> {
    return await super.serviceDelete(id, { response });
  }
}
