"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = {
  q: string;
  a: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-4 grid gap-3">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-content-${index}`;

        return (
          <div key={faq.q} className="rounded-[18px] bg-[#f7f7f7]">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
            >
              <span className="text-sm font-medium text-[#222222]">{faq.q}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[#6a6a6a] transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              id={contentId}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-4 pb-4 text-sm text-[#6a6a6a]">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
