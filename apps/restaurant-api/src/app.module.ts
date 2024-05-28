import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DataModule } from './data/data.module';

@Module({
    imports: [RestaurantsModule, DataModule],
})
export class AppModule {}
