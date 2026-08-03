"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, SlidersHorizontal, Star, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/home/product-card";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { products } from "@/lib/mock-data";

const categories = ["Women", "Men", "Accessories", "Tailoring", "Shoes", "Occasion"];
const colors = ["Black", "Ivory", "Camel", "Forest", "Red", "Blue"];
const sizes = ["XS", "S", "M", "L", "XL", "One Size"];
const brands = ["AURELIA", "Monarch Studio", "Maison Étude", "Atelier Noire", "The Edit"];
const ratingOptions = ["4.5+", "4.7+", "4.8+", "4.9+"];
const discountOptions = ["Under $100", "Under $200", "Under $300", "Under $500"];

type FilterSectionProps = {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

function FilterSection({ id, title, open, onToggle, children }: FilterSectionProps) {
  return (
    <div className="rounded-[16px] border border-[#dddddd] bg-[#f7f7f7] p-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#222222]">{title}</span>
        <ChevronDown className={`h-4 w-4 text-[#6a6a6a] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [openSection, setOpenSection] = useState<string | null>("categories");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([120, 700]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    const categoryValue = searchParams.get("category");
    if (!categoryValue) {
      setSelectedCategories([]);
      return;
    }

    const values = categoryValue
      .split(",")
      .map((item) => decodeURIComponent(item.trim()))
      .filter(Boolean);

    setSelectedCategories(values);
  }, [searchParams]);

  const clearAll = () => {
    setPriceRange([120, 700]);
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSelectedAvailability([]);
    setCurrentPage(1);
  };

  const toggleValue = (value: string, list: string[], setList: (v: string[]) => void) => {
    const nextList = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
    setList(nextList);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category) || selectedCategories.includes("Women");
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(product.stock);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchesRating = selectedRatings.length === 0 || selectedRatings.some((rating) => {
        const threshold = Number(rating.replace("+", ""));
        return product.rating >= threshold;
      });
      const matchesColor = selectedColors.length === 0 || selectedColors.some((color) => product.colors.some((item) => item.toLowerCase().includes(color.toLowerCase())));
      const matchesSize = selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes.includes(size));

      return matchesCategory && matchesPrice && matchesAvailability && matchesBrand && matchesRating && matchesColor && matchesSize;
    });
  }, [priceRange, selectedAvailability, selectedBrands, selectedCategories, selectedColors, selectedRatings, selectedSizes]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice((safePage - 1) * pageSize, safePage * pageSize);

  const sidebarContent = (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 px-3 py-3">
       <span className="text-[0.75rem] font-medium uppercase tracking-[0.28em] text-[#222222]">Filteration</span>
        <button type="button" onClick={clearAll} className="whitespace-nowrap text-[0.62rem] uppercase tracking-[0.24em] text-[#6a6a6a] transition hover:text-[#ff385c]">
              Clear All
            </button>
      </div>
      

      <FilterSection id="categories" title="Categories" open={openSection === "categories"} onToggle={() => setOpenSection((current) => (current === "categories" ? null : "categories"))}>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => toggleValue(category, selectedCategories, setSelectedCategories)}
              className={`rounded-full border px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.28em] transition ${
                selectedCategories.includes(category)
                  ? "border-[#ff385c] bg-[#ff385c] text-white"
                  : "border-[#dddddd] bg-white text-[#222222] hover:border-[#ff385c] hover:text-[#ff385c]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection id="price" title="Price Range" open={openSection === "price"} onToggle={() => setOpenSection((current) => (current === "price" ? null : "price"))}>
        <div className="space-y-3">
          <input
            type="range"
            min={120}
            max={1000}
            value={priceRange[1]}
            onChange={(event) => {
              setCurrentPage(1);
              setPriceRange([priceRange[0], Number(event.target.value)]);
            }}
            className="w-full accent-[#ff385c]"
          />
          <div className="flex items-center justify-between text-sm text-[#6a6a6a]">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection id="availability" title="Availability" open={openSection === "availability"} onToggle={() => setOpenSection((current) => (current === "availability" ? null : "availability"))}>
        <div className="space-y-2 text-sm text-[#222222]">
          {[
            "In stock",
            "Low stock",
            "Sold out",
          ].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedAvailability.includes(item)}
                onChange={() => toggleValue(item, selectedAvailability, setSelectedAvailability)}
                className="h-4 w-4 accent-[#ff385c]"
              />
              {item}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection id="colors" title="Colors" open={openSection === "colors"} onToggle={() => setOpenSection((current) => (current === "colors" ? null : "colors"))}>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => toggleValue(color, selectedColors, setSelectedColors)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                selectedColors.includes(color) ? "border-[#ff385c]" : "border-[#dddddd]"
              }`}
              style={{ backgroundColor: color === "Ivory" ? "#f2eadf" : color === "Camel" ? "#d2a56b" : color === "Forest" ? "#2d4a3d" : color === "Red" ? "#b64040" : color === "Blue" ? "#8799ba" : "#111111" }}
              aria-label={color}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection id="sizes" title="Sizes" open={openSection === "sizes"} onToggle={() => setOpenSection((current) => (current === "sizes" ? null : "sizes"))}>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleValue(size, selectedSizes, setSelectedSizes)}
              className={`rounded-full border px-3 py-2 text-[0.62rem] font-medium uppercase tracking-[0.25em] ${
                selectedSizes.includes(size)
                  ? "border-[#ff385c] bg-[#ff385c] text-white"
                  : "border-[#dddddd] bg-white text-[#222222]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection id="brands" title="Brands" open={openSection === "brands"} onToggle={() => setOpenSection((current) => (current === "brands" ? null : "brands"))}>
        <div className="space-y-2 text-sm text-[#222222]">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleValue(brand, selectedBrands, setSelectedBrands)}
                className="h-4 w-4 accent-[#ff385c]"
              />
              {brand}
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection id="rating" title="Rating" open={openSection === "rating"} onToggle={() => setOpenSection((current) => (current === "rating" ? null : "rating"))}>
        <div className="space-y-2 text-sm text-[#222222]">
          {ratingOptions.map((rating) => (
            <label key={rating} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => toggleValue(rating, selectedRatings, setSelectedRatings)}
                className="h-4 w-4 accent-[#ff385c]"
              />
              <span className="inline-flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current text-[#222222]" />
                ))}
                <span className="ml-1 text-[#6a6a6a]">{rating}</span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection id="discount" title="Discount" open={openSection === "discount"} onToggle={() => setOpenSection((current) => (current === "discount" ? null : "discount"))}>
        <div className="space-y-2 text-sm text-[#222222]">
          {discountOptions.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 accent-[#ff385c]" />
              {option}
            </label>
          ))}
        </div>
      </FilterSection>

    </div>
  );

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <div className="mb-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <div className="mt-6">
            <h1 className="text-[2.4rem] font-semibold tracking-[-0.05em] text-[#222222] sm:text-[3rem] lg:text-[4rem]">Products</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6a6a6a]">
              Discover our carefully curated collection of premium fashion pieces designed for modern elegance.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[20px] border border-[#dddddd] bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              {sidebarContent}
            </div>
          </aside>

          <div>
            {filteredProducts.length === 0 ? (
              <div className="mt-8 rounded-[20px] border border-[#dddddd] bg-white p-8 text-center shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-[#dddddd] bg-[#f7f7f7] text-[#ff385c]">
                  <SlidersHorizontal className="h-10 w-10" />
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-[#222222]">No products found</h2>
                <p className="mt-3 text-base text-[#6a6a6a]">Try adjusting your filters.</p>
                <div className="mt-6 flex justify-center">
                  <button type="button" onClick={clearAll} className="rounded-[10px] bg-[#ff385c] px-5 py-3 text-[0.68rem] uppercase tracking-[0.28em] text-white transition hover:bg-[#e00b41]">
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="block">
                      <ProductCard
                        title={product.name}
                        price={`$${product.price}`}
                        image={product.image}
                        badge={product.badge}
                        colors={product.colors}
                        sizes={product.sizes}
                      />
                    </Link>
                  ))}
                </div>

                {totalPages > 1 ? (
                  <div className="mt-10 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      disabled={safePage === 1}
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      className="rounded-full border border-[#dddddd] bg-white px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium ${
                          page === safePage ? "border-[#ff385c] bg-[#ff385c] text-white" : "border-[#dddddd] bg-white text-[#222222]"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={safePage === totalPages}
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      className="rounded-full border border-[#dddddd] bg-white px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-[#222222] px-5 py-3 text-[0.68rem] uppercase tracking-[0.35em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
        >
          Filters
        </button>
      </div>

      <AnimatePresence>
        {drawerOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setDrawerOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="ml-auto flex h-full w-[90vw] max-w-sm flex-col border-l border-[#dddddd] bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="text-[0.68rem] uppercase tracking-[0.35em] text-[#6a6a6a]">Filters</div>
                <button type="button" onClick={() => setDrawerOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dddddd] bg-[#f7f7f7] text-[#222222]">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1">{sidebarContent}</div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SiteShell>
  );
}
