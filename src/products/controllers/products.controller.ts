import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProductDTO, ProductUpdateDTO } from '../dto/products.dto';
import { ProductsEntity } from '../entities/products.entity';
import { ProductsService } from '../services/products.service';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard, RolesGuard)
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para crear un producto',
        description: 'Se debe pasar por el body la data de prodcuto'
    })
    @Post()
    @UsePipes(new ValidationPipe({
        exceptionFactory: (errors) => new BadRequestException(errors[0].constraints[Object.keys(errors[0].constraints)[0]])
    }))
    public async create(@Body() product: ProductDTO): Promise<ProductsEntity> {
        return this.productService.createProduct(product);
    }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para listar los productos'
    })
    @Get()
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query() filters?: any,
        @Query('quantityInOrders') quantityInOrders?: string,
        @Query('orderBy1') orderBy1?: 'ASC' | 'DESC',
        @Query('quantityInCItems') quantityInCItems?: string,
        @Query('orderBy2') orderBy2?: 'ASC' | 'DESC'
    ): Promise<{ products: ProductsEntity[]; total: number }> {
        return this.productService.findProducts(page, limit, filters, quantityInOrders, orderBy1, quantityInCItems, orderBy2);
    }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para listar data de un producto',
        description: 'Se debe pasar por el body el product_id'
    })
    @Get(':product_id')
    public async findProductById(@Param('product_id') product_id: string): Promise<ProductsEntity> {
        return this.productService.findProductById(product_id);
    }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para actualizar la data de un producto',
        description: 'Se debe pasar por el body el product_id'
    })
    @Put('/:product_id')
    public async updateProduct(@Param('product_id') id: string, @Body() body: ProductUpdateDTO) {
        return await this.productService.updateProduct(body, id);
    }

    @Roles('ADMIN')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para eliminar un producto',
        description: 'Se debe pasar por el body el product_id'
    })
    @Delete('/:product_id')
    public async deleteProduct(@Param('product_id') id: string) {
        return await this.productService.deleteProduct(id);
    }

}
