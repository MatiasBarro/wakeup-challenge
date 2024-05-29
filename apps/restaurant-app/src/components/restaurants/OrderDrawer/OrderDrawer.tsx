import { useCallback, useMemo, useState } from 'react';
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
import { Order } from 'restaurant-types';
import { useToast } from '@/components/ui/use-toast';

type OrderDrawerProps = {
    onOrderCreated: (order: Order) => void;
};

type OrderItem = {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
};

export function OrderDrawer({ onOrderCreated }: OrderDrawerProps) {
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const restaurantId = useOrderStore((state) => state.restaurantId);
    const items = useOrderStore((state) => state.items);
    const products = useOrderStore((state) => state.products);
    const { toast } = useToast();

    const orderItems: OrderItem[] = useMemo(
        () =>
            Object.entries(items).map((item) => {
                const [itemId, quantity] = item;
                const { name, price } = products[itemId];
                return {
                    itemId,
                    name,
                    price,
                    quantity,
                };
            }),
        [items, products],
    );

    const total = useMemo(() => {
        return orderItems.reduce(
            (total, item) => (total += item.quantity * item.price),
            0,
        );
    }, [orderItems]);

    const handleCreateOrder = useCallback(async () => {
        setIsCreatingOrder(true);
        try {
            const order = await createOrder({
                restaurantId,
                products: items,
            });
            setIsDrawerOpen(false);
            onOrderCreated(order);
        } catch (error) {
            console.error('Error creating order', error);
            toast({
                title: 'Error creating order',
                description:
                    'An error occurred while creating the order. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsCreatingOrder(false);
        }
    }, [restaurantId, items, onOrderCreated, toast]);

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
