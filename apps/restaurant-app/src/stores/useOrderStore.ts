import { create } from 'zustand';

type OrderState = {
    restaurantId: string;
    products: Record<string, number>;
    addItemToOrder: (itemId: string) => void;
    removeItemFromOrder: (itemId: string) => void;
    resetState: (restaurantId: string) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
    restaurantId: '',
    products: {},
    addItemToOrder: (itemId: string) =>
        set((state) => {
            return {
                products: {
                    ...state.products,
                    [itemId]: (state.products[itemId] ?? 0) + 1,
                },
            };
        }),
    removeItemFromOrder: (itemId: string) =>
        set((state) => {
            const quantity = state.products[itemId] ?? 0;
            if (quantity - 1 <= 0) {
                const { [itemId]: _, ...rest } = state.products;
                return {
                    products: rest,
                };
            }

            return {
                products: {
                    ...state.products,
                    [itemId]: quantity - 1,
                },
            };
        }),
    resetState: (restaurantId) => set({ restaurantId, products: {} }),
}));
