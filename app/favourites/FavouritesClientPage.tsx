"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart-store";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { showToast } from "@/lib/toast";

export function FavouritesClientPage() {
  const favourites = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const moveToCart = useWishlistStore((state) => state.moveToCart);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    showToast("Removed from Wishlist");
  };

  const handleMoveToCart = (item: { id: string; name: string; price: number; image: string; brand?: string }) => {
    moveToCart(item);
    addToCart({ id: item.id, name: item.name, price: item.price, image: item.image, brand: item.brand }, 1);
    showToast("Added to Cart");
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Favourites" }]} />

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Saved pieces</div>
            <h1 className="mt-2 text-[2.3rem] font-semibold tracking-[-0.05em] text-[#222222] lg:text-[4rem]">Your favourites</h1>
          </div>
          <Button variant="secondary" onClick={() => favourites.forEach((item) => handleMoveToCart(item))}>Move all to bag</Button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {favourites.length === 0 ? (
            <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.04)] md:col-span-2 xl:col-span-3">
              <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">No favourites yet</div>
              <p className="mt-3 text-sm text-[#6a6a6a]">Save the pieces you love and come back to them whenever your wardrobe inspiration returns.</p>
            </div>
          ) : null}
          {favourites.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[20px] border border-[#dddddd] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="relative h-72">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 1280px) 50vw, 33vw" />
                <button type="button" aria-label={`Remove ${item.name} from favourites`} onClick={() => handleRemove(item.id)} className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#222222] shadow-sm transition hover:bg-[#ff385c] hover:text-white">
                  <Heart className="h-4 w-4 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-[#222222]">{item.name}</h2>
                    <p className="mt-2 text-sm text-[#6a6a6a]">Ready for your next occasion</p>
                  </div>
                  <div className="text-lg font-semibold text-[#222222]">${item.price}</div>
                </div>
                <div className="mt-5 flex gap-3">
                  <button type="button" onClick={() => handleMoveToCart(item)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#ff385c] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#e00b41]">
                    <ShoppingBag className="h-4 w-4" />
                    Add to bag
                  </button>
                  <button type="button" onClick={() => handleRemove(item.id)} className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#dddddd] bg-[#f7f7f7] text-[#222222] transition hover:text-[#ff385c]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[20px] border border-[#dddddd] bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">No favourites yet</div>
              <p className="mt-3 text-sm text-[#6a6a6a]">Save the pieces you love and come back to them whenever your wardrobe inspiration returns.</p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-[8px] border border-[#dddddd] bg-[#f7f7f7] px-5 py-3 text-sm font-medium text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]">
              Explore products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
