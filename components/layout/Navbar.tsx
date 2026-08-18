"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Phone,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { setIsSearchOpen } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  }, [pathname]);

  const navLinks = [
    { label: "Shop All", href: "/shop" },
    { label: "Achar", href: "/shop/achar" },
    { label: "Mithila Makhana", href: "/shop/makhana" },
    { label: "Gift Bundles", href: "/shop/bundles" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* 13. Top Announcement Bar - Solid #8B3E3E, Solid White Text, Solid Peach Dot */}
      <div className="bg-[#8B3E3E] text-[#FFFFFF] text-[11px] sm:text-xs py-2 px-4 tracking-wide font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F7A77A]"></span>
            <span>
              Handcrafted with love in Vaishali • Authentic Indian flavours • Free Shipping on orders above ₹599
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#FFFFFF]">
            <Link href="/track-order" className="hover:text-[#F7A77A] transition-colors font-medium">
              Track Order
            </Link>
            <span>•</span>
            <a
              href="tel:+918860488004"
              className="flex items-center gap-1 hover:text-[#F7A77A] transition-colors font-medium"
            >
              <Phone className="w-3 h-3 text-[#F7A77A]" />
              <span>+91 88604 88004</span>
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
              className="p-2 text-[#333333] hover:text-[#8B3E3E] rounded-xl transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#333333] hover:text-[#8B3E3E] rounded-xl transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-center group text-center">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#8B3E3E] group-hover:text-[#733232] transition-colors">
              CHACHIJI
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#F7A77A] font-bold">
              Homemade Cuisine
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-[#8B3E3E] font-bold"
                      : "text-[#333333] hover:text-[#8B3E3E]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#8B3E3E] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 bg-[#FFFFFF] hover:border-[#8B3E3E] text-[#777777] hover:text-[#333333] border border-[rgba(51,51,51,0.18)] px-3.5 py-1.5 rounded-full text-xs transition-colors"
              aria-label="Search products"
            >
              <Search className="w-3.5 h-3.5 text-[#8B3E3E]" />
              <span>Search flavours...</span>
              <kbd className="bg-[#FCE9D6] text-[10px] text-[#333333] font-bold px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist */}
            <Link
              href="/account?tab=wishlist"
              className="relative p-2 text-[#8B3E3E] hover:text-[#733232] rounded-xl transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-[#8B3E3E]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#8B3E3E] text-[#FFFFFF] text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="hidden sm:flex p-2 text-[#333333] hover:text-[#8B3E3E] rounded-xl transition-colors"
              aria-label="My Account"
            >
              <User className="w-5 h-5 text-[#333333]" />
            </Link>

            {/* Basket Button: Solid #8B3E3E with solid #F7A77A badge */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-[#8B3E3E] hover:bg-[#733232] text-[#FFFFFF] px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#FFFFFF]" />
              <span className="text-xs font-bold hidden sm:inline text-[#FFFFFF]">Basket</span>
              <span className="w-5 h-5 rounded-full bg-[#F7A77A] text-[#333333] text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between border-r border-[rgba(51,51,51,0.10)] animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-5 flex items-center justify-between bg-[#8B3E3E] text-[#FFFFFF]">
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#FFFFFF]">
                  CHACHIJI
                </span>
                <span className="block text-[8px] uppercase tracking-[0.2em] text-[#F7A77A] font-bold">
                  Homemade Cuisine
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-[#FFFFFF] hover:text-[#F7A77A]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-[#333333] hover:text-[#8B3E3E] hover:bg-[#FCE9D6] transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#8B3E3E]" />
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-[rgba(51,51,51,0.10)] space-y-1">
                <Link
                  href="/track-order"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#555555] hover:text-[#8B3E3E] hover:bg-[#FCE9D6]"
                >
                  <span>Track Your Order</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555]" />
                </Link>
                <Link
                  href="/account"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#555555] hover:text-[#8B3E3E] hover:bg-[#FCE9D6]"
                >
                  <span>My Account &amp; Orders</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555]" />
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#555555] hover:text-[#8B3E3E] hover:bg-[#FCE9D6]"
                >
                  <span>Admin Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#555555]" />
                </Link>
              </div>
            </div>

            {/* Footer info */}
            <div className="p-4 bg-[#FCE9D6] border-t border-[rgba(51,51,51,0.10)] text-center">
              <p className="text-[11px] text-[#555555] mb-2">
                Need assistance? Call or WhatsApp us:
              </p>
              <a
                href="tel:+918860488004"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B3E3E] hover:text-[#733232]"
              >
                <Phone className="w-3.5 h-3.5 text-[#8B3E3E]" />
                <span>+91 88604 88004</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
