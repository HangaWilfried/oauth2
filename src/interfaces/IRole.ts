import { Role } from "@/models";
import { CreateRoleDto, RoleDto } from "src/dtos/RoleDto";

export interface IRole {
  addRole(role: CreateRoleDto): Promise<string>;
  getAllRoles(roleids?: string[]): Promise<RoleDto[]>;
  getRoleById(id: string): Promise<RoleDto>;
  editRole(id: string, role: RoleDto): Promise<void>;
  deleteRole(id: string): Promise<void>;

  findById(id: string): Promise<Role | null>;
}
