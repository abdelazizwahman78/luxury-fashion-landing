"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FaqItem = {
  q: string;
  a: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = event.key === "ArrowDown" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
      buttonRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="mt-4 grid gap-3" aria-label="Frequently asked questions">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const contentId = `faq-content-${index}`;

        return (
          <div key={faq.q} className="rounded-[18px] bg-[#f7f7f7]">
            <button
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff385c]/30 focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={contentId}
              onClick={() => toggleItem(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="text-sm font-medium text-[#222222]">{faq.q}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-[#6a6a6a] transition-transform duration-300 ease-out",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              id={contentId}
              role="region"
              aria-hidden={!isOpen}
              className={cn(
                "grid overflow-hidden transition-all duration-300 ease-out",
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
