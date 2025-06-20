import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('stock')
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameProduct: string;

  @Column()
  quantity: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}