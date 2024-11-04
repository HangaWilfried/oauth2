import { 
    UserDto, 
    RoleDto, 
    UserEditDto, 
    CreateUserDto, 
} from "@/dtos";

import { User } from "@/models";


export interface IUser {
    getAllUsers(): Promise<UserDto[]>;
    deleteUser(id: string): Promise<void>;
    getUserById(id: string): Promise<UserDto>;    
    createUser(user: CreateUserDto): Promise<string>;
    editUser(id: string, user: UserEditDto): Promise<void>;
    assignRole(userId: string, role: RoleDto): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
}