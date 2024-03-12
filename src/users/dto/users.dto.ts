import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LEVEL_AUTHORITY } from "../../constants/level-authority";
import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    picture: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    activated: boolean;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(LEVEL_AUTHORITY)
    levelAuthority: LEVEL_AUTHORITY;
}

export class UserUpdateDTO {

    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    picture: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    address: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    activated: boolean;

    @ApiProperty()
    @IsOptional()
    @IsEnum(LEVEL_AUTHORITY)
    levelAuthority: LEVEL_AUTHORITY;
}