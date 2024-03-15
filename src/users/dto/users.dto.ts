import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LEVEL_AUTHORITY } from "../../constants/level-authority";
import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name: string;

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
    level_authority: LEVEL_AUTHORITY;
}

export class UserUpdateDTO {

    @ApiProperty()
    @IsOptional()
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    last_name: string;

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
    level_authority: LEVEL_AUTHORITY;
}