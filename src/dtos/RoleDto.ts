import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    name: string

    @IsString()
    scope?: string
}

export class RoleDto {
    @IsString()
    id: string

    @IsString()
    name?: string
    
    @IsString()
    scope?: string
}