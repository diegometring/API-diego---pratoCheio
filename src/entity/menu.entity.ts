import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export enum Category {
  ENTRADA = 'ENTRADA',
  PRATO_PRINCIPAL = 'PRATO_PRINCIPAL',
  SOBREMESA = 'SOBREMESA',
  BEBIDA = 'BEBIDA',
  ACOMPANHAMENTO = 'ACOMPANHAMENTO'
}

@Entity('menu')
export class Menu extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'int' }) 
  price: number;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column({ default: true })
  available: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}