import { IUser } from "@/interfaces";
import { UserDto, CreateUserDto, RoleDto } from "@/dtos";

import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Inject, 
    Param, 
    Post, 
    Put 
} from "@nestjs/common";


@Controller("user")
export class UserController {
    constructor(@Inject("I_USER") private I_User: IUser) {}


    @Get()
    getAllUsers(): Promise<UserDto[]> {
        return this.I_User.getAllUsers();
    }

    @Post()
    createUser(@Body() user: CreateUserDto): Promise<string> {
        return this.I_User.createUser(user);
    }
    
    @Get(":id")
    getUserById(@Param("id") id: string): Promise<UserDto> {
        return this.I_User.getUserById(id);
    }

    @Put(":id")
    editUser(@Param("id") id: string, @Body() user: UserDto): Promise<void> {
        return this.I_User.editUser(id, user);
    }
    
    @Put(":id/role")
    assignRole(
        @Param("id") userId: string, 
        @Body() role: RoleDto
    ): Promise<void> {
        return this.I_User.assignRole(userId, role);
    }


    @Delete(":id")
    deleteUser(@Param("id") id: string): Promise<void> {
        return this.I_User.deleteUser(id);
    }
}