import { Product } from "../../../domain/product/entity/product";
import { FindProductUseCase } from "./find.product.usecase";

const product = new Product("p1", "product 1", 123);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "p1",
      name: "product 1",
      price: 123,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw an error when not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "p1",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
