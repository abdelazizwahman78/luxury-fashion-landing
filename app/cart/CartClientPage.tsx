"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { useCartStore } from "@/lib/stores/cart-store";
import { showToast } from "@/lib/toast";

export function CartClientPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.getSubtotal());
  const totalItems = useCartStore((state) => state.getTotalItems());
  const shipping = useCartStore((state) => state.getShipping());
  const grandTotal = useCartStore((state) => state.getGrandTotal());

  const handleRemove = (id: string) => {
    removeFromCart(id);
    showToast("Removed from Cart");
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />

        <div className="mb-8">
          <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Your bag</div>
          <h1 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-[#222222] lg:text-[4rem]">Bag summary</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 text-center shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Empty bag</div>
                <p className="mt-3 text-sm text-[#6a6a6a]">Your shopping bag is empty. Add signature essentials to complete your wardrobe.</p>
              </div>
            ) : null}
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-[20px] border border-[#dddddd] bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.04)] sm:flex-row">
                <div className="relative h-36 w-full overflow-hidden rounded-[16px] bg-[#f7f7f7] sm:w-36">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 144px" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#222222]">{item.name}</h2>
                      <p className="mt-2 text-sm text-[#6a6a6a]">{item.color ?? "Classic"} · Size {item.size ?? "One Size"}</p>
                    </div>
                    <button type="button" aria-label={`Remove ${item.name}`} onClick={() => handleRemove(item.id)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dddddd] bg-[#f7f7f7] text-[#222222] transition hover:text-[#ff385c]">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3 rounded-full border border-[#dddddd] bg-[#f7f7f7] px-2 py-2">
                      <button type="button" aria-label="Decrease quantity" onClick={() => decreaseQuantity(item.id)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#222222]">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-4 text-center text-sm font-medium text-[#222222]">{item.quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => increaseQuantity(item.id)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#222222]">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-lg font-semibold text-[#222222]">${item.price * item.quantity}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Summary</div>
            <div className="mt-5 space-y-3 text-sm text-[#222222]">
              <div className="flex items-center justify-between"><span>Items</span><span>{totalItems}</span></div>
              <div className="flex items-center justify-between"><span>Subtotal</span><span>${subtotal}</span></div>
              <div className="flex items-center justify-between"><span>Shipping</span><span>${shipping}</span></div>
              <div className="border-t border-[#dddddd] pt-3 text-base font-semibold"><span>Total</span><span>${grandTotal}</span></div>
            </div>

            <div className="mt-5 flex items-center gap-2 rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3">
              <input className="w-full bg-transparent text-sm text-[#222222] outline-none placeholder:text-[#6a6a6a]" placeholder="Promo code" />
              <button type="button" className="rounded-full bg-[#222222] px-3 py-2 text-[0.62rem] uppercase tracking-[0.25em] text-white">Apply</button>
            </div>

            <div className="mt-6 space-y-3">
              <button type="button" onClick={() => { clearCart(); showToast("Removed from Cart"); }} className="flex w-full items-center justify-center rounded-[8px] border border-[#dddddd] bg-white px-5 py-3 text-sm font-medium text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]">
                Clear cart
              </button>
              <Link href="/checkout" className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#ff385c] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#e00b41]">
                Proceed to checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/products" className="flex w-full items-center justify-center rounded-[8px] border border-[#dddddd] bg-white px-5 py-3 text-sm font-medium text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]">
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-8 rounded-[20px] border border-[#dddddd] bg-white p-6">
          <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Empty bag</div>
          <p className="mt-3 text-sm text-[#6a6a6a]">Your shopping bag is {items.length === 0 ? "empty" : "ready to continue"}. Add signature essentials to complete your wardrobe.</p>
        </div>
      </div>
    </SiteShell>
  );
}
