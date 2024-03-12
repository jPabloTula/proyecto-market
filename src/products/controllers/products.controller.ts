import { BadRequestException, Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UsePipes, ValidationPipe, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductDTO, ProductUpdateDTO } from '../dto/products.dto';
import { ProductsEntity } from '../entities/products.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @Post()
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

    @Get(':product_id')
    public async findProductById(@Param('product_id') product_id: string): Promise<ProductsEntity> {
        return this.productService.findProductById(product_id);
    }

    @Put('/:product_id')
    public async updateProduct(@Param('product_id') id: string, @Body() body: ProductUpdateDTO) {
        return await this.productService.updateProduct(body, id);
    }

    // @Put('edit/stock/:productId')
    // public async updateStockByProductId(@Param('productId') productId: number, @Body() updateStockDto: ProductUpdateDTO) {
    //     return await this.productService.updateStockByProductId(productId, updateStockDto);
    // }   

    @Delete('/:product_id')
    public async deleteProduct(@Param('product_id') id: string) {
        return await this.productService.deleteProduct(id);
    }

}
