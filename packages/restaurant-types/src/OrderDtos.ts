import { Product } from './Product';
import { Restaurant } from './Restaurant';

export type OrderDto = {
    id: string;
    restaurant: Restaurant;
    products: (Product & { quantity: number })[];
};

export type CreateOrderDto = {
    restaurantId: string;
    products: Record<string, number>;
};
