import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order, CreateOrderDto } from 'restaurant-types';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    @ApiOperation({ summary: 'Create Order' })
    @ApiResponse({ status: 200 })
    create(@Body() order: CreateOrderDto): Order {
        return this.ordersService.create(order);
    }

    @Get()
    @ApiOperation({ summary: 'Fetch Orders' })
    @ApiQuery({ name: 'page', required: false, type: 'number' })
    @ApiQuery({ name: 'pageSize', required: false, type: 'number' })
    @ApiResponse({ status: 200 })
    findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
        return this.ordersService.findAll({ page, pageSize });
    }
}
