import express from "express";
import { CreateCustomerUseCase } from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (req, res) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    };
    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req, res) => {
  const usecase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const output = await usecase.execute({});
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});