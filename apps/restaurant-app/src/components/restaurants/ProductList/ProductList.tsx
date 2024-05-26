import { Product } from 'restaurant-types';
import { ProductItem } from './ProductItem';

type ProductListProps = {
    products: Product[];
    className?: string;
};

export function ProductList({ products, className }: ProductListProps) {
    return (
        <div className={`flex flex-wrap gap-y-4 justify-between ${className}`}>
            {products.map((product) => (
                <ProductItem
                    product={product}
                    className="w-full lg:w-[calc(50%-1rem)]"
                />
            ))}
        </div>
    );
}
