import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO implements AuthBody {

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}