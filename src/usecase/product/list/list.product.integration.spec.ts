import { Sequelize } from "sequelize-typescript";
import { ProductFactory } from "../../../domain/product/factory/product.factory";
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model";
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository";
import { ListProductUseCase } from "./list.product.usecase";

describe("Integration test for listing customer use case", () => {
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();

    const productA = ProductFactory.create("a", "Product a", 123);
    const productB = ProductFactory.create("b", "Product b", 456);
    await productRepository.create(productA);
    await productRepository.create(productB);

    const usecase = new ListProductUseCase(productRepository);

    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toEqual(productA.id);
    expect(output.products[0].name).toEqual(productA.name);
    expect(output.products[0].price).toEqual(productA.price);
    expect(output.products[1].id).toEqual(productB.id);
    expect(output.products[1].name).toEqual(productB.name);
    expect(output.products[1].price).toEqual(productB.price);
  });
});
