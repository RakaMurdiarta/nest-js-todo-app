import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from 'src/shared/config/config.service';
import { IConfig } from '../../config/interface/config.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from 'src/entities';
import { EntityManager, Repository } from 'typeorm';
import { UserRequestDto } from './dto/user.requset.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { RoleService } from '../role/role.service';
import { errorResponse } from 'src/exception/helper/error-response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly roleService: RoleService,
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  createUser = async (payload: UserRequestDto): Promise<void> => {
    try {
      const role = await this.roleService.getRoleByName('user');

      if (!role) {
        throw new HttpException('role is not found', HttpStatus.NOT_FOUND);
      }
      const user = this.entityManager.create(User, {
        email: payload.email,
        password: payload.password,
        role: {
          id: role.id,
        },
      });
      // const jwt = await this.jwtService.getTokens(
      //   { email: user.email },
      //   'testing',
      //   400,
      // );

      // console.log(jwt);
      console.log(user);

      const userSave = await this.entityManager.save(user);

      console.log(userSave);
      return;
    } catch (error) {
      return errorResponse(error);
    }
  };

  getUsers = async (): Promise<UserResponseDto[] | []> => {
    return await this.userRepo.find({
      relations: {
        role: true,
      },
    });
  };
}
