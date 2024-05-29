import { Order } from 'restaurant-types';

export type CreateOrderDto = Omit<Order, 'id'>;
