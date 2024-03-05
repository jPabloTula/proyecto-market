import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class WalletDTO {

    @IsNotEmpty()
    @IsNumber()
    balance: number;

    @IsNotEmpty()
    @IsString()
    moneyType: string;

}