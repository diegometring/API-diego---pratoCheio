import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu, Category } from '../entity/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(data: { 
    name: string;
    description: string;
    price: number;
    category: Category;
    available?: boolean;
  }) {
    const menu = this.menuRepository.create({
      ...data,
      available: data.available ?? true,
    });
    return this.menuRepository.save(menu);
  }

  async findAll() {
    return this.menuRepository.find();
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({ where: { id } });
    if (!menu) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
    return menu;
  }

  async update(id: number, data: { 
    name?: string;
    description?: string;
    price?: number;
    category?: Category;
    available?: boolean;
  }) {
    const menu = await this.findOne(id);
    this.menuRepository.merge(menu, data);
    return this.menuRepository.save(menu);
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
    return this.menuRepository.remove(menu);
  }
}