import {
    BadRequestException,
    Controller,
    Get,
    Param,
    Query,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Product, Restaurant, RestaurantDto } from 'restaurant-types';
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

    @Get('/:restaurantId')
    findById(
        @Param('restaurantId') restaurantId: string,
        @Query('withProducts') withProducts: number = 0,
    ): RestaurantDto {
        return this.restaurantsService.findById({
            id: restaurantId,
            withProducts,
        });
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
