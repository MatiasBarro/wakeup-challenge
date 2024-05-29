import { fetchOrders } from '@/api';
import { OrderItem } from '@/components/orders/OrderItem/OrderItem';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/orders')({
    component: Orders,
    loader: () => fetchOrders(),
});

function Orders() {
    const orders = Route.useLoaderData();

    return (
        <div className="flex flex-col gap-6">
            <TypographyH3>Orders</TypographyH3>
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
}
