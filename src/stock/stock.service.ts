import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../entity/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async create(data: { nameProduct: string; quantity: number; }) {
    const stock = this.stockRepository.create(data);
    return this.stockRepository.save(stock);
  }

  async findAll() {
    return this.stockRepository.find();
  }

  async findOne(id: number) {
    const stock = await this.stockRepository.findOne({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`Stock item with ID ${id} not found`);
    }
    return stock;
  }

  async update(id: number, data: { nameProduct?: string; quantity?: number; unitPrice?: number }) {
    const stock = await this.findOne(id);
    this.stockRepository.merge(stock, data);
    return this.stockRepository.save(stock);
  }

  async remove(id: number) {
    const stock = await this.findOne(id);
    return this.stockRepository.remove(stock);
  }
}