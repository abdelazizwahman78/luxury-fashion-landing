import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-[#222222]">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow ? (
        <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">{eyebrow}</div>
      ) : null}
      <h1 className="mt-4 text-[2.2rem] font-semibold tracking-[-0.05em] text-[#222222] sm:text-[3rem] lg:text-[3.5rem]">
        {title}
      </h1>
      {description ? <p className="mt-4 text-base leading-7 text-[#6a6a6a]">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </motion.div>
  );
}

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#6a6a6a]">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="transition hover:text-[#ff385c]">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 ? <ChevronRight className="h-3 w-3" /> : null}
        </div>
      ))}
    </nav>
  );
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">{eyebrow}</p> : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#222222]">{title}</h2>
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[#dddddd] bg-white">
      <div className="mx-auto grid max-w-[1600px] gap-6 px-5 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-[80px]">
        <div>
          <div className="text-lg font-semibold uppercase tracking-[0.35em] text-[#222222]">AURELIA</div>
          <p className="mt-3 max-w-md text-sm text-[#6a6a6a]">Premium modern essentials for the discerning wardrobe.</p>
        </div>
        <div className="text-sm text-[#6a6a6a]">
          <div className="font-medium text-[#222222]">Shop</div>
          <div className="mt-3 space-y-2">
            <div>New In</div>
            <div>Women</div>
            <div>Men</div>
            <div>Journal</div>
          </div>
        </div>
        <div className="text-sm text-[#6a6a6a]">
          <div className="font-medium text-[#222222]">Contact</div>
          <div className="mt-3 space-y-2">
            <div>care@aureliaatelier.com</div>
            <div>+1 (415) 238-4457</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PillButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[#dddddd] bg-white px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]"
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  );
}
