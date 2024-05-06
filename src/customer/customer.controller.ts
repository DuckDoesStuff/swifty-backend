import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Headers, Res, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { deleteAllUsers } from '../firebase.admin';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}


  // Use for testing purpose only
  @Post("delete")
  async deleteAll() {
    try {
      deleteAllUsers();
      await this.customerService.removeAll();
      return "All users deleted";
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post("signin")
  async signIn(@Body() body : any) {
    try {
      const result = await this.customerService.findOneByEmail(body.email);
      if (!result) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { statusCode: HttpStatus.OK };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post("signup")
  async signUp(@Body() body : CreateCustomerDto) {
    try {
      const customer = await this.customerService.createCustomer(body);
      return { statusCode: HttpStatus.OK, data: customer };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  // @Get()
  // findAll() {
  //   return this.customerService.findAll();
  // }

  @Get()
  getUserData(@Headers() headers: any) {
    // Get the token from the headers
    const token = headers.authorization;
    console.log(token);
    return 200;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.updateCustomer(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
