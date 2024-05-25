import { ShoppingCart, Utensils } from 'lucide-react';
import { NavigationBarLink } from './NavigationBarLink';

export function NavigationBar() {
    return (
        <div className="flex justify-between lg:justify-normal lg:gap-12 align-center p-4 border-b-2 flex-wrap items-center">
            <span className="text-lg font-bold">Restaurant Manager</span>
            <div className="flex gap-4">
                <NavigationBarLink
                    to="/"
                    icon={<Utensils className="w-4 h-4" />}
                    text={<span>Restaurants</span>}
                />
                <NavigationBarLink
                    to="/orders"
                    icon={<ShoppingCart className="w-4 h-4" />}
                    text={<span>Orders</span>}
                />
            </div>
        </div>
    );
}
