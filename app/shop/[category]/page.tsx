import React from "react";
import { notFound } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { FAQS } from "@/data/faqs";
import ProductCard from "@/components/product/ProductCard";
import { ProductCategory } from "@/types/ecommerce";
import {
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return { title: "Category Not Found" };

  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    openGraph: {
      title: cat.seoTitle,
      description: cat.seoDescription,
      images: [{ url: cat.heroImage }],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = CATEGORIES.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter(
    (p) => p.category === (categoryData.id as ProductCategory)
  );

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center gap-1.5 text-xs text-[#777777] font-medium">
          <NextLink href="/" className="hover:text-[#8C201C]">
            Home
          </NextLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <NextLink href="/shop" className="hover:text-[#8C201C]">
            Shop
          </NextLink>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#8C201C] font-bold">{categoryData.name}</span>
        </div>
      </div>

      {/* Editorial Category Hero - Solid #8C201C with solid #E07A4A tag */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="relative rounded-3xl overflow-hidden bg-[#8C201C] text-[#FFFFFF] p-8 sm:p-12 lg:p-16 border-2 border-[#6B1815] shadow-xl">
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src={categoryData.heroImage}
              alt={categoryData.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block bg-[#E07A4A] text-[#231F20] text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-sm">
              {categoryData.hindiName}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight mb-3">
              {categoryData.name}
            </h1>
            <p className="font-serif text-lg sm:text-xl text-[#FFF9F3] italic mb-4 font-bold">
              {categoryData.headline}
            </p>
            <p className="text-xs sm:text-sm text-[#FFFFFF] leading-relaxed mb-6 font-medium">
              {categoryData.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {categoryData.highlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#FFF9F3] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#E07A4A] shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid Section - Clean Solid White Surface */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.10)] pb-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
              Handcrafted Selection
            </h2>
            <span className="text-xs text-[#555555] font-semibold">
              {categoryProducts.length} authentic products available
            </span>
          </div>
          <NextLink
            href="/shop"
            className="text-xs font-bold text-[#8C201C] hover:text-[#6B1815] flex items-center gap-1"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category FAQs - Solid Cream Cards */}
      {categoryFaqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-t border-[rgba(51,51,51,0.10)]">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Heritage Knowledge
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20] mt-1">
              Frequently Asked About {categoryData.name}
            </h3>
          </div>

          <div className="space-y-4">
            {categoryFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#FFF9F3] p-6 rounded-2xl border border-[rgba(51,51,51,0.10)] shadow-xs"
              >
                <h4 className="font-serif text-base font-bold text-[#231F20] mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-[#8C201C] shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#231F20] font-medium leading-relaxed pl-7">
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
