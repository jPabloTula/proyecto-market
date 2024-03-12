import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDTO {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    activated: number;
}

export class ProductUpdateDTO {
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    stock: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    category: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    activated: number;    
}

export class UpdateStockDTO {
    @IsNotEmpty()
    @IsNumber()
    stock: number;
}