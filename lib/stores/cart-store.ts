import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  brand?: string;
};

type CartStore = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
  getShipping: () => number;
  getGrandTotal: () => number;
};

const storage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") {
      return null;
    }

    const value = window.localStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(name, value);
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(name);
    }
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (current) => current.id === item.id && current.size === item.size && current.color === item.color,
          );

          if (existingItem) {
            return {
              items: state.items.map((current) =>
                current.id === item.id && current.size === item.size && current.color === item.color
                  ? { ...current, quantity: current.quantity + quantity }
                  : current,
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity }],
          };
        });
      },
      removeFromCart: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      },
      increaseQuantity: (id) => {
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
        }));
      },
      decreaseQuantity: (id) => {
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.id !== id) {
              return [item];
            }

            if (item.quantity > 1) {
              return [{ ...item, quantity: item.quantity - 1 }];
            }

            return [];
          }),
        }));
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 500 ? 0 : 12;
      },
      getGrandTotal: () => get().getSubtotal() + get().getShipping(),
    }),
    {
      name: "aurelia-cart",
      storage: createJSONStorage(() => storage),
    },
  ),
);
