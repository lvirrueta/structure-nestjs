// Dependencies
import { Response } from 'express';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';

// Controllers
import { GenericController } from 'src/common/application/controller/generic.controller';

// Services
import { UserCustomerService } from 'src/sso/domain/service/user/user-customer.service';

// Model
import { UserApi } from '../../swagger/user/user-api';
import { UserCustomer } from 'src/sso/domain/models/user/user-customer.model';
import { JsonResponse } from 'src/common/application/model/json-response.class';
import { ApiJsonResponse } from 'src/common/application/decorator/api-response.decorator';

// DTO
import { CreateUserCustomerDto } from '../../dto/user/create-user-customer.dto';
import { UpdateUserCustomerDto } from '../../dto/user/update-user-customer.dto';

// Constants
import { Routes } from 'src/common/application/routes/routes.constants';
import { UUID } from 'src/common/application/types/types.types';

@ApiExtraModels(UserApi)
@ApiTags(Routes.SSOUserCustomer.ApiTags)
@Controller(Routes.SSOUserCustomer.Controller)
export class UserCustomerController extends GenericController<
  CreateUserCustomerDto,
  UpdateUserCustomerDto,
  UserCustomer,
  UserCustomerService
> {
  constructor(private readonly userAdminService: UserCustomerService) {
    super(userAdminService);
  }

  @Get(Routes.SSOUserCustomer.Detail)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async detail(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    return await super.serviceDetail(id, { response });
  }

  @Get(Routes.SSOUserCustomer.List)
  @ApiJsonResponse({ status: HttpStatus.OK, type: [UserApi] })
  async get(@Res() response: Response): Promise<JsonResponse<UserApi[]>> {
    return await super.serviceList({ response });
  }

  @Post(Routes.SSOUserCustomer.Create)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async create(@Res() response: Response, @Body() dto: CreateUserCustomerDto): Promise<JsonResponse<UserApi>> {
    return await super.serviceCreate(dto, { response });
  }

  @Put(Routes.SSOUserCustomer.Update)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async update(@Res() response: Response, @Body() dto: UpdateUserCustomerDto): Promise<JsonResponse<UserApi>> {
    return await super.serviceUpdate(dto, { response });
  }

  @Delete(Routes.SSOUserCustomer.Delete)
  @ApiJsonResponse({ status: HttpStatus.OK, type: UserApi })
  async delete(@Res() response: Response, @Param('id') id: UUID): Promise<JsonResponse<UserApi>> {
    return await super.serviceDelete(id, { response });
  }
}
