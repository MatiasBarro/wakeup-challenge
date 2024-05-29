import { Product } from 'restaurant-types';
import { create } from 'zustand';

type OrderState = {
    restaurantId: string;
    items: Record<string, number>;
    products: Record<string, Product>;
    addProducts: (products: Product[]) => void;
    addItemToOrder: (itemId: string) => void;
    removeItemFromOrder: (itemId: string) => void;
    resetState: (restaurantId: string) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
    restaurantId: '',
    items: {},
    products: {},
    addProducts: (products: Product[]) =>
        set((state) => {
            const productsMap = products?.reduce(
                (acc, product) => {
                    acc[product.id] = product;
                    return acc;
                },
                {} as Record<string, Product>,
            );

            return { products: { ...state.products, ...productsMap } };
        }),
    addItemToOrder: (itemId: string) =>
        set((state) => {
            return {
                items: {
                    ...state.items,
                    [itemId]: (state.items[itemId] ?? 0) + 1,
                },
            };
        }),
    removeItemFromOrder: (itemId: string) =>
        set((state) => {
            const quantity = state.items[itemId] ?? 0;
            if (quantity - 1 <= 0) {
                const { [itemId]: _, ...rest } = state.items;
                return {
                    items: rest,
                };
            }

            return {
                items: {
                    ...state.items,
                    [itemId]: quantity - 1,
                },
            };
        }),
    resetState: (restaurantId) =>
        set({ restaurantId, items: {}, products: {} }),
}));
