import { Product } from 'restaurant-types';
import { ProductItem } from './ProductItem';
import { useOrderStore } from '@/stores/useOrderStore';
import { fetchRestaurantProducts } from '@/api';
import InfiniteScroll from '@/components/common/InfiniteScroll';

type ProductListProps = {
    products: Product[];
    restaurantId: string;
    className?: string;
};

export function ProductList({
    products,
    restaurantId,
    className,
}: ProductListProps) {
    const orderItems = useOrderStore((state) => state.items);
    const addProducts = useOrderStore((state) => state.addProducts);
    const addItemToOrder = useOrderStore((state) => state.addItemToOrder);
    const removeItemFromOrder = useOrderStore(
        (state) => state.removeItemFromOrder,
    );

    return (
        <InfiniteScroll
            className={`flex flex-wrap gap-y-4 justify-between ${className}`}
            initialItems={products}
            fetchMoreItems={async (index) => {
                const newProducts = await fetchRestaurantProducts(
                    restaurantId,
                    3 + index,
                    5,
                );
                addProducts(newProducts);
                return newProducts;
            }}
        >
            {(items) => {
                return items.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        className="w-full"
                        orderQuantity={orderItems[product.id] ?? 0}
                        addItemToOrder={() => addItemToOrder(product.id)}
                        removeItemFromOrder={() =>
                            removeItemFromOrder(product.id)
                        }
                    />
                ));
            }}
        </InfiniteScroll>
    );
}
