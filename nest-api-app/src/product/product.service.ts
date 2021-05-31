import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Like, Repository } from 'typeorm';
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  names,
  languages,
} from 'unique-names-generator';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productRepository.save({
      productName: createProductDto.name,
      productImage: createProductDto.image,
    });
  }

  findAll(page: number, size: number) {
    return this.productRepository
      .findAndCount({
        take: size,
        skip: (page - 1) * size,
      })
      .then((res) => ({
        totalItems: res[1],
        data: res[0],
        currentPage: page,
        totalPages: Math.ceil(res[1] / size),
      }));
  }

  fingByQuery(query: string) {
    return this.productRepository
      .findAndCount({
        where: { productName: Like(`%${query}%`) },
        order: { productId: 'ASC' },
      })
      .then((d) => ({ totalItems: d[1], data: d[0] }));
  }

  findOne(id: number) {
    return this.productRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
      return data;
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(
      { productId: id },
      {
        productName: updateProductDto.name,
        productImage: updateProductDto.image,
      },
    );
  }

  remove(id: number) {
    return this.productRepository.delete({ productId: id });
  }

  bulkCreate() {
    return this.productRepository.insert(this.createDump());
  }

  private createDump(arrayLength = 100) {
    let a = new Array(arrayLength);
    debugger;
    for (let i = 0; i < a.length; i++) {
      const minPrice = 1000;
      const maxPrice = 50000;
      const randomStock = Math.floor(Math.random() * 100);
      const randomPrice = Math.random() * (+maxPrice - +minPrice) + +minPrice;
      const salePrice = !!Math.floor((Math.random() * 1000) % 2)
        ? randomPrice * (Math.floor(Math.random() * (50 - 10) + 10) / 100)
        : randomPrice;
      a[i] = {
        // productId: 1000 + i + 1,
        productName: uniqueNamesGenerator({
          dictionaries: [adjectives, colors, names],
          separator: ' ',
        }),
        productImage: `https://picsum.photos/400?image=${Math.floor(
          Math.random() * 1000,
        )}`,
        productStock: randomStock,
        productPrice: randomPrice.toFixed(2),
        productSalePrice: salePrice.toFixed(2),
      };
    }
    return a;
  }
}
