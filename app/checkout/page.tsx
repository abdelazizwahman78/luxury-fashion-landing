import type { Metadata } from "next";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { CheckoutPage } from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Checkout | AURELIA",
  description: "Complete your secure premium fashion checkout in a streamlined multi-step flow.",
};

export default function CheckoutRoute() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-8 lg:px-[80px] lg:py-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Checkout" }]} />
        <CheckoutPage />
      </div>
    </SiteShell>
  );
}
