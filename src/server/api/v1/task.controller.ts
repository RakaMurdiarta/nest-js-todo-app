import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../../../modules/task/task.service';
import { CreateTaskDto } from '../../../modules/task/dto/request.dto';
import { BaseApiResponse } from 'src/utils/response/base';
import { ResponseTasks } from 'src/modules/task/dto/response.dto';
import { errorResponse } from 'src/exception/helper/error-response';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseResponseGenericDecoratorsArrayData } from 'src/swagger/handle-generic-response';
import { GET_ALL_TASK_CONSTANT } from 'src/modules/role/constants/swagger-response-task';

@Controller('v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('add')
  async create(@Body() createTaskDto: CreateTaskDto): Promise<void> {
    /**
     * TODO: use custom decorator param to get user id from req
     */
    const userId = '21e2fdd6-82c6-42eb-be2d-1f32e37df1a0';
    return await this.taskService.create(createTaskDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @BaseResponseGenericDecoratorsArrayData(
    ResponseTasks,
    GET_ALL_TASK_CONSTANT,
    'GET ALL Task',
  )
  async getAllTask(): Promise<BaseApiResponse<ResponseTasks[]>> {
    try {
      const tasks = await this.taskService.getAllTask();
      return BaseApiResponse.success(tasks);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
