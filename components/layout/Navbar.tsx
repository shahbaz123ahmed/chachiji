"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import {
  ShoppingBag,
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Phone,
  Sparkles,
} from "lucide-react";

interface CategoryNavItem {
  id: string;
  name: string;
  slug: string;
  subcategories: { id: string; name: string; slug: string }[];
}

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { setIsSearchOpen } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoriesWithSubs, setCategoriesWithSubs] = useState<CategoryNavItem[]>([]);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/subcategories").then((r) => r.json()),
    ])
      .then(([cData, sData]) => {
        if (cData.success && cData.categories && cData.categories.length > 0) {
          const subs: any[] = sData.success ? sData.subcategories || [] : [];
          const combined: CategoryNavItem[] = cData.categories.map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.slug || c.id,
            subcategories: subs.filter(
              (s) => s.categoryId === c.id || s.categoryId === c.slug
            ),
          }));
          setCategoriesWithSubs(combined);
        } else {
          // Fallback initial
          setCategoriesWithSubs([
            { id: "achar", name: "Achar", slug: "achar", subcategories: [] },
            { id: "makhana", name: "Mithila Makhana", slug: "makhana", subcategories: [] },
          ]);
        }
      })
      .catch(() => {});
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* 13. Top Announcement Bar - Solid #8C201C, Solid White Text, Solid Peach Dot */}
      <div className="bg-[#8C201C] text-[#FFFFFF] text-[11px] sm:text-xs py-2 px-4 tracking-wide font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E07A4A]"></span>
            <span>
              Handcrafted with love in Vaishali • Authentic Indian flavours • Free Shipping on orders above ₹599
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#FFFFFF]">
            <Link href="/track-order" className="hover:text-[#E07A4A] transition-colors font-medium">
              Track Order
            </Link>
            <span>•</span>
            <a
              href="tel:+919264266890"
              className="flex items-center gap-1 hover:text-[#E07A4A] transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-[#E07A4A]" />
              <span>+91 92642 66890</span>
            </a>
          </div>
        </div>
      </div>

      {/* 12. Main Navbar - Solid White, Crisp Typography & Contrasting CTAs */}
      <header
        className={`sticky top-0 z-40 w-full bg-[#FFFFFF] transition-shadow duration-200 border-b border-[rgba(51,51,51,0.10)] ${
          isScrolled ? "shadow-md py-3" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-[#231F20] hover:text-[#8C201C] rounded-xl transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#231F20] hover:text-[#8C201C] rounded-xl transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="Chachiji — Pyaar Bhara, Ghar Jaisa"
              width={160}
              height={52}
              priority
              quality={100}
              className="h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation Links with Hover Dropdown for Subcategories */}
          <nav className="hidden lg:flex items-center gap-7">
            {categoriesWithSubs.map((cat) => {
              const categoryPath = `/shop/${cat.slug}`;
              const isActive = pathname.startsWith(categoryPath);
              const hasSubcategories = cat.subcategories && cat.subcategories.length > 0;

              return (
                <div key={cat.id} className="relative group py-1.5">
                  <Link
                    href={categoryPath}
                    className={`text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 relative py-1 ${
                      isActive ? "text-[#8C201C] font-bold" : "text-[#231F20] hover:text-[#8C201C]"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {hasSubcategories && (
                      <ChevronDown className="w-3.5 h-3.5 text-[#888888] group-hover:text-[#8C201C] transition-transform duration-200 group-hover:rotate-180" />
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#8C201C] rounded-full"></span>
                    )}
                  </Link>

                  {/* Dropdown Menu when category has subcategories */}
                  {hasSubcategories && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50 min-w-[240px]">
                      <div className="bg-white rounded-2xl border border-[#EFE7DD] shadow-2xl p-2.5 space-y-1">
                        <div className="px-3 py-1.5 border-b border-[#EFE7DD] mb-1 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-[#E07A4A]">
                            {cat.name} Varieties
                          </span>
                          <span className="text-[10px] font-bold text-[#888888]">
                            {cat.subcategories.length} Collections
                          </span>
                        </div>

                        {/* All in Category Link */}
                        <Link
                          href={categoryPath}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#8C201C] hover:bg-[#FFF9F3] transition-colors"
                        >
                          <span>View All {cat.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#8C201C]" />
                        </Link>

                        {/* Subcategory Links */}
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`${categoryPath}?sub=${encodeURIComponent(sub.name)}`}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#231F20] hover:text-[#8C201C] hover:bg-[#FFF9F3] transition-colors"
                          >
                            <span>{sub.name}</span>
                            <ChevronRight className="w-3 h-3 text-[#888888] opacity-60" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/about"
              className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                pathname === "/about" ? "text-[#8C201C] font-bold" : "text-[#231F20] hover:text-[#8C201C]"
              }`}
            >
              About Us
              {pathname === "/about" && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#8C201C] rounded-full"></span>
              )}
            </Link>

            <Link
              href="/contact"
              className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                pathname === "/contact" ? "text-[#8C201C] font-bold" : "text-[#231F20] hover:text-[#8C201C]"
              }`}
            >
              Contact
              {pathname === "/contact" && (
                <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#8C201C] rounded-full"></span>
              )}
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-[#FFFFFF] hover:border-[#8C201C] text-[#777777] hover:text-[#231F20] border border-[rgba(51,51,51,0.18)] px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-3.5 h-3.5 text-[#8C201C]" />
              <span>Search flavours...</span>
              <kbd className="bg-[#FFF9F3] text-[10px] text-[#231F20] font-bold px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist */}
            <Link
              href="/account?tab=wishlist"
              className="relative p-2 text-[#8C201C] hover:text-[#6B1815] rounded-xl transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#8C201C]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8C201C] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="hidden sm:flex p-2 text-[#231F20] hover:text-[#8C201C] rounded-xl transition-colors"
              aria-label="My Account"
            >
              <User className="w-5 h-5 text-[#231F20]" />
            </Link>

            {/* Basket Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFFFFF]" />
              <span className="text-xs font-bold hidden sm:inline">Basket</span>
              <span className="bg-[#E07A4A] text-[#231F20] text-xs font-black px-1.5 py-0.5 rounded-md leading-none shadow-2xs">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Accordion Subcategories */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between border-r border-[rgba(51,51,51,0.10)] animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-5 flex items-center justify-between bg-[#8C201C] text-[#FFFFFF]">
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#FFFFFF]">
                  CHACHIJI
                </span>
                <span className="block text-[8px] uppercase tracking-[0.2em] text-[#E07A4A] font-bold">
                  Homemade Cuisine
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-[#FFFFFF] hover:text-[#E07A4A] cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5">
              {categoriesWithSubs.map((cat) => {
                const categoryPath = `/shop/${cat.slug}`;
                const hasSubs = cat.subcategories && cat.subcategories.length > 0;
                const isExpanded = mobileExpandedCat === cat.id;

                return (
                  <div key={cat.id} className="space-y-1">
                    <div className="flex items-center justify-between rounded-xl hover:bg-[#FFF9F3] transition-colors pr-2">
                      <Link
                        href={categoryPath}
                        className="flex-1 px-3 py-2.5 text-sm font-semibold text-[#231F20] hover:text-[#8C201C]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {cat.name}
                      </Link>
                      {hasSubs && (
                        <button
                          onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)}
                          className="p-1.5 text-[#888888] hover:text-[#8C201C] rounded-lg cursor-pointer"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isExpanded ? "rotate-180 text-[#8C201C]" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Subcategories Dropdown */}
                    {hasSubs && isExpanded && (
                      <div className="pl-4 pr-1 py-1 space-y-1 bg-[#FFF9F3]/60 rounded-xl border border-[#EFE7DD] mb-2 animate-in fade-in slide-in-from-top-1">
                        <Link
                          href={categoryPath}
                          className="block px-3 py-1.5 text-xs font-bold text-[#8C201C]"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          ↳ All {cat.name}
                        </Link>
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`${categoryPath}?sub=${encodeURIComponent(sub.name)}`}
                            className="block px-3 py-1.5 text-xs font-medium text-[#555555] hover:text-[#8C201C]"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            ↳ {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <Link
                href="/about"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#231F20] hover:text-[#8C201C] hover:bg-[#FFF9F3] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>About Us</span>
                <ChevronRight className="w-4 h-4 text-[#8C201C]" />
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#231F20] hover:text-[#8C201C] hover:bg-[#FFF9F3] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Contact</span>
                <ChevronRight className="w-4 h-4 text-[#8C201C]" />
              </Link>

              <div className="pt-4 mt-4 border-t border-[rgba(51,51,51,0.10)] space-y-1">
                <Link
                  href="/track-order"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#555555] hover:text-[#8C201C] hover:bg-[#FFF9F3]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Track Your Order</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555]" />
                </Link>
                <Link
                  href="/account"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#555555] hover:text-[#8C201C] hover:bg-[#FFF9F3]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>My Account &amp; Orders</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555]" />
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#555555] hover:text-[#8C201C] hover:bg-[#FFF9F3]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Admin Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555]" />
                </Link>
              </div>
            </div>

            {/* Footer info */}
            <div className="p-4 bg-[#FFF9F3] border-t border-[rgba(51,51,51,0.10)] text-xs text-[#555555] text-center font-medium">
              <span>Pure &amp; Authentic Indian Cuisine</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
