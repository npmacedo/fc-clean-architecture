import { ProductRepositoryInterface } from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export class FindProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const { id, name, price } = await this.productRepository.find(input.id);
    return { id, name, price };
  }
}
