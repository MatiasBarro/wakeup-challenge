import { Product, Restaurant } from 'restaurant-types';

type RestaurantEntity = Restaurant & {
    products: Product[];
};

export default RestaurantEntity;
