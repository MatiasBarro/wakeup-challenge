import { Product } from 'restaurant-types';
import { ProductItem } from './ProductItem';
import { useOrderStore } from '@/stores/useOrderStore';

type ProductListProps = {
    products: Product[];
    className?: string;
};

export function ProductList({ products, className }: ProductListProps) {
    const order = useOrderStore((state) => state.order);
    const addItemToOrder = useOrderStore((state) => state.addItemToOrder);
    const removeItemFromOrder = useOrderStore(
        (state) => state.removeItemFromOrder,
    );

    return (
        <div className={`flex flex-wrap gap-y-4 justify-between ${className}`}>
            {products.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                    className="w-full lg:w-[calc(50%-1rem)]"
                    orderQuantity={order[product.id] ?? 0}
                    addItemToOrder={() => addItemToOrder(product.id)}
                    removeItemFromOrder={() => removeItemFromOrder(product.id)}
                />
            ))}
        </div>
    );
}
