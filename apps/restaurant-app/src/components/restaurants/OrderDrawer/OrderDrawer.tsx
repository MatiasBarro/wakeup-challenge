import { useMemo, useState } from 'react';
import { OrderDto, Product } from 'restaurant-types';
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
import { createOrder } from '@/api';
import Spinner from '@/components/common/Spinner';

type OrderDrawerProps = {
    products: Record<string, Product>;
    onOrderCreated: (order: Order) => void;
};

type OrderItem = {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
};

export function OrderDrawer({ products, onOrderCreated }: OrderDrawerProps) {
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const restaurantId = useOrderStore((state) => state.restaurantId);
    const orderProducts = useOrderStore((state) => state.products);
    const orderItems: OrderItem[] = useMemo(
        () =>
            Object.entries(orderProducts).map((item) => {
                const [itemId, quantity] = item;
                const { name, price } = products[itemId];
                return {
                    itemId,
                    name,
                    price,
                    quantity,
                };
            }),
        [orderProducts],
    );

    const total = useMemo(() => {
        return orderItems.reduce(
            (total, item) => (total += item.quantity * item.price),
            0,
        );
    }, [orderItems]);

    const handleCreateOrder = async () => {
        setIsCreatingOrder(true);
        const order = await createOrder({
            restaurantId,
            products: orderProducts,
        });
        console.log(order);
        setIsCreatingOrder(false);
        setIsDrawerOpen(false);
        onOrderCreated(order);
    };

    return (
        <Drawer
            onOpenChange={(open) => setIsDrawerOpen(open)}
            open={isDrawerOpen}
        >
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
                        <Button
                            onClick={handleCreateOrder}
                            disabled={isCreatingOrder}
                        >
                            {isCreatingOrder ? (
                                <Spinner className="w-6 h-6" />
                            ) : (
                                'Create Order'
                            )}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
