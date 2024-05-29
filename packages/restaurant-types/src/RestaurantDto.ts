import { Product } from './Product';
import { Restaurant } from './Restaurant';

export type RestaurantDto = Restaurant & { products?: Product[] };
