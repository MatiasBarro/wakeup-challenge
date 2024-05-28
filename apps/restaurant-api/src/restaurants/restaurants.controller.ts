import { Controller, Get, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from 'restaurant-types';

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
}
