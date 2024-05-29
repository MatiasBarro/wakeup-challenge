import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Order, OrderDto, Restaurant, RestaurantDto } from 'restaurant-types';
import { BadRequestException } from '@nestjs/common';

const restaurantMocks: Restaurant[] = Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Restaurant ${i + 1}`,
    address: '',
    image: '',
}));

const restaurantDataMock = new Map<string, RestaurantDto>(
    restaurantMocks.map((restaurant) => [
        restaurant.id,
        {
            ...restaurant,
            products: Array.from({ length: 5 }, (_, i) => ({
                id: `${restaurant.id}${i + 1}`,
                name: `Product ${restaurant.id}${i + 1}`,
                price: 1,
            })),
        },
    ]),
);

function orderDtoMapper(order: Order): OrderDto {
    const { id, restaurantId, products: orderProducts } = order;

    const { products, ...restaurant } = restaurantDataMock.get(restaurantId);

    return {
        id,
        restaurant,
        products: Object.entries(orderProducts).map(
            ([productId, quantity]) => ({
                ...products.find((product) => product.id === productId),
                quantity,
            }),
        ),
    };
}

describe('OrdersService', () => {
    let service: OrdersService;

    describe('create', () => {
        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    OrdersService,
                    {
                        provide: 'RESTAURANT_DATA',
                        useValue: restaurantDataMock,
                    },
                    {
                        provide: 'ORDERS_DATA',
                        useValue: new Map<string, Order>(),
                    },
                ],
            }).compile();

            service = module.get<OrdersService>(OrdersService);
        });

        it('should be defined', () => {
            expect(service).toBeDefined();
        });

        it('should create an order', () => {
            const order = {
                restaurantId: '1',
                products: {
                    '11': 3,
                },
            };

            const espected = expect(service.create(order)).toEqual({
                ...order,
                id: expect.any(String),
            });
        });

        it('should throw error when restaurant id is not provided', () => {
            const order = {
                restaurantId: '',
                products: {
                    '11': 3,
                },
            };

            try {
                service.create(order);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('Invalid restaurantId');
            }
        });

        it('should throw error when restaurant does not exists', () => {
            const order = {
                restaurantId: '100',
                products: {
                    '11': 3,
                    '': 2,
                },
            };

            try {
                service.create(order);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('Invalid restaurantId');
            }
        });

        it('should throw error when order has no products', () => {
            const order = {
                restaurantId: '1',
                products: {},
            };

            try {
                service.create(order);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe(
                    'Order must have at least one product',
                );
            }
        });

        it('should throw error when order has a product with 0 amount', () => {
            const order = {
                restaurantId: '1',
                products: {
                    '11': 0,
                    '12': 2,
                },
            };

            try {
                service.create(order);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('Invalid products: 11');
            }
        });

        it('should throw error when order has a product that not exists in restaurant', () => {
            const order = {
                restaurantId: '1',
                products: {
                    '11': 1,
                    '12': 2,
                    '22': 3,
                },
            };

            try {
                service.create(order);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('Invalid products: 22');
            }
        });

        it('should throw error when order has a product that not exists in restaurant and a product with 0 amount', () => {
            const order = {
                restaurantId: '1',
                products: {
                    '11': 1,
                    '12': 0,
                    '22': 3,
                },
            };

            try {
                service.create(order);
            } catch (error) {
                expect(error).toBeInstanceOf(BadRequestException);
                expect(error.message).toBe('Invalid products: 12, 22');
            }
        });
    });

    describe('findAll', () => {
        const orderDataMock = new Map<string, Order>([
            ['1', { id: '1', restaurantId: '1', products: { '11': 3 } }],
            [
                '2',
                { id: '2', restaurantId: '3', products: { '31': 2, '34': 1 } },
            ],
        ]);

        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    OrdersService,
                    {
                        provide: 'RESTAURANT_DATA',
                        useValue: restaurantDataMock,
                    },
                    {
                        provide: 'ORDERS_DATA',
                        useValue: orderDataMock,
                    },
                ],
            }).compile();

            service = module.get<OrdersService>(OrdersService);
        });

        it('should return an array', () => {
            expect(service.findAll({ page: 1, pageSize: 5 })).toBeInstanceOf(
                Array,
            );
        });

        it('should return a list with all restaurants', () => {
            const expected = Array.from(orderDataMock.values()).map(
                orderDtoMapper,
            );

            expect(service.findAll({ page: 1, pageSize: 5 })).toEqual(expected);
        });

        it('should return the first page with 1 restaurant', () => {
            const expected = [orderDataMock.get('1')].map(orderDtoMapper);

            expect(service.findAll({ page: 1, pageSize: 1 })).toEqual(expected);
        });

        it('should return the second page with 1 restaurant', () => {
            const expected = [orderDataMock.get('2')].map(orderDtoMapper);
            expect(service.findAll({ page: 2, pageSize: 1 })).toEqual(expected);
        });

        it('should return all restaurants when pageSize is bigger than restaurant amount', () => {
            const expected = Array.from(orderDataMock.values()).map(
                orderDtoMapper,
            );

            expect(service.findAll({ page: 1, pageSize: 10 })).toEqual(
                expected,
            );
        });

        it('should return an empty array when page and pageSize is out of array scope', () => {
            const expected = [];
            expect(service.findAll({ page: 2, pageSize: 10 })).toEqual(
                expected,
            );
        });

        it('should return an empty array when page is negative', () => {
            const expected = [];
            expect(service.findAll({ page: -1, pageSize: 10 })).toEqual(
                expected,
            );
        });

        it('should return an empty array when page is zero', () => {
            const expected = [];
            expect(service.findAll({ page: 0, pageSize: 10 })).toEqual(
                expected,
            );
        });

        it('should return an empty array when page size is negative', () => {
            const expected = [];
            expect(service.findAll({ page: 1, pageSize: -10 })).toEqual(
                expected,
            );
        });

        it('should return an empty array when page size is zero', () => {
            const expected = [];
            expect(service.findAll({ page: 1, pageSize: -10 })).toEqual(
                expected,
            );
        });
    });
});
