import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsNotEmpty()
    @IsString()
    category: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    activated: number;
}

export class ProductUpdateDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    stock: number;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    activated: number;    
}

export class UpdateStockDTO {
    @IsNotEmpty()
    @IsNumber()
    stock: number;
}