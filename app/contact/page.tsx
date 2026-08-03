import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Contact Us | AURELIA",
  description: "Contact our concierge team for styling assistance, order support, and brand inquiries.",
};

const faqPreview = [
  "Do you offer international shipping?",
  "Can I book a personal styling call?",
  "How do I exchange or alter a piece?",
];

export default function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />

        <div className="mb-8">
          <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Concierge</div>
          <h1 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-[#222222] lg:text-[4rem]">Let’s build your next wardrobe</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Send a message</div>
            <form className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-[#222222]">
                  <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">First name</span>
                  <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" placeholder="Your first name" />
                </label>
                <label className="text-sm text-[#222222]">
                  <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Last name</span>
                  <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" placeholder="Your last name" />
                </label>
              </div>
              <label className="block text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Email</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" placeholder="you@example.com" />
              </label>
              <label className="block text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Subject</span>
                <input className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" placeholder="How can we help?" />
              </label>
              <label className="block text-sm text-[#222222]">
                <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Message</span>
                <textarea rows={5} className="w-full rounded-[12px] border border-[#dddddd] bg-[#f7f7f7] px-3 py-3 outline-none" placeholder="Share a few details about your request" />
              </label>
              <Button className="w-full justify-center">Send message</Button>
            </form>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Company info</div>
              <div className="mt-5 space-y-4 text-sm text-[#222222]">
                <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-[#ff385c]" /><span>+1 (415) 238-4457</span></div>
                <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-[#ff385c]" /><span>care@aureliaatelier.com</span></div>
                <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[#ff385c]" /><span>40 Mercer Street, New York, NY 10013</span></div>
              </div>
            </div>

            <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Our location</div>
              <div className="mt-4 flex h-56 items-center justify-center rounded-[16px] border border-dashed border-[#dddddd] bg-[#f7f7f7] text-sm font-medium text-[#222222]">
                Google Maps Placeholder
              </div>
            </div>

            <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">FAQ preview</div>
              <ul className="mt-5 space-y-3 text-sm text-[#222222]">
                {faqPreview.map((question) => (
                  <li key={question} className="rounded-[12px] bg-[#f7f7f7] px-3 py-3">{question}</li>
                ))}
              </ul>
              <div className="mt-5">
                <Link href="/products" className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#222222] transition hover:text-[#ff385c]">
                  Read more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}
