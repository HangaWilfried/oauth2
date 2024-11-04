import { CreateRoleDto, RoleDto } from "@/dtos";
import { IRole } from "@/interfaces";
import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";

@Controller("role")
export class RoleController {
    constructor(@Inject("ROLE_PROVIDER") private roleservice: IRole) {}

    @Post()
    async addRole(@Body() role: CreateRoleDto): Promise<string> {
        return this.roleservice.addRole(role);
    }
    
    @Get()
    async getAllRoles(): Promise<RoleDto[]> {
        return this.roleservice.getAllRoles();
    }
    
    @Get(":id")
    async getRoleById(@Param("id") id: string): Promise<RoleDto> {
        return this.roleservice.getRoleById(id)
    }
    
    @Post(":id")
    async editRole(@Param("id") id: string, @Body() role: RoleDto): Promise<void> {
        return this.roleservice.editRole(id, role)
    }
    
    @Delete("id")
    async deleteRole(@Param("id") id: string): Promise<void> {
        return this.roleservice.deleteRole(id)
    }
}