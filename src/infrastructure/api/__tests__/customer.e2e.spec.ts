import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Customer 1",
        address: {
          street: "Street 1",
          number: 123,
          zip: "12345",
          city: "City 1",
        },
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(expect.any(String));
    expect(response.body.name).toEqual("Customer 1");
    expect(response.body.address.street).toEqual("Street 1");
    expect(response.body.address.number).toEqual(123);
    expect(response.body.address.zip).toEqual("12345");
    expect(response.body.address.city).toEqual("City 1");
  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        address: {
          street: "Street 1",
          number: 123,
          zip: "12345",
          city: "City 1",
        },
      });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const response1 = await request(app)
      .post("/customer")
      .send({
        name: "Customer 1",
        address: {
          street: "Street 1",
          number: 123,
          zip: "12345",
          city: "City 1",
        },
      });

    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Customer 2",
        address: {
          street: "Street 2",
          number: 234,
          zip: "23456",
          city: "City 2",
        },
      });

    expect(response2.status).toBe(200);

    const response = await request(app).get("/customer").send();

    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
    const [customer1, customer2] = response.body.customers;
    expect(customer1.name).toBe("Customer 1");
    expect(customer2.name).toBe("Customer 2");
  });
});
