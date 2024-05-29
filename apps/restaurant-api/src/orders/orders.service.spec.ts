import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Restaurant, RestaurantDto } from 'restaurant-types';
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

describe('OrdersService', () => {
    let service: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                { provide: 'RESTAURANT_DATA', useValue: restaurantDataMock },
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
    });

    describe('create', () => {
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

    describe('findAll', () => {});
});
