import { IsString } from "class-validator";
import { RoleDto } from "@/dtos";

export class CredentialDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export type PayloadDto = {
  id: string;
  roles: RoleDto[];
};
