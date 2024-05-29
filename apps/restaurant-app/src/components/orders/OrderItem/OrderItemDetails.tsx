import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { OrderDto } from 'restaurant-types';

type OrderItemDetailsProps = {
    products: OrderDto['products'];
    className?: string;
};

export function OrderItemDetails({
    products,
    className,
}: OrderItemDetailsProps) {
    const orderTotal = useMemo(
        () =>
            products.reduce(
                (total, item) => (total += item.quantity * item.price),
                0,
            ),
        [products],
    );

    return (
        <div className={cn('flex flex-col gap-2', className)}>
            <span className="text-lg font-bold">Products</span>
            <div className="flex flex-col gap-1">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-row justify-between"
                    >
                        <span className="text-md">
                            {product.quantity} x {product.name}
                        </span>
                        <span className="text-md">
                            ${(product.quantity * product.price).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
            <hr className="w-full my-2" />
            <span className="text-md font-bold self-end">
                Total: ${orderTotal.toFixed(2)}
            </span>
        </div>
    );
}
