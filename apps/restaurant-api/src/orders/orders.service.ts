import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
    Order,
    OrderDto,
    Product,
    Restaurant,
    RestaurantDto,
    CreateOrderDto,
} from 'restaurant-types';
import { paginator } from '@/utils/paginator/paginator';

@Injectable()
export class OrdersService {
    private readonly orderProductsData: Map<
        string,
        { restaurant: Restaurant; products: Map<string, Product> }
    >;

    constructor(
        @Inject('RESTAURANT_DATA')
        private restaurantData: Map<string, RestaurantDto>,
        @Inject('ORDERS_DATA')
        private orders: Map<string, Order>,
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

    findAll({
        page,
        pageSize,
    }: {
        page: number;
        pageSize: number;
    }): OrderDto[] {
        const orders = paginator(
            Array.from(this.orders.values()),
            page,
            pageSize,
        );

        return orders.map((order) => {
            const { id, restaurantId, products: orderProducts } = order;
            const { restaurant, products } =
                this.orderProductsData.get(restaurantId);

            return {
                id,
                restaurant,
                products: Object.entries(orderProducts).map(
                    ([productId, quantity]) => ({
                        ...products.get(productId),
                        quantity,
                    }),
                ),
            };
        });
    }
}
