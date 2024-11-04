import { Type } from "class-transformer";
import { RoleDto } from "./RoleDto";
import {
  IsEnum,
  IsEmail,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export type TelDto = {
  number: string;
  countryCode: string;
};

class ContactDto {
  @IsString()
  countryCode: string;

  @IsString()
  number: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  firstname: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Gender)
  gender: Gender;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;
}

export type UserDto = {
  id: string;
  email: string;
  // gender: Gender;
  gender: string;
  roles: RoleDto[];
  lastname: string;
  firstname: string;
  contact: {
    number: string;
    countryCode: string;
  };
};

export class UserEditDto {
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  firstname: string;

  @IsEmail()
  email: string;

  /* 
      @IsEnum(Gender)
      gender: Gender;
    */
  @IsString()
  gender: string;

  @ValidateNested()
  contact: ContactDto;
}
