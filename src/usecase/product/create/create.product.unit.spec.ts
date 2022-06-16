import { CreateProductUseCase } from "./create.product.usecase";

const getInput = () => ({
  type: "a",
  name: "product 1",
  price: 123,
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Product create usecase unit test", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = getInput();

    const output = await createProductUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = getInput();

    input.name = "";

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when the price must is less than or equal to zero", async () => {
    const productRepository = MockRepository();

    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = getInput();

    input.price = -10;

    await expect(createProductUseCase.execute(input)).rejects.toThrow(
      "Price must be greater then zero"
    );
  });
});
