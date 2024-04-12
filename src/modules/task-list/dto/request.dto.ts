export class CreateTaskListDto {
  status: string;
  body: string;
  taskId: string;
}

export class GetTaskListByTaskId {
  taskId: string;
}
