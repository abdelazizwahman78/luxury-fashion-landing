import type { Metadata } from "next";
import { SiteShell, Breadcrumbs } from "@/components/site/page-shell";
import { GalleryPage } from "@/components/gallery/gallery-page";

export const metadata: Metadata = {
  title: "Gallery | AURELIA",
  description: "Explore the editorial gallery and curated luxury fashion moments from AURELIA.",
};

export default function GalleryRoute() {
  return (
    <SiteShell>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Gallery" }]} />
      <GalleryPage />
    </SiteShell>
  );
}
