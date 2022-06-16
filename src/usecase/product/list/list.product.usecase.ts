import { ProductInterface } from "../../../domain/product/entity/product.interface";
import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(products: ProductInterface[]): OutputListProductDto {
    return {
      products: products.map(({ id, name, price }) => ({
        id,
        name,
        price,
      })),
    };
  }
}
