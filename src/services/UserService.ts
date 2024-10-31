import { Role, User } from "@/models";
import { IRole, IUser } from "@/interfaces";
import { CreateUserDto, UserDto, UserEditDto, TelDto, RoleDto } from "@/dtos";

import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UserService implements IUser {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,

        @Inject("I_ROLE") private I_Role: IRole
    ) {}


    async getAllUsers(): Promise<UserDto[]> {
        const users = await this.userRepository.find({
            relations: ["roles"]
        })
        return users.map(toUserDto)
    }

    async createUser(user: CreateUserDto): Promise<string> {
        const createdUser = await this.userRepository.create({
            ...user,
            contact: toContactString(user.contact)
        });
        const newUser = await this.userRepository.save(createdUser);
        return newUser.id;
    }
    
    async getUserById(id: string): Promise<UserDto> {
        const user = await this.findById(id)

        if (user) return toUserDto(user)
        else throw new Error(`User with id: ${id} not found.`); 
    }
    
    async editUser(id: string, user: UserEditDto): Promise<void> {
        const existingUser = await this.findById(id)

        if (existingUser) {
            const updates = this.userRepository.merge(existingUser, {
                ...user,
                contact: toContactString(user.contact)
            })

            await this.userRepository.save(updates)
        } 
        else throw new Error(`User with id: ${id} not found.`); 
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await this.userRepository.delete(id)
        } catch(error) {
            console.log(error)
            throw new Error(`User with id: ${id} not found.`);
        }
    }
    
    async assignRole(userId: string, role: RoleDto): Promise<void> {
        const user = await this.findById(userId)
        if (user) {
            const newRole = await this.I_Role.findById(role.id)
            if (newRole) {
                if (!user.roles.map(thisrole => thisrole.id).includes(role.id)) {
                    user.roles.push(newRole)
                    await this.userRepository.save(user)
                }
            }
        } else throw new Error(`User with id: ${userId} not found.`);
    }

    findById(id: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: { id },
            relations: ['roles'],
        });
    }
}


function toContactDto(tel: string): TelDto {
    const [countryCode, number] = tel.split(";")
    return { countryCode, number }
}

function toContactString(tel: TelDto | undefined): string | undefined {
    return tel ? `${tel.countryCode};${tel.number}` : undefined
}

function toUserDto(user: User): UserDto {
    console.log(user)
    return {
        id: user.id,
        email: user.email,
        roles: user.roles,
        gender: user.gender,
        lastname: user.lastname,
        firstname: user.firstname,
        contact: toContactDto(user.contact),
    }
}