import React, { useEffect, useRef, useState } from 'react';
import Spinner from '../Spinner';

export type InfiniteScrollProps<T> = {
    initialItems?: T[];
    fetchMoreItems: (page: number) => Promise<T[]>;
    children: (items: T[]) => React.ReactNode;
    className?: string;
};

export function InfiniteScroll<T>({
    initialItems,
    fetchMoreItems,
    children,
    className,
}: InfiniteScrollProps<T>) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(1);
    const [items, setItems] = useState(initialItems ?? []);
    const [isLoading, setLoading] = useState(false);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !isLoading && hasMoreItems) {
                    setLoading(true);
                    const newItems = await fetchMoreItems(index);
                    setLoading(false);

                    if (newItems.length === 0) {
                        setHasMoreItems(false);
                        return;
                    }

                    setItems([...items, ...newItems]);
                    setIndex((prev) => prev + 1);
                }
            },
            { threshold: 1 },
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [loaderRef.current, index, fetchMoreItems]);

    return (
        <div className={className}>
            {children(items)}
            <div
                ref={loaderRef}
                className={`flex w-full justify-center ${!hasMoreItems && 'hidden'}`}
            >
                {isLoading && <Spinner />}
            </div>
        </div>
    );
}
