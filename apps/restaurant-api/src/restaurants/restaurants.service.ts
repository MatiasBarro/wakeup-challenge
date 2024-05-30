/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product, Restaurant } from 'restaurant-types';
import { paginator } from '@/utils/paginator/paginator';
import { RestaurantDto } from 'restaurant-types';

@Injectable()
export class RestaurantsService {
    constructor(
        @Inject('RESTAURANT_DATA')
        private restaurantData: Map<string, RestaurantDto>,
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
                ({ products: _, ...restaurant }) => restaurant,
            ),
            page,
            pageSize,
        );
    }

    findById({
        id,
        withProducts = 0,
    }: {
        id: string;
        withProducts?: number;
    }): RestaurantDto {
        const restaurant = this.restaurantData.get(id);

        if (!restaurant) {
            throw new NotFoundException(`Restaurant#${id} not found`);
        }

        const { products, ...rest } = restaurant;

        return {
            ...rest,
            ...(withProducts > 0 && {
                products: paginator(restaurant.products, 1, withProducts),
            }),
        };
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
