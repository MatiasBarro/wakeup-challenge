import { Restaurant } from 'restaurant-types';

type OrderItemRestaurantProps = {
    restaurant: Restaurant;
};

export function OrderItemRestaurant({ restaurant }: OrderItemRestaurantProps) {
    return (
        <div className="flex flex-col md:items-end">
            <span className="text-md font-bold">{restaurant.name}</span>
            <span className="text-md">{restaurant.address}</span>
        </div>
    );
}
