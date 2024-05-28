import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import RestaurantEntity from '@/data/entities/restaurant.entity';
import { Restaurant } from 'restaurant-types';

const restaurantMocks: Restaurant[] = Array.from({ length: 5 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Restaurant ${i + 1}`,
    address: '',
    image: '',
}));

const restaurantDataMock = new Map<string, RestaurantEntity>(
    restaurantMocks.map((restaurant) => [
        restaurant.id,
        { ...restaurant, products: [{ id: '1', name: 'Product 1', price: 1 }] },
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

    describe('findAll', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
        });

        it('should return an array', () => {
            expect(service.findAll({ page: 1, pageSize: 5 })).toBeInstanceOf(
                Array,
            );
        });

        it('should return an with all restaurants', () => {
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
});
