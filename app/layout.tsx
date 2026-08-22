import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
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
    "Bihar Pickle",
    "Homemade Achar",
    "Bharwa Mirch Achar",
    "Organic Makhana",
    "Vaishali Pickles",
  ],
  authors: [{ name: "Chachiji's Homemade Cuisine", url: "https://chachiji.in" }],
  creator: "Chachiji Heritage Foods",
  publisher: "Chachiji",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://chachiji.in",
    siteName: "Chachiji — Authentic Handcrafted Achar & Mithila Makhana",
    title: "Chachiji — Authentic Handcrafted Achar & Mithila Makhana",
    description:
      "Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home.",
    images: [
      {
        url: "https://chachiji.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chachiji — Authentic Handcrafted Achar & Mithila Makhana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chachiji — Authentic Handcrafted Achar & Mithila Makhana",
    description:
      "Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home.",
    images: [
      "https://chachiji.in/og-image.jpg",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[#FFF9F3] text-[#231F20] antialiased"
        suppressHydrationWarning
      >
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
