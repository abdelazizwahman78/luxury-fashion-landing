"use client";

import Link from "next/link";
import { useState } from "react";
import { Globe2, Heart, Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart-store";
import { useLanguageStore } from "@/lib/stores/language-store";
import { useUserStore } from "@/lib/stores/user-store";
import { useWishlistStore } from "@/lib/stores/wishlist-store";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Our Gallery", href: "/gallery" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getTotalItems());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const language = useLanguageStore((state) => state.language);
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const user = useUserStore((state) => state.user);
  const profileHref = user.isAuthenticated ? "/profile" : "/login";

  return (
    <header className="sticky top-0 z-50 border-b border-[#dddddd] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-[80px]">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="lg:hidden"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <Link href="/" className="text-lg font-semibold uppercase tracking-[0.35em] text-[#ff385c]">
              AURELIA
            </Link>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[0.72rem] uppercase tracking-[0.28em] text-[#6a6a6a] transition hover:text-[#ff385c]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="relative">
              <Link href={profileHref} aria-label="Profile" className="flex h-10 w-10 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7]">
                <UserRound className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <Link href="/cart" aria-label="Cart" className="flex h-10 w-10 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7]">
                <ShoppingBag className="h-4 w-4" />
              </Link>
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff385c] px-1 text-[0.62rem] font-semibold text-white">
                {cartCount}
              </span>
            </div>
            <div className="relative">
              <Link href="/favourites" aria-label="Favourite" className="flex h-10 w-10 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7]">
                <Heart className="h-4 w-4" />
              </Link>
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff385c] px-1 text-[0.62rem] font-semibold text-white">
                {wishlistCount}
              </span>
            </div>
            <div className="relative">
              <button
                type="button"
                aria-label="Language"
                onClick={() => setLanguage(language === "en" ? "fr" : "en")}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#222222] transition hover:bg-[#f7f7f7]"
              >
                <Globe2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {isOpen ? (
          <nav className="grid gap-3 border-t border-[#dddddd] py-4 lg:hidden">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-[0.72rem] uppercase tracking-[0.28em] text-[#6a6a6a] transition hover:text-[#ff385c]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
