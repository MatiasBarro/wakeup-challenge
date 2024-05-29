import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import NavigationBar from '@/components/common/NavigationBar';
import { Toaster } from '@/components/ui/toaster';

export const Route = createRootRoute({
    component: () => (
        <div className="w-full min-h-screen">
            <NavigationBar />
            <div className="p-4">
                <Outlet />
            </div>
            <Toaster />
            <TanStackRouterDevtools />
        </div>
    ),
});
