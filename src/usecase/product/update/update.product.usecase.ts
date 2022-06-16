import { Product } from "../../../domain/product/entity/product";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const { id, name, price } = await this.productRepository.find(input.id);

    const product = new Product(id, name, price);
    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
