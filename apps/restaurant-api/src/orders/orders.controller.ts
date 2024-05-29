import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, CreateOrderDto } from 'restaurant-types';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() order: CreateOrderDto): Order {
        return this.ordersService.create(order);
    }

    @Get()
    findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
        return this.ordersService.findAll({ page, pageSize });
    }
}
