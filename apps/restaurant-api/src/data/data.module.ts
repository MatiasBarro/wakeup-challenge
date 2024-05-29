import { Global, Module } from '@nestjs/common';
import { restaurants } from './restaurant.json';
import { RestaurantDto } from 'restaurant-types';

@Global()
@Module({
    providers: [
        {
            provide: 'RESTAURANT_DATA',
            useFactory: (): Map<string, RestaurantDto> => {
                console.log('Restaurant data loaded');
                return new Map(
                    restaurants.map((restaurant) => [
                        restaurant.id,
                        restaurant,
                    ]),
                );
            },
        },
    ],
    exports: ['RESTAURANT_DATA'],
})
export class DataModule {}
