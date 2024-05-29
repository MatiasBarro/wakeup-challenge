import { cn } from '@/lib/utils';
import { OrderDto } from 'restaurant-types';
import { OrderItemRestaurant } from './OrderItemRestaurant';
import { OrderItemDetails } from './OrderItemDetails';

type OrderItemProps = {
    order: OrderDto;
    className?: string;
};

export function OrderItem({ order, className }: OrderItemProps) {
    return (
        <div
            className={cn(
                'flex flex-col border-2 rounded-sm p-2 gap-2',
                className,
            )}
        >
            <div className="flex flex-col md:flex-row justify-between gap-2 w-full">
                <span className="text-xl font-bold">Order #{order.id}</span>
                <OrderItemRestaurant restaurant={order.restaurant} />
            </div>
            <OrderItemDetails products={order.products} />
        </div>
    );
}
