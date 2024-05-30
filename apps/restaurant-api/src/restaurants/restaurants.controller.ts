import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Product, Restaurant, RestaurantDto } from 'restaurant-types';
import {
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Get()
    @ApiOperation({ summary: 'Fetch Restaurants' })
    @ApiQuery({ name: 'page', required: false, type: 'number' })
    @ApiQuery({ name: 'pageSize', required: false, type: 'number' })
    @ApiResponse({ status: 200, isArray: true })
    findAll(
        @Query('page') page = 1,
        @Query('pageSize') pageSize = 10,
    ): Restaurant[] {
        return this.restaurantsService.findAll({ page, pageSize });
    }

    @Get('/:restaurantId')
    @ApiOperation({ summary: 'Fetch Restaurant by Id' })
    @ApiParam({ name: 'restaurantId', required: true, type: 'number' })
    @ApiQuery({ name: 'withProducts', required: false, type: 'number' })
    @ApiResponse({ status: 200 })
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
    @ApiOperation({ summary: "Fetch Restaurant's products" })
    @ApiParam({ name: 'restaurantId', required: true, type: 'number' })
    @ApiQuery({ name: 'page', required: false, type: 'number' })
    @ApiQuery({ name: 'pageSize', required: false, type: 'number' })
    @ApiResponse({ status: 200, isArray: true })
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
