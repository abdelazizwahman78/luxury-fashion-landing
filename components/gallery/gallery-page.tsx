"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/lib/mock-data";

const filters = ["All", "Editorial", "Tailoring", "Travel", "Accessories", "Occasion"];

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const visibleImages = activeFilter === "All" ? galleryImages : galleryImages.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Journal</div>
          <h1 className="mt-2 text-[2.3rem] font-semibold tracking-[-0.05em] text-[#222222] lg:text-[4rem]">Luxury in motion.</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.28em] transition ${
                activeFilter === filter ? "border-[#ff385c] bg-[#ff385c] text-white" : "border-[#dddddd] bg-white text-[#222222] hover:border-[#ff385c] hover:text-[#ff385c]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
        {visibleImages.map((image, index) => (
          <motion.button
            key={`${image}-${index}`}
            type="button"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            onClick={() => setActiveImage(image)}
            className="group relative mb-4 block w-full overflow-hidden rounded-[18px] border border-[#dddddd] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
          >
            <div className="relative h-[280px] overflow-hidden">
              <Image src={image} alt={`Luxury fashion gallery ${index + 1}`} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width: 640px) 100vw, 33vw" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[20px] border border-white/20 bg-white"
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" aria-label="Close gallery image" onClick={() => setActiveImage(null)} className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#222222]">
                <X className="h-4 w-4" />
              </button>
              <div className="relative h-[70vh] w-full">
                <Image src={activeImage} alt="Expanded gallery view" fill className="object-cover" sizes="100vw" />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-8 rounded-[20px] border border-[#dddddd] bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Private atelier</div>
            <p className="mt-2 text-sm text-[#6a6a6a]">Follow our latest fashion story in a gallery of refined silhouettes and lived-in luxury.</p>
          </div>
          <Button variant="secondary">Request a lookbook</Button>
        </div>
      </div>
    </div>
  );
}
