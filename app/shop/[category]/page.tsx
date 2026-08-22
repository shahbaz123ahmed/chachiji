import React from "react";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getCategories, getProducts, getSubCategories } from "@/lib/db";
import { FAQS } from "@/data/faqs";
import ProductCard from "@/components/product/ProductCard";
import { ProductCategory } from "@/types/ecommerce";
import {
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  ArrowRight,
  Package,
  Filter,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CategoryBannerSlideshow from "@/components/category/CategoryBannerSlideshow";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{
    sub?: string;
    subcategory?: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
  searchParams,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const sParams = searchParams ? await searchParams : {};
  const activeSub = sParams.sub || sParams.subcategory || null;

  const categories = getCategories();
  const normalized = decodeURIComponent(category).toLowerCase().trim();
  const cat = categories.find(
    (c) =>
      c.slug?.toLowerCase() === normalized ||
      c.id?.toLowerCase() === normalized ||
      c.name?.toLowerCase().replace(/\s+/g, "-") === normalized
  );
  if (!cat) return { title: "Category Not Found" };

  const titlePrefix = activeSub ? `${activeSub} — ${cat.name}` : cat.name;

  return {
    title: `${titlePrefix} Online - Chachiji`,
    description: cat.seoDescription || cat.description,
    openGraph: {
      title: `${titlePrefix} | Chachiji's Homemade Cuisine`,
      description: cat.seoDescription || cat.description,
      images: [{ url: cat.heroImage || "/slide1.png" }],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const sParams = searchParams ? await searchParams : {};
  const activeSub = sParams.sub || sParams.subcategory || null;

  const allCategories = getCategories();
  const allSubcategories = getSubCategories();

  const normalized = decodeURIComponent(category).toLowerCase().trim();
  const categoryData = allCategories.find(
    (c) =>
      c.slug?.toLowerCase() === normalized ||
      c.id?.toLowerCase() === normalized ||
      c.name?.toLowerCase().replace(/\s+/g, "-") === normalized
  );

  if (!categoryData) {
    notFound();
  }

  // Subcategories linked to this category
  const categorySubcategories = allSubcategories.filter(
    (s) => s.categoryId === categoryData.id || s.categoryId === categoryData.slug
  );

  const selectedSub = activeSub
    ? categorySubcategories.find((s) => {
        const subSlug = s.slug?.trim().toLowerCase() || s.name.trim().toLowerCase().replace(/\s+/g, "-");
        const active = activeSub.trim().toLowerCase();
        return (
          subSlug === active ||
          s.id?.trim().toLowerCase() === active ||
          s.name?.trim().toLowerCase() === active ||
          s.name?.trim().toLowerCase().replace(/\s+/g, "-") === active
        );
      })
    : null;

  // Active display data (uses selected subcategory data if available, with category fallback)
  const displayTitle = selectedSub?.name || categoryData.name;
  const displayHindi = selectedSub?.hindiName || categoryData.hindiName;
  const displayHeadline = selectedSub?.headline || categoryData.headline;
  const displayDescription = selectedSub?.description || categoryData.description;

  // STRICT: If subcategory is selected, use ONLY its images (no category fallback for images)
  // This ensures subcategory image changes are always reflected
  const subImages: string[] = selectedSub
    ? Array.isArray(selectedSub.heroImages) && selectedSub.heroImages.filter(Boolean).length > 0
      ? selectedSub.heroImages.filter(Boolean)
      : selectedSub.heroImage
      ? [selectedSub.heroImage]
      : []
    : [];

  const catImages: string[] =
    Array.isArray(categoryData.heroImages) && categoryData.heroImages.filter(Boolean).length > 0
      ? categoryData.heroImages.filter(Boolean)
      : categoryData.heroImage
      ? [categoryData.heroImage]
      : ["/makh1-clean.png"];

  // When a subcategory is selected: use its images if it has any, else show empty (no category images)
  // When no subcategory: use category images
  const displayImages: string[] = selectedSub
    ? subImages.length > 0
      ? subImages
      : catImages // fallback only when sub has no images at all
    : catImages;

  const displayImagePosition = selectedSub?.imagePosition || categoryData.imagePosition || "right";
  const displayTextAlign = selectedSub?.textAlign || categoryData.textAlign || "left";
  const displayHighlights: string[] =
    selectedSub && Array.isArray(selectedSub.highlights) && selectedSub.highlights.length > 0
      ? selectedSub.highlights
      : Array.isArray(categoryData.highlights) && categoryData.highlights.length > 0
      ? categoryData.highlights
      : [];


  const allProducts = getProducts();
  const allCategoryProducts = allProducts.filter(
    (p) =>
      p.category === categoryData.id ||
      p.category === categoryData.slug ||
      p.category.toLowerCase() === categoryData.name.toLowerCase()
  );

  // Filter products by subcategory if one is active
  const categoryProducts = activeSub
    ? allCategoryProducts.filter(
        (p) =>
          p.subCategory &&
          (p.subCategory.toLowerCase() === activeSub.toLowerCase() ||
            p.subCategory.toLowerCase().replace(/\s+/g, "-") === activeSub.toLowerCase())
      )
    : allCategoryProducts;

  const categoryFaqs = FAQS.filter((f) =>
    categoryData.id === "achar"
      ? f.category === "Pickles & Craftsmanship"
      : categoryData.id === "makhana"
      ? f.category === "Makhana & Sourcing"
      : true
  ).slice(0, 4);

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-1">
        <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
          <NextLink href="/" className="hover:text-[#6B1815]">
            Home
          </NextLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <NextLink href="/shop" className="hover:text-[#6B1815]">
            Shop
          </NextLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <NextLink
            href={`/shop/${categoryData.slug || categoryData.id}`}
            className={selectedSub ? "hover:text-[#6B1815]" : "text-[#6B1815] font-bold"}
          >
            {categoryData.name}
          </NextLink>
          {selectedSub && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#6B1815] font-bold">{selectedSub.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Editorial Category / Subcategory Hero - Consistent Clean Split Banner Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
        {(() => {
          const isImageLeft = displayImagePosition === "left";
          const isTextRight = displayTextAlign === "right";

          return (
            <div
              key={`${categoryData.id}-${selectedSub?.id || "root"}`}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#F4F8FC] via-[#EAF2F8] to-[#DFEBF4] border border-[#D4E2ED] shadow-md p-5 sm:p-6 lg:px-8 lg:py-4 min-h-[280px] sm:min-h-[330px] lg:min-h-[360px]"
            >
              {/* Subtle bottom-up dark gradient overlay so text is crisp and readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#152332]/90 via-[#152332]/40 to-transparent pointer-events-none z-0" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
                {/* Text Info Column */}
                <div
                  className={`space-y-2 py-1 ${
                    isImageLeft
                      ? "order-2 lg:order-2 lg:col-span-5 xl:col-span-4"
                      : "order-1 lg:order-1 lg:col-span-5 xl:col-span-4"
                  } ${
                    isTextRight
                      ? "text-right flex flex-col items-end"
                      : "text-left flex flex-col items-start"
                  }`}
                >
                  <Reveal direction={isImageLeft ? "left" : "right"} delay={80}>
                    {displayHindi && (
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#E07A4A] block mb-0.5 drop-shadow-xs">
                        {displayHindi}
                      </span>
                    )}
                    <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFFFF] leading-tight drop-shadow-sm">
                      {displayTitle}
                    </h1>
                    {displayHeadline && (
                      <p className="font-serif text-sm sm:text-base text-[#E2E8F0] italic font-medium mt-0.5">
                        {displayHeadline}
                      </p>
                    )}
                  </Reveal>

                  {displayDescription && (
                    <Reveal direction={isImageLeft ? "left" : "right"} delay={180}>
                      <p className="text-xs sm:text-sm text-[#CBD5E1] font-medium leading-relaxed">
                        {displayDescription}
                      </p>
                    </Reveal>
                  )}

                  {/* Highlights / Badges */}
                  {displayHighlights.length > 0 && (
                    <Reveal direction={isImageLeft ? "left" : "right"} delay={280}>
                      <div
                        className={`flex flex-wrap gap-2 pt-1 ${
                          isTextRight ? "justify-end" : "justify-start"
                        }`}
                      >
                        {displayHighlights.slice(0, 3).map((highlight, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-[11px] sm:text-xs text-[#FFFFFF] font-semibold bg-[#152332]/60 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-white/20 shadow-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E07A4A] shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  )}
                </div>

                {/* Image / Multi-Banner Slideshow Column */}
                <div
                  className={`flex items-center justify-center w-full overflow-hidden ${
                    isImageLeft
                      ? "order-1 lg:order-1 lg:col-span-7 xl:col-span-8"
                      : "order-2 lg:order-2 lg:col-span-7 xl:col-span-8"
                  }`}
                >
                  <Reveal direction={isImageLeft ? "right" : "left"} delay={120} className="w-full flex justify-center">
                    <CategoryBannerSlideshow
                      key={`slideshow-${categoryData.id}-${selectedSub?.id ?? "root"}-${displayImages.join(",")}`}
                      images={displayImages}
                      name={displayTitle}
                    />
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Product Grid Section - Clean Solid White Surface */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[rgba(51,51,51,0.10)] pb-4 mb-6 gap-3">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
              {activeSub ? activeSub : "Handcrafted Selection"}
            </h2>
            <span className="text-xs text-[#555555] font-semibold">
              {categoryProducts.length} authentic products available {activeSub ? `in ${activeSub}` : `in ${categoryData.name}`}
            </span>
          </div>
          <NextLink
            href="/shop"
            className="text-xs font-bold text-[#231F20] hover:text-[#E07A4A] flex items-center gap-1 transition-colors"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        {/* Subcategory Filter Pills */}
        {categorySubcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            <span className="text-xs font-bold text-[#888888] flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#E07A4A]" />
              <span>Flavours:</span>
            </span>

            {/* All Link */}
            <NextLink
              href={`/shop/${categoryData.slug}`}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                !activeSub
                  ? "bg-[#8C201C] text-white shadow-sm"
                  : "bg-[#FFF9F3] text-[#231F20] hover:bg-[#EFE7DD] border border-[#EFE7DD]"
              }`}
            >
              All {categoryData.name} ({allCategoryProducts.length})
            </NextLink>

            {/* Subcategory links */}
            {categorySubcategories.map((sub) => {
              const subKey = sub.slug || sub.name.toLowerCase().replace(/\s+/g, "-").trim();
              const isSelected =
                activeSub &&
                (activeSub.trim().toLowerCase() === sub.name.trim().toLowerCase() ||
                  activeSub.trim().toLowerCase() === sub.slug?.trim().toLowerCase() ||
                  activeSub.trim().toLowerCase() === subKey);
              const count = allCategoryProducts.filter(
                (p) => p.subCategory && p.subCategory.trim().toLowerCase() === sub.name.trim().toLowerCase()
              ).length;

              return (
                <NextLink
                  key={sub.id}
                  href={`/shop/${categoryData.slug}?sub=${encodeURIComponent(subKey)}`}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#8C201C] text-white shadow-sm"
                      : "bg-[#FFF9F3] text-[#231F20] hover:bg-[#EFE7DD] border border-[#EFE7DD]"
                  }`}
                >
                  <span>{sub.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white text-[#8C201C] border border-[#EFE7DD]"
                    }`}
                  >
                    {count}
                  </span>
                </NextLink>
              );
            })}
          </div>
        )}

        {categoryProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#FFF9F3] rounded-3xl border border-[#EFE7DD] p-8 space-y-3">
            <Package className="w-10 h-10 text-[#E07A4A] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#231F20]">
              {activeSub ? `No Products in "${activeSub}" Yet` : `No Products Added to ${categoryData.name} Yet`}
            </h3>
            <p className="text-xs text-[#555555] max-w-md mx-auto leading-relaxed">
              New handcrafted batches are being prepared. Open the Admin Dashboard to add products to this collection.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {activeSub && (
                <NextLink
                  href={`/shop/${categoryData.slug}`}
                  className="inline-flex items-center gap-1.5 bg-[#FFF9F3] hover:bg-[#EFE7DD] border border-[#EFE7DD] text-[#231F20] text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                >
                  Clear Filter
                </NextLink>
              )}
              <NextLink
                href="/admin"
                className="inline-flex items-center gap-1.5 bg-[#8C201C] hover:bg-[#6B1815] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
              >
                Open Admin Dashboard
              </NextLink>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Category FAQs - Solid Cream Cards */}
      {categoryFaqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-[rgba(51,51,51,0.10)]">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E07A4A]">
              Heritage Knowledge
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20] mt-1">
              Frequently Asked About {categoryData.name}
            </h3>
          </div>

          <div className="space-y-3.5">
            {categoryFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#FFF9F3] p-5 sm:p-6 rounded-2xl border border-[#EFE7DD] shadow-2xs"
              >
                <h4 className="font-serif text-base font-bold text-[#231F20] mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-[#E07A4A] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
