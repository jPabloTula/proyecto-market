import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class OrderDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    payment_type: string;

    @IsNotEmpty()
    @IsString()
    order_status: string;

    @IsNotEmpty()
    @IsNumber()
    total_price: number;
}