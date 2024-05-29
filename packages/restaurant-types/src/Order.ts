export type Order = {
    id: string;
    restaurantId: string;
    products: Record<string, number>;
};
