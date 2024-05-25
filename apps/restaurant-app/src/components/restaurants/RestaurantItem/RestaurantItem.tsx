import { cn } from '@/lib/utils';
import { Restaurant } from 'restaurant-types';

export type RestaurantItemProps = {
    restaurant: Restaurant;
    className?: string;
};

export function RestaurantItem({ restaurant, className }: RestaurantItemProps) {
    return (
        <div
            className={cn(
                'flex flex-col md:flex-row border-2 rounded-sm',
                className,
            )}
        >
            <img src={restaurant.image} className="md:w-[120px]" />
            <div className="flex flex-col border-t-2 md:border-t-0 md:border-l-2 p-2">
                <span className="text-lg font-bold">{restaurant.name}</span>
                <span className="text-sm text-secondary-foreground">
                    {restaurant.address}
                </span>
            </div>
        </div>
    );
}
