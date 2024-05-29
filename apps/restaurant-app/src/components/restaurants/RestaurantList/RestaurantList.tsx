import { Restaurant } from 'restaurant-types';
import { RestaurantItem } from './RestaurantItem';
import { useNavigate } from '@tanstack/react-router';

type RestaurantListProps = {
    restaurants: Restaurant[];
};

export function RestaurantList({ restaurants }: RestaurantListProps) {
    const navigate = useNavigate({ from: '/' });
    return (
        <div className="flex flex-wrap gap-y-8 justify-between">
            {restaurants.map((restaurant) => (
                <RestaurantItem
                    key={restaurant.id}
                    restaurant={restaurant}
                    className="w-full"
                    onClick={() =>
                        navigate({
                            to: '/restaurant/$restaurantId',
                            params: { restaurantId: restaurant.id },
                        })
                    }
                />
            ))}
        </div>
    );
}
