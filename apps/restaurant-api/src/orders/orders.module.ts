import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from 'restaurant-types';

@Module({
    controllers: [OrdersController],
    providers: [
        OrdersService,
        { provide: 'ORDERS_DATA', useValue: new Map<string, Order>() },
    ],
})
export class OrdersModule {}
