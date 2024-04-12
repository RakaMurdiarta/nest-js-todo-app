import { ResponseTasks } from 'src/modules/task/dto/response.dto';

export class TaskListResponseDto {
  id: string;
  body: string;
  status: string;
  task: ResponseTasks;
}
