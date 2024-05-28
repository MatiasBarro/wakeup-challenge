import { fetchRestaurantProducts } from '@/api';
import OrderDrawer from '@/components/restaurants/OrderDrawer';
import ProductList from '@/components/restaurants/ProductList';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { useOrderStore } from '@/stores/useOrderStore';
import { createFileRoute, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Product } from 'restaurant-types';

export const Route = createFileRoute('/restaurant/$restaurantId')({
    component: () => <Restaurant />,
    loader: async ({ params: { restaurantId } }) => {
        const products = await fetchRestaurantProducts(restaurantId);
        return products.reduce(
            (acc, product) => {
                acc[product.id] = product;
                return acc;
            },
            {} as Record<string, Product>,
        );
    },
});

export function Restaurant() {
    const location = useLocation();
    const products = Route.useLoaderData();
    const resetOrderState = useOrderStore((state) => state.resetState);

    useEffect(() => {
        resetOrderState();
    }, [location.pathname]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
                <TypographyH3>SuperSano</TypographyH3>
                <OrderDrawer products={products} />
            </div>
            <ProductList products={Object.values(products)} />
        </div>
    );
}
