import axios from 'axios';
import { Product, Restaurant } from 'restaurant-types';

const instance = axios.create({
    baseURL: import.meta.env.VITE_RESTAURANT_API_URL,
});

export async function fetchRestaurants(): Promise<Restaurant[]> {
    const { data } = await instance.get<Restaurant[]>('/restaurants', {
        params: { page: 1, pageSize: 10 },
    });
    return data;
}

export async function fetchRestaurantProducts(
    restaurantId: string,
): Promise<Product[]> {
    const { data } = await instance.get<Product[]>(
        `/restaurants/${restaurantId}/products`,
        {
            params: { page: 1, pageSize: 50 },
        },
    );
    return data;
}
