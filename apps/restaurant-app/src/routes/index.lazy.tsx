import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
    component: Index,
});

function Index() {
    return <h3>Welcome Home!</h3>;
}
