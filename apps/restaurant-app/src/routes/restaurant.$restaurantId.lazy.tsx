import OrderDrawer from '@/components/restaurants/OrderDrawer';
import ProductList from '@/components/restaurants/ProductList';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Product } from 'restaurant-types';

export const Route = createLazyFileRoute('/restaurant/$restaurantId')({
    component: () => <Restaurant />,
});

const products: Record<string, Product> = {
    '1': { id: '1', name: 'Kuva Roast Rib-Eye', price: 418 },
    '2': { id: '2', name: 'Guadalupe Half Rack', price: 298 },
    '3': { id: '3', name: 'Tohono Chicken', price: 308 },
};

export function Restaurant() {
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
