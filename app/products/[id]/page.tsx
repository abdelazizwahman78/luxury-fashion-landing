"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { ProductCard } from "@/components/home/product-card";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { Button } from "@/components/ui/button";
import { galleryImages as galleryAssets, products } from "@/lib/mock-data";
import { useCartStore } from "@/lib/stores/cart-store";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { showToast } from "@/lib/toast";

type ReviewItem = {
  name: string;
  title: string;
  comment: string;
  rating: number;
};

const reviewBreakdown = [
  { label: "5 stars", value: 72 },
  { label: "4 stars", value: 22 },
  { label: "3 stars", value: 5 },
  { label: "2 stars", value: 1 },
];

const initialReviews: ReviewItem[] = [
  {
    name: "Amelia W.",
    title: "Beautiful fit and finish",
    comment: "The silhouette feels luxurious without being too formal. The quality is excellent and the fabric drapes beautifully.",
    rating: 5,
  },
  {
    name: "Sofia L.",
    title: "Modern and polished",
    comment: "It looks elevated and versatile. I wore it for dinner and day events and it still felt premium and effortless.",
    rating: 5,
  },
  {
    name: "Priya M.",
    title: "Worth the investment",
    comment: "The details are refined and the sizing feels true to fit. It immediately became a staple in my wardrobe.",
    rating: 4,
  },
  {
    name: "Nadia R.",
    title: "Quiet luxury energy",
    comment: "The texture feels elevated and the structure makes it feel special without being overdone.",
    rating: 5,
  },
  {
    name: "Lina K.",
    title: "A staple that feels premium",
    comment: "I reach for it constantly because it works with tailoring, denim, and eveningwear effortlessly.",
    rating: 4,
  },
];

