import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from './stock/stock.module';
import { MenuModule } from './menu/menu.module';
import { ClientModule } from './client/client.module';
import { Stock } from './entity/stock.entity';
import { Menu } from './entity/menu.entity';
import { Client } from './entity/client.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'pratocheio',
      url: 'postgresql://postgres:123@localhost:5432/pratocheio',
      entities: [Stock, Menu, Client],
      synchronize: true,
    }),
    StockModule,
    MenuModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }