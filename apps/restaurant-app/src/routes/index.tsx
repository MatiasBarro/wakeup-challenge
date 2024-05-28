import { fetchRestaurants } from '@/api';
import RestaurantList from '@/components/restaurants/RestaurantList';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { createFileRoute } from '@tanstack/react-router';
// import { Restaurant } from 'restaurant-types';
// import logo from '@/assets/restaurant-logo.png';

export const Route = createFileRoute('/')({
    component: Index,
    loader: () => fetchRestaurants(),
});

// const restaurants: Restaurant[] = [
//     { name: 'Restaurant 1', address: '123 ASDF', id: '1', image: logo },
//     { name: 'Restaurant 2', address: '123 ASDF', id: '2', image: logo },
//     { name: 'Restaurant 3', address: '123 ASDF', id: '3', image: logo },
//     { name: 'Restaurant 4', address: '123 ASDF', id: '4', image: logo },
//     { name: 'Restaurant 5', address: '123 ASDF', id: '5', image: logo },
// ];

function Index() {
    const restaurants = Route.useLoaderData();

    return (
        <div className="flex flex-col gap-4">
            <TypographyH3>Restaurants</TypographyH3>
            <RestaurantList restaurants={restaurants} />
        </div>
    );
}
