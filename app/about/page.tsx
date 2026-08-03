import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { team } from "@/lib/mock-data";

export const metadata = {
  title: "About Us | AURELIA",
  description: "Learn about the story, values, and design philosophy behind AURELIA.",
};

const values = [
  "Crafted for longevity", "Responsible design", "Curated moments", "Thoughtful service",
];

const timeline = [
  { year: "2018", title: "The studio begins" },
  { year: "2020", title: "Private atelier collections launch" },
  { year: "2023", title: "Global concierge network expands" },
  { year: "2026", title: "Luxury essentials reimagined" },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

        <section className="overflow-hidden rounded-[24px] border border-[#dddddd] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
          <div className="grid gap-8 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div>
              <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Our story</div>
              <h1 className="mt-4 text-[2.2rem] font-semibold tracking-[-0.05em] text-[#222222] lg:text-[4rem]">A quiet luxury movement.</h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-[#6a6a6a]">
                Founded on the belief that a wardrobe should feel like a private language, AURELIA builds pieces that move effortlessly from city mornings to evening rituals.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg">Book a styling call</Button>
                <Link href="/products" className="inline-flex items-center gap-2 rounded-[8px] border border-[#dddddd] bg-white px-5 py-3 text-sm font-medium text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]">
                  Shop collection <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative h-[460px] overflow-hidden rounded-[20px] bg-[#f7f7f7]">
              <Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80" alt="Luxury fashion editorial" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[20px] bg-white p-6 ring-1 ring-[#dddddd]">
            <div className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">
              <Sparkles className="h-4 w-4 text-[#ff385c]" />
              Mission
            </div>
            <p className="mt-4 text-base leading-7 text-[#6a6a6a]">To create wardrobe essentials that feel polished, personal, and quietly powerful in every setting.</p>
          </div>
          <div className="rounded-[20px] bg-white p-6 ring-1 ring-[#dddddd]">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Vision</div>
            <p className="mt-4 text-base leading-7 text-[#6a6a6a]">To redefine luxury as a lived-in experience where quality, versatility, and confidence coexist.</p>
          </div>
          <div className="rounded-[20px] bg-white p-6 ring-1 ring-[#dddddd]">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Values</div>
            <ul className="mt-4 space-y-2 text-sm text-[#222222]">
              {values.map((value) => (
                <li key={value} className="rounded-[12px] bg-[#f7f7f7] px-3 py-2">{value}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-[20px] border border-[#dddddd] bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "12K+", label: "private clients" },
              { value: "34", label: "seasonal edits" },
              { value: "4.9/5", label: "client satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[18px] bg-[#f7f7f7] p-6 text-center">
                <div className="text-4xl font-semibold tracking-[-0.04em] text-[#222222]">{stat.value}</div>
                <div className="mt-2 text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">The team</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#222222]">Designers, stylists, and curators</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="overflow-hidden rounded-[18px] border border-[#dddddd] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="relative h-72">
                  <Image src={member.image} alt={member.name} fill className="object-cover" sizes="(max-width: 1279px) 50vw, 25vw" />
                </div>
                <div className="p-4">
                  <div className="text-xl font-semibold text-[#222222]">{member.name}</div>
                  <div className="mt-2 text-sm text-[#6a6a6a]">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[20px] border border-[#dddddd] bg-white p-6">
          <div className="mb-6">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Our timeline</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#222222]">Milestones</h2>
          </div>
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.year} className="flex items-center gap-4 rounded-[14px] bg-[#f7f7f7] p-4 text-[#222222]">
                <div className="w-16 text-lg font-semibold">{item.year}</div>
                <div className="h-8 w-px bg-[#dddddd]" />
                <div className="text-base font-medium">{item.title}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[20px] border border-[#dddddd] bg-white p-6 text-center">
          <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">A private experience</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#222222]">Let us curate your next wardrobe chapter.</h2>
          <div className="mt-6 flex justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-[8px] bg-[#ff385c] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#e00b41]">
              Speak with our concierge <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
