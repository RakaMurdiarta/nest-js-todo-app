import { ConstantResponse } from 'src/swagger/type';

export const GET_ALL_TASK_CONSTANT: ConstantResponse[] = [
  {
    status: 200,
    type: 'success',
    desc: 'Success Get ALL Task',
  },
  {
    status: 400,
    type: 'error',
    desc: 'Error Not Found',
  },
  {
    status: 500,
    type: 'error',
    desc: 'Internal Server Error',
  },
];
