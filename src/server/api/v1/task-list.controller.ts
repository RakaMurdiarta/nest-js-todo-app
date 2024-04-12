import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskListService } from '../../../modules/task-list/task-list.service';
import {
  CreateTaskListDto,
  GetTaskListByTaskId,
} from '../../../modules/task-list/dto/request.dto';
import { TaskService } from 'src/modules/task/task.service';
import { BaseApiResponse } from 'src/utils/response/base';
import { errorResponse } from 'src/exception/helper/error-response';
import { TaskListResponseDto } from 'src/modules/task-list/dto/response.dto';

@Controller('v1/task-list')
export class TaskListController {
  constructor(
    private readonly taskListService: TaskListService,
    private readonly taskService: TaskService,
  ) {}

  @Post('create')
  async create(
    @Body() createTaskListDto: CreateTaskListDto,
  ): Promise<BaseApiResponse<void>> {
    try {
      await this.taskListService.create(createTaskListDto);

      return BaseApiResponse.success(null);
    } catch (error) {
      return errorResponse(error);
    }
  }

  @Get('all')
  async getAll(
    @Body() getTaskListByTaskId: GetTaskListByTaskId,
  ): Promise<BaseApiResponse<TaskListResponseDto[]>> {
    try {
      const taskLists = await this.taskListService.getAllTaskListByTaskId(
        getTaskListByTaskId.taskId,
      );

      return BaseApiResponse.success(taskLists);
    } catch (error) {
      return errorResponse(error);
    }
  }
}
