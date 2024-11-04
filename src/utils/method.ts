import { Role, User } from "@/models"
import { RoleDto, TelDto, UserDto } from "@/dtos"

export function toContactDto(tel: string): TelDto {
    const [countryCode, number] = tel.split(";")
    return { countryCode, number }
}

export function toContactString(tel: TelDto | undefined): string | undefined {
    return tel ? `${tel.countryCode};${tel.number}` : undefined
}

export function toUserDto(user: User): UserDto {
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

export function toRoleDto(role: Role): RoleDto {
    return {
         id: role.id,
         name: role.name,
         scope: role.scope,
    } 
 }