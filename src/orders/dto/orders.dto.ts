import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

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

export class OrderUpdateDTO {
    
    @IsOptional()
    @IsString()
    @IsUUID()
    user_id: string;

    @IsOptional()
    @IsString()
    payment_type: string;

    @IsOptional()
    @IsString()
    order_status: string;

    @IsOptional()
    @IsNumber()
    total_price: number;
}