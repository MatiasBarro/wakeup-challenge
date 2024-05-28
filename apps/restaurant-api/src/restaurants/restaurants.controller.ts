import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Product, Restaurant } from 'restaurant-types';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Get()
    findAll(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10,
    ): Restaurant[] {
        return this.restaurantsService.findAll({ page, pageSize });
    }

    @Get('/:restaurantId/products')
    findRestaurantProducts(
        @Param('restaurantId') restaurantId: string,
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10,
    ): Product[] {
        return this.restaurantsService.findRestaurantProducts({
            restaurantId,
            page,
            pageSize,
        });
    }
}
