import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Restaurant } from 'restaurant-types';
import { AppModule } from '@/app.module';
import RestaurantEntity from '@/data/entities/restaurant.entity';

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

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                { provide: 'RESTAURANT_DATA', useValue: restaurantDataMock },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('/restaurants', () => {
        it('GET returns 200', () => {
            return request(app.getHttpServer()).get('/restaurants').expect(200);
        });
    });

    describe('/restaurants/:restaurantId/products', () => {
        it('GET returns 200', () => {
            return request(app.getHttpServer())
                .get('/restaurants/1/products')
                .expect(200);
        });

        it('GET returns 404 when restaurant does not exists', () => {
            return request(app.getHttpServer())
                .get('/restaurants/100/products')
                .expect(404);
        });
    });
});
