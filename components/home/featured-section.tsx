"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/home/product-card";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "Structured Wool Coat",
    price: "$1,440",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    badge: "Best seller",
  },
  {
    title: "Studio Leather Tote",
    price: "$860",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    badge: "New",
  },
  {
    title: "Satin Evening Dress",
    price: "$1,120",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    badge: "Trending",
  },
  {
    title: "Monolith Utility Jacket",
    price: "$1,010",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    badge: "Limited",
  },
  {
    title: "Soft Tailored Blazer",
    price: "$940",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    badge: "Editor pick",
  },
  {
    title: "Noir Day Pack",
    price: "$680",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    badge: "Popular",
  },
  {
    title: "Luna Silk Set",
    price: "$1,260",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    badge: "Hot",
  },
  {
    title: "Urban Knit Layer",
    price: "$780",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    badge: "New",
  },
];

export function FeaturedSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = direction === "left" ? -340 : 340;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1280px] px-2 py-6 lg:px-4 lg:py-8">
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
          {products.map((product) => (
            <div key={product.title} className="w-[82vw] snap-start sm:w-[48vw] lg:w-[280px]">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