export default function ProductDetailPage() {
  const pathname = usePathname();
  const productId = pathname.split("/").filter(Boolean).pop() ?? products[0].id;
  const product = useMemo(() => products.find((item) => item.id === productId) ?? products[0], [productId]);

  const [selectedColor, setSelectedColor] = useState<string | null>(product.colors[0] ?? null);
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlistItem = useWishlistStore((state) => state.toggleWishlistItem);
  const isWishlisted = useWishlistStore((state) => state.items.some((item) => item.id === product.id));
  const [reviewList, setReviewList] = useState<ReviewItem[]>(initialReviews);
  const [reviewName, setReviewName] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const galleryImages = useMemo(() => {
    const merged = [product.image, product.hoverImage, ...galleryAssets];
    return merged.filter((image, index, array) => array.indexOf(image) === index).slice(0, 8);
  }, [product.hoverImage, product.image]);
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  const handleQuantityChange = (next: number) => setQuantity(Math.max(1, next));

  const handleReviewSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!reviewName.trim() || !reviewTitle.trim() || !reviewComment.trim()) {
      return;
    }

    setReviewList((current) => [
      {
        name: reviewName.trim(),
        title: reviewTitle.trim(),
        comment: reviewComment.trim(),
        rating: reviewRating,
      },
      ...current,
    ]);
    setReviewName("");
    setReviewTitle("");
    setReviewComment("");
    setReviewRating(5);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      return;
    }

    setIsAdding(true);
    setAdded(false);

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        size: selectedSize,
        color: selectedColor,
      },
      quantity,
    );

    window.setTimeout(() => {
      setIsAdding(false);
      setAdded(true);
      showToast("Added to Cart");
    }, 800);
  };

  const handleToggleWishlist = () => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
    };

    toggleWishlistItem(item);
    showToast(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist");
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.name }]} />

        <Link href="/products" className="mb-6 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#6a6a6a] transition hover:text-[#ff385c]">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to products
        </Link>

        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[20px] border border-[#dddddd] bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <div className="flex h-full flex-col gap-4">
              <div className="relative min-h-[420px] overflow-hidden rounded-[18px] bg-[#f7f7f7] sm:min-h-[540px]">
                <div className="group relative h-full w-full">
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-[#222222]">
                  {product.badge}
                </div>
              </div>

              <div className="overflow-x-auto pb-1">
                <div className="flex w-max gap-3">
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(image)}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-[12px] border transition sm:h-24 sm:w-24 ${
                        activeImage === image ? "border-[#ff385c]" : "border-[#dddddd]"
                      }`}
                    >
                      <Image src={image} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" sizes="96px" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">{product.brand}</div>
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-label="Toggle wishlist"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                    isWishlisted ? "border-[#ff385c] bg-[#ff385c] text-white" : "border-[#dddddd] bg-[#f7f7f7] text-[#222222] hover:border-[#ff385c]"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
                </button>
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#222222]">{product.name}</h1>

              <div className="mt-4 flex items-center gap-3 text-[#6a6a6a]">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-[#222222]" />
                  <span className="text-sm font-medium text-[#222222]">{product.rating}</span>
                </div>
                <span className="text-sm">{product.reviews} reviews</span>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-3xl font-semibold tracking-[-0.04em] text-[#222222]">${product.price}</span>
                <span className="text-lg text-[#9a9a9a] line-through">${product.originalPrice}</span>
                <span className="rounded-full bg-[#ff385c]/10 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-[#ff385c]">
                  Save 20%
                </span>
              </div>

              <p className="mt-5 text-base leading-7 text-[#6a6a6a]">
                Thoughtful tailoring, subtle structure, and elevated essentials designed for seamless everyday dressing.
              </p>

              <div className="mt-6">
                <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Color</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color ${color}`}
                      className={`h-9 w-9 rounded-full border transition ${selectedColor === color ? "border-[#222222] ring-2 ring-[#222222]/10" : "border-[#dddddd]"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Size</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] transition ${
                        selectedSize === size ? "border-[#ff385c] bg-[#ff385c] text-white" : "border-[#dddddd] bg-white text-[#222222] hover:border-[#ff385c]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-[14px] border border-[#dddddd] bg-[#f7f7f7] px-4 py-3">
                <span className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Qty</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-6 text-center text-sm font-medium text-[#222222]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dddddd] bg-white text-[#222222] transition hover:border-[#ff385c] hover:text-[#ff385c]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  className="w-full justify-center"
                  onClick={handleAddToCart}
                  disabled={isAdding || !selectedColor || !selectedSize}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {isAdding ? "Adding..." : added ? "Added" : "Add to cart"}
                </Button>
                <Button variant="secondary" className="w-full justify-center" onClick={handleToggleWishlist}>
                  {isWishlisted ? "Saved" : "Save for later"}
                </Button>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#dddddd] pt-5">
                <div className="flex items-center gap-3 text-sm text-[#222222]">
                  <Truck className="h-4 w-4 text-[#ff385c]" />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#222222]">
                  <ShieldCheck className="h-4 w-4 text-[#ff385c]" />
                  <span>14-day concierge returns and exchanges</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Description</div>
            <p className="mt-4 text-base leading-7 text-[#6a6a6a]">
              Crafted for quiet confidence and elevated movement, this piece layers structure with softness to create a modern wardrobe statement. A refined silhouette supports day-to-evening dressing, effortlessly balancing luxury and ease.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[14px] bg-[#f7f7f7] p-4">
                <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Specifications</div>
                <ul className="mt-3 space-y-2 text-sm text-[#222222]">
                  <li>Material: Italian wool blend</li>
                  <li>Origin: Milan atelier</li>
                  <li>Fit: Tailored, relaxed line</li>
                </ul>
              </div>

              <div className="rounded-[14px] bg-[#f7f7f7] p-4">
                <div className="text-[0.68rem] uppercase tracking-[0.3em] text-[#6a6a6a]">Shipping & delivery</div>
                <div className="mt-3 space-y-2 text-sm text-[#222222]">
                  <div>Dispatches within 2–3 business days.</div>
                  <div>Estimated delivery: 5–7 business days.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Delivery & shipping</div>
            <div className="mt-4 space-y-4 text-sm text-[#6a6a6a]">
              <div className="rounded-[12px] bg-[#f7f7f7] p-3">Dispatches within 2–3 business days.</div>
              <div className="rounded-[12px] bg-[#f7f7f7] p-3">Estimated delivery: 5–7 business days.</div>
              <div className="rounded-[12px] bg-[#f7f7f7] p-3">Complimentary express delivery over $500.</div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-6">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Customer reviews</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#222222]">Loved by our clients</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <div className="rounded-[20px] border border-[#dddddd] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
              <div className="text-[3rem] font-semibold tracking-[-0.06em] text-[#222222]">{product.rating.toFixed(1)}</div>
              <div className="mt-2 flex items-center gap-1 text-[#c9a227]">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className={`h-4 w-4 ${index < Math.round(product.rating) ? "fill-current" : "text-[#e8e0ce] fill-[#e8e0ce]"}`} />
                ))}
              </div>
              <div className="mt-4 text-sm text-[#6a6a6a]">Based on {product.reviews} verified reviews</div>

              <div className="mt-6 space-y-3">
                {reviewBreakdown.map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.2em] text-[#6a6a6a]">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#f2f2f2]">
                      <div className="h-full rounded-full bg-[#c9a227]" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <form onSubmit={handleReviewSubmit} className="rounded-[20px] border border-[#dddddd] bg-white p-5 shadow-[0_12px_30px_rgba(0,0,0,0.04)]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[0.68rem] uppercase tracking-[0.35em] text-[#6a6a6a]">Write a review</div>
                    <h3 className="mt-2 text-xl font-semibold text-[#222222]">Share your experience</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <button key={index} type="button" onClick={() => setReviewRating(index + 1)} className="text-[#c9a227] transition hover:scale-110">
                        <Star className={`h-5 w-5 ${index < reviewRating ? "fill-current" : "text-[#e8e0ce] fill-[#e8e0ce]"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <input
                    value={reviewName}
                    onChange={(event) => setReviewName(event.target.value)}
                    className="rounded-[12px] border border-[#dddddd] bg-[#fafafa] px-4 py-3 text-sm text-[#222222] outline-none transition focus:border-[#c9a227]"
                    placeholder="Your name"
                  />
                  <input
                    value={reviewTitle}
                    onChange={(event) => setReviewTitle(event.target.value)}
                    className="rounded-[12px] border border-[#dddddd] bg-[#fafafa] px-4 py-3 text-sm text-[#222222] outline-none transition focus:border-[#c9a227]"
                    placeholder="Review title"
                  />
                </div>
                <textarea
                  value={reviewComment}
                  onChange={(event) => setReviewComment(event.target.value)}
                  className="mt-3 min-h-[110px] w-full rounded-[12px] border border-[#dddddd] bg-[#fafafa] px-4 py-3 text-sm text-[#222222] outline-none transition focus:border-[#c9a227]"
                  placeholder="Tell us what stood out about this piece"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm text-[#6a6a6a]">Reviews are added instantly and appear at the top.</span>
                  <Button type="submit" className="px-5">Submit review</Button>
                </div>
              </form>

              <div className="marquee-shell overflow-hidden rounded-[20px] border border-[#dddddd] bg-[#f8f6f2] p-4">
                <div className="marquee-track flex min-w-max items-start gap-4">
                  {[...reviewList, ...reviewList].map((review, index) => (
                    <div key={`${review.name}-${review.title}-${index}`} className="flex h-[220px] w-[280px] shrink-0 flex-col overflow-hidden rounded-[18px] border border-[#e8e0ce] bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.04)]">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-base font-medium text-[#222222]">{review.name}</div>
                          <div className="mt-1 text-[0.68rem] uppercase tracking-[0.25em] text-[#6a6a6a]">Verified buyer</div>
                        </div>
                        <div className="flex items-center gap-1 text-[#c9a227]">
                          {Array.from({ length: 5 }, (_, starIndex) => (
                            <Star key={starIndex} className={`h-3.5 w-3.5 ${starIndex < review.rating ? "fill-current" : "text-[#e8e0ce] fill-[#e8e0ce]"}`} />
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 text-base font-medium text-[#222222]">{review.title}</div>
                      <p className="mt-3 text-sm leading-7 text-[#6a6a6a]">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-6">
            <div className="text-[0.68rem] uppercase tracking-[0.45em] text-[#6a6a6a]">Related</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#222222]">You may also like</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {related.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="block">
                <ProductCard title={item.name} price={`$${item.price}`} image={item.image} badge={item.badge} colors={item.colors} sizes={item.sizes} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
