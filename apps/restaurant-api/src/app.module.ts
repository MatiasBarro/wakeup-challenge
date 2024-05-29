import { Module } from '@nestjs/common';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DataModule } from './data/data.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [RestaurantsModule, DataModule, OrdersModule],
})
export class AppModule {}
