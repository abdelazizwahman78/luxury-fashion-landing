import Image from "next/image";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductCard({
  title,
  price,
  image,
  badge,
  colors = ["#ffffff", "#111111", "#c4c4c4"],
  sizes = ["XS", "S", "M", "L"],
}: {
  title: string;
  price: string;
  image: string;
  badge: string;
  colors?: string[];
  sizes?: string[];
}) {
  return (
    <article className="group relative min-h-[460px] overflow-hidden rounded-[14px] border border-[#dddddd] bg-white p-3 shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.04)_0_2px_6px,rgba(0,0,0,0.1)_0_4px_8px] transition duration-200 hover:-translate-y-0.5">
      <div className="relative h-[260px] overflow-hidden rounded-[12px] bg-[#f7f7f7]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-[#222222]">
          {badge}
        </div>

        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#222222] transition hover:bg-[#ff385c] hover:text-white">
          <Heart className="h-4 w-4" />
        </button>

        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.62rem] font-medium text-[#222222]">
          4.9 · Guest favorite
        </div>
      </div>

      <div className="px-1 pb-1 pt-4 text-[#222222]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[18px] font-semibold leading-tight text-[#222222]">{title}</h3>
            <div className="mt-2 flex items-center gap-1 text-[#6a6a6a]">
              <Star className="h-3.5 w-3.5 fill-current text-[#222222]" />
              <span className="text-xs">4.9</span>
            </div>
          </div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#222222]">{price}</div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          {colors.map((color) => (
            <span
              key={color}
              className="h-3.5 w-3.5 rounded-full border border-[#dddddd]"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <span
              key={size}
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                size === "M"
                  ? "border-[#ff385c] bg-[#ff385c] text-white"
                  : "border-[#dddddd] bg-transparent text-[#6a6a6a]"
              }`}
            >
              {size}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <Button size="sm" className="flex-1 justify-center rounded-[8px]">
            <ShoppingBag className="h-4 w-4" />
            Add to Bag
          </Button>
          <Button variant="outline" size="sm" className="min-w-[42px] rounded-[8px] px-0">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
