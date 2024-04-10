import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiResponseProperty({
    example: 'xxxx-xxxxx-xxxxx-xxxx-xx',
  })
  id: string;
  @ApiResponseProperty()
  email: string;
  @ApiResponseProperty()
  isVerified: boolean;
}
