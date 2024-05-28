import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import RestaurantEntity from '@/data/entities/restaurant.entity';
import { Restaurant } from 'restaurant-types';
import { NotFoundException } from '@nestjs/common';

const restaurantMocks: Restaurant[] = Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Restaurant ${i + 1}`,
    address: '',
    image: '',
}));

const restaurantDataMock = new Map<string, RestaurantEntity>(
    restaurantMocks.map((restaurant) => [
        restaurant.id,
        {
            ...restaurant,
            products: Array.from({ length: 5 }, (_, i) => ({
                id: `${restaurant.id}1`,
                name: `Product ${restaurant.id}1`,
                price: 1,
            })),
        },
    ]),
);

describe('RestaurantsService', () => {
    let service: RestaurantsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RestaurantsService,
                { provide: 'RESTAURANT_DATA', useValue: restaurantDataMock },
            ],
        }).compile();

        service = module.get<RestaurantsService>(RestaurantsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAll', () => {
        it('should return an array', () => {
            expect(service.findAll({ page: 1, pageSize: 5 })).toBeInstanceOf(
                Array,
            );
        });

        it('should return a list with all restaurants', () => {
            const expected = [...restaurantMocks];
            expect(service.findAll({ page: 1, pageSize: 5 })).toEqual(expected);
        });

        it('should return the first page with 3 restaurants', () => {
            const expected = [
                restaurantMocks[0],
                restaurantMocks[1],
                restaurantMocks[2],
            ];
            expect(service.findAll({ page: 1, pageSize: 3 })).toEqual(expected);
        });

        it('should return the second page with 1 restaurant', () => {
            const expected = [restaurantMocks[1]];
            expect(service.findAll({ page: 2, pageSize: 1 })).toEqual(expected);
        });

        it('should return the second page with remaining restaurants', () => {
            const expected = [restaurantMocks[3], restaurantMocks[4]];
            expect(service.findAll({ page: 2, pageSize: 3 })).toEqual(expected);
        });

        it('should return all restaurants when pageSize is bigger than restaurant amount', () => {
            const expected = [...restaurantMocks];
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
    });

    describe('findRestaurantProducts', () => {
        it('should return an array', () => {
            expect(
                service.findRestaurantProducts({
                    restaurantId: '1',
                    page: 1,
                    pageSize: 5,
                }),
            ).toBeInstanceOf(Array);
        });

        it("should return an with all restaurant's products", () => {
            const expected = [...restaurantDataMock.get('1').products];
            expect(
                service.findRestaurantProducts({
                    restaurantId: '1',
                    page: 1,
                    pageSize: 5,
                }),
            ).toEqual(expected);
        });

        it('should return the first page with 3 restaurants', () => {
            const restaurantProducts = restaurantDataMock.get('1').products;
            const expected = [
                restaurantProducts[0],
                restaurantProducts[1],
                restaurantProducts[2],
            ];
            expect(
                service.findRestaurantProducts({
                    restaurantId: '1',
                    page: 1,
                    pageSize: 3,
                }),
            ).toEqual(expected);
        });

        it('should return the second page with 1 restaurant', () => {
            const restaurantProducts = restaurantDataMock.get('1').products;
            const expected = [restaurantProducts[1]];
            expect(
                service.findRestaurantProducts({
                    restaurantId: '1',
                    page: 2,
                    pageSize: 1,
                }),
            ).toEqual(expected);
        });

        it('should return the second page with remaining restaurants', () => {
            const restaurantProducts = restaurantDataMock.get('1').products;
            const expected = [restaurantProducts[3], restaurantProducts[4]];
            expect(
                service.findRestaurantProducts({
                    restaurantId: '1',
                    page: 2,
                    pageSize: 3,
                }),
            ).toEqual(expected);
        });

        it('should return all restaurants when pageSize is bigger than restaurant amount', () => {
            const restaurantProducts = restaurantDataMock.get('1').products;
            const expected = [...restaurantProducts];
            expect(
                service.findRestaurantProducts({
                    restaurantId: '1',
                    page: 1,
                    pageSize: 10,
                }),
            ).toEqual(expected);
        });

        it('should return an empty array when page and pageSize is out of array scope', () => {
            const expected = [];
            expect(
                service.findRestaurantProducts({
                    restaurantId: '1',
                    page: 2,
                    pageSize: 10,
                }),
            ).toEqual(expected);
        });

        it('should rise an error when restaurant does not exists', () => {
            try {
                service.findRestaurantProducts({
                    restaurantId: '100',
                    page: 1,
                    pageSize: 10,
                });
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toBe('Restaurant#100 not found');
            }
        });
    });
});
