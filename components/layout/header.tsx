"use client";

import Link from "next/link";
import { Globe2, Heart, Menu, MoonStar, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = ["New In", "Women", "Men", "Collections", "Journal"];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#dddddd] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          <Link href="/" className="text-lg font-semibold tracking-[0.35em] text-[#ff385c] uppercase">
            AURELIA
          </Link>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item}
              href="#"
              className="text-[0.72rem] uppercase tracking-[0.28em] text-[#6a6a6a] transition hover:text-[#ff385c]"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Favorites">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Language">
            <Globe2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Theme">
            <MoonStar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Bag">
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
