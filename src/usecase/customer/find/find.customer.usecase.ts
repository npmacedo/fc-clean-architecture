import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from "./find.customer.dto";

export class FindCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const {
      id,
      name,
      address: { street, number, zip, city },
    } = await this.customerRepository.find(input.id);

    return {
      id,
      name,
      address: { street, number, zip, city },
    };
  }
}
