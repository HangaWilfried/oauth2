import { CreateUserDto, RoleDto, UserDto, UserEditDto } from "@/dtos";

export interface IUser {
    getAllUsers(): Promise<UserDto[]>
    createUser(user: CreateUserDto): Promise<string>
    getUserById(id: string): Promise<UserDto> 
    editUser(id: string, user: UserEditDto): Promise<void>
    deleteUser(id: string): Promise<void>;

    assignRole(userId: string, role: RoleDto): Promise<void>
}