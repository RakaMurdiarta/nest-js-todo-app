import { Injectable } from '@nestjs/common';
import { JwtService as JwtServiceLib } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtServicelib: JwtServiceLib) {}
  async getTokens(
    payload: any,
    secretKey: string,
    expiresIn: number,
  ): Promise<string> {
    const token = await this.jwtServicelib.signAsync(payload, {
      secret: secretKey,
      expiresIn,
      algorithm: 'HS512',
    });

    return token;
  }
}
