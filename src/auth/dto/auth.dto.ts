import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interfaces/auth.interfaces";

export class AuthDTO implements AuthBody {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}