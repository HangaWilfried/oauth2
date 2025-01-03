import { Role } from "@/models";
import { IRole } from "@/interfaces";
import { toRoleDto } from "@/utils/method";
import { CreateRoleDto, RoleDto } from "@/dtos";

import { In, Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class RoleService implements IRole {
  constructor(
    @Inject("ROLE_REPOSITORY")
    private roleRepository: Repository<Role>,
  ) {}

  async addRole(role: CreateRoleDto): Promise<string> {
    const createdRole = this.roleRepository.create(role);
    const newRole = await this.roleRepository.save(createdRole);
    return newRole.id;
  }

  fetchAllRoles(roleIds?: string[]): Promise<Role[]> {
    if (roleIds) {
      return this.roleRepository.find({
        where: { id: In(roleIds) },
      });
    }
    return this.roleRepository.find();
  }

  async getAllRoles(roleIds?: string[]): Promise<RoleDto[]> {
    const roles = await this.fetchAllRoles(roleIds);
    return roles.map(toRoleDto);
  }

  async getRoleById(id: string): Promise<RoleDto> {
    const role = await this.findById(id);
    if (role) return toRoleDto(role);
    else throw new Error("Role not found");
  }

  async editRole(id: string, role: RoleDto): Promise<void> {
    const existingRole = await this.findById(id);
    if (existingRole) {
      const updates = this.roleRepository.merge(existingRole, role);
      await this.roleRepository.save(updates);
    } else throw new Error("Role not found");
  }

  async deleteRole(id: string): Promise<void> {
    const existingRole = await this.findById(id);
    if (existingRole) await this.roleRepository.delete(id);
    else throw new Error("Role not found");
  }

  async findById(id: string): Promise<Role | null> {
    return this.roleRepository.findOneBy({
      id,
    });
  }
}
