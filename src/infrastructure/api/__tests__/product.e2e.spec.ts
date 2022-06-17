import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      type: "b",
      name: "Product 1",
      price: 123,
    });

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(expect.any(String));
    expect(response.body.name).toEqual("Product 1");
    expect(response.body.price).toEqual(246);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "product 1",
      price: 123,
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response1 = await request(app).post("/product").send({
      type: "b",
      name: "Product 1",
      price: 123,
    });

    expect(response1.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      type: "a",
      name: "Product 2",
      price: 456.78,
    });

    expect(response2.status).toBe(200);

    const response = await request(app).get("/product").send();

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
    const [product1, product2] = response.body.products;
    expect(product1.name).toBe("Product 1");
    expect(product1.price).toBe(246);
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(456.78);
  });
});
