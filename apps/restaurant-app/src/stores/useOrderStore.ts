import { create } from 'zustand';

type OrderState = {
    order: Record<string, number>;
    addItemToOrder: (itemId: string) => void;
    removeItemFromOrder: (itemId: string) => void;
    resetState: () => void;
};

export const useOrderStore = create<OrderState>((set) => ({
    order: {},
    addItemToOrder: (itemId: string) =>
        set((state) => {
            return {
                order: {
                    ...state.order,
                    [itemId]: (state.order[itemId] ?? 0) + 1,
                },
            };
        }),
    removeItemFromOrder: (itemId: string) =>
        set((state) => {
            const quantity = state.order[itemId] ?? 0;
            if (quantity - 1 <= 0) {
                const { [itemId]: _, ...rest } = state.order;
                return { order: rest };
            }

            return {
                order: {
                    ...state.order,
                    [itemId]: quantity - 1,
                },
            };
        }),
    resetState: () => set({ order: {} }),
}));
