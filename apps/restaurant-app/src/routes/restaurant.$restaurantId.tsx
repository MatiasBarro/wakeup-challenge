import { useEffect } from 'react';
import { Product } from 'restaurant-types';
import { fetchRestaurantById } from '@/api';
import OrderDrawer from '@/components/restaurants/OrderDrawer';
import ProductList from '@/components/restaurants/ProductList';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { useOrderStore } from '@/stores/useOrderStore';
import { createFileRoute, useLocation } from '@tanstack/react-router';

export const Route = createFileRoute('/restaurant/$restaurantId')({
    component: () => <Restaurant />,
    loader: async ({ params: { restaurantId } }) => {
        const { products, ...restaurant } =
            await fetchRestaurantById(restaurantId);

        const productsMap = products
            ? products?.reduce(
                  (acc, product) => {
                      acc[product.id] = product;
                      return acc;
                  },
                  {} as Record<string, Product>,
              )
            : {};

        return {
            restaurant,
            products: productsMap,
        };
    },
});

export function Restaurant() {
    const location = useLocation();
    const { restaurant, products } = Route.useLoaderData();
    const resetOrderState = useOrderStore((state) => state.resetState);

    useEffect(() => {
        resetOrderState(restaurant.id);
    }, [location.pathname]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <TypographyH3>{restaurant.name}</TypographyH3>
                    <span>{restaurant.address}</span>
                </div>
                <OrderDrawer
                    products={products}
                    onOrderCreated={() => resetOrderState(restaurant.id)}
                />
            </div>
            <ProductList products={Object.values(products)} />
        </div>
    );
}
