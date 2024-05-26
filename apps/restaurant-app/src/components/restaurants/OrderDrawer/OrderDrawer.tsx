import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { Product } from 'restaurant-types';

export type OrderItem = { itemId: string; quantity: number };

type OrderDrawerProps = {
    products: Record<string, Product>;
    order: OrderItem[];
};

export function OrderDrawer({ products, order }: OrderDrawerProps) {
    const orderItems = useMemo(() => {
        return order.map((orderItem) => {
            const { name, price } = products[orderItem.itemId] ?? {
                name: 'unknown',
                price: 0,
            };
            return {
                ...orderItem,
                name,
                price: orderItem.quantity * price,
            };
        });
    }, [order, products]);

    const total = useMemo(() => {
        return orderItems.reduce((total, item) => (total += item.price), 0);
    }, [orderItems]);

    return (
        <Drawer>
            <DrawerTrigger>
                <div className={cn({ hidden: orderItems.length === 0 })}>
                    <Button variant="outline">View Order</Button>
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Order Details</DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col p-4">
                    <div>
                        {orderItems.map((orderItem) => (
                            <div
                                key={orderItem.itemId}
                                className="flex flex-row justify-between"
                            >
                                <span>
                                    {orderItem.quantity} x {orderItem.name}
                                </span>
                                <span>
                                    $
                                    {(
                                        orderItem.quantity * orderItem.price
                                    ).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <span className="flex flex-row pt-2 border-t-2 justify-end">
                        Total: ${total.toFixed(2)}{' '}
                    </span>
                </div>
                <DrawerFooter className="pt-2">
                    <div className="flex flex-col gap-2">
                        <Button>Create</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
