import { Global, Module } from '@nestjs/common';
import { restaurants } from './restaurant.json';
import RestaurantEntity from './entities/restaurant.entity';

@Global()
@Module({
    providers: [
        {
            provide: 'RESTAURANT_DATA',
            useFactory: (): Map<string, RestaurantEntity> => {
                console.log('Loading restaurant data');
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
