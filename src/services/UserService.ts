import { CreateUserDto, UserEditDto, UserDto, RoleDto } from "@/dtos";
import { User } from "@/models";
import { IRole, IUser } from "@/interfaces";
import { toUserDto, toContactString } from "@/utils/method";

import * as argon2 from "argon2";

import { Repository } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class UserService implements IUser {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: Repository<User>,

    @Inject("ROLE_PROVIDER") private roleService: IRole,
  ) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find({
      relations: ["roles"],
    });
    return users.map(toUserDto);
  }

  async createUser(user: CreateUserDto): Promise<string> {
    const { contact, password, ...data } = user;
    const hashPassword = await argon2.hash(password);

    const createdUser = this.userRepository.create({
      contact: toContactString(contact),
      password: hashPassword,
      ...data,
    });

    const newUser = await this.userRepository.save(createdUser);
    return newUser.id;
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.findById(id);

    if (user) return toUserDto(user);
    else throw new Error(`User with id: ${id} not found.`);
  }

  async editUser(id: string, user: UserEditDto): Promise<void> {
    const existingUser = await this.findById(id);

    if (existingUser) {
      const updates = this.userRepository.merge(existingUser, {
        ...user,
        contact: toContactString(user.contact),
      });

      await this.userRepository.save(updates);
    } else throw new Error(`User with id: ${id} not found.`);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new Error(`User with id: ${id} not found.`);
    }
  }

  async assignRole(userId: string, role: RoleDto): Promise<void> {
    const user = await this.findById(userId);
    if (user) {
      const newRole = await this.roleService.findById(role.id);
      if (newRole) {
        if (!user.roles.map((thisRole) => thisRole.id).includes(role.id)) {
          user.roles.push(newRole);
          await this.userRepository.save(user);
        }
      }
    } else throw new Error(`User with id: ${userId} not found.`);
  }

  findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ["roles"],
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ["roles"],
    });
  }
}
