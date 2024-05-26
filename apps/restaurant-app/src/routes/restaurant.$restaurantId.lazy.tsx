import ProductList from '@/components/restaurants/ProductList';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Product } from 'restaurant-types';

export const Route = createLazyFileRoute('/restaurant/$restaurantId')({
    component: () => <Restaurant />,
});

const products: Product[] = [
    { id: '1', name: 'Kuva Roast Rib-Eye', price: 418 },
    { id: '2', name: 'Guadalupe Half Rack', price: 298 },
    { id: '3', name: 'Tohono Chicken', price: 308 },
];

export function Restaurant() {
    return (
        <div className="flex flex-col gap-6">
            <TypographyH3>SuperSano</TypographyH3>
            <ProductList products={products} />
        </div>
    );
}
