"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/home/product-card";
import { Button } from "@/components/ui/button";
import { products as catalogProducts } from "@/lib/mock-data";

const featuredProducts = catalogProducts.slice(0, 8);

export function FeaturedSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = direction === "left" ? -340 : 340;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-6 lg:px-[80px] lg:py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">New arrivals</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-[-0.05em] text-[#222222]">
            Signed pieces for every occasion.
          </h2>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="secondary" size="icon" aria-label="Scroll left" onClick={() => scrollByAmount("left")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" aria-label="Scroll right" onClick={() => scrollByAmount("right")}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="-mx-2 overflow-x-auto px-2 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="grid min-w-max grid-flow-col gap-4 lg:auto-cols-[minmax(280px,1fr)] lg:grid-cols-none">
          {featuredProducts.map((product) => (
            <div key={product.id} className="w-[82vw] snap-start sm:w-[48vw] lg:w-[280px]">
              <ProductCard
                title={product.name}
                price={`$${product.price}`}
                image={product.image}
                badge={product.badge}
                id={product.id}
                productPrice={product.price}
                brand={product.brand}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
