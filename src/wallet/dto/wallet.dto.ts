import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class WalletDTO {

    @IsNotEmpty()
    @IsNumber()
    balance: number;

    @IsNotEmpty()
    @IsString()
    money_type: string;

}

export class WalletUpdateDTO {
    @IsOptional()
    @IsNumber()
    balance: number;

    @IsOptional()
    @IsString()
    money_type: string;
}