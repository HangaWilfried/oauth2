import { IsString, IsOptional } from "class-validator";

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
    @IsOptional()
    name: string
    
    @IsString()
    @IsOptional()
    scope: string
}