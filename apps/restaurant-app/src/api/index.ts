import axios from 'axios';
import {
    CreateOrderDto,
    Order,
    OrderDto,
    Product,
    Restaurant,
    RestaurantDto,
} from 'restaurant-types';

const instance = axios.create({
    baseURL: import.meta.env.VITE_RESTAURANT_API_URL,
});

export async function fetchRestaurants(): Promise<Restaurant[]> {
    const { data } = await instance.get<Restaurant[]>('/restaurants', {
        params: { page: 1, pageSize: 10 },
    });
    return data;
}

export async function fetchRestaurantById(
    restaurantId: string,
    withProducts: number = 10,
): Promise<RestaurantDto> {
    const { data } = await instance.get<RestaurantDto>(
        `/restaurants/${restaurantId}`,
        {
            params: { withProducts },
        },
    );

    return data;
}

export async function fetchRestaurantProducts(
    restaurantId: string,
    page: number,
    pageSize: number = 10,
): Promise<Product[]> {
    const { data } = await instance.get<Product[]>(
        `/restaurants/${restaurantId}/products`,
        {
            params: { page, pageSize },
        },
    );
    return data;
}

export async function createOrder(order: CreateOrderDto): Promise<Order> {
    const { data } = await instance.post<Order>(`/orders`, order);

    return data;
}

export async function fetchOrders(): Promise<OrderDto[]> {
    const { data } = await instance.get<OrderDto[]>('/orders', {
        params: { page: 1, pageSize: 30 },
    });

    return data;
}
