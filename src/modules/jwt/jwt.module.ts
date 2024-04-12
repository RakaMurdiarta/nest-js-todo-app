import { DynamicModule, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
})
export class JsonWebTokenModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: JsonWebTokenModule,
      providers: [JwtService],
      exports: [JwtService],
    };
  }
}
