import { Inject, Injectable } from '@nestjs/common';
import RestaurantEntity from '@/data/entities/restaurant.entity';
import { Restaurant } from 'restaurant-types';
import { paginator } from '@/utils/paginator/paginator';

@Injectable()
export class RestaurantsService {
    constructor(
        @Inject('RESTAURANT_DATA')
        private restaurantData: Map<string, RestaurantEntity>,
    ) {}

    findAll({
        page,
        pageSize,
    }: {
        page: number;
        pageSize: number;
    }): Restaurant[] {
        return paginator(
            Array.from(this.restaurantData.values()).map(
                ({ products, ...restaurant }) => restaurant,
            ),
            page,
            pageSize,
        );
    }
}
