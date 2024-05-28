import { fetchRestaurants } from '@/api';
import RestaurantList from '@/components/restaurants/RestaurantList';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: Index,
    loader: () => fetchRestaurants(),
});

function Index() {
    const restaurants = Route.useLoaderData();

    return (
        <div className="flex flex-col gap-4">
            <TypographyH3>Restaurants</TypographyH3>
            <RestaurantList restaurants={restaurants} />
        </div>
    );
}
