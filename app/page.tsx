"use client";

import Link from "next/link";
import { Instagram, Sparkles } from "lucide-react";
import { FeaturedSection } from "@/components/home/featured-section";
import { HeroSection } from "@/components/home/hero-section";
import { Header } from "@/components/layout/header";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { useLanguageStore } from "@/lib/stores/language-store";

const trustedBrands = [
  "Moncler",
  "A.P.C.",
  "Lemaire",
  "The Row",
  "Miu Miu",
  "Celine",
  "Bottega Veneta",
  "Chanel",
  "Valentino",
  "Maison Margiela",
  "Khaite",
  "Bulgari",
  "Ralph Lauren",
  "Saint Laurent",
];
const categories = [
  {
    name: "Tailoring",
    copy: "Clean lines and sculptural precision.",
    category: "Tailoring",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Accessories",
    copy: "Soft-luxe silhouettes with contrast.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Occasion",
    copy: "Evening statements designed for presence.",
    category: "Occasion",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
  },
];
const editorialNotes = [
  "Quiet luxury edit",
  "City tailoring",
  "After-hours capsule",
];
const faqs = [
  { q: "Do you offer international shipping?", a: "Yes, we offer premium shipping to select markets with elevated delivery windows." },
  { q: "Can I book a personal styling call?", a: "Every order can be styled with one of our in-house consultants by request." },
  { q: "How do I exchange or alter a piece?", a: "You can request a return or alteration within our 14-day concierge window." },
];

export default function Home() {
  const language = useLanguageStore((state) => state.language);

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#222222]">
      <div className="border-b border-[#dddddd] bg-[#222222] px-4 py-3 text-center text-[0.68rem] uppercase tracking-[0.45em] text-[#f5f5f5]">
        Complimentary express delivery on orders over $500 {language === "fr" ? "(Livraison express offerte sur les commandes de plus de 500 $)" : ""}
      </div>

      <Header />
      <HeroSection />

      <section className="mx-auto max-w-[1600px] px-5 py-6 lg:px-[80px] lg:py-8">
        <div className="rounded-[20px] border border-[#dddddd] bg-white p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Partners</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#222222]">Curated by design-conscious labels</h2>
            </div>
          </div>

          <div className="marquee-shell overflow-hidden rounded-[16px] bg-[#f7f7f7] py-2">
            <div className="marquee-track flex min-w-max items-center gap-3">
              {[...trustedBrands, ...trustedBrands].map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="flex min-h-14 min-w-[180px] items-center justify-center rounded-[14px] bg-white px-4 text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#6a6a6a] shadow-[0_6px_15px_rgba(0,0,0,0.04)]"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-4 lg:px-[80px] lg:py-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link key={category.name} href={`/products?category=${encodeURIComponent(category.category)}`} className="block">
              <article className="rounded-[20px] bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.04)] ring-1 ring-[#dddddd] transition hover:-translate-y-0.5">
                <div
                  className="mb-4 h-72 rounded-[18px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.04em]">{category.name}</h3>
                    <p className="mt-2 max-w-xs text-sm text-[#6a6a6a]">{category.copy}</p>
                  </div>
                  <div className="text-[0.68rem] uppercase tracking-[0.35em] text-[#9e9e9e]">0{index + 1}</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-5 lg:px-[80px] lg:py-7">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[20px] bg-white p-6 ring-1 ring-[#dddddd]">
            <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">
              <Sparkles className="h-4 w-4 text-[#ff385c]" />
              Featured Collection
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">Private atelier edit.</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#6a6a6a]">
              Precision tailoring, softened by fluid drape and a quiet edge for the modern wardrobe.
            </p>
            <div className="mt-5 space-y-3">
              {editorialNotes.map((item, index) => (
                <div key={item} className="flex items-center justify-between rounded-[14px] bg-[#f7f7f7] px-4 py-3">
                  <span className="text-sm font-medium">{item}</span>
                  <span className="text-[0.65rem] uppercase tracking-[0.35em] text-[#9e9e9e]">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] bg-white p-4 ring-1 ring-[#dddddd]">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
              ].map((image, index) => (
                <div key={image} className="h-72 rounded-[18px] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
                  <div className="flex h-full items-end p-3">
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-[#222222]">
                      {index === 0 ? "New" : index === 1 ? "Trending" : "Limited"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedSection />

      <section className="mx-auto max-w-[1600px] px-5 py-4 lg:px-[80px] lg:py-6">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[20px] bg-white p-6 ring-1 ring-[#dddddd]">
            <span className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Why choose us</span>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[18px] bg-[#f7f7f7] p-4 text-sm font-medium">Premium materials</div>
              <div className="rounded-[18px] bg-[#f7f7f7] p-4 text-sm font-medium">Luxury dispatch</div>
              <div className="rounded-[18px] bg-[#f7f7f7] p-4 text-sm font-medium">Personal styling</div>
              <div className="rounded-[18px] bg-[#f7f7f7] p-4 text-sm font-medium">Concierge support</div>
            </div>
          </div>

          <div className="rounded-[20px] bg-white p-6 ring-1 ring-[#dddddd]">
            <span className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Customer reviews</span>
            <p className="mt-6 text-2xl font-medium leading-relaxed text-[#222222]">
              “The feeling is unmistakably premium — an editorial wardrobe for everyday rituals.”
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-4 lg:px-[80px] lg:py-6">
        <div className="rounded-[20px] bg-white p-6 ring-1 ring-[#dddddd]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Instagram gallery</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">@aureliaatelier</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#f7f7f7] px-3 py-2 text-sm text-[#222222]">
              <Instagram className="h-4 w-4" /> Follow
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            {[
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
            ].map((image, index) => (
              <div key={index} className="h-56 rounded-[18px] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px]">
        <div className="rounded-[20px] bg-white p-6 ring-1 ring-[#dddddd]">
          <span className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">FAQ</span>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <footer className="mt-8 border-t border-[#dddddd] bg-white">
        <div className="mx-auto grid max-w-[1600px] gap-6 px-5 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-[80px]">
          <div>
            <div className="text-lg font-semibold uppercase tracking-[0.35em] text-[#222222]">AURELIA</div>
            <p className="mt-3 max-w-md text-sm text-[#6a6a6a]">Premium modern essentials for the discerning wardrobe.</p>
          </div>
          <div className="text-sm text-[#6a6a6a]">
            <div className="font-medium text-[#222222]">Shop</div>
            <div className="mt-3 space-y-2">New In, Women, Men, Journal</div>
          </div>
          <div className="text-sm text-[#6a6a6a]">
            <div className="font-medium text-[#222222]">Contact</div>
            <div className="mt-3 space-y-2">care@aureliaatelier.com</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
