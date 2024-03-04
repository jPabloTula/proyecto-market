import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LEVEL_AUTHORITY } from "../../constants/level-authority";

export class UserDTO {

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    picture: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsBoolean()
    activated: boolean;

    @IsNotEmpty()
    @IsEnum(LEVEL_AUTHORITY)
    levelAuthority: LEVEL_AUTHORITY;
}

export class UserUpdateDTO {

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    picture: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsBoolean()
    activated: boolean;

    @IsOptional()
    @IsEnum(LEVEL_AUTHORITY)
    levelAuthority: LEVEL_AUTHORITY;
}