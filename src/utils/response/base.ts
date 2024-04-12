import { ApiProperty } from '@nestjs/swagger';
import { UserRequestDto } from 'src/modules/user/dto/user.requset.dto';

export class BaseApiResponse<T> {
  @ApiProperty({ type: () => Object })
  data: T | null;
  @ApiProperty()
  message: string;
  @ApiProperty()
  status: boolean;

  constructor(data: T | null, message: string, status: boolean) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  static success<T>(
    data: T | null,
    message: string = 'success',
    status: boolean = true,
  ): BaseApiResponse<T> {
    return new BaseApiResponse(data, message, status);
  }

  static error<T = null>(
    data: T,
    message: string = 'error',
    status: boolean = false,
  ): BaseApiResponse<T> {
    return new BaseApiResponse(data, message, status);
  }
}
