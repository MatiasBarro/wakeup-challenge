import { useMemo } from 'react';
import { Product } from 'restaurant-types';
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
import { useOrderStore } from '@/stores/useOrderStore';

type OrderDrawerProps = {
    products: Record<string, Product>;
};

type OrderItem = {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
};

export function OrderDrawer({ products }: OrderDrawerProps) {
    const order = useOrderStore((state) => state.order);
    const orderItems: OrderItem[] = useMemo(
        () =>
            Object.entries(order).map((item) => {
                const [itemId, quantity] = item;
                const { name, price } = products[itemId];
                return {
                    itemId,
                    name,
                    price,
                    quantity,
                };
            }),
        [order],
    );

    const total = useMemo(() => {
        return orderItems.reduce(
            (total, item) => (total += item.quantity * item.price),
            0,
        );
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
                    <hr className="my-4" />
                    <span className="font-bold self-end">
                        Total: ${total.toFixed(2)}
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
