import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from '../entities/products.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductDTO, ProductUpdateDTO } from '../dto/products.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productRepository: Repository<ProductsEntity>
    ) { }

    public async createProduct(body: ProductDTO): Promise<ProductsEntity> {
        try {
            return await this.productRepository.save(body);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async findProducts(page: number = 1, limit: number = 10, filters?: any): Promise<{ products: ProductsEntity[]; total: number }> {
        try {
            const skip = (page - 1) * limit;

            let query = this.productRepository.createQueryBuilder('product');

            if (filters) {
                if (filters.name) {
                    query = query.where('product.name LIKE :name', { name: `%${filters.name}%` });
                }

                if (filters.category) {
                    query = query.where('product.category LIKE :category', { category: `%${filters.category}%` });
                }
            }

            const total = await query.getCount();

            const products = await query.skip(skip).take(limit).getMany();

            return { products, total };
        } catch (error) {
            throw new ErrorManager.createSignatureError(error);
        }
    }
    public async findProductById(id: string): Promise<ProductsEntity> {
        try {

            const product = await this.productRepository
                .createQueryBuilder('products')
                .where({ id })
                .getOne();
            if (!product) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }
            return product;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async updateProduct(body: ProductUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const product: UpdateResult = await this.productRepository.update(id, body);
            if (product.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo actualizar'
                })
            }
            return product;
        } catch (error) {
            throw new ErrorManager.createSignatureError(error.message);
        }
    }

    // public async updateStockByProductId(id: number, updateStockDto: UpdateStockDTO): Promise<ProductsEntity> {
    //     try {

            // const product = await this.productRepository
            // .createQueryBuilder('products')
            // .where({ id })
            // .getOne();

            // if(!product) {
            //     throw new NotFoundException(`Product with ID ${id} not found`);
            // }

            // product.stock = updateStockDto.stock;
            // await product.save()
    //     } catch (error) {
    //         throw ErrorManager.createSignatureError(error.message);
    //     }
    // }

    public async deleteProduct(id: string): Promise<DeleteResult | undefined> {
        try {
            const product: DeleteResult = await this.productRepository.delete(id);
            if (product.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo borrar'
                })
            }
            return product;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
