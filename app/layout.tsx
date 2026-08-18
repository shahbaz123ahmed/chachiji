import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/search/SearchOverlay";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Toast from "@/components/ui/Toast";

export const viewport: Viewport = {
  themeColor: "#8C201C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chachiji.in"),
  title: {
    default: "Chachiji — Authentic Handcrafted Achar & Mithila Makhana",
    template: "%s | Chachiji's Homemade Cuisine",
  },
  description:
    "Handcrafted with heart and rooted in tradition. Authentic Bihari sun-cured pickles in pure cold-pressed mustard oil, and GI-tagged Mithila Makhana from Vaishali & Darbhanga, Bihar. Delivered across India.",
  keywords: [
    "Chachiji",
    "Chachiji Achar",
    "Mithila Makhana",
    "Bihari Pickle Online",
    "Bharwa Lal Mirch Achar",
    "Kacha Aam Achar",
    "Oal Jimikand Achar",
    "Wood Cold Pressed Mustard Oil Pickle",
    "Sun Cured Pickles India",
    "GI Tagged Mithila Makhana",
  ],
  authors: [{ name: "Chachiji's Homemade Cuisine", url: "https://chachiji.in" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://chachiji.in",
    siteName: "Chachiji's Homemade Cuisine",
    title: "Chachiji — Authentic Handcrafted Achar & Mithila Makhana",
    description:
      "Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Chachiji Handcrafted Indian Pickles and Makhana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chachiji — Authentic Handcrafted Achar & Mithila Makhana",
    description:
      "Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home.",
    images: [
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#231F20] antialiased">
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <SearchOverlay />
              <WhatsAppButton />
              <Toast />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

