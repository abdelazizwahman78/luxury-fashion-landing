import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useCartStore, type CartItem } from "@/lib/stores/cart-store";

export type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  color?: string;
  size?: string;
};

type WishlistStore = {
  items: WishlistItem[];
  toggleWishlistItem: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  moveToCart: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
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

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlistItem: (item) => {
        const exists = get().items.some((current) => current.id === item.id);

        if (exists) {
          set((state) => ({ items: state.items.filter((current) => current.id !== item.id) }));
          return;
        }

        set((state) => ({ items: [...state.items, item] }));
      },
      removeFromWishlist: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      },
      clearWishlist: () => set({ items: [] }),
      moveToCart: (item) => {
        useCartStore.getState().addToCart(item as Omit<CartItem, "quantity">);
        set((state) => ({ items: state.items.filter((current) => current.id !== item.id) }));
      },
      isWishlisted: (id) => get().items.some((item) => item.id === id),
    }),
    {
      name: "aurelia-wishlist",
      storage: createJSONStorage(() => storage),
    },
  ),
);
