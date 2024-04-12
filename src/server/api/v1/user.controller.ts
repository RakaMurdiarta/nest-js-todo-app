import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { errorResponse } from 'src/exception/helper/error-response';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserRequestDto } from 'src/modules/user/dto/user.requset.dto';
import { UserResponseDto } from 'src/modules/user/dto/user.response.dto';
import { TransformPasswordInterceptor } from 'src/modules/user/user.interceptor';
import { UserService } from 'src/modules/user/user.service';
import { BaseApiResponse } from 'src/utils/response/base';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseResponseGenericDecoratorsArrayData } from 'src/swagger/handle-generic-response';
import { GET_ALL_USER_CONSTANT } from 'src/modules/user/constant/swagger-response-user';

@Controller('v1/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('all')
  @BaseResponseGenericDecoratorsArrayData(
    UserResponseDto,
    GET_ALL_USER_CONSTANT,
    'GET ALL USER',
  )
  async getAllUser(
    @Req() req: Request,
  ): Promise<BaseApiResponse<UserResponseDto[]>> {
    try {
      const users = await this.userService.getUsers();
      // const newReq = req as CustomRequest;
      return BaseApiResponse.success(users);
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
    }
  }

  @UseInterceptors(TransformPasswordInterceptor)
  @Post('insert')
  @HttpCode(200)
  async createUser(@Body() user: UserRequestDto): Promise<void> {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
