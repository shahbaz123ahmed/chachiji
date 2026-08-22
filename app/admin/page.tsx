"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tags,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Search,
  Filter,
  CheckCircle2,
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  ShieldCheck,
  UploadCloud,
  ShoppingBag,
  Phone,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Truck,
  SlidersHorizontal,
  Sparkles,
  BookOpen,
  Info,
} from "lucide-react";
import { Product, CategoryInfo, SubCategoryInfo, Order, HeroConfig, HeroSlideItem, AboutConfig } from "@/types/ecommerce";

export default function AdminDashboardPage() {
  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [selectedHeroSlideIndex, setSelectedHeroSlideIndex] = useState(0);
  const [selectedAboutSlideIndex, setSelectedAboutSlideIndex] = useState(0);

  // Tab & Data States
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "categories" | "subcategories" | "hero" | "about" | "overview">("orders");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategoryInfo[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Create Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddSubCategoryOpen, setIsAddSubCategoryOpen] = useState(false);

  // Edit Modals
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryInfo | null>(null);
  const [editCategoryForm, setEditCategoryForm] = useState({
    name: "",
    hindiName: "",
    slug: "",
    headline: "",
    description: "",
    heroImage: "",
    heroImages: [] as string[],
    imagePosition: "right" as "left" | "right" | "center",
    textAlign: "left" as "left" | "right",
    hideText: false,
    highlights: "",
  });

  const [isEditSubCategoryOpen, setIsEditSubCategoryOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategoryInfo | null>(null);
  const [editSubCategoryForm, setEditSubCategoryForm] = useState({
    name: "",
    hindiName: "",
    categoryId: "",
    headline: "",
    description: "",
    heroImage: "/makh1-clean.png",
    heroImages: [] as string[],
    imagePosition: "right" as "left" | "right",
    textAlign: "left" as "left" | "right",
    highlights: "",
  });

  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editProductForm, setEditProductForm] = useState({
    id: "",
    name: "",
    hindiName: "",
    category: "",
    subCategory: "",
    price: "",
    mrp: "",
    weight: "400g",
    stockCount: "50",
    images: [] as string[],
    tagline: "",
    description: "",
    ingredients: "",
    badge: "Handcrafted",
    isBestseller: false,
    isFeatured: false,
  });

  // Form States (Add)
  const [productForm, setProductForm] = useState({
    name: "",
    hindiName: "",
    category: "",
    subCategory: "",
    price: "",
    mrp: "",
    weight: "400g",
    stockCount: "50",
    images: ["/achaar-clean.png"] as string[],
    tagline: "",
    description: "",
    ingredients: "",
    badge: "Handcrafted",
    isBestseller: false,
    isFeatured: false,
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    hindiName: "",
    slug: "",
    headline: "",
    description: "",
    heroImage: "/makh1-clean.png",
    heroImages: ["/makh1-clean.png"] as string[],
    imagePosition: "right" as "left" | "right" | "center",
    textAlign: "left" as "left" | "right",
    hideText: false,
    highlights: "100% Handcrafted, Zero Preservatives, Authentic Heritage",
  });

  const [heroConfigForm, setHeroConfigForm] = useState<HeroConfig>({
    slides: [
      {
        id: "slide-1",
        image: "/heros2.png",
        badge: "Mithila Culinary Heritage • 100% Traditional",
        headingPrimary: "Crafted by Heart.",
        headingSecondary: "Rooted in Tradition.",
        subtitle: "Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home.",
        primaryBtnText: "Shop Our Flavours",
        primaryBtnLink: "/shop",
        secondaryBtnText: "Our Heritage Story",
        secondaryBtnLink: "/about",
        imagePosition: "right",
        textAlign: "left",
        hideText: false,
      }
    ],
  });

  const [aboutConfigForm, setAboutConfigForm] = useState<AboutConfig>({
    slides: [
      {
        id: "about-slide-1",
        image: "/about-hero-v2.png",
        badge: "Our Roots in Vaishali, Bihar",
        headingPrimary: "Crafted by Heart.",
        headingSecondary: "Ground by Hand.",
        subtitle: "Chachiji was born from an unwavering devotion to the authentic, unadulterated tastes of home — where every achar is cured under open sunshine and every makhana is harvested from sacred wetlands.",
        primaryBtnText: "Explore Our Heritage Jars",
        primaryBtnLink: "/shop/achar",
        secondaryBtnText: "Our Story & Vision",
        secondaryBtnLink: "/about#story",
        imagePosition: "right",
        textAlign: "left",
        hideText: false,
      }
    ],
  });

  const [subcategoryForm, setSubcategoryForm] = useState({
    name: "",
    hindiName: "",
    categoryId: "",
    headline: "",
    description: "",
    heroImage: "/makh1-clean.png",
    heroImages: ["/makh1-clean.png"] as string[],
    imagePosition: "right" as "left" | "right",
    textAlign: "left" as "left" | "right",
    highlights: "100% Handcrafted, Zero Preservatives, Authentic Heritage",
  });

  // Always require login on each visit
  useEffect(() => {
    // Clear any previous session cookie
    fetch("/api/auth/admin", { method: "DELETE" }).catch(() => {});
    setIsAuthenticated(false);
    setAuthChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        notify("Welcome back, Admin!");
        fetchData();
      } else {
        setLoginError(data.message || "Invalid credentials.");
      }
    } catch {
      setLoginError("Failed to connect to authentication server.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/admin", { method: "DELETE" });
      setIsAuthenticated(false);
      notify("Logged out successfully.");
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all dynamic data once authenticated
  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, cRes, sRes, oRes, hRes, aRes] = await Promise.all([
        fetch("/api/products").then((r) => r.json()),
        fetch("/api/categories").then((r) => r.json()),
        fetch("/api/subcategories").then((r) => r.json()),
        fetch("/api/orders").then((r) => r.json()).catch(() => ({ success: false, orders: [] })),
        fetch("/api/hero").then((r) => r.json()).catch(() => ({ success: false })),
        fetch("/api/about").then((r) => r.json()).catch(() => ({ success: false })),
      ]);

      if (pRes.success) setProducts(pRes.products || []);
      if (cRes.success) {
        setCategories(cRes.categories || []);
        if (cRes.categories && cRes.categories.length > 0 && !productForm.category) {
          setProductForm((prev) => ({ ...prev, category: cRes.categories[0].id }));
          setSubcategoryForm((prev) => ({ ...prev, categoryId: cRes.categories[0].id }));
        }
      }
      if (sRes.success) setSubcategories(sRes.subcategories || []);
      if (oRes && oRes.success) setOrders(oRes.orders || []);
      if (hRes && hRes.success && hRes.heroConfig) setHeroConfigForm(hRes.heroConfig);
      if (aRes && aRes.success && aRes.aboutConfig) setAboutConfigForm(aRes.aboutConfig);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        notify(`Order #${orderId} status updated to ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o))
        );
      }
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm(`Delete order #${orderId}?`)) return;
    try {
      const res = await fetch(`/api/orders?id=${orderId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        notify(`Order #${orderId} removed.`);
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
      }
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // ----------------- IMAGE UPLOADER (MULTIPLE IMAGES) -----------------
  const handleMultipleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit = false
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        if (isEdit) {
          setEditProductForm((prev) => ({
            ...prev,
            images: [...prev.images, ...uploadedUrls],
          }));
        } else {
          setProductForm((prev) => ({
            ...prev,
            images: [
              ...prev.images.filter((img) => img !== "/achaar-clean.png" && img !== "/makh1-clean.png"),
              ...uploadedUrls,
            ],
          }));
        }
        notify(`${uploadedUrls.length} image(s) uploaded successfully!`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading images.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // ----------------- BANNER IMAGES UPLOADER (MULTIPLE HERO IMAGES) -----------------
  const handleCategoryImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit = false
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        if (isEdit) {
          setEditCategoryForm((prev) => ({
            ...prev,
            heroImages: [...prev.heroImages, ...uploadedUrls],
            heroImage: prev.heroImage || uploadedUrls[0],
          }));
        } else {
          setCategoryForm((prev) => ({
            ...prev,
            heroImages: [...prev.heroImages, ...uploadedUrls],
            heroImage: prev.heroImage || uploadedUrls[0],
          }));
        }
        notify(`${uploadedUrls.length} banner image(s) uploaded!`);
      }
    } catch (err) {
      console.error("Banner upload error:", err);
      alert("Error uploading banner images.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubCategoryImagesUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isEdit: boolean
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        if (isEdit) {
          setEditSubCategoryForm((prev) => ({
            ...prev,
            heroImages: [...prev.heroImages, ...uploadedUrls],
            heroImage: prev.heroImage || uploadedUrls[0],
          }));
        } else {
          setSubcategoryForm((prev) => ({
            ...prev,
            heroImages: [...prev.heroImages, ...uploadedUrls],
            heroImage: prev.heroImage || uploadedUrls[0],
          }));
        }
        notify(`${uploadedUrls.length} banner image(s) uploaded!`);
      }
    } catch (err) {
      console.error("Subcategory banner upload error:", err);
      alert("Error uploading banner images.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // ----------------- HERO SLIDES MANAGERS (PER-SLIDE) -----------------
  const handleUpdateActiveSlide = (fields: Partial<HeroSlideItem>) => {
    setHeroConfigForm((prev) => {
      const newSlides = [...prev.slides];
      const idx = selectedHeroSlideIndex < newSlides.length ? selectedHeroSlideIndex : 0;
      const currentSlide = newSlides[idx] || {
        id: `slide-${Date.now()}`,
        image: "/heros2.png",
        headingPrimary: "Crafted by Heart.",
        headingSecondary: "Rooted in Tradition.",
        subtitle: "",
        primaryBtnText: "Shop Our Flavours",
        primaryBtnLink: "/shop",
        imagePosition: "right",
        textAlign: "left",
        hideText: false,
      };

      newSlides[idx] = {
        ...currentSlide,
        ...fields,
      };
      return { ...prev, slides: newSlides };
    });
  };

  const handleAddHeroSlide = () => {
    if (heroConfigForm.slides.length >= 8) {
      alert("Maximum 8 slides are allowed in Homepage Hero.");
      return;
    }
    const newSlide: HeroSlideItem = {
      id: `slide-${Date.now()}`,
      image: "/heros2.png",
      badge: "Mithila Culinary Heritage • 100% Traditional",
      headingPrimary: "Crafted by Heart.",
      headingSecondary: "Rooted in Tradition.",
      subtitle: "Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home.",
      primaryBtnText: "Shop Our Flavours",
      primaryBtnLink: "/shop",
      secondaryBtnText: "Our Heritage Story",
      secondaryBtnLink: "/about",
      imagePosition: "right",
      textAlign: "left",
      hideText: false,
    };
    setHeroConfigForm((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));
    setSelectedHeroSlideIndex(heroConfigForm.slides.length);
    notify(`Slide #${heroConfigForm.slides.length + 1} added! Edit its settings below.`);
  };

  const handleDeleteHeroSlide = (idx: number) => {
    if (heroConfigForm.slides.length <= 1) {
      alert("You must keep at least 1 hero slide.");
      return;
    }
    if (!confirm(`Are you sure you want to delete Slide ${idx + 1}?`)) return;

    setHeroConfigForm((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== idx),
    }));
    if (selectedHeroSlideIndex >= idx && selectedHeroSlideIndex > 0) {
      setSelectedHeroSlideIndex(selectedHeroSlideIndex - 1);
    }
    notify(`Slide #${idx + 1} deleted.`);
  };

  const handleSingleHeroSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        handleUpdateActiveSlide({ image: data.url });
        notify("Slide image updated successfully!");
      }
    } catch (err) {
      console.error("Hero upload error:", err);
      alert("Error uploading slide photo.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveHeroConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validate conflict on all slides
    for (let i = 0; i < heroConfigForm.slides.length; i++) {
      const s = heroConfigForm.slides[i];
      if (!s.hideText) {
        if (s.imagePosition === "right" && s.textAlign === "right") {
          alert(`⚠️ Slide ${i + 1} Layout Conflict: Image is on the Right side, so Text must be set to 'Left Aligned' (or choose Full Center layout).`);
          setSelectedHeroSlideIndex(i);
          return;
        }
        if (s.imagePosition === "left" && s.textAlign === "left") {
          alert(`⚠️ Slide ${i + 1} Layout Conflict: Image is on the Left side, so Text must be set to 'Right Aligned' (or choose Full Center layout).`);
          setSelectedHeroSlideIndex(i);
          return;
        }
      }
    }

    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroConfigForm),
      });
      const data = await res.json();
      if (data.success) {
        notify("All Homepage Hero Slides saved & published successfully!");
        setHeroConfigForm(data.heroConfig);
      } else {
        alert(data.message || "Failed to update hero banner.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving hero banner.");
    }
  };

  // ----------------- ABOUT US SLIDES MANAGERS (PER-SLIDE) -----------------
  const handleUpdateActiveAboutSlide = (fields: Partial<HeroSlideItem>) => {
    setAboutConfigForm((prev) => {
      const newSlides = [...prev.slides];
      const idx = selectedAboutSlideIndex < newSlides.length ? selectedAboutSlideIndex : 0;
      const currentSlide = newSlides[idx] || {
        id: `about-slide-${Date.now()}`,
        image: "/about-hero-v2.png",
        headingPrimary: "Crafted by Heart.",
        headingSecondary: "Ground by Hand.",
        subtitle: "",
        primaryBtnText: "Explore Our Heritage Jars",
        primaryBtnLink: "/shop/achar",
        imagePosition: "right",
        textAlign: "left",
        hideText: false,
      };

      newSlides[idx] = {
        ...currentSlide,
        ...fields,
      };
      return { ...prev, slides: newSlides };
    });
  };

  const handleAddAboutSlide = () => {
    if (aboutConfigForm.slides.length >= 8) {
      alert("Maximum 8 slides are allowed in About Us Page.");
      return;
    }
    const newSlide: HeroSlideItem = {
      id: `about-slide-${Date.now()}`,
      image: "/about-hero-v2.png",
      badge: "Our Roots in Vaishali, Bihar",
      headingPrimary: "Crafted by Heart.",
      headingSecondary: "Ground by Hand.",
      subtitle: "Chachiji was born from an unwavering devotion to the authentic, unadulterated tastes of home.",
      primaryBtnText: "Explore Our Heritage Jars",
      primaryBtnLink: "/shop/achar",
      secondaryBtnText: "Our Story & Vision",
      secondaryBtnLink: "/about#story",
      imagePosition: "right",
      textAlign: "left",
      hideText: false,
    };
    setAboutConfigForm((prev) => ({
      ...prev,
      slides: [...prev.slides, newSlide],
    }));
    setSelectedAboutSlideIndex(aboutConfigForm.slides.length);
    notify(`About Us Slide #${aboutConfigForm.slides.length + 1} added! Edit its settings below.`);
  };

  const handleDeleteAboutSlide = (idx: number) => {
    if (aboutConfigForm.slides.length <= 1) {
      alert("You must keep at least 1 slide on About Us page.");
      return;
    }
    if (!confirm(`Are you sure you want to delete About Us Slide ${idx + 1}?`)) return;

    setAboutConfigForm((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== idx),
    }));
    if (selectedAboutSlideIndex >= idx && selectedAboutSlideIndex > 0) {
      setSelectedAboutSlideIndex(selectedAboutSlideIndex - 1);
    }
    notify(`About Us Slide #${idx + 1} deleted.`);
  };

  const handleSingleAboutSlideImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        handleUpdateActiveAboutSlide({ image: data.url });
        notify("About Us slide image updated successfully!");
      }
    } catch (err) {
      console.error("About slide upload error:", err);
      alert("Error uploading slide photo.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveAboutConfig = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Validate conflict on all slides
    for (let i = 0; i < aboutConfigForm.slides.length; i++) {
      const s = aboutConfigForm.slides[i];
      if (!s.hideText) {
        if (s.imagePosition === "right" && s.textAlign === "right") {
          alert(`⚠️ Slide ${i + 1} Layout Conflict: Image is on the Right side, so Text must be set to 'Left Aligned' (or choose Full Center layout).`);
          setSelectedAboutSlideIndex(i);
          return;
        }
        if (s.imagePosition === "left" && s.textAlign === "left") {
          alert(`⚠️ Slide ${i + 1} Layout Conflict: Image is on the Left side, so Text must be set to 'Right Aligned' (or choose Full Center layout).`);
          setSelectedAboutSlideIndex(i);
          return;
        }
      }
    }

    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutConfigForm),
      });
      const data = await res.json();
      if (data.success) {
        notify("All About Us Page Slides saved & published successfully!");
        setAboutConfigForm(data.aboutConfig);
      } else {
        alert(data.message || "Failed to update About Us banner.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving About Us banner.");
    }
  };

  // ----------------- PRODUCT HANDLERS -----------------
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category || !productForm.price) {
      alert("Please enter product name, category, and price.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price),
          mrp: Number(productForm.mrp || productForm.price),
          stockCount: Number(productForm.stockCount || 50),
          badges: productForm.badge ? [productForm.badge] : ["Handcrafted"],
          images: productForm.images.length > 0 ? productForm.images : ["/achaar-clean.png"],
          ingredients: productForm.ingredients ? productForm.ingredients.split(",").map((s) => s.trim()) : [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        notify(`Product "${productForm.name}" created successfully!`);
        setIsAddProductOpen(false);
        setProductForm({
          name: "",
          hindiName: "",
          category: categories[0]?.id || "",
          subCategory: "",
          price: "",
          mrp: "",
          weight: "400g",
          stockCount: "50",
          images: ["/achaar-clean.png"],
          tagline: "",
          description: "",
          ingredients: "",
          badge: "Handcrafted",
          isBestseller: false,
          isFeatured: false,
        });
        fetchData();
      } else {
        alert(data.error || "Failed to create product.");
      }
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Error creating product.");
    }
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setEditProductForm({
      id: prod.id,
      name: prod.name,
      hindiName: prod.hindiName || "",
      category: prod.category,
      subCategory: prod.subCategory || "",
      price: String(prod.price),
      mrp: String(prod.mrp || prod.price),
      weight: prod.weight || "400g",
      stockCount: String(prod.stockCount || 50),
      images: Array.isArray(prod.images) && prod.images.length > 0 ? prod.images : ["/achaar-clean.png"],
      tagline: prod.tagline || "",
      description: prod.description || "",
      ingredients: Array.isArray(prod.ingredients) ? prod.ingredients.join(", ") : (prod.ingredients || ""),
      badge: (prod.badges && prod.badges[0]) || "Handcrafted",
      isBestseller: Boolean(prod.isBestseller),
      isFeatured: Boolean(prod.isFeatured),
    });
    setIsEditProductOpen(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProductForm.id || !editProductForm.name || !editProductForm.category || !editProductForm.price) {
      alert("Please fill in product name, category, and price.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editProductForm.id,
          name: editProductForm.name,
          hindiName: editProductForm.hindiName,
          category: editProductForm.category,
          subCategory: editProductForm.subCategory,
          price: Number(editProductForm.price),
          mrp: Number(editProductForm.mrp || editProductForm.price),
          weight: editProductForm.weight,
          stockCount: Number(editProductForm.stockCount || 50),
          images: editProductForm.images.length > 0 ? editProductForm.images : ["/achaar-clean.png"],
          tagline: editProductForm.tagline,
          description: editProductForm.description,
          ingredients: editProductForm.ingredients ? editProductForm.ingredients.split(",").map((s) => s.trim()) : [],
          badges: editProductForm.badge ? [editProductForm.badge] : ["Handcrafted"],
          isBestseller: editProductForm.isBestseller,
          isFeatured: editProductForm.isFeatured,
        }),
      });

      const data = await res.json();
      if (data.success) {
        notify(`Product "${editProductForm.name}" updated successfully!`);
        setIsEditProductOpen(false);
        setEditingProduct(null);
        fetchData();
      } else {
        alert(data.error || "Failed to update product.");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Error updating product.");
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        notify(`Product "${name}" deleted.`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------- CATEGORY HANDLERS (ADD, EDIT, DELETE) -----------------
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) {
      alert("Please enter category name.");
      return;
    }

    // Conflict validation
    if (!categoryForm.hideText) {
      if (categoryForm.imagePosition === "right" && categoryForm.textAlign === "right") {
        alert("⚠️ Layout Conflict: When Image is on the Right, Text must be on the Left. Please change Text Alignment to 'Left Aligned' or select 'Full Center Background'.");
        return;
      }
      if (categoryForm.imagePosition === "left" && categoryForm.textAlign === "left") {
        alert("⚠️ Layout Conflict: When Image is on the Left, Text must be on the Right. Please change Text Alignment to 'Right Aligned' or select 'Full Center Background'.");
        return;
      }
    }

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryForm),
      });
      const data = await res.json();
      if (data.success) {
        notify(`Category "${categoryForm.name}" added successfully!`);
        setIsAddCategoryOpen(false);
        setCategoryForm({
          name: "",
          hindiName: "",
          slug: "",
          headline: "",
          description: "",
          heroImage: "/makh1-clean.png",
          heroImages: ["/makh1-clean.png"],
          imagePosition: "right",
          textAlign: "left",
          hideText: false,
          highlights: "100% Handcrafted, Zero Preservatives, Authentic Heritage",
        });
        fetchData();
      } else {
        alert(data.error || "Failed to add category");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEditCategory = (cat: CategoryInfo) => {
    setEditingCategory(cat);
    const existingImages =
      Array.isArray(cat.heroImages) && cat.heroImages.length > 0
        ? cat.heroImages
        : cat.heroImage
        ? [cat.heroImage]
        : ["/makh1-clean.png"];

    setEditCategoryForm({
      name: cat.name,
      hindiName: cat.hindiName || "",
      slug: cat.slug,
      headline: cat.headline || "",
      description: cat.description || "",
      heroImage: cat.heroImage || existingImages[0] || "",
      heroImages: existingImages,
      imagePosition: cat.imagePosition || "right",
      textAlign: cat.textAlign === "right" ? "right" : "left",
      hideText: Boolean(cat.hideText),
      highlights: Array.isArray(cat.highlights) ? cat.highlights.join(", ") : "",
    });
    setIsEditCategoryOpen(true);
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editCategoryForm.name) return;

    // Conflict validation
    if (!editCategoryForm.hideText) {
      if (editCategoryForm.imagePosition === "right" && editCategoryForm.textAlign === "right") {
        alert("⚠️ Layout Conflict: When Image is on the Right, Text must be on the Left. Please change Text Alignment to 'Left Aligned' or select 'Full Center Background'.");
        return;
      }
      if (editCategoryForm.imagePosition === "left" && editCategoryForm.textAlign === "left") {
        alert("⚠️ Layout Conflict: When Image is on the Left, Text must be on the Right. Please change Text Alignment to 'Right Aligned' or select 'Full Center Background'.");
        return;
      }
    }

    try {
      const res = await fetch("/api/categories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCategory.id,
          ...editCategoryForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        notify(`Category "${editCategoryForm.name}" updated successfully!`);
        setIsEditCategoryOpen(false);
        setEditingCategory(null);
        fetchData();
      } else {
        alert(data.error || "Failed to update category");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating category");
    }
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        notify(`Category "${name}" deleted.`);
        setCategories((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------- SUBCATEGORY HANDLERS (ADD, EDIT, DELETE) -----------------
  const handleAddSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subcategoryForm.name || !subcategoryForm.categoryId) {
      alert("Please enter subcategory name and select parent category.");
      return;
    }

    // Conflict validation
    if (subcategoryForm.imagePosition === "right" && subcategoryForm.textAlign === "right") {
      alert("⚠️ Layout Conflict: When Image is on the Right, Text must be on the Left.");
      return;
    }
    if (subcategoryForm.imagePosition === "left" && subcategoryForm.textAlign === "left") {
      alert("⚠️ Layout Conflict: When Image is on the Left, Text must be on the Right.");
      return;
    }

    try {
      const res = await fetch("/api/subcategories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subcategoryForm),
      });
      const data = await res.json();
      if (data.success) {
        notify(`Subcategory "${subcategoryForm.name}" added!`);
        setIsAddSubCategoryOpen(false);
        setSubcategoryForm({
          name: "",
          hindiName: "",
          categoryId: categories[0]?.id || "",
          headline: "",
          description: "",
          heroImage: "/makh1-clean.png",
          heroImages: ["/makh1-clean.png"],
          imagePosition: "right",
          textAlign: "left",
          highlights: "100% Handcrafted, Zero Preservatives, Authentic Heritage",
        });
        fetchData();
      } else {
        alert(data.error || "Failed to add subcategory");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEditSubCategory = (sub: SubCategoryInfo) => {
    setEditingSubCategory(sub);
    const existingImages =
      Array.isArray(sub.heroImages) && sub.heroImages.length > 0
        ? sub.heroImages
        : sub.heroImage
        ? [sub.heroImage]
        : [];
    setEditSubCategoryForm({
      name: sub.name,
      hindiName: sub.hindiName || "",
      categoryId: sub.categoryId,
      headline: sub.headline || "",
      description: sub.description || "",
      heroImage: sub.heroImage || existingImages[0] || "/makh1-clean.png",
      heroImages: existingImages,
      imagePosition: sub.imagePosition === "left" ? "left" : "right",
      textAlign: sub.textAlign === "right" ? "right" : "left",
      highlights: Array.isArray(sub.highlights) ? sub.highlights.join(", ") : "",
    });
    setIsEditSubCategoryOpen(true);
  };

  const handleUpdateSubCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubCategory || !editSubCategoryForm.name) return;

    // Conflict validation
    if (editSubCategoryForm.imagePosition === "right" && editSubCategoryForm.textAlign === "right") {
      alert("⚠️ Layout Conflict: When Image is on the Right, Text must be on the Left.");
      return;
    }
    if (editSubCategoryForm.imagePosition === "left" && editSubCategoryForm.textAlign === "left") {
      alert("⚠️ Layout Conflict: When Image is on the Left, Text must be on the Right.");
      return;
    }

    try {
      const res = await fetch("/api/subcategories", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingSubCategory.id,
          ...editSubCategoryForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        notify(`Subcategory "${editSubCategoryForm.name}" updated!`);
        setIsEditSubCategoryOpen(false);
        setEditingSubCategory(null);
        fetchData();
      } else {
        alert(data.error || "Failed to update subcategory");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating subcategory");
    }
  };

  const handleDeleteSubCategory = async (id: string, name: string) => {
    if (!confirm(`Delete subcategory "${name}"?`)) return;
    try {
      const res = await fetch(`/api/subcategories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        notify(`Subcategory "${name}" deleted.`);
        setSubcategories((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hindiName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;

    return matchesSearch && matchesCategory;
  });

  // -------------------------------------------------------------
  // LOADING STATE
  // -------------------------------------------------------------
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#FFF9F3] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#8C201C] border-t-transparent rounded-full animate-spin mx-auto" />
          <span className="text-xs font-bold text-[#8C201C] uppercase tracking-widest block">
            Verifying Admin Security...
          </span>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LOGIN PORTAL VIEW (If not authenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF9F3] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#8C201C_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="w-full max-w-md bg-white rounded-3xl border border-[#EFE7DD] shadow-2xl p-7 sm:p-9 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block mb-1">
              <Image
                src="/logo.png"
                alt="Chachiji"
                width={160}
                height={52}
                priority
                quality={100}
                className="h-12 w-auto object-contain mx-auto"
              />
            </Link>
            <div className="inline-flex items-center gap-1.5 bg-[#FFF9F3] border border-[#EFE7DD] text-[#8C201C] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E07A4A]" />
              <span>Admin Console • Secure Login</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#231F20] pt-1">
              Store Manager Access
            </h2>
            <p className="text-xs text-[#666666]">
              Sign in with your configured environment credentials to manage products, categories and inventory.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3.5 rounded-2xl flex items-center gap-2">
              <X className="w-4 h-4 text-red-500 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#231F20] block mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="chachiji@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] text-xs font-medium focus:outline-none focus:border-[#8C201C] text-[#231F20]"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-[#231F20] block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] text-xs font-medium focus:outline-none focus:border-[#8C201C] text-[#231F20]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#888888] hover:text-[#231F20]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-2xl bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75 cursor-pointer mt-2"
            >
              {loginLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#E07A4A]" />
                  <span>Sign In to Admin Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-[#777777] border-t border-[#EFE7DD]">
            <span>Credentials managed via </span>
            <code className="bg-[#FFF9F3] text-[#8C201C] font-mono px-1.5 py-0.5 rounded border border-[#EFE7DD]">
              .env.local
            </code>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD VIEW
  // -------------------------------------------------------------
  return (
    <div className="bg-[#FDFBF9] min-h-screen flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#8C201C] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#6B1815] flex items-center gap-2.5 text-xs sm:text-sm font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#E07A4A]" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. SIDEBAR (Clean White with Rounded Corners & Official Brand Logo) */}
      <aside className="w-full lg:w-64 bg-white text-[#231F20] flex flex-col justify-between shrink-0 p-5 lg:min-h-screen border-r border-[#EFE7DD] lg:rounded-r-3xl shadow-sm">
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#EFE7DD] mb-6">
            <Link href="/" className="flex flex-col group">
              <Image
                src="/logo.png"
                alt="Chachiji Logo"
                width={140}
                height={45}
                priority
                quality={100}
                className="h-10 w-auto object-contain"
              />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#E07A4A] font-bold mt-1 pl-0.5">
                Admin Console
              </span>
            </Link>
            <span className="text-[10px] font-bold bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD] px-2.5 py-0.5 rounded-full shadow-2xs">
              Live DB
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {/* Live Orders Tab */}
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === "orders"
                  ? "bg-[#8C201C] text-white font-bold shadow-md"
                  : "text-[#555555] hover:bg-[#FFF9F3] hover:text-[#8C201C]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <ShoppingBag className={`w-4 h-4 ${activeTab === "orders" ? "text-[#E07A4A]" : "text-[#888888]"}`} />
                <span>Live Orders</span>
              </span>
              <div className="flex items-center gap-1.5">
                {orders.filter((o) => o.status === "Pending").length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === "orders" ? "bg-black/20 text-white" : "bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD]"
                }`}>
                  {orders.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === "products"
                  ? "bg-[#8C201C] text-white font-bold shadow-md"
                  : "text-[#555555] hover:bg-[#FFF9F3] hover:text-[#8C201C]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Package className={`w-4 h-4 ${activeTab === "products" ? "text-[#E07A4A]" : "text-[#888888]"}`} />
                <span>Manage Products</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "products" ? "bg-black/20 text-white" : "bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD]"
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === "categories"
                  ? "bg-[#8C201C] text-white font-bold shadow-md"
                  : "text-[#555555] hover:bg-[#FFF9F3] hover:text-[#8C201C]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <FolderTree className={`w-4 h-4 ${activeTab === "categories" ? "text-[#E07A4A]" : "text-[#888888]"}`} />
                <span>Categories</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "categories" ? "bg-black/20 text-white" : "bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD]"
              }`}>
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("subcategories")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === "subcategories"
                  ? "bg-[#8C201C] text-white font-bold shadow-md"
                  : "text-[#555555] hover:bg-[#FFF9F3] hover:text-[#8C201C]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Tags className={`w-4 h-4 ${activeTab === "subcategories" ? "text-[#E07A4A]" : "text-[#888888]"}`} />
                <span>Subcategories</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "subcategories" ? "bg-black/20 text-white" : "bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD]"
              }`}>
                {subcategories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("hero")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === "hero"
                  ? "bg-[#8C201C] text-white font-bold shadow-md"
                  : "text-[#555555] hover:bg-[#FFF9F3] hover:text-[#8C201C]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <SlidersHorizontal className={`w-4 h-4 ${activeTab === "hero" ? "text-[#E07A4A]" : "text-[#888888]"}`} />
                <span>Hero Banners</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "hero" ? "bg-black/20 text-white" : "bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD]"
              }`}>
                {heroConfigForm.slides.length} slides
              </span>
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === "about"
                  ? "bg-[#8C201C] text-white font-bold shadow-md"
                  : "text-[#555555] hover:bg-[#FFF9F3] hover:text-[#8C201C]"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className={`w-4 h-4 ${activeTab === "about" ? "text-[#E07A4A]" : "text-[#888888]"}`} />
                <span>About Us Hero</span>
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === "about" ? "bg-black/20 text-white" : "bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD]"
              }`}>
                {aboutConfigForm.slides.length} slides
              </span>
            </button>

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-[#8C201C] text-white font-bold shadow-md"
                  : "text-[#555555] hover:bg-[#FFF9F3] hover:text-[#8C201C]"
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${activeTab === "overview" ? "text-[#E07A4A]" : "text-[#888888]"}`} />
              <span>Overview &amp; Sales</span>
            </button>
          </nav>
        </div>

        {/* Footer & User Section with Logout */}
        <div className="pt-5 border-t border-[#EFE7DD] text-xs text-[#777777] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#231F20] truncate">
              shahbaz126ahmed@gmail.com
            </span>
            <button
              onClick={handleLogout}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span>Storefront:</span>
            <Link
              href="/shop"
              target="_blank"
              className="text-[#8C201C] hover:text-[#6B1815] font-bold flex items-center gap-1 hover:underline"
            >
              <span>View Store</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">

        {/* ===================== TAB: LIVE ORDERS ===================== */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE7DD] pb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                  Order Fulfillment &amp; Dispatch
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                  Live Customer Orders ({orders.length})
                </h1>
                <p className="text-xs text-[#666666] mt-0.5">
                  Real-time orders placed on Chachiji Storefront with instant status management and WhatsApp customer communication.
                </p>
              </div>

              <a
                href="https://wa.me/919264266890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all self-start sm:self-auto cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kitchen WhatsApp Alert Active</span>
              </a>
            </div>

            {/* Orders Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block">
                  Total Orders
                </span>
                <p className="font-serif text-2xl font-bold text-[#231F20]">{orders.length}</p>
                <span className="text-[10px] text-stone-500 font-medium">All recorded sales</span>
              </div>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                    Pending Processing
                  </span>
                  <Clock className="w-4 h-4 text-amber-700" />
                </div>
                <p className="font-serif text-2xl font-bold text-amber-900">
                  {orders.filter((o) => o.status === "Pending").length}
                </p>
                <span className="text-[10px] text-amber-800 font-medium">Needs packing &amp; dispatch</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#EFE7DD] shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block">
                    Dispatched / In-Transit
                  </span>
                  <Truck className="w-4 h-4 text-[#8C201C]" />
                </div>
                <p className="font-serif text-2xl font-bold text-[#8C201C]">
                  {orders.filter((o) => o.status === "Dispatched" || o.status === "Confirmed").length}
                </p>
                <span className="text-[10px] text-stone-500 font-medium">Out for delivery</span>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                  Total Revenue
                </span>
                <p className="font-serif text-2xl font-bold text-emerald-900">
                  ₹{orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0)}
                </p>
                <span className="text-[10px] text-emerald-800 font-medium">Gross sales volume</span>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#EFE7DD] shadow-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search orders by Order #ID, customer name, phone, city..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#FFF9F3] rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C]"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
                {(["all", "Pending", "Confirmed", "Dispatched", "Delivered", "Cancelled"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                      orderStatusFilter === status
                        ? "bg-[#8C201C] text-white border-[#8C201C] shadow-2xs"
                        : "bg-[#FFF9F3] text-[#555555] border-[#EFE7DD] hover:border-[#8C201C]"
                    }`}
                  >
                    {status === "all" ? "All Orders" : status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-[#EFE7DD] space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF9F3] text-[#8C201C] flex items-center justify-center mx-auto border border-[#EFE7DD]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#231F20]">No Orders Placed Yet</h3>
                <p className="text-xs text-[#777777] max-w-sm mx-auto">
                  When customers place orders on your store, they will appear here with full delivery and contact information.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders
                  .filter((order) => {
                    if (orderStatusFilter !== "all" && order.status !== orderStatusFilter) return false;
                    if (!orderSearchQuery.trim()) return true;
                    const q = orderSearchQuery.toLowerCase();
                    return (
                      order.id?.toLowerCase().includes(q) ||
                      order.customerName?.toLowerCase().includes(q) ||
                      order.customerPhone?.includes(q) ||
                      order.city?.toLowerCase().includes(q)
                    );
                  })
                  .map((order) => {
                    const cleanPhone = (order.customerPhone || "").replace(/\D/g, "");
                    const waCustomerMsg = encodeURIComponent(
                      `Namaste ${order.customerName}! 🙏 Your Chachiji order #${order.id} is currently ${order.status}. Thank you for choosing authentic Mithila flavours!`
                    );

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl border border-[#EFE7DD] shadow-sm p-5 sm:p-6 space-y-4 hover:border-[#8C201C]/50 transition-all"
                      >
                        {/* Order Header Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE7DD] pb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#FFF9F3] border border-[#EFE7DD] flex items-center justify-center text-[#8C201C] font-bold">
                              <ShoppingBag className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-serif text-base font-bold text-[#231F20]">
                                  Order #{order.id}
                                </h3>
                                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                  order.status === "Pending"
                                    ? "bg-amber-50 text-amber-800 border-amber-300"
                                    : order.status === "Confirmed"
                                    ? "bg-blue-50 text-blue-800 border-blue-300"
                                    : order.status === "Dispatched"
                                    ? "bg-purple-50 text-purple-800 border-purple-300"
                                    : order.status === "Delivered"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : "bg-red-50 text-red-800 border-red-300"
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#777777] flex items-center gap-1.5 mt-0.5">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(order.createdAt).toLocaleString("en-IN")}</span>
                              </p>
                            </div>
                          </div>

                          {/* Status Dropdown & WhatsApp Action */}
                          <div className="flex items-center gap-2">
                            {cleanPhone && (
                              <a
                                href={`https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`}?text=${waCustomerMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                                title="Chat with customer on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>WhatsApp Customer</span>
                              </a>
                            )}

                            {/* Status Selector */}
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="text-xs font-bold bg-[#FFF9F3] border border-[#EFE7DD] text-[#231F20] px-3 py-1.5 rounded-xl focus:outline-none focus:border-[#8C201C] cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Customer & Address Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-[#FFF9F3] p-4 rounded-xl border border-[#EFE7DD]">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#8C201C] uppercase tracking-wider block">
                              Customer Contact
                            </span>
                            <p className="font-bold text-[#231F20] text-sm">{order.customerName}</p>
                            <p className="text-[#555555] flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-[#8C201C]" />
                              <span>{order.customerPhone}</span>
                            </p>
                            {order.customerEmail && (
                              <p className="text-[#777777] flex items-center gap-1.5">
                                <Mail className="w-3 h-3 text-[#8C201C]" />
                                <span>{order.customerEmail}</span>
                              </p>
                            )}
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-[#8C201C] uppercase tracking-wider block">
                              Delivery Destination
                            </span>
                            <p className="text-[#231F20] font-medium leading-relaxed">
                              {order.address} {order.apartment ? `, ${order.apartment}` : ""}
                            </p>
                            <p className="text-[#555555] font-bold">
                              {order.city}, {order.state} - {order.pincode}
                            </p>
                            <span className="inline-block bg-white text-[#8C201C] border border-[#EFE7DD] text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">
                              Payment: {order.paymentMethod?.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Items Breakdown Table */}
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold text-[#777777] uppercase tracking-wider block">
                            Ordered Items ({order.items?.length || 0})
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {order.items?.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#EFE7DD]"
                              >
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#FFF9F3] border border-[#EFE7DD] shrink-0 p-0.5">
                                  <Image
                                    src={item.image || "/achaar-clean.png"}
                                    alt={item.productName}
                                    fill
                                    unoptimized
                                    className="object-contain"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-bold text-xs text-[#231F20] truncate">
                                    {item.productName}
                                  </p>
                                  <p className="text-[11px] text-[#777777]">
                                    {item.weight} • Qty: {item.quantity}
                                  </p>
                                </div>
                                <span className="font-bold text-xs text-[#8C201C] shrink-0">
                                  ₹{item.price * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Total Row */}
                        <div className="flex items-center justify-between border-t border-[#EFE7DD] pt-3 text-xs">
                          <span className="text-[#777777]">
                            Subtotal: ₹{order.subtotal} {order.shippingFee > 0 ? `+ Shipping: ₹${order.shippingFee}` : "• Free Shipping"}
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[#555555] font-semibold">Total Amount:</span>
                            <span className="font-serif text-lg font-bold text-[#8C201C]">
                              ₹{order.totalAmount}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB: PRODUCTS ===================== */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Header with Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE7DD] pb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                  Product Catalog
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                  Dynamic Products ({products.length})
                </h1>
                <p className="text-xs text-[#666666] mt-0.5">
                  Products added here are saved directly in database and instantly visible on the frontend.
                </p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E07A4A]" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#EFE7DD] shadow-xs">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search product by name, hindi title, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#FFF9F3] rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-[#888888] shrink-0" />
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full sm:w-auto text-xs font-semibold bg-[#FFF9F3] px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none"
                >
                  <option value="all">All Categories ({products.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({products.filter((p) => p.category === c.id).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Table / List */}
            {loading ? (
              <div className="p-12 text-center text-xs font-bold text-[#888888]">
                Loading products from database...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-[#EFE7DD] space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF9F3] text-[#E07A4A] flex items-center justify-center mx-auto border border-[#EFE7DD]">
                  <Package className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#231F20]">
                  No Products Found
                </h3>
                <p className="text-xs text-[#666666] max-w-sm mx-auto">
                  {products.length === 0
                    ? "Your store has no products yet. Click 'Add New Product' to create your first dynamic product."
                    : "No products matched your search filter."}
                </p>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="inline-flex items-center gap-1.5 bg-[#8C201C] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm hover:bg-[#6B1815] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-[#E07A4A]" />
                  <span>Create First Product</span>
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[#EFE7DD] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FFF9F3] border-b border-[#EFE7DD] text-[#555555] font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Product</th>
                        <th className="py-3.5 px-4">Category / Subcategory</th>
                        <th className="py-3.5 px-4">Price</th>
                        <th className="py-3.5 px-4">Weight / Stock</th>
                        <th className="py-3.5 px-4">Badges</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE7DD]/60">
                      {filteredProducts.map((product) => {
                        const cat = categories.find((c) => c.id === product.category);
                        return (
                          <tr key={product.id} className="hover:bg-[#FFF9F3]/60 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-xl bg-[#FFF9F3] overflow-hidden shrink-0 border border-[#EFE7DD] flex items-center justify-center">
                                  {product.images && product.images[0] ? (
                                    <Image
                                      src={product.images[0]}
                                      alt={product.name}
                                      fill
                                      className="object-contain p-1"
                                      unoptimized
                                    />
                                  ) : (
                                    <Package className="w-5 h-5 text-slate-400" />
                                  )}
                                </div>
                                <div>
                                  <span className="font-bold text-[#231F20] block line-clamp-1">
                                    {product.name}
                                  </span>
                                  {product.hindiName && (
                                    <span className="text-[10px] text-[#8C201C] font-semibold block">
                                      {product.hindiName}
                                    </span>
                                  )}
                                  <span className="text-[10px] text-[#777777] block font-mono">
                                    /{product.slug}
                                  </span>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="inline-block bg-[#FFF9F3] text-[#231F20] font-bold px-2.5 py-1 rounded-lg border border-[#EFE7DD] text-[10px] mb-0.5">
                                {cat?.name || product.category}
                              </span>
                              {product.subCategory && (
                                <span className="block text-[10px] text-[#777777] font-medium">
                                  ↳ {product.subCategory}
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 font-bold text-[#8C201C]">
                              ₹{product.price}
                              {product.mrp && product.mrp > product.price && (
                                <span className="text-[10px] text-[#888888] line-through font-normal block">
                                  MRP ₹{product.mrp}
                                </span>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-[#231F20] block">
                                {product.weight || "400g"}
                              </span>
                              <span
                                className={`text-[10px] font-bold inline-block px-2 py-0.5 rounded-md ${
                                  product.inStock
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {product.inStock ? `${product.stockCount || 50} in stock` : "Out of stock"}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1">
                                {product.badges && product.badges.map((b, i) => (
                                  <span
                                    key={i}
                                    className="bg-amber-50 text-amber-900 border border-amber-200 text-[9px] font-bold px-1.5 py-0.5 rounded"
                                  >
                                    {b}
                                  </span>
                                ))}
                                {product.isBestseller && (
                                  <span className="bg-[#E07A4A]/20 text-[#8C201C] text-[9px] font-bold px-1.5 py-0.5 rounded">
                                    ★ Bestseller
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditProduct(product)}
                                  className="p-2 rounded-lg bg-[#FFF9F3] hover:bg-[#EFE7DD] text-[#8C201C] transition-colors border border-[#EFE7DD] cursor-pointer"
                                  title="Edit Product Details & Images"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <Link
                                  href={`/product/${product.slug}`}
                                  target="_blank"
                                  className="p-2 rounded-lg bg-[#FFF9F3] hover:bg-[#EFE7DD] text-[#231F20] transition-colors border border-[#EFE7DD]"
                                  title="View on store"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  onClick={() => handleDeleteProduct(product.id, product.name)}
                                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-100 cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB: CATEGORIES ===================== */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE7DD] pb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                  Category Architecture
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                  Categories ({categories.length})
                </h1>
                <p className="text-xs text-[#666666] mt-0.5">
                  Create and customize store categories. Each category gets its own page at `/shop/[category]`.
                </p>
              </div>

              <button
                onClick={() => setIsAddCategoryOpen(true)}
                className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E07A4A]" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((category) => {
                const count = products.filter((p) => p.category === category.id).length;
                return (
                  <div
                    key={category.id}
                    className="bg-white p-5 rounded-3xl border border-[#EFE7DD] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#8C201C]/30 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#8C201C] font-bold">
                          {category.hindiName || "Heritage Category"}
                        </span>
                        <span className="text-xs font-bold bg-[#FFF9F3] text-[#231F20] px-2.5 py-0.5 rounded-full border border-[#EFE7DD]">
                          {count} Products
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#231F20]">
                        {category.name}
                      </h3>
                      <p className="text-xs text-[#777777] italic mt-0.5 mb-2 line-clamp-1">
                        {category.headline}
                      </p>
                      <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#EFE7DD] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/shop/${category.slug}`}
                          target="_blank"
                          className="text-xs font-bold text-[#8C201C] hover:text-[#6B1815] flex items-center gap-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditCategory(category)}
                          className="text-xs text-[#231F20] hover:text-[#8C201C] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3 text-[#E07A4A]" />
                          <span>Edit</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteCategory(category.id, category.name)}
                        className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB: SUBCATEGORIES ===================== */}
        {activeTab === "subcategories" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE7DD] pb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                  Nested Navigation
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                  Subcategories ({subcategories.length})
                </h1>
                <p className="text-xs text-[#666666] mt-0.5">
                  Link and manage subcategories to organize products within parent categories.
                </p>
              </div>

              <button
                onClick={() => setIsAddSubCategoryOpen(true)}
                className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#E07A4A]" />
                <span>Add Subcategory</span>
              </button>
            </div>

            {subcategories.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-[#EFE7DD] space-y-2">
                <Tags className="w-8 h-8 text-[#888888] mx-auto" />
                <h4 className="font-serif text-base font-bold text-[#231F20]">
                  No Subcategories Yet
                </h4>
                <p className="text-xs text-[#666666] max-w-sm mx-auto">
                  Create subcategories (like &quot;Stuffed Mirch&quot;, &quot;Mango Pickles&quot;, &quot;Flavoured Makhana&quot;) to organize products within categories.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {subcategories.map((sub) => {
                  const parent = categories.find((c) => c.id === sub.categoryId);
                  const prodCount = products.filter((p) => p.subCategory === sub.name).length;
                  return (
                    <div
                      key={sub.id}
                      className="bg-white p-5 rounded-3xl border border-[#EFE7DD] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#8C201C]/30 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase tracking-widest text-[#8C201C] font-bold">
                            {sub.hindiName || parent?.name || "Subcategory"}
                          </span>
                          <span className="text-xs font-bold bg-[#FFF9F3] text-[#231F20] px-2.5 py-0.5 rounded-full border border-[#EFE7DD]">
                            {prodCount} Products
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#231F20]">
                          {sub.name}
                        </h3>
                        {sub.headline && (
                          <p className="text-xs text-[#777777] italic mt-0.5 mb-2 line-clamp-1">
                            {sub.headline}
                          </p>
                        )}
                        {sub.description && (
                          <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                            {sub.description}
                          </p>
                        )}
                        {!sub.headline && !sub.description && (
                          <p className="text-xs text-[#aaaaaa] italic mt-1">
                            Under: {parent?.name || sub.categoryId}
                          </p>
                        )}
                      </div>

                      <div className="pt-3 border-t border-[#EFE7DD] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/shop/${parent?.slug || sub.categoryId}?sub=${sub.slug || sub.name}`}
                            target="_blank"
                            className="text-xs font-bold text-[#8C201C] hover:text-[#6B1815] flex items-center gap-1"
                          >
                            <span>View</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                          <button
                            onClick={() => handleOpenEditSubCategory(sub)}
                            className="text-xs text-[#231F20] hover:text-[#8C201C] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3 text-[#E07A4A]" />
                            <span>Edit</span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteSubCategory(sub.id, sub.name)}
                          className="text-xs text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}


        {/* ===================== TAB: HOMEPAGE HERO SECTION MANAGER ===================== */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            {/* Tab Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A4A] block mb-1">
                  Visual Merchandising
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                  Homepage Hero Slideshow Manager
                </h1>
                <p className="text-xs text-[#666666] mt-0.5">
                  Click on any slide to edit its image, layout position, text alignment, and headlines independently.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddHeroSlide}
                  disabled={heroConfigForm.slides.length >= 8}
                  className="inline-flex items-center gap-2 bg-[#FFF9F3] hover:bg-[#FFF0E6] text-[#8C201C] border border-[#8C201C]/30 font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Slide ({heroConfigForm.slides.length}/8)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveHeroConfig()}
                  className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E07A4A]" />
                  <span>Publish Changes</span>
                </button>
              </div>
            </div>

            {/* Slide Navigation Tabs */}
            <div className="bg-white p-3 rounded-2xl border border-[#EFE7DD] shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {heroConfigForm.slides.map((s, idx) => {
                  const isSelected = idx === selectedHeroSlideIndex;
                  return (
                    <div
                      key={s.id || idx}
                      onClick={() => setSelectedHeroSlideIndex(idx)}
                      className={`shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-[#8C201C] text-white border-[#8C201C] shadow-md ring-2 ring-[#8C201C]/20"
                          : "bg-[#FFF9F3] text-[#231F20] border-[#EFE7DD] hover:border-[#8C201C]/50"
                      }`}
                    >
                      <div className="relative w-8 h-8 rounded-lg bg-white overflow-hidden border border-black/10 shrink-0">
                        <Image
                          src={s.image || "/heros2.png"}
                          alt={`Slide ${idx + 1}`}
                          fill
                          className="object-contain p-0.5"
                          unoptimized
                        />
                      </div>

                      <div className="text-left">
                        <span className={`text-[11px] font-bold block leading-tight ${isSelected ? "text-white" : "text-[#8C201C]"}`}>
                          Slide {idx + 1}
                        </span>
                        <span className={`text-[9px] block ${isSelected ? "text-white/80" : "text-[#666666]"}`}>
                          {s.hideText
                            ? "🖼️ Image Only"
                            : s.imagePosition === "center"
                            ? "Full Center"
                            : s.imagePosition === "left"
                            ? "Left Image"
                            : "Right Image"}
                        </span>
                      </div>

                      {heroConfigForm.slides.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteHeroSlide(idx);
                          }}
                          className={`p-1 rounded-md hover:bg-black/10 transition-colors ml-1 cursor-pointer ${
                            isSelected ? "text-white/80 hover:text-white" : "text-red-500 hover:text-red-700"
                          }`}
                          title={`Delete Slide ${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}

                {heroConfigForm.slides.length < 8 && (
                  <button
                    type="button"
                    onClick={handleAddHeroSlide}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-dashed border-[#8C201C]/40 bg-[#FFF9F3] text-xs font-bold text-[#8C201C] hover:bg-[#FFF0E6] cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Slide</span>
                  </button>
                )}
              </div>
            </div>

            {/* Current Active Slide Pointer */}
            {(() => {
              const activeSlide = heroConfigForm.slides[selectedHeroSlideIndex] || heroConfigForm.slides[0] || {
                id: "slide-1",
                image: "/heros2.png",
                badge: "Mithila Culinary Heritage • 100% Traditional",
                headingPrimary: "Crafted by Heart.",
                headingSecondary: "Rooted in Tradition.",
                subtitle: "",
                primaryBtnText: "Shop Our Flavours",
                primaryBtnLink: "/shop",
                imagePosition: "right",
                textAlign: "left",
                hideText: false,
              };

              return (
                <div className="space-y-6">
                  {/* Interactive Live Preview Card for Selected Slide */}
                  <div className="bg-white rounded-3xl border border-[#EFE7DD] p-6 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <h3 className="font-serif text-sm font-bold text-[#231F20]">
                          Slide #{selectedHeroSlideIndex + 1} Live Preview
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFF9F3] text-[#8C201C] border border-[#EFE7DD]">
                          {activeSlide.imagePosition === "left"
                            ? "Image Left / Text Right"
                            : "Text Left / Image Right"}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#888888]">
                        Updates instantly as you edit below
                      </span>
                    </div>

                    {/* Preview Box */}
                    <div className="relative rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] overflow-hidden min-h-[200px] flex items-center justify-center p-6 sm:p-8">
                      {/* Split Preview (Left or Right) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full">
                        <div
                          className={`space-y-2 ${
                            activeSlide.imagePosition === "left" ? "md:order-2" : "md:order-1"
                          } ${
                            activeSlide.textAlign === "right" ? "text-right" : "text-left"
                          }`}
                        >
                          {activeSlide.badge && (
                            <span className="inline-block text-[10px] uppercase tracking-widest text-[#8C201C] font-bold bg-white px-2.5 py-0.5 rounded-full border border-[#EFE7DD] shadow-2xs">
                              {activeSlide.badge}
                            </span>
                          )}
                          <h2 className="font-serif text-2xl font-bold text-[#231F20] leading-tight">
                            <span className="text-[#8C201C] block">{activeSlide.headingPrimary}</span>
                            <span className="italic font-normal block">{activeSlide.headingSecondary}</span>
                          </h2>
                          {activeSlide.subtitle && (
                            <p className="text-xs text-[#555555] line-clamp-2">{activeSlide.subtitle}</p>
                          )}
                          <div className={`pt-1 flex flex-wrap gap-2 ${activeSlide.textAlign === "right" ? "justify-end" : "justify-start"}`}>
                            <span className="px-4 py-1.5 bg-[#8C201C] text-white text-[11px] font-bold rounded-xl shadow-xs">
                              {activeSlide.primaryBtnText || "Shop Our Flavours"}
                            </span>
                            {activeSlide.secondaryBtnText && (
                              <span className="px-4 py-1.5 bg-white text-[#231F20] border border-[#EFE7DD] text-[11px] font-bold rounded-xl shadow-2xs">
                                {activeSlide.secondaryBtnText}
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          className={`flex items-center justify-center ${
                            activeSlide.imagePosition === "left" ? "md:order-1" : "md:order-2"
                          }`}
                        >
                          <div className="relative w-56 h-36 rounded-xl bg-white/70 border border-[#EFE7DD] p-2 flex items-center justify-center overflow-hidden">
                            <Image
                              src={activeSlide.image || "/heros2.png"}
                              alt="Cover preview"
                              fill
                              className="object-contain p-1"
                              unoptimized
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide Editor Form */}
                  <form onSubmit={handleSaveHeroConfig} className="space-y-6">
                    {/* Card 1: Slide Image & Layout Options */}
                    <div className="bg-white rounded-3xl border border-[#EFE7DD] p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-3">
                        <h3 className="font-serif text-base font-bold text-[#231F20]">
                          1. Slide #{selectedHeroSlideIndex + 1} Image &amp; Layout
                        </h3>
                        <span className="text-xs font-bold text-[#8C201C]">
                          Editing Slide {selectedHeroSlideIndex + 1} of {heroConfigForm.slides.length}
                        </span>
                      </div>

                      {/* Image Picker */}
                      <div>
                        <label className="font-bold text-[#231F20] block mb-1 text-xs">
                          Slide Photo (Upload from Device or pick a Preset)
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <label className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border-2 border-dashed border-[#8C201C]/40 bg-[#FFF9F3] text-xs font-bold text-[#8C201C] hover:bg-[#FFF0E6] cursor-pointer transition-all">
                            <UploadCloud className="w-4 h-4 text-[#8C201C]" />
                            <span>{isUploadingImage ? "Uploading slide..." : "📁 Upload New Photo from Device"}</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleSingleHeroSlideImageUpload}
                              disabled={isUploadingImage}
                              className="hidden"
                            />
                          </label>

                          <select
                            value={activeSlide.image}
                            onChange={(e) => {
                              if (e.target.value) {
                                handleUpdateActiveSlide({ image: e.target.value });
                              }
                            }}
                            className="w-full sm:w-auto px-4 py-3 text-xs bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD] font-semibold text-[#231F20]"
                          >
                            <option value="/heros2.png">Hero Jar Pack (/heros2.png)</option>
                            <option value="/h3.png">Ceramic Martaban (/h3.png)</option>
                            <option value="/h4.png">Crisp Makhana (/h4.png)</option>
                            <option value="/slide4.png">Lotus &amp; Makhana (/slide4.png)</option>
                            <option value="/slide5.png">Pickle Trio (/slide5.png)</option>
                            <option value="/makh1-clean.png">Makhana Bowl (/makh1-clean.png)</option>
                            <option value="/achaar-clean.png">Achar Jar (/achaar-clean.png)</option>
                          </select>
                        </div>
                      </div>

                      {/* Layout & Alignment Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                        <div>
                          <label className="font-bold text-[#231F20] block mb-1">
                            🖼️ Slide Image Layout
                          </label>
                          <select
                            value={activeSlide.imagePosition === "left" ? "left" : "right"}
                            onChange={(e) => {
                              const pos = e.target.value as "left" | "right";
                              handleUpdateActiveSlide({
                                imagePosition: pos,
                                textAlign: pos === "left" ? "right" : "left",
                              });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold text-[#231F20]"
                          >
                            <option value="right">Image on Right (Text on Left)</option>
                            <option value="left">Image on Left (Text on Right)</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-[#231F20] block mb-1">
                            ✍️ Text Alignment
                          </label>
                          <select
                            value={activeSlide.textAlign}
                            onChange={(e) => handleUpdateActiveSlide({ textAlign: e.target.value as any })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold text-[#231F20]"
                          >
                            <option value="left">Left Aligned</option>
                            <option value="right">Right Aligned</option>
                          </select>
                        </div>

                        {/* Conflict Alerts */}
                        {activeSlide.imagePosition === "right" && activeSlide.textAlign === "right" && (
                          <div className="sm:col-span-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold flex items-center gap-2">
                            <span>⚠️ Conflict: Slide image is on the Right side. Please select Left for Text Alignment.</span>
                          </div>
                        )}

                        {activeSlide.imagePosition === "left" && activeSlide.textAlign === "left" && (
                          <div className="sm:col-span-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold flex items-center gap-2">
                            <span>⚠️ Conflict: Slide image is on the Left side. Please select Right for Text Alignment.</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card 2: Slide Headings & Copy */}
                    <div className="bg-white rounded-3xl border border-[#EFE7DD] p-6 shadow-xs space-y-4">
                      <h3 className="font-serif text-base font-bold text-[#231F20] border-b border-[#EFE7DD] pb-3">
                        2. Slide #{selectedHeroSlideIndex + 1} Headings &amp; Buttons
                      </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="sm:col-span-2">
                            <label className="font-bold text-[#231F20] block mb-1">
                              Badge / Super Header Tag
                            </label>
                            <input
                              type="text"
                              value={activeSlide.badge || ""}
                              onChange={(e) => handleUpdateActiveSlide({ badge: e.target.value })}
                              placeholder="e.g. Mithila Culinary Heritage • 100% Traditional"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">
                              Heading Line 1 (Bold / Crimson) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={activeSlide.headingPrimary}
                              onChange={(e) => handleUpdateActiveSlide({ headingPrimary: e.target.value })}
                              placeholder="e.g. Crafted by Heart."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-bold text-[#8C201C]"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">
                              Heading Line 2 (Italic / Charcoal) <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={activeSlide.headingSecondary}
                              onChange={(e) => handleUpdateActiveSlide({ headingSecondary: e.target.value })}
                              placeholder="e.g. Rooted in Tradition."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="font-bold text-[#231F20] block mb-1">
                              Subtitle / Description Paragraph
                            </label>
                            <textarea
                              rows={3}
                              value={activeSlide.subtitle || ""}
                              onChange={(e) => handleUpdateActiveSlide({ subtitle: e.target.value })}
                              placeholder="Authentic handcrafted flavours from the heart of India, made in small batches and delivered to your home."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Primary Button Text</label>
                            <input
                              type="text"
                              value={activeSlide.primaryBtnText}
                              onChange={(e) => handleUpdateActiveSlide({ primaryBtnText: e.target.value })}
                              placeholder="Shop Our Flavours"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Primary Button Link</label>
                            <input
                              type="text"
                              value={activeSlide.primaryBtnLink}
                              onChange={(e) => handleUpdateActiveSlide({ primaryBtnLink: e.target.value })}
                              placeholder="/shop"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Secondary Button Text</label>
                            <input
                              type="text"
                              value={activeSlide.secondaryBtnText || ""}
                              onChange={(e) => handleUpdateActiveSlide({ secondaryBtnText: e.target.value })}
                              placeholder="Our Heritage Story"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Secondary Button Link</label>
                            <input
                              type="text"
                              value={activeSlide.secondaryBtnLink || ""}
                              onChange={(e) => handleUpdateActiveSlide({ secondaryBtnLink: e.target.value })}
                              placeholder="/about"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                            />
                          </div>
                        </div>
                      </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      {heroConfigForm.slides.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteHeroSlide(selectedHeroSlideIndex)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Slide #{selectedHeroSlideIndex + 1}</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E07A4A]" />
                        <span>Publish All Hero Slides</span>
                      </button>
                    </div>
                  </form>
                </div>
              );
            })()}
          </div>
        )}

        {/* ===================== TAB: ABOUT US HERO SECTION MANAGER ===================== */}
        {activeTab === "about" && (
          <div className="space-y-6">
            {/* Tab Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A4A] block mb-1">
                  Brand Story &amp; Heritage
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
                  About Us Hero Slideshow Manager
                </h1>
                <p className="text-xs text-[#666666] mt-0.5">
                  Manage photos, multiple slides, and animations for the About Us page header.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddAboutSlide}
                  disabled={aboutConfigForm.slides.length >= 8}
                  className="inline-flex items-center gap-2 bg-[#FFF9F3] hover:bg-[#FFF0E6] text-[#8C201C] border border-[#8C201C]/30 font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Slide ({aboutConfigForm.slides.length}/8)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveAboutConfig()}
                  className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#E07A4A]" />
                  <span>Publish Changes</span>
                </button>
              </div>
            </div>

            {/* Slide Navigation Tabs */}
            <div className="bg-white p-3 rounded-2xl border border-[#EFE7DD] shadow-xs">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {aboutConfigForm.slides.map((s, idx) => {
                  const isSelected = idx === selectedAboutSlideIndex;
                  return (
                    <div
                      key={s.id || idx}
                      onClick={() => setSelectedAboutSlideIndex(idx)}
                      className={`shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all cursor-pointer select-none ${
                        isSelected
                          ? "bg-[#8C201C] text-white border-[#8C201C] shadow-md ring-2 ring-[#8C201C]/20"
                          : "bg-[#FFF9F3] text-[#231F20] border-[#EFE7DD] hover:border-[#8C201C]/50"
                      }`}
                    >
                      <div className="relative w-8 h-8 rounded-lg bg-white overflow-hidden border border-black/10 shrink-0">
                        <Image
                          src={s.image || "/about-hero-v2.png"}
                          alt={`About Slide ${idx + 1}`}
                          fill
                          className="object-contain p-0.5"
                          unoptimized
                        />
                      </div>

                      <div className="text-left">
                        <span className={`text-[11px] font-bold block leading-tight ${isSelected ? "text-white" : "text-[#8C201C]"}`}>
                          Slide {idx + 1}
                        </span>
                        <span className={`text-[9px] block ${isSelected ? "text-white/80" : "text-[#666666]"}`}>
                          {s.hideText
                            ? "🖼️ Image Only"
                            : s.imagePosition === "left"
                            ? "Left Image"
                            : "Right Image"}
                        </span>
                      </div>

                      {aboutConfigForm.slides.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAboutSlide(idx);
                          }}
                          className={`p-1 rounded-md hover:bg-black/10 transition-colors ml-1 cursor-pointer ${
                            isSelected ? "text-white/80 hover:text-white" : "text-red-500 hover:text-red-700"
                          }`}
                          title={`Delete Slide ${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}

                {aboutConfigForm.slides.length < 8 && (
                  <button
                    type="button"
                    onClick={handleAddAboutSlide}
                    className="shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-dashed border-[#8C201C]/40 bg-[#FFF9F3] text-xs font-bold text-[#8C201C] hover:bg-[#FFF0E6] cursor-pointer transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Slide</span>
                  </button>
                )}
              </div>
            </div>

            {/* Current Active About Slide Editor */}
            {(() => {
              const activeSlide = aboutConfigForm.slides[selectedAboutSlideIndex] || aboutConfigForm.slides[0] || {
                id: "about-slide-1",
                image: "/about-hero-v2.png",
                badge: "Our Roots in Vaishali, Bihar",
                headingPrimary: "Crafted by Heart.",
                headingSecondary: "Ground by Hand.",
                subtitle: "",
                primaryBtnText: "Explore Our Heritage Jars",
                primaryBtnLink: "/shop/achar",
                imagePosition: "right",
                textAlign: "left",
                hideText: false,
              };

              return (
                <div className="space-y-6">
                  {/* Interactive Live Preview Card for Selected Slide */}
                  <div className="bg-white rounded-3xl border border-[#EFE7DD] p-6 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-[#231F20]">
                          Live Preview • About Slide {selectedAboutSlideIndex + 1}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#8C201C] bg-[#FFF9F3] px-3 py-1 rounded-full border border-[#EFE7DD]">
                        Layout: {activeSlide.imagePosition === "left" ? "Image Left / Text Right" : "Image Right / Text Left"}
                      </span>
                    </div>

                    <div className="p-4 sm:p-6 rounded-2xl bg-[#FFF9F3] border border-[#EFE7DD]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <div
                          className={`space-y-2 ${
                            activeSlide.imagePosition === "left" ? "md:order-2" : "md:order-1"
                          } ${activeSlide.textAlign === "right" ? "text-right" : "text-left"}`}
                        >
                          {activeSlide.badge && (
                            <span className="inline-flex items-center gap-1.5 bg-white border border-[#EFE7DD] text-[#8C201C] text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-2xs">
                              <Sparkles className="w-3 h-3 text-[#E07A4A]" />
                              <span>{activeSlide.badge}</span>
                            </span>
                          )}

                          <h2 className="font-serif leading-tight">
                            <span className="block text-xl sm:text-2xl font-bold text-[#8C201C]">
                              {activeSlide.headingPrimary || "Crafted by Heart."}
                            </span>
                            <span className="block text-xl sm:text-2xl italic font-normal text-[#231F20]">
                              {activeSlide.headingSecondary || "Ground by Hand."}
                            </span>
                          </h2>

                          {activeSlide.subtitle && (
                            <p className="text-xs text-[#555555] font-medium line-clamp-2">
                              {activeSlide.subtitle}
                            </p>
                          )}

                          <div className={`flex items-center gap-2 pt-1 ${activeSlide.textAlign === "right" ? "justify-end" : "justify-start"}`}>
                            <span className="px-4 py-1.5 bg-[#8C201C] text-white text-[11px] font-bold rounded-xl shadow-xs">
                              {activeSlide.primaryBtnText || "Explore Our Heritage Jars"}
                            </span>
                            {activeSlide.secondaryBtnText && (
                              <span className="px-4 py-1.5 bg-white text-[#231F20] border border-[#EFE7DD] text-[11px] font-bold rounded-xl shadow-2xs">
                                {activeSlide.secondaryBtnText}
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          className={`flex items-center justify-center ${
                            activeSlide.imagePosition === "left" ? "md:order-1" : "md:order-2"
                          }`}
                        >
                          <div className="relative w-56 h-36 rounded-xl bg-white/70 border border-[#EFE7DD] p-2 flex items-center justify-center overflow-hidden">
                            <Image
                              src={activeSlide.image || "/about-hero-v2.png"}
                              alt="Cover preview"
                              fill
                              className="object-contain p-1"
                              unoptimized
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Edit Form for Active About Slide */}
                  <form onSubmit={handleSaveAboutConfig} className="space-y-6">
                    {/* SECTION A: Image Upload & Layout */}
                    <div className="bg-white rounded-3xl border border-[#EFE7DD] p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-3">
                        <h2 className="font-serif text-lg font-bold text-[#231F20]">
                          1. Slide Photo &amp; Layout Positioning
                        </h2>
                        <span className="text-xs font-bold text-[#8C201C]">
                          Editing Slide {selectedAboutSlideIndex + 1} of {aboutConfigForm.slides.length}
                        </span>
                      </div>

                      {/* Image Upload Area */}
                      <div>
                        <label className="font-bold text-xs text-[#231F20] block mb-1.5">
                          Slide Product / Heritage Photo
                        </label>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <div className="relative w-32 h-32 rounded-2xl bg-[#FFF9F3] border-2 border-dashed border-[#8C201C]/30 flex items-center justify-center overflow-hidden shrink-0">
                            <Image
                              src={activeSlide.image || "/about-hero-v2.png"}
                              alt="Slide preview"
                              fill
                              className="object-contain p-2"
                              unoptimized
                            />
                          </div>

                          <div className="flex-1 w-full space-y-2">
                            <label className="flex items-center justify-center gap-2 w-full p-4 rounded-2xl border-2 border-dashed border-[#8C201C]/40 bg-[#FFF9F3] hover:bg-[#FFF0E6] text-xs font-bold text-[#8C201C] cursor-pointer transition-all">
                              <UploadCloud className="w-4 h-4" />
                              <span>{isUploadingImage ? "Uploading..." : "Upload New Photo for This Slide"}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleSingleAboutSlideImageUpload}
                                className="hidden"
                              />
                            </label>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#666666] shrink-0 font-medium">Or Image URL:</span>
                              <input
                                type="text"
                                value={activeSlide.image || ""}
                                onChange={(e) => handleUpdateActiveAboutSlide({ image: e.target.value })}
                                placeholder="/about-hero-v2.png"
                                className="w-full text-xs px-3 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Layout Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EFE7DD] text-xs">
                        <div>
                          <label className="font-bold text-[#231F20] block mb-1">
                            📐 Slide Layout Structure
                          </label>
                          <select
                            value={activeSlide.imagePosition === "left" ? "left" : "right"}
                            onChange={(e) => {
                              const pos = e.target.value as "left" | "right";
                              handleUpdateActiveAboutSlide({
                                imagePosition: pos,
                                textAlign: pos === "left" ? "right" : "left",
                              });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold text-[#231F20]"
                          >
                            <option value="right">Image on Right (Text on Left)</option>
                            <option value="left">Image on Left (Text on Right)</option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-[#231F20] block mb-1">
                            ✍️ Text Alignment
                          </label>
                          <select
                            value={activeSlide.textAlign}
                            onChange={(e) => handleUpdateActiveAboutSlide({ textAlign: e.target.value as any })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold text-[#231F20]"
                          >
                            <option value="left">Left Aligned</option>
                            <option value="right">Right Aligned</option>
                          </select>
                        </div>

                        {/* Conflict Alerts */}
                        {activeSlide.imagePosition === "right" && activeSlide.textAlign === "right" && (
                          <div className="sm:col-span-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold flex items-center gap-2">
                            <span>⚠️ Conflict: Slide image is on the Right side. Please select Left for Text Alignment.</span>
                          </div>
                        )}

                        {activeSlide.imagePosition === "left" && activeSlide.textAlign === "left" && (
                          <div className="sm:col-span-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-bold flex items-center gap-2">
                            <span>⚠️ Conflict: Slide image is on the Left side. Please select Right for Text Alignment.</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* SECTION B: Text & Content Customization */}
                    <div className="bg-white rounded-3xl border border-[#EFE7DD] p-6 shadow-xs space-y-4">
                      <h2 className="font-serif text-lg font-bold text-[#231F20] border-b border-[#EFE7DD] pb-3">
                        2. Headlines, Story &amp; Buttons
                      </h2>

                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="font-bold text-[#231F20] block mb-1">Badge / Tag Pill</label>
                          <input
                            type="text"
                            value={activeSlide.badge || ""}
                            onChange={(e) => handleUpdateActiveAboutSlide({ badge: e.target.value })}
                            placeholder="Our Roots in Vaishali, Bihar"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Primary Heading (Red Brand)</label>
                            <input
                              type="text"
                              value={activeSlide.headingPrimary}
                              onChange={(e) => handleUpdateActiveAboutSlide({ headingPrimary: e.target.value })}
                              placeholder="Crafted by Heart."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-bold text-[#8C201C]"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Secondary Heading (Italic Black)</label>
                            <input
                              type="text"
                              value={activeSlide.headingSecondary}
                              onChange={(e) => handleUpdateActiveAboutSlide({ headingSecondary: e.target.value })}
                              placeholder="Ground by Hand."
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] italic"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-[#231F20] block mb-1">Story / Subtitle Paragraph</label>
                          <textarea
                            rows={3}
                            value={activeSlide.subtitle}
                            onChange={(e) => handleUpdateActiveAboutSlide({ subtitle: e.target.value })}
                            placeholder="Chachiji was born from an unwavering devotion to the authentic, unadulterated tastes of home..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EFE7DD]">
                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Primary Button Text</label>
                            <input
                              type="text"
                              value={activeSlide.primaryBtnText || ""}
                              onChange={(e) => handleUpdateActiveAboutSlide({ primaryBtnText: e.target.value })}
                              placeholder="Explore Our Heritage Jars"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Primary Button Link</label>
                            <input
                              type="text"
                              value={activeSlide.primaryBtnLink || ""}
                              onChange={(e) => handleUpdateActiveAboutSlide({ primaryBtnLink: e.target.value })}
                              placeholder="/shop/achar"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Secondary Button Text</label>
                            <input
                              type="text"
                              value={activeSlide.secondaryBtnText || ""}
                              onChange={(e) => handleUpdateActiveAboutSlide({ secondaryBtnText: e.target.value })}
                              placeholder="Our Story & Vision"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-[#231F20] block mb-1">Secondary Button Link</label>
                            <input
                              type="text"
                              value={activeSlide.secondaryBtnLink || ""}
                              onChange={(e) => handleUpdateActiveAboutSlide({ secondaryBtnLink: e.target.value })}
                              placeholder="/about#story"
                              className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                      {aboutConfigForm.slides.length > 1 ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteAboutSlide(selectedAboutSlideIndex)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Slide #{selectedAboutSlideIndex + 1}</span>
                        </button>
                      ) : (
                        <div />
                      )}

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold text-xs px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E07A4A]" />
                        <span>Publish All About Us Slides</span>
                      </button>
                    </div>
                  </form>
                </div>
              );
            })()}
          </div>
        )}

        {/* ===================== TAB: OVERVIEW ===================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F20]">
              Store Metrics &amp; Performance
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-3xl border border-[#EFE7DD] shadow-xs">
                <span className="text-xs text-[#666666] font-bold block mb-1">Total Live Products</span>
                <span className="font-serif text-3xl font-bold text-[#8C201C] block">{products.length}</span>
                <span className="text-[11px] text-[#888888] mt-1 block">Active in Store DB</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-[#EFE7DD] shadow-xs">
                <span className="text-xs text-[#666666] font-bold block mb-1">Categories</span>
                <span className="font-serif text-3xl font-bold text-[#E07A4A] block">{categories.length}</span>
                <span className="text-[11px] text-[#888888] mt-1 block">Dynamic Store Pages</span>
              </div>
              <div className="bg-white p-5 rounded-3xl border border-[#EFE7DD] shadow-xs">
                <span className="text-xs text-[#666666] font-bold block mb-1">Subcategories</span>
                <span className="font-serif text-3xl font-bold text-[#231F20] block">{subcategories.length}</span>
                <span className="text-[11px] text-[#888888] mt-1 block">Nested taxonomies</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADD PRODUCT */}
      {/* ========================================================================= */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#EFE7DD] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#EFE7DD] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                  New Inventory Item
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#231F20]">
                  Add Product to Store
                </h3>
              </div>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-2 rounded-xl text-[#888888] hover:text-[#231F20] hover:bg-[#FFF9F3] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Traditional Bharwa Lal Mirch"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Hindi Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. बनारसी भरवां लाल मिर्च अचार"
                    value={productForm.hindiName}
                    onChange={(e) => setProductForm({ ...productForm, hindiName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] text-xs font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.hindiName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Subcategory (Optional)
                  </label>
                  <select
                    value={productForm.subCategory}
                    onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] text-xs font-semibold"
                  >
                    <option value="">-- No Subcategory --</option>
                    {subcategories
                      .filter((s) => s.categoryId === productForm.category)
                      .map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Selling Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="349"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    placeholder="399"
                    value={productForm.mrp}
                    onChange={(e) => setProductForm({ ...productForm, mrp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none bg-[#FFF9F3] font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Default Weight</label>
                  <input
                    type="text"
                    placeholder="400g"
                    value={productForm.weight}
                    onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none bg-[#FFF9F3] font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Stock Count</label>
                  <input
                    type="number"
                    placeholder="50"
                    value={productForm.stockCount}
                    onChange={(e) => setProductForm({ ...productForm, stockCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none bg-[#FFF9F3] font-semibold"
                  />
                </div>
              </div>

              {/* Product Images (Multiple Images Upload) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#231F20] block text-xs">
                    Product Images ({productForm.images.length}) <span className="text-stone-400 font-normal">(Add at least 1–3 photos)</span>
                  </label>
                  <span className="text-[10px] font-bold text-[#8C201C]">First photo is Primary Cover</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {/* File Upload Box */}
                  <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#EFE7DD] hover:border-[#8C201C] rounded-2xl bg-[#FFF9F3] text-xs font-bold text-[#8C201C] cursor-pointer transition-all hover:bg-[#FFF5EB]">
                    <UploadCloud className="w-4 h-4 text-[#E07A4A]" />
                    <span>{isUploadingImage ? "Uploading images..." : "📁 Upload Multiple Images from Device"}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleMultipleImageUpload(e, false)}
                      disabled={isUploadingImage}
                      className="hidden"
                    />
                  </label>

                  {/* Preset Dropdown */}
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setProductForm({
                          ...productForm,
                          images: [...productForm.images.filter((img) => img !== "/achaar-clean.png"), e.target.value],
                        });
                      }
                    }}
                    className="w-full sm:w-auto px-3 py-3 text-xs bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD] font-semibold text-[#231F20]"
                  >
                    <option value="">+ Add Preset Photo</option>
                    <option value="/achaar-clean.png">Achar Jar (/achaar-clean.png)</option>
                    <option value="/makh1-clean.png">Makhana Pouch (/makh1-clean.png)</option>
                    <option value="/mixpickle-clean.png">Mix Pickle (/mixpickle-clean.png)</option>
                    <option value="/promp-clean.png">Gift Box (/promp-clean.png)</option>
                  </select>
                </div>

                {/* Uploaded Images Gallery Preview Grid */}
                {productForm.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {productForm.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] p-2 flex flex-col items-center group shadow-2xs"
                      >
                        <div className="relative w-full aspect-square rounded-xl bg-white overflow-hidden border border-[#EFE7DD] mb-1.5">
                          <Image
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            fill
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>
                        <div className="flex items-center justify-between w-full px-1">
                          <span className="text-[9px] font-bold text-[#8C201C]">
                            {idx === 0 ? "★ Cover Photo" : `Photo ${idx + 1}`}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setProductForm({
                                ...productForm,
                                images: productForm.images.filter((_, i) => i !== idx),
                              })
                            }
                            className="text-[10px] text-red-500 hover:text-red-700 font-bold p-0.5 cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="font-bold text-[#231F20] block mb-1">Tagline / Short Hook</label>
                <input
                  type="text"
                  placeholder="e.g. Stuffed with hand-roasted Banarasi spices in cold-pressed mustard oil"
                  value={productForm.tagline}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                />
              </div>

              <div>
                <label className="font-bold text-[#231F20] block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the product craft, ingredients, and taste..."
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Badge Text</label>
                  <input
                    type="text"
                    placeholder="e.g. GI-Tagged, 100% Sun-Cured"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Ingredients (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Red Chilli, Mustard Oil, Fenugreek, Rock Salt"
                    value={productForm.ingredients}
                    onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#231F20]">
                  <input
                    type="checkbox"
                    checked={productForm.isBestseller}
                    onChange={(e) =>
                      setProductForm({ ...productForm, isBestseller: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#8C201C]"
                  />
                  <span>Mark as Bestseller ★</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#231F20]">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) =>
                      setProductForm({ ...productForm, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#8C201C]"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EFE7DD] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#EFE7DD] font-bold text-[#555555] hover:bg-[#FFF9F3] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Save Product to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT PRODUCT */}
      {/* ========================================================================= */}
      {isEditProductOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EFE7DD] overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 bg-[#8C201C] text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold">Edit Product: {editingProduct.name}</h3>
                <span className="text-[10px] text-[#E07A4A] block">Update catalog metadata, pricing, inventory &amp; gallery</span>
              </div>
              <button
                onClick={() => {
                  setIsEditProductOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-lg text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editProductForm.name}
                    onChange={(e) => setEditProductForm({ ...editProductForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Hindi Title (Optional)</label>
                  <input
                    type="text"
                    value={editProductForm.hindiName}
                    onChange={(e) => setEditProductForm({ ...editProductForm, hindiName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={editProductForm.category}
                    onChange={(e) => setEditProductForm({ ...editProductForm, category: e.target.value, subCategory: "" })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] text-xs font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Subcategory (Optional)</label>
                  <select
                    value={editProductForm.subCategory}
                    onChange={(e) => setEditProductForm({ ...editProductForm, subCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] text-xs font-semibold"
                  >
                    <option value="">-- No Subcategory --</option>
                    {subcategories
                      .filter((s) => s.categoryId === editProductForm.category)
                      .map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Selling Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={editProductForm.price}
                    onChange={(e) => setEditProductForm({ ...editProductForm, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none focus:border-[#8C201C] bg-[#FFF9F3] font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    value={editProductForm.mrp}
                    onChange={(e) => setEditProductForm({ ...editProductForm, mrp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none bg-[#FFF9F3] font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Default Weight</label>
                  <input
                    type="text"
                    value={editProductForm.weight}
                    onChange={(e) => setEditProductForm({ ...editProductForm, weight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none bg-[#FFF9F3] font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={editProductForm.stockCount}
                    onChange={(e) => setEditProductForm({ ...editProductForm, stockCount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#EFE7DD] focus:outline-none bg-[#FFF9F3] font-semibold"
                  />
                </div>
              </div>

              {/* Product Images (Multiple Images Upload in Edit) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#231F20] block text-xs">
                    Product Images ({editProductForm.images.length}) <span className="text-stone-400 font-normal">(Add at least 1–3 photos)</span>
                  </label>
                  <span className="text-[10px] font-bold text-[#8C201C]">First photo is Primary Cover</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <label className="flex-1 w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-[#EFE7DD] hover:border-[#8C201C] rounded-2xl bg-[#FFF9F3] text-xs font-bold text-[#8C201C] cursor-pointer transition-all hover:bg-[#FFF5EB]">
                    <UploadCloud className="w-4 h-4 text-[#E07A4A]" />
                    <span>{isUploadingImage ? "Uploading images..." : "📁 Upload Multiple Images from Device"}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleMultipleImageUpload(e, true)}
                      disabled={isUploadingImage}
                      className="hidden"
                    />
                  </label>

                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setEditProductForm({
                          ...editProductForm,
                          images: [...editProductForm.images, e.target.value],
                        });
                      }
                    }}
                    className="w-full sm:w-auto px-3 py-3 text-xs bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD] font-semibold text-[#231F20]"
                  >
                    <option value="">+ Add Preset Photo</option>
                    <option value="/achaar-clean.png">Achar Jar (/achaar-clean.png)</option>
                    <option value="/makh1-clean.png">Makhana Pouch (/makh1-clean.png)</option>
                    <option value="/mixpickle-clean.png">Mix Pickle (/mixpickle-clean.png)</option>
                    <option value="/promp-clean.png">Gift Box (/promp-clean.png)</option>
                  </select>
                </div>

                {/* Uploaded Images Gallery Preview Grid */}
                {editProductForm.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                    {editProductForm.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] p-2 flex flex-col items-center group shadow-2xs"
                      >
                        <div className="relative w-full aspect-square rounded-xl bg-white overflow-hidden border border-[#EFE7DD] mb-1.5">
                          <Image
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            fill
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>
                        <div className="flex items-center justify-between w-full px-1">
                          <span className="text-[9px] font-bold text-[#8C201C]">
                            {idx === 0 ? "★ Cover Photo" : `Photo ${idx + 1}`}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setEditProductForm({
                                ...editProductForm,
                                images: editProductForm.images.filter((_, i) => i !== idx),
                              })
                            }
                            className="text-[10px] text-red-500 hover:text-red-700 font-bold p-0.5 cursor-pointer"
                            title="Remove image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="font-bold text-[#231F20] block mb-1">Tagline / Short Hook</label>
                <input
                  type="text"
                  value={editProductForm.tagline}
                  onChange={(e) => setEditProductForm({ ...editProductForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                />
              </div>

              <div>
                <label className="font-bold text-[#231F20] block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editProductForm.description}
                  onChange={(e) => setEditProductForm({ ...editProductForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={editProductForm.badge}
                    onChange={(e) => setEditProductForm({ ...editProductForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Ingredients (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editProductForm.ingredients}
                    onChange={(e) => setEditProductForm({ ...editProductForm, ingredients: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#231F20]">
                  <input
                    type="checkbox"
                    checked={editProductForm.isBestseller}
                    onChange={(e) =>
                      setEditProductForm({ ...editProductForm, isBestseller: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#8C201C]"
                  />
                  <span>Mark as Bestseller ★</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-[#231F20]">
                  <input
                    type="checkbox"
                    checked={editProductForm.isFeatured}
                    onChange={(e) =>
                      setEditProductForm({ ...editProductForm, isFeatured: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#8C201C]"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#EFE7DD] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditProductOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#EFE7DD] font-bold text-[#555555] hover:bg-[#FFF9F3] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#8C201C] hover:bg-[#6B1815] text-white font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD CATEGORY */}
      {/* ========================================================================= */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#EFE7DD] w-full max-w-xl max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in zoom-in-95">
            {/* Fixed Header with Close Button */}
            <div className="flex items-center justify-between border-b border-[#EFE7DD] px-6 py-4 shrink-0 bg-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                  New Collection
                </span>
                <h3 className="font-serif text-xl font-bold text-[#231F20]">
                  Create Category
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddCategoryOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FFF9F3] hover:bg-[#8C201C] text-[#666666] hover:text-white flex items-center justify-center border border-[#EFE7DD] transition-all cursor-pointer shadow-xs"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="flex flex-col flex-1 overflow-hidden">
              {/* Scrollable Body */}
              <div className="overflow-y-auto px-6 py-5 space-y-4 flex-1 text-xs">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Masala Chana"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Hindi Name</label>
                  <input
                    type="text"
                    placeholder="e.g. मसालेदार भुना चना"
                    value={categoryForm.hindiName}
                    onChange={(e) => setCategoryForm({ ...categoryForm, hindiName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Headline / Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Crunchy, bold and roasted in earthen pans"
                    value={categoryForm.headline}
                    onChange={(e) => setCategoryForm({ ...categoryForm, headline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description for the category banner..."
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Banner Images (Upload up to 5+ Photos for Slideshow)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-[#8C201C]/40 bg-[#FFF9F3] text-xs font-bold text-[#8C201C] hover:bg-[#FFF0E6] cursor-pointer transition-all">
                      <UploadCloud className="w-4 h-4 text-[#8C201C]" />
                      <span>{isUploadingImage ? "Uploading banners..." : "📁 Upload Banner Images from Device"}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleCategoryImagesUpload(e, false)}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>

                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setCategoryForm({
                            ...categoryForm,
                            heroImages: [...categoryForm.heroImages, e.target.value],
                            heroImage: categoryForm.heroImage || e.target.value,
                          });
                        }
                      }}
                      className="w-full sm:w-auto px-3 py-3 text-xs bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD] font-semibold text-[#231F20]"
                    >
                      <option value="">+ Add Preset Banner</option>
                      <option value="/makh1-clean.png">Makhana Bowl (/makh1-clean.png)</option>
                      <option value="/achaar-clean.png">Achar Jar (/achaar-clean.png)</option>
                      <option value="/heros2.png">Hero Jar Pack (/heros2.png)</option>
                      <option value="/h3.png">Ceramic Martaban (/h3.png)</option>
                      <option value="/h4.png">Crisp Makhana (/h4.png)</option>
                      <option value="/slide4.png">Lotus &amp; Makhana (/slide4.png)</option>
                      <option value="/slide5.png">Pickle Trio (/slide5.png)</option>
                    </select>
                  </div>

                  {/* Uploaded Banner Images Preview */}
                  {categoryForm.heroImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                      {categoryForm.heroImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] p-2 flex flex-col items-center group shadow-2xs"
                        >
                          <div className="relative w-full aspect-video rounded-xl bg-white overflow-hidden border border-[#EFE7DD] mb-1.5">
                            <Image
                              src={img}
                              alt={`Banner ${idx + 1}`}
                              fill
                              className="object-contain p-1"
                              unoptimized
                            />
                          </div>
                          <div className="flex items-center justify-between w-full px-1">
                            <span className="text-[9px] font-bold text-[#8C201C]">
                              {idx === 0 ? "★ Primary Cover" : `Slide ${idx + 1}`}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setCategoryForm({
                                  ...categoryForm,
                                  heroImages: categoryForm.heroImages.filter((_, i) => i !== idx),
                                  heroImage: categoryForm.heroImages.filter((_, i) => i !== idx)[0] || "",
                                })
                              }
                              className="text-[10px] text-red-500 hover:text-red-700 font-bold p-0.5 cursor-pointer"
                              title="Remove image"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Banner Layout: Image Position & Text Alignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#FFF9F3] p-3.5 rounded-2xl border border-[#EFE7DD]">
                  <div>
                    <label className="font-bold text-[#231F20] block mb-1.5">
                      🖼️ Banner Image Layout
                    </label>
                    <select
                      value={categoryForm.imagePosition}
                      onChange={(e) => {
                        const pos = e.target.value as "left" | "right";
                        setCategoryForm({
                          ...categoryForm,
                          imagePosition: pos,
                          textAlign: pos === "left" ? "right" : "left",
                        });
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-[#EFE7DD] text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    >
                      <option value="right">Image on Right (Text on Left)</option>
                      <option value="left">Image on Left (Text on Right)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#231F20] block mb-1.5">
                      ✍️ Text &amp; Badges Alignment
                    </label>
                    <select
                      value={categoryForm.textAlign}
                      onChange={(e) =>
                        setCategoryForm({
                          ...categoryForm,
                          textAlign: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-[#EFE7DD] text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    >
                      <option value="left">Left Aligned</option>
                      <option value="right">Right Aligned</option>
                    </select>
                  </div>

                  {/* Conflict Alert */}
                  {categoryForm.imagePosition === "right" && categoryForm.textAlign === "right" && (
                    <div className="sm:col-span-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl font-bold">
                      ⚠️ Conflict: Image is on the Right side. Please select Left for Text Alignment.
                    </div>
                  )}

                  {categoryForm.imagePosition === "left" && categoryForm.textAlign === "left" && (
                    <div className="sm:col-span-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl font-bold">
                      ⚠️ Conflict: Image is on the Left side. Please select Right for Text Alignment.
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Highlights (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Handcrafted, Zero Preservatives, Authentic Heritage"
                    value={categoryForm.highlights}
                    onChange={(e) => setCategoryForm({ ...categoryForm, highlights: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="px-6 py-4 border-t border-[#EFE7DD] bg-[#FFF9F3] flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddCategoryOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#EFE7DD] font-bold text-xs text-[#555555] hover:bg-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#8C201C] text-white font-bold text-xs shadow-md hover:bg-[#6B1815] transition-all active:scale-95 cursor-pointer"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT CATEGORY */}
      {/* ========================================================================= */}
      {isEditCategoryOpen && editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#EFE7DD] w-full max-w-xl max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in zoom-in-95">
            {/* Fixed Header with Close Button */}
            <div className="flex items-center justify-between border-b border-[#EFE7DD] px-6 py-4 shrink-0 bg-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C201C] block">
                  Modify Collection
                </span>
                <h3 className="font-serif text-xl font-bold text-[#231F20]">
                  Edit Category ({editingCategory.name})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditCategoryOpen(false);
                  setEditingCategory(null);
                }}
                className="w-8 h-8 rounded-full bg-[#FFF9F3] hover:bg-[#8C201C] text-[#666666] hover:text-white flex items-center justify-center border border-[#EFE7DD] transition-all cursor-pointer shadow-xs"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="flex flex-col flex-1 overflow-hidden">
              {/* Scrollable Body */}
              <div className="overflow-y-auto px-6 py-5 space-y-4 flex-1 text-xs">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={editCategoryForm.name}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Hindi Name</label>
                  <input
                    type="text"
                    value={editCategoryForm.hindiName}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, hindiName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Headline / Subtitle</label>
                  <input
                    type="text"
                    value={editCategoryForm.headline}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, headline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editCategoryForm.description}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Banner Images (Upload up to 5+ Photos for Slideshow)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-[#8C201C]/40 bg-[#FFF9F3] text-xs font-bold text-[#8C201C] hover:bg-[#FFF0E6] cursor-pointer transition-all">
                      <UploadCloud className="w-4 h-4 text-[#8C201C]" />
                      <span>{isUploadingImage ? "Uploading banners..." : "📁 Upload Banner Images from Device"}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleCategoryImagesUpload(e, true)}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>

                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setEditCategoryForm({
                            ...editCategoryForm,
                            heroImages: [...editCategoryForm.heroImages, e.target.value],
                            heroImage: editCategoryForm.heroImage || e.target.value,
                          });
                        }
                      }}
                      className="w-full sm:w-auto px-3 py-3 text-xs bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD] font-semibold text-[#231F20]"
                    >
                      <option value="">+ Add Preset Banner</option>
                      <option value="/makh1-clean.png">Makhana Bowl (/makh1-clean.png)</option>
                      <option value="/achaar-clean.png">Achar Jar (/achaar-clean.png)</option>
                      <option value="/heros2.png">Hero Jar Pack (/heros2.png)</option>
                      <option value="/h3.png">Ceramic Martaban (/h3.png)</option>
                      <option value="/h4.png">Crisp Makhana (/h4.png)</option>
                      <option value="/slide4.png">Lotus &amp; Makhana (/slide4.png)</option>
                      <option value="/slide5.png">Pickle Trio (/slide5.png)</option>
                    </select>
                  </div>

                  {/* Uploaded Banner Images Preview */}
                  {editCategoryForm.heroImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                      {editCategoryForm.heroImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] p-2 flex flex-col items-center group shadow-2xs"
                        >
                          <div className="relative w-full aspect-video rounded-xl bg-white overflow-hidden border border-[#EFE7DD] mb-1.5">
                            <Image
                              src={img}
                              alt={`Banner ${idx + 1}`}
                              fill
                              className="object-contain p-1"
                              unoptimized
                            />
                          </div>
                          <div className="flex items-center justify-between w-full px-1">
                            <span className="text-[9px] font-bold text-[#8C201C]">
                              {idx === 0 ? "★ Primary Cover" : `Slide ${idx + 1}`}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setEditCategoryForm({
                                  ...editCategoryForm,
                                  heroImages: editCategoryForm.heroImages.filter((_, i) => i !== idx),
                                  heroImage: editCategoryForm.heroImages.filter((_, i) => i !== idx)[0] || "",
                                })
                              }
                              className="text-[10px] text-red-500 hover:text-red-700 font-bold p-0.5 cursor-pointer"
                              title="Remove image"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Banner Layout: Image Position & Text Alignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#FFF9F3] p-3.5 rounded-2xl border border-[#EFE7DD]">
                  <div>
                    <label className="font-bold text-[#231F20] block mb-1.5">
                      🖼️ Banner Image Layout
                    </label>
                    <select
                      value={editCategoryForm.imagePosition}
                      onChange={(e) => {
                        const pos = e.target.value as "left" | "right";
                        setEditCategoryForm({
                          ...editCategoryForm,
                          imagePosition: pos,
                          textAlign: pos === "left" ? "right" : "left",
                        });
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-[#EFE7DD] text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    >
                      <option value="right">Image on Right (Text on Left)</option>
                      <option value="left">Image on Left (Text on Right)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#231F20] block mb-1.5">
                      ✍️ Text &amp; Badges Alignment
                    </label>
                    <select
                      value={editCategoryForm.textAlign}
                      onChange={(e) =>
                        setEditCategoryForm({
                          ...editCategoryForm,
                          textAlign: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-[#EFE7DD] text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    >
                      <option value="left">Left Aligned</option>
                      <option value="right">Right Aligned</option>
                    </select>
                  </div>

                  {/* Conflict Alert */}
                  {editCategoryForm.imagePosition === "right" && editCategoryForm.textAlign === "right" && (
                    <div className="sm:col-span-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl font-bold">
                      ⚠️ Conflict: Image is on the Right side. Please select Left for Text Alignment.
                    </div>
                  )}

                  {editCategoryForm.imagePosition === "left" && editCategoryForm.textAlign === "left" && (
                    <div className="sm:col-span-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl font-bold">
                      ⚠️ Conflict: Image is on the Left side. Please select Right for Text Alignment.
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Highlights (comma-separated)</label>
                  <input
                    type="text"
                    value={editCategoryForm.highlights}
                    onChange={(e) => setEditCategoryForm({ ...editCategoryForm, highlights: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="px-6 py-4 border-t border-[#EFE7DD] bg-[#FFF9F3] flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditCategoryOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#EFE7DD] font-bold text-xs text-[#555555] hover:bg-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#8C201C] text-white font-bold text-xs shadow-md hover:bg-[#6B1815] transition-all active:scale-95 cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD SUBCATEGORY */}
      {/* ========================================================================= */}
      {isAddSubCategoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#EFE7DD] w-full max-w-xl max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in zoom-in-95">
            {/* Fixed Header with Close Button */}
            <div className="flex items-center justify-between border-b border-[#EFE7DD] px-6 py-4 shrink-0 bg-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07A4A] block">
                  New Sub-Collection
                </span>
                <h3 className="font-serif text-xl font-bold text-[#231F20]">
                  Add Subcategory
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddSubCategoryOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FFF9F3] hover:bg-[#8C201C] text-[#666666] hover:text-white flex items-center justify-center border border-[#EFE7DD] transition-all cursor-pointer shadow-xs"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubCategory} className="flex flex-col flex-1 overflow-hidden">
              {/* Scrollable Body */}
              <div className="overflow-y-auto px-6 py-5 space-y-4 flex-1 text-xs">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Parent Category *</label>
                  <select
                    required
                    value={subcategoryForm.categoryId}
                    onChange={(e) => setSubcategoryForm({ ...subcategoryForm, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold text-xs text-[#231F20]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-bold text-[#231F20] block mb-1">Subcategory Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bharwa Mirch Achar"
                      value={subcategoryForm.name}
                      onChange={(e) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#231F20] block mb-1">Hindi Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. भरवां लाल मिर्च अचार"
                      value={subcategoryForm.hindiName}
                      onChange={(e) => setSubcategoryForm({ ...subcategoryForm, hindiName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Headline / Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g. Sun-Cured & Stuffed with In-House Roasted Spices"
                    value={subcategoryForm.headline}
                    onChange={(e) => setSubcategoryForm({ ...subcategoryForm, headline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Short description for the subcategory banner..."
                    value={subcategoryForm.description}
                    onChange={(e) => setSubcategoryForm({ ...subcategoryForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                {/* Banner Images (Upload + Preset) */}
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Banner Images (Upload up to 5+ Photos for Slideshow)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-[#8C201C]/40 bg-[#FFF9F3] text-xs font-bold text-[#8C201C] hover:bg-[#FFF0E6] cursor-pointer transition-all">
                      <UploadCloud className="w-4 h-4 text-[#8C201C]" />
                      <span>{isUploadingImage ? "Uploading banners..." : "📁 Upload Banner Images from Device"}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleSubCategoryImagesUpload(e, false)}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>

                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setSubcategoryForm({
                            ...subcategoryForm,
                            heroImages: [...subcategoryForm.heroImages, e.target.value],
                            heroImage: subcategoryForm.heroImage || e.target.value,
                          });
                        }
                      }}
                      className="w-full sm:w-auto px-3 py-3 text-xs bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD] font-semibold text-[#231F20]"
                    >
                      <option value="">+ Add Preset Banner</option>
                      <option value="/achaar-clean.png">Achar Jar (/achaar-clean.png)</option>
                      <option value="/makh1-clean.png">Makhana Bowl (/makh1-clean.png)</option>
                      <option value="/heros2.png">Hero Jar Pack (/heros2.png)</option>
                      <option value="/h3.png">Ceramic Martaban (/h3.png)</option>
                      <option value="/h4.png">Crisp Makhana (/h4.png)</option>
                      <option value="/slide4.png">Lotus &amp; Makhana (/slide4.png)</option>
                      <option value="/slide5.png">Pickle Trio (/slide5.png)</option>
                    </select>
                  </div>

                  {/* Uploaded Banner Images Preview */}
                  {subcategoryForm.heroImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                      {subcategoryForm.heroImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] p-2 flex flex-col items-center group shadow-2xs"
                        >
                          <div className="relative w-full aspect-video rounded-xl bg-white overflow-hidden border border-[#EFE7DD] mb-1.5">
                            <Image
                              src={img}
                              alt={`Banner ${idx + 1}`}
                              fill
                              className="object-contain p-1"
                              unoptimized
                            />
                          </div>
                          <div className="flex items-center justify-between w-full px-1">
                            <span className="text-[9px] font-bold text-[#8C201C]">
                              {idx === 0 ? "★ Primary Cover" : `Slide ${idx + 1}`}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setSubcategoryForm({
                                  ...subcategoryForm,
                                  heroImages: subcategoryForm.heroImages.filter((_, i) => i !== idx),
                                  heroImage: subcategoryForm.heroImages.filter((_, i) => i !== idx)[0] || "",
                                })
                              }
                              className="text-[10px] text-red-500 hover:text-red-700 font-bold p-0.5 cursor-pointer"
                              title="Remove image"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Banner Layout: Image Position & Text Alignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#FFF9F3] p-3.5 rounded-2xl border border-[#EFE7DD]">
                  <div>
                    <label className="font-bold text-[#231F20] block mb-1.5">
                      🖼️ Banner Image Layout
                    </label>
                    <select
                      value={subcategoryForm.imagePosition}
                      onChange={(e) => {
                        const pos = e.target.value as "left" | "right";
                        setSubcategoryForm({
                          ...subcategoryForm,
                          imagePosition: pos,
                          textAlign: pos === "left" ? "right" : "left",
                        });
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-[#EFE7DD] text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    >
                      <option value="right">Image on Right (Text on Left)</option>
                      <option value="left">Image on Left (Text on Right)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#231F20] block mb-1.5">
                      ✍️ Text &amp; Badges Alignment
                    </label>
                    <select
                      value={subcategoryForm.textAlign}
                      onChange={(e) =>
                        setSubcategoryForm({
                          ...subcategoryForm,
                          textAlign: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-[#EFE7DD] text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    >
                      <option value="left">Left Aligned</option>
                      <option value="right">Right Aligned</option>
                    </select>
                  </div>

                  {/* Conflict Alert */}
                  {subcategoryForm.imagePosition === "right" && subcategoryForm.textAlign === "right" && (
                    <div className="sm:col-span-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl font-bold">
                      ⚠️ Conflict: Image is on the Right side. Please select Left for Text Alignment.
                    </div>
                  )}

                  {subcategoryForm.imagePosition === "left" && subcategoryForm.textAlign === "left" && (
                    <div className="sm:col-span-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl font-bold">
                      ⚠️ Conflict: Image is on the Left side. Please select Right for Text Alignment.
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Highlights (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Handcrafted, Sun-Cured In Ceramic Martaban"
                    value={subcategoryForm.highlights}
                    onChange={(e) => setSubcategoryForm({ ...subcategoryForm, highlights: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="px-6 py-4 border-t border-[#EFE7DD] bg-[#FFF9F3] flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddSubCategoryOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#EFE7DD] font-bold text-xs text-[#555555] hover:bg-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#8C201C] text-white font-bold text-xs shadow-md hover:bg-[#6B1815] transition-all active:scale-95 cursor-pointer"
                >
                  Create Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT SUBCATEGORY */}
      {/* ========================================================================= */}
      {isEditSubCategoryOpen && editingSubCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#EFE7DD] w-full max-w-xl max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in zoom-in-95">
            {/* Fixed Header with Close Button */}
            <div className="flex items-center justify-between border-b border-[#EFE7DD] px-6 py-4 shrink-0 bg-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C201C] block">
                  Modify Sub-Collection
                </span>
                <h3 className="font-serif text-xl font-bold text-[#231F20]">
                  Edit Subcategory ({editingSubCategory.name})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditSubCategoryOpen(false);
                  setEditingSubCategory(null);
                }}
                className="w-8 h-8 rounded-full bg-[#FFF9F3] hover:bg-[#8C201C] text-[#666666] hover:text-white flex items-center justify-center border border-[#EFE7DD] transition-all cursor-pointer shadow-xs"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubCategory} className="flex flex-col flex-1 overflow-hidden">
              {/* Scrollable Body */}
              <div className="overflow-y-auto px-6 py-5 space-y-4 flex-1 text-xs">
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Parent Category *</label>
                  <select
                    required
                    value={editSubCategoryForm.categoryId}
                    onChange={(e) => setEditSubCategoryForm({ ...editSubCategoryForm, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold text-xs text-[#231F20]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="font-bold text-[#231F20] block mb-1">Subcategory Name *</label>
                    <input
                      type="text"
                      required
                      value={editSubCategoryForm.name}
                      onChange={(e) => setEditSubCategoryForm({ ...editSubCategoryForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3] font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#231F20] block mb-1">Hindi Name</label>
                    <input
                      type="text"
                      value={editSubCategoryForm.hindiName}
                      onChange={(e) => setEditSubCategoryForm({ ...editSubCategoryForm, hindiName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Headline / Subtitle</label>
                  <input
                    type="text"
                    value={editSubCategoryForm.headline}
                    onChange={(e) => setEditSubCategoryForm({ ...editSubCategoryForm, headline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editSubCategoryForm.description}
                    onChange={(e) => setEditSubCategoryForm({ ...editSubCategoryForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>

                {/* Banner Images (Upload + Preset) */}
                <div>
                  <label className="font-bold text-[#231F20] block mb-1">
                    Banner Images (Upload up to 5+ Photos for Slideshow)
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-[#8C201C]/40 bg-[#FFF9F3] text-xs font-bold text-[#8C201C] hover:bg-[#FFF0E6] cursor-pointer transition-all">
                      <UploadCloud className="w-4 h-4 text-[#8C201C]" />
                      <span>{isUploadingImage ? "Uploading banners..." : "📁 Upload Banner Images from Device"}</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleSubCategoryImagesUpload(e, true)}
                        disabled={isUploadingImage}
                        className="hidden"
                      />
                    </label>

                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setEditSubCategoryForm({
                            ...editSubCategoryForm,
                            heroImages: [...editSubCategoryForm.heroImages, e.target.value],
                            heroImage: editSubCategoryForm.heroImage || e.target.value,
                          });
                        }
                      }}
                      className="w-full sm:w-auto px-3 py-3 text-xs bg-[#FFF9F3] rounded-2xl border border-[#EFE7DD] font-semibold text-[#231F20]"
                    >
                      <option value="">+ Add Preset Banner</option>
                      <option value="/achaar-clean.png">Achar Jar (/achaar-clean.png)</option>
                      <option value="/makh1-clean.png">Makhana Bowl (/makh1-clean.png)</option>
                      <option value="/heros2.png">Hero Jar Pack (/heros2.png)</option>
                      <option value="/h3.png">Ceramic Martaban (/h3.png)</option>
                      <option value="/h4.png">Crisp Makhana (/h4.png)</option>
                      <option value="/slide4.png">Lotus &amp; Makhana (/slide4.png)</option>
                      <option value="/slide5.png">Pickle Trio (/slide5.png)</option>
                    </select>
                  </div>

                  {/* Uploaded Banner Images Preview */}
                  {editSubCategoryForm.heroImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                      {editSubCategoryForm.heroImages.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative rounded-2xl border border-[#EFE7DD] bg-[#FFF9F3] p-2 flex flex-col items-center group shadow-2xs"
                        >
                          <div className="relative w-full aspect-video rounded-xl bg-white overflow-hidden border border-[#EFE7DD] mb-1.5">
                            <Image
                              src={img}
                              alt={`Banner ${idx + 1}`}
                              fill
                              className="object-contain p-1"
                              unoptimized
                            />
                          </div>
                          <div className="flex items-center justify-between w-full px-1">
                            <span className="text-[9px] font-bold text-[#8C201C]">
                              {idx === 0 ? "★ Primary Cover" : `Slide ${idx + 1}`}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setEditSubCategoryForm({
                                  ...editSubCategoryForm,
                                  heroImages: editSubCategoryForm.heroImages.filter((_, i) => i !== idx),
                                  heroImage: editSubCategoryForm.heroImages.filter((_, i) => i !== idx)[0] || "",
                                })
                              }
                              className="text-[10px] text-red-500 hover:text-red-700 font-bold p-0.5 cursor-pointer"
                              title="Remove image"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Banner Layout: Image Position & Text Alignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#FFF9F3] p-3.5 rounded-2xl border border-[#EFE7DD]">
                  <div>
                    <label className="font-bold text-[#231F20] block mb-1.5">
                      🖼️ Banner Image Layout
                    </label>
                    <select
                      value={editSubCategoryForm.imagePosition}
                      onChange={(e) => {
                        const pos = e.target.value as "left" | "right";
                        setEditSubCategoryForm({
                          ...editSubCategoryForm,
                          imagePosition: pos,
                          textAlign: pos === "left" ? "right" : "left",
                        });
                      }}
                      className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-[#EFE7DD] text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    >
                      <option value="right">Image on Right (Text on Left)</option>
                      <option value="left">Image on Left (Text on Right)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#231F20] block mb-1.5">
                      ✍️ Text &amp; Badges Alignment
                    </label>
                    <select
                      value={editSubCategoryForm.textAlign}
                      onChange={(e) =>
                        setEditSubCategoryForm({
                          ...editSubCategoryForm,
                          textAlign: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 text-xs font-semibold bg-white rounded-xl border border-[#EFE7DD] text-[#231F20] focus:outline-none focus:border-[#8C201C]"
                    >
                      <option value="left">Left Aligned</option>
                      <option value="right">Right Aligned</option>
                    </select>
                  </div>

                  {/* Conflict Alert */}
                  {editSubCategoryForm.imagePosition === "right" && editSubCategoryForm.textAlign === "right" && (
                    <div className="sm:col-span-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl font-bold">
                      ⚠️ Conflict: Image is on the Right side. Please select Left for Text Alignment.
                    </div>
                  )}

                  {editSubCategoryForm.imagePosition === "left" && editSubCategoryForm.textAlign === "left" && (
                    <div className="sm:col-span-2 p-2.5 bg-red-50 border border-red-200 text-red-700 text-[11px] rounded-xl font-bold">
                      ⚠️ Conflict: Image is on the Left side. Please select Right for Text Alignment.
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-bold text-[#231F20] block mb-1">Highlights (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Handcrafted, Sun-Cured In Ceramic Martaban"
                    value={editSubCategoryForm.highlights}
                    onChange={(e) => setEditSubCategoryForm({ ...editSubCategoryForm, highlights: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EFE7DD] bg-[#FFF9F3]"
                  />
                </div>
              </div>

              {/* Fixed Footer */}
              <div className="px-6 py-4 border-t border-[#EFE7DD] bg-[#FFF9F3] flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditSubCategoryOpen(false);
                    setEditingSubCategory(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#EFE7DD] font-bold text-xs text-[#555555] hover:bg-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#8C201C] text-white font-bold text-xs shadow-md hover:bg-[#6B1815] transition-all active:scale-95 cursor-pointer"
                >
                  Update Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
