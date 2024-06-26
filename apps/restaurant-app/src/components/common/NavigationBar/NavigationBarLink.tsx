import { Link } from '@tanstack/react-router';

type NavigationBarLinkProps = {
    to: string;
    icon: React.ReactNode;
    text: React.ReactNode;
};

export function NavigationBarLink({
    to,
    icon,
    text,
}: NavigationBarLinkProps): JSX.Element {
    return (
        <Link
            to={to}
            className="flex items-center gap-2 p-2 hover:bg-secondary hover:rounded-sm"
        >
            {icon}
            <div className="hidden lg:block">{text}</div>
        </Link>
    );
}
