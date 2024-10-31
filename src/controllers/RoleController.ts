import { CreateRoleDto, RoleDto } from "@/dtos";
import { IRole } from "@/interfaces";
import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";

@Controller("role")
export class RoleController {
    constructor(@Inject("I_ROLE") private I_Role: IRole) {}

    @Post()
    async addRole(@Body() role: CreateRoleDto): Promise<string> {
        return this.I_Role.addRole(role);
    }
    
    @Get()
    async getAllRoles(): Promise<RoleDto[]> {
        return this.I_Role.getAllRoles();
    }
    
    @Get(":id")
    async getRoleById(@Param("id") id: string): Promise<RoleDto> {
        return this.I_Role.getRoleById(id)
    }
    
    @Post(":id")
    async editRole(@Param("id") id: string, @Body() role: RoleDto): Promise<void> {
        return this.I_Role.editRole(id, role)
    }
    
    @Delete("id")
    async deleteRole(@Param("id") id: string): Promise<void> {
        return this.I_Role.deleteRole(id)
    }
}