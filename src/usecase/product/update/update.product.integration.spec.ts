import { Sequelize } from "sequelize-typescript";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update.product.usecase";

describe("Integration test for updating customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const product = ProductFactory.create("a", "Product a", 123);
    await productRepository.create(product);

    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: product.id,
      name: "name updated",
      price: 456,
    };

    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });
});
