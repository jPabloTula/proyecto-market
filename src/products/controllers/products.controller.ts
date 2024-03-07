import { BadRequestException, Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UsePipes, ValidationPipe, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductDTO, ProductUpdateDTO } from '../dto/products.dto';
import { ProductsEntity } from '../entities/products.entity';

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @Post('create')
    @UsePipes(new ValidationPipe({
        exceptionFactory: (errors) => new BadRequestException(errors[0].constraints[Object.keys(errors[0].constraints)[0]])
    }))
    public async create(@Body() product: ProductDTO): Promise<ProductsEntity> {
        return this.productService.createProduct(product);
    }

    @Get()
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query() filters?: any,
    ): Promise<{ products: ProductsEntity[]; total: number }> {
        return this.productService.findProducts(page, limit, filters);
    }

    @Get(':productId')
    public async findProductById(@Param('productId') productId: string): Promise<ProductsEntity> {
        return this.productService.findProductById(productId);
    }

    @Put('edit/:productId')
    public async updateProduct(@Param('productId') id: string, @Body() body: ProductUpdateDTO) {
        return await this.productService.updateProduct(body, id);
    }

    // @Put('edit/stock/:productId')
    // public async updateStockByProductId(@Param('productId') productId: number, @Body() updateStockDto: ProductUpdateDTO) {
    //     return await this.productService.updateStockByProductId(productId, updateStockDto);
    // }   

    @Delete('delete/:productId')
    public async deleteProduct(@Param('productId') id: string) {
        return await this.productService.deleteProduct(id);
    }

}