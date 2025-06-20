import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) { }

  @Post('register')
  async register(
    @Body()
    data: {
      name: string;
      email: string;
      password: string;
      phoneNumber?: string;
    },
  ) {
    return await this.clientService.create(data);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.clientService.validateUser(body.email, body.password);
  }

  @Get('find')
  findOneByEmail(@Query('email') email: string) {
    return this.clientService.findByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}