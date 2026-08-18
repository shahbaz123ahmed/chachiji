"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product, ProductVariant, Coupon } from "@/types/ecommerce";
import { BRAND_INFO, AVAILABLE_COUPONS } from "@/data/brandInfo";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  freeShippingRemaining: number;
  totalItems: number;
  toastMessage: string | null;
  setToastMessage: (msg: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("chachiji_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("chachiji_coupon");
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("chachiji_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem("chachiji_coupon", JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem("chachiji_coupon");
      }
    } catch (e) {
      console.error("Failed to save coupon to localStorage", e);
    }
  }, [appliedCoupon, isHydrated]);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const addToCart = (
    product: Product,
    variant?: ProductVariant,
    quantity = 1,
    openDrawer = true
  ) => {
    const selectedVariant = variant || product.variants[0] || {
      id: "default",
      weight: product.weight,
      price: product.price,
      mrp: product.mrp,
      inStock: true,
    };

    const cartItemId = `${product.id}-${selectedVariant.id}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          variantId: selectedVariant.id,
          name: product.name,
          slug: product.slug,
          weight: selectedVariant.weight,
          price: selectedVariant.price,
          mrp: selectedVariant.mrp,
          image: product.images[0],
          quantity,
          category: product.category,
        };
        return [...prev, newItem];
      }
    });

    setToastMessage(`Added "${product.name} (${selectedVariant.weight})" to cart!`);

    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);

    if (!coupon) {
      return { success: false, message: "Invalid coupon code. Try CHACHIJI10" };
    }

    if (subtotal < coupon.minOrderValue) {
      return {
        success: false,
        message: `Add ₹${coupon.minOrderValue - subtotal} more to apply ${coupon.code}`,
      };
    }

    setAppliedCoupon(coupon);
    setToastMessage(`Coupon ${coupon.code} applied successfully!`);
    return { success: true, message: `Coupon ${coupon.code} applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setToastMessage("Coupon removed");
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = appliedCoupon.value;
    }
  }

  const freeShippingRemaining = Math.max(0, BRAND_INFO.freeShippingThreshold - subtotal);
  const shippingFee = subtotal === 0 || subtotal >= BRAND_INFO.freeShippingThreshold ? 0 : BRAND_INFO.standardShippingFee;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        freeShippingRemaining,
        totalItems,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
