import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "12K+", label: "global members" },
  { value: "34", label: "premium drops" },
  { value: "4.9/5", label: "client rating" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white text-[#222222]">
      <div className="mx-auto max-w-[1600px] px-5 py-10 lg:px-[80px] lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dddddd] bg-[#f7f7f7] px-3 py-1 text-[0.68rem] uppercase tracking-[0.35em] text-[#ff385c]">
              <Sparkles className="h-3.5 w-3.5" />
              Spring / Summer 2026
            </div>

            <div className="max-w-2xl">
              <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.05em] text-[#222222] sm:text-[3rem] lg:text-[3.5rem]">
                Inspiration for future getaways.
              </h1>
              <p className="mt-4 max-w-xl text-[1rem] leading-7 text-[#6a6a6a]">
                Curated stays, elevated essentials, and refined city moments wrapped in one soft, persuasive browse experience.
              </p>
            </div>

            <div className="flex max-w-2xl items-center rounded-full border border-[#dddddd] bg-white p-2 shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px]">
              <div className="flex flex-1 items-center gap-3 px-4 py-3 text-sm text-[#6a6a6a]">
                <Search className="h-4 w-4 text-[#ff385c]" />
                <span>Where to?</span>
              </div>
              <div className="hidden h-8 w-px bg-[#dddddd] md:block" />
              <div className="hidden flex-1 px-4 py-3 text-sm text-[#6a6a6a] md:block">When</div>
              <div className="hidden h-8 w-px bg-[#dddddd] md:block" />
              <div className="hidden flex-1 px-4 py-3 text-sm text-[#6a6a6a] md:block">Who</div>
              <Button className="h-12 w-12 rounded-full p-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/products">
                  Explore collection <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <span className="text-sm text-[#6a6a6a]">Discover Premium Fashion Crafted for Every Moment</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-[14px] border border-[#dddddd] bg-[#f7f7f7] px-4 py-4">
                  <div className="text-2xl font-semibold tracking-[-0.04em] text-[#222222]">{item.value}</div>
                  <div className="mt-1 text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[24px] border border-[#dddddd] bg-white">
            <div className="relative h-[420px] sm:h-[520px]">
              <Image
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury editorial fashion model"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 rounded-[16px] border border-white/35 bg-black/55 px-4 py-3 text-white backdrop-blur-md">
              <div className="text-[0.68rem] uppercase tracking-[0.35em] text-stone-300">Editorial pick</div>
              <div className="mt-1 text-base font-medium">The new uniform for after-hours luxury</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
