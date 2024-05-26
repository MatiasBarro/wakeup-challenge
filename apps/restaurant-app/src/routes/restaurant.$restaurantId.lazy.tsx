import OrderDrawer, { OrderItem } from '@/components/restaurants/OrderDrawer';
import ProductList from '@/components/restaurants/ProductList';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
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
    // const [orderItems, setOrderItems] = useState<Record<string, OrderItem>>(
    //     Object.values(products).reduce(
    //         (acc, product) => {
    //             acc[product.id] = { itemId: product.id, quantity: 0 };
    //             return acc;
    //         },
    //         {} as Record<string, OrderItem>,
    //     ),
    // );

    const [orderItems, setOrderItems] = useState<Record<string, OrderItem>>({});

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row justify-between">
                <TypographyH3>SuperSano</TypographyH3>
                <OrderDrawer
                    products={products}
                    order={Object.values(orderItems)}
                />
            </div>
            <ProductList products={Object.values(products)} />
        </div>
    );
}
