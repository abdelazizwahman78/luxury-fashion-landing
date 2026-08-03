import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedSection } from "@/components/home/featured-section";

const trustedBrands = ["Moncler", "A.P.C.", "Lemaire", "The Row", "Miu Miu", "Celine"];
const categories = [
  { name: "Tailoring", copy: "Clean lines and sculptural precision.", accent: "bg-stone-900" },
  { name: "Leather", copy: "Soft-luxe silhouettes with contrast.", accent: "bg-stone-700" },
  { name: "Occasion", copy: "Evening statements designed for presence.", accent: "bg-stone-500" },
];
const arrivals = [
  { title: "Arc Line Coat", price: "$1,280", tag: "New" },
  { title: "Noir Draped Blazer", price: "$980", tag: "Trending" },
  { title: "Sculpt Knit Set", price: "$710", tag: "Limited" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <HeroSection />

      <section className="mx-auto max-w-[1600px] px-5 py-14 lg:px-[80px]">
        <div className="grid gap-4 rounded-[28px] border border-stone-200 bg-white p-5 sm:grid-cols-2 lg:grid-cols-6">
          {trustedBrands.map((brand) => (
            <div key={brand} className="flex min-h-16 items-center justify-center rounded-2xl bg-stone-100 text-sm font-semibold tracking-[0.3em] text-stone-500 uppercase">
              {brand}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-6 lg:px-[80px]">
        <div className="grid gap-4 lg:grid-cols-3">
          {categories.map((category, index) => (
            <article key={category.name} className="rounded-[28px] bg-white p-4 shadow-sm ring-1 ring-stone-200">
              <div className={`mb-4 h-72 rounded-[24px] ${category.accent}`} />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em]">{category.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-stone-600">{category.copy}</p>
                </div>
                <div className="text-[0.68rem] uppercase tracking-[0.35em] text-stone-400">0{index + 1}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-14 lg:px-[80px]">
        <div className="grid gap-4 rounded-[32px] bg-stone-950 p-5 text-stone-50 lg:grid-cols-[1fr_1.1fr] lg:p-8">
          <div className="rounded-[28px] bg-stone-900 p-6">
            <p className="text-[0.68rem] uppercase tracking-[0.45em] text-stone-400">Featured Collection</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">Midnight Atelier</h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-stone-300">Precision tailoring, softened by fluid drape and a quiet edge.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {arrivals.map((item) => (
              <article key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="h-56 rounded-[20px] bg-stone-800" />
                <div className="mt-4 flex items-center justify-between gap-3">
                  <h3 className="text-base font-medium">{item.title}</h3>
                  <span className="text-[0.62rem] uppercase tracking-[0.35em] text-stone-400">{item.tag}</span>
                </div>
                <p className="mt-2 text-sm text-stone-300">{item.price}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeaturedSection />

      <section className="mx-auto max-w-[1600px] px-5 py-4 lg:px-[80px]">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-6 ring-1 ring-stone-200">
            <span className="text-[0.68rem] uppercase tracking-[0.45em] text-stone-500">Why Choose Us</span>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[20px] bg-stone-100 p-4">Premium materials</div>
              <div className="rounded-[20px] bg-stone-100 p-4">Luxury dispatch</div>
              <div className="rounded-[20px] bg-stone-100 p-4">Personal styling</div>
              <div className="rounded-[20px] bg-stone-100 p-4">Complimentary alterations</div>
            </div>
          </div>
          <div className="rounded-[28px] bg-stone-900 p-6 text-stone-50">
            <span className="text-[0.68rem] uppercase tracking-[0.45em] text-stone-400">Customer Reviews</span>
            <p className="mt-6 text-2xl font-medium leading-relaxed">“The feeling is unmistakably premium — an editorial wardrobe for everyday rituals.”</p>
          </div>
        </div>
      </section>
    </main>
  );
}
