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

    if (!orders.entries.length) {
    }

    return (
        <div className="flex flex-col gap-6">
            <TypographyH3>Orders</TypographyH3>
            {orders.entries.length === 0 && (
                <span className="text-lg">No Orders to display</span>
            )}
            {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
}
