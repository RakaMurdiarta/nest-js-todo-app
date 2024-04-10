import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/role.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Role } from 'src/entities';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<void> {
    const role = this.entityManager.create(Role, {
      name: createRoleDto.name,
      isActive: true,
    });

    await this.entityManager.save(role);
    return;
  }

  async getRoleById(id: string): Promise<Role | null> {
    const role = await this.roleRepo.findOne({
      where: {
        id,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!role) {
      return null;
    }

    return role;
  }

  async getRoleByName(name: string): Promise<Role | null> {
    const role = await this.roleRepo.findOne({
      where: {
        name,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!role) {
      return null;
    }

    return role;
  }
}
