import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entity/client.entity'
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(data: { 
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
  }) {
    const existingClient = await this.clientRepository.findOne({ 
      where: { email: data.email } 
    });

    if (existingClient) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const client = this.clientRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phoneNumber: data.phoneNumber,
    });

    const savedClient = await this.clientRepository.save(client);
    
    const { password, ...result } = savedClient;
    return result;
  }

  async validateUser(email: string, password: string) {
    const client = await this.clientRepository.findOne({ 
      where: { email },
      select: ['id', 'name', 'email', 'password', 'phoneNumber'] 
    });

    if (!client) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, client.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = client;
    return result;
  }

  async findByEmail(email: string) {
    const client = await this.clientRepository.findOne({ 
      where: { email },
      select: ['id', 'name', 'email', 'phoneNumber', 'createdAt', 'updatedAt']
    });

    if (!client) {
      throw new NotFoundException(`Client with email ${email} not found`);
    }

    return client;
  }

  async findOne(id: number) {
    const client = await this.clientRepository.findOne({ 
      where: { id },
      select: ['id', 'name', 'email', 'phoneNumber', 'createdAt', 'updatedAt']
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return client;
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
    return { ...client, id };
  }
}