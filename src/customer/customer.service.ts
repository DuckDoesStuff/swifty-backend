import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      return await this.customerRepository.save(customer);
    } catch (error) {
      if (error.code === '23505') { // 23505 is the code for unique_violation in PostgreSQL
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  removeAll() {
    return this.customerRepository.delete({});
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  findOneByEmail(email: string) {
    return this.customerRepository.findOne({where: {email}});
  };

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({where: {id}});
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    const updatedCustomer = Object.assign(customer, updateCustomerDto);
    return await this.customerRepository.save(updatedCustomer);
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
