import { Restaurant } from 'restaurant-types';
import { RestaurantItem } from './RestaurantItem';

type RestaurantListProps = {
    restaurants: Restaurant[];
};

export function RestaurantList({ restaurants }: RestaurantListProps) {
    return (
        <div className="flex flex-wrap gap-y-8 justify-between">
            {restaurants.map((restaurant) => (
                <RestaurantItem
                    restaurant={restaurant}
                    className="w-full lg:w-[calc(50%-1rem)]"
                />
            ))}
        </div>
    );
}
