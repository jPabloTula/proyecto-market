import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class OrderDTO {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    paymentType: string;

    @IsNotEmpty()
    @IsString()
    orderStatus: string;

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number;
}