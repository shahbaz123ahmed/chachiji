import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Heart,
  Sun,
  Droplets,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story — Handcrafted Culinary Heritage of Bihar & Mithila",
  description:
    "Learn about Chachiji's Homemade Cuisine. Heirloom recipes from Vaishali, Bihar, wood cold-pressed mustard oil, sun-curing in earthen martabans, and sacred Mithila wetland makhana.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Hero - Solid #8B3E3E */}
      <section className="relative bg-[#8B3E3E] text-[#FFFFFF] py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1600&q=80"
            alt="Traditional Indian Spice Martabans"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#F7A77A] text-[#333333] text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full mb-4 shadow-sm">
            Our Roots in Vaishali, Bihar
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight mb-6">
            Crafted by Heart. <br />
            <span className="italic font-normal text-[#FCE9D6]">
              Ground by Hand.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-[#FCE9D6] font-medium leading-relaxed max-w-2xl mx-auto">
            Chachiji was born from an unwavering devotion to the authentic, unadulterated tastes of home — where every achar is cured under open sunshine and every makhana is harvested from sacred wetlands.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Hearth of Vaishali */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-2 border-[rgba(51,51,51,0.10)] bg-white">
            <Image
              src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan sun curing pickles in porcelain martabans"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
              The Beginning
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333]">
              The Nostalgia of Grandmother&apos;s Rooftop
            </h2>
            <p className="text-xs sm:text-sm text-[#333333] font-medium leading-relaxed">
              Growing up in Bihar, summer was synonymous with rooftop ceramic martabans (*mrittika-bhanda*) covered in pure muslin cloth. The aroma of freshly crushed yellow mustard seeds, whole roasted fennel, and pungent wood-pressed mustard oil filled the breeze.
            </p>
            <p className="text-xs sm:text-sm text-[#333333] font-medium leading-relaxed">
              In an era dominated by mass-produced factory pickles laden with acetic acid and synthetic preservatives, Chachiji was founded with a single pledge: <strong>to never take shortcuts with tradition</strong>.
            </p>
            <div className="bg-[#FCE9D6] p-4 rounded-2xl border border-[rgba(51,51,51,0.10)] text-xs text-[#8B3E3E] font-serif italic font-bold shadow-2xs">
              &quot;If it cannot be prepared with the same purity we feed our own children, it will never leave our kitchen.&quot;
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Mithila Wetland Connection - Solid Cream Section */}
      <section id="mithila" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FCE9D6] border-y border-[rgba(51,51,51,0.10)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-5 order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
              Mithila Sacred Waters
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333]">
              GI-Tagged Mithila Makhana
            </h2>
            <p className="text-xs sm:text-sm text-[#333333] font-medium leading-relaxed">
              Mithila produces over 85% of the world&apos;s Fox Nuts. The freshwater wetlands of Darbhanga, Madhubani, and Sitamarhi provide the pristine mineral-rich environment where the prickly water lily (*Euryale Ferox*) flourishes.
            </p>
            <p className="text-xs sm:text-sm text-[#333333] font-medium leading-relaxed">
              Every morning at dawn, indigenous Mallah community harvesters dive deep into the calm waters to gather the seeds from the muddy lakebeds. We work directly with these artisan farming clusters, paying fair prices and selecting only the top Grade A+ jumbo white blooms.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] px-3 py-1.5 rounded-xl font-bold text-[#8B3E3E] shadow-2xs">
                Direct Farmer Partnership
              </span>
              <span className="bg-[#FFFFFF] border border-[rgba(51,51,51,0.10)] px-3 py-1.5 rounded-xl font-bold text-[#8B3E3E] shadow-2xs">
                GI Registered Origin
              </span>
            </div>
          </div>

          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FFFFFF] order-1 lg:order-2 bg-white">
            <Image
              src="https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80"
              alt="Makhana wetlands harvesting in Mithila Bihar"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Chapter 3: Four Pillars of Authenticity - Solid White Canvas */}
      <section id="process" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B3E3E]">
            Artisan Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#333333] mt-1">
            Our 4 Sacred Kitchen Commitments
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#FCE9D6] p-6 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8B3E3E] text-[#FFFFFF] flex items-center justify-center">
              <Sun className="w-6 h-6 text-[#F7A77A]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#333333]">
              100% Sun-Cured
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              No artificial heaters or chemical ripening chambers. Pickles cure naturally over 12-14 days in porcelain martabans under bright sunlight.
            </p>
          </div>

          <div className="bg-[#FCE9D6] p-6 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8B3E3E] text-[#FFFFFF] flex items-center justify-center">
              <Droplets className="w-6 h-6 text-[#F7A77A]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#333333]">
              Wood Cold-Pressed Oil
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              We exclusively use unrefined kachchi ghani mustard oil, preserving natural pungent allyl isothiocyanate and essential antioxidants.
            </p>
          </div>

          <div className="bg-[#FCE9D6] p-6 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8B3E3E] text-[#FFFFFF] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#F7A77A]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#333333]">
              Zero Chemical Additives
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              No sodium benzoate, no artificial food colorings, and no synthetic vinegar. Natural fermentation preserved by salt and oil.
            </p>
          </div>

          <div className="bg-[#FCE9D6] p-6 rounded-3xl border border-[rgba(51,51,51,0.10)] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#8B3E3E] text-[#FFFFFF] flex items-center justify-center">
              <Heart className="w-6 h-6 text-[#F7A77A]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#333333]">
              Local Artisan Empowerment
            </h3>
            <p className="text-xs text-[#555555] font-medium leading-relaxed">
              Prepared and packed by experienced rural women artisans in Vaishali, supporting dignified heritage livelihoods.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Strip - Solid Deep Red #8B3E3E */}
      <section className="bg-[#8B3E3E] text-[#FFFFFF] py-16 px-4 sm:px-6 lg:px-8 text-center border-t border-[#733232]">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Taste the Authentic Spirit of Bihar
          </h2>
          <p className="text-xs sm:text-sm text-[#FCE9D6] font-medium max-w-xl mx-auto">
            Order fresh small-batch pickles and roasted fox nuts delivered directly from our Vaishali kitchen to your dining table.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#F7A77A] hover:bg-[#E89565] text-[#333333] font-bold text-xs px-8 py-3.5 rounded-xl shadow-md transition-all"
            >
              <span>Explore Our Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
