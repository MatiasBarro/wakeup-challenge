import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/orders')({
    component: Orders,
});

function Orders() {
    return <h3>Hello from Orders!</h3>;
}
