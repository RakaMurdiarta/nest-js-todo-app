import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RoleService } from '../../../modules/role/role.service';
import { CreateRoleDto } from 'src/modules/role/dto/role.request.dto';

@Controller('v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('insert')
  async create(@Body() createRoleDto: CreateRoleDto): Promise<void> {
    //get role by name
    const existRole = await this.roleService.getRoleByName(
      createRoleDto.name.toLowerCase(),
    );

    if (existRole) {
      throw new HttpException(
        'role name is already exist',
        HttpStatus.CONFLICT,
      );
    }
    return await this.roleService.create(createRoleDto);
  }
}
