import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'restaurant-types';
import { CreateOrderDto } from './entities/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body() order: CreateOrderDto): Order {
        return this.ordersService.create(order);
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }
}
