import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import RestaurantEntity from '@/data/entities/restaurant.entity';
import { Product, Restaurant } from 'restaurant-types';
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

    findRestaurantProducts({
        restaurantId,
        page,
        pageSize,
    }: {
        restaurantId: string;
        page: number;
        pageSize: number;
    }): Product[] {
        const restaurant = this.restaurantData.get(restaurantId);

        if (!restaurant) {
            throw new NotFoundException(`Restaurant#${restaurantId} not found`);
        }

        return paginator(restaurant.products, page, pageSize);
    }
}
