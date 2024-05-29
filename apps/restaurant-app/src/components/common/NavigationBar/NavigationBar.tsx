import { ShoppingCart, Utensils } from 'lucide-react';
import { NavigationBarLink } from './NavigationBarLink';
import { TypographyH3 } from '@/components/ui/typographyH3';

export function NavigationBar() {
    return (
        <div className="flex gap-y-4 justify-between lg:justify-normal lg:gap-12 align-center p-4 border-b-2 flex-wrap items-center sticky top-0 opacity-100 bg-white z-10">
            <TypographyH3>Restaurant Manager</TypographyH3>
            <div className="flex gap-2">
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
