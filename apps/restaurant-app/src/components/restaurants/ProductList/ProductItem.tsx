import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import { Product } from 'restaurant-types';

export type ProductItemProps = {
    product: Product;
    orderQuantity: number;
    addItemToOrder: () => void;
    removeItemFromOrder: () => void;
    className?: string;
};

export function ProductItem({
    product,
    orderQuantity = 0,
    addItemToOrder,
    removeItemFromOrder,
    className,
}: ProductItemProps) {
    return (
        <div
            className={cn(
                'flex flex-col border-2 rounded-sm p-2 gap-4',
                className,
            )}
        >
            <div className="flex flex-row justify-between w-full">
                <span className="text-lg font-bold">{product.name}</span>
                <span className="text-lg">${product.price.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-end items-center gap-4">
                <Button
                    size="icon"
                    disabled={orderQuantity === 0}
                    onClick={removeItemFromOrder}
                >
                    <Minus />
                </Button>
                <span className="text-lg">{orderQuantity}</span>
                <Button size="icon" onClick={addItemToOrder}>
                    <Plus />
                </Button>
            </div>
        </div>
    );
}
