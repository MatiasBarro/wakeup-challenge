import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Order, Product, Restaurant, RestaurantDto } from 'restaurant-types';
import { CreateOrderDto } from './entities/create-order.dto';

@Injectable()
export class OrdersService {
    private readonly orders: Map<string, Order> = new Map();
    private readonly orderProductsData: Map<
        string,
        { restaurant: Restaurant; products: Map<string, Product> }
    >;

    constructor(
        @Inject('RESTAURANT_DATA')
        private restaurantData: Map<string, RestaurantDto>,
    ) {
        this.orderProductsData = new Map(
            Array.from(this.restaurantData.values()).map((restaurant) => {
                const { products, ...rest } = restaurant;
                return [
                    rest.id,
                    {
                        restaurant: rest,
                        products: new Map(
                            products.map((product) => [product.id, product]),
                        ),
                    },
                ];
            }),
        );
        console.log('Order service initialized');
    }

    create(order: CreateOrderDto) {
        if (
            !order.restaurantId ||
            !this.orderProductsData.has(order.restaurantId)
        ) {
            throw new BadRequestException(`Invalid restaurantId`);
        }

        const orderProductEntries = Object.entries(order.products);

        if (!orderProductEntries.length) {
            throw new BadRequestException(
                'Order must have at least one product',
            );
        }

        const { products } = this.orderProductsData.get(order.restaurantId);

        const badProducts = orderProductEntries
            .filter(
                ([productId, quantity]) =>
                    quantity <= 0 || !products.has(productId),
            )
            .map(([productId]) => productId);

        if (badProducts.length) {
            throw new BadRequestException(
                `Invalid products: ${badProducts.join(', ')}`,
            );
        }

        const orderId = this.orders.size + 1;
        const newOrder = {
            ...order,
            id: orderId.toString(),
        };

        this.orders.set(newOrder.id, newOrder);

        return newOrder;
    }

    findAll() {
        return `This action returns all orders`;
    }
}
