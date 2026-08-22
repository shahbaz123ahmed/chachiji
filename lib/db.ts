import fs from "fs";
import path from "path";
import { Product, CategoryInfo, SubCategoryInfo, Order, HeroConfig, AboutConfig, HeroSlideItem } from "@/types/ecommerce";
import { CATEGORIES as INITIAL_CATEGORIES } from "@/data/categories";
import { getMongoDb, isMongoConfigured } from "./mongodb";

const DB_DIR = path.join(process.cwd(), "data", "db");
const PRODUCTS_FILE = path.join(DB_DIR, "products.json");
const CATEGORIES_FILE = path.join(DB_DIR, "categories.json");
const SUBCATEGORIES_FILE = path.join(DB_DIR, "subcategories.json");
const ORDERS_FILE = path.join(DB_DIR, "orders.json");
const HERO_FILE = path.join(DB_DIR, "hero.json");
const ABOUT_FILE = path.join(DB_DIR, "about.json");

// ----------------- MONGODB CLOUD SYNC HELPERS -----------------
async function saveToMongo(collectionName: string, items: any, isSingleDocument = false) {
  if (!isMongoConfigured) return;
  try {
    const db = await getMongoDb();
    if (!db) return;

    if (isSingleDocument) {
      await db.collection("settings").replaceOne(
        { _id: collectionName as any },
        { _id: collectionName as any, ...items },
        { upsert: true }
      );
    } else if (Array.isArray(items)) {
      const col = db.collection(collectionName);
      if (items.length === 0) {
        await col.deleteMany({});
      } else {
        const bulkOps = items.map((item) => ({
          replaceOne: {
            filter: { id: item.id || item.slug },
            replacement: item,
            upsert: true,
          },
        }));
        await col.bulkWrite(bulkOps);
        const validIds = items.map((i) => i.id || i.slug).filter(Boolean);
        await col.deleteMany({ id: { $nin: validIds } });
      }
    }
  } catch (err) {
    console.error(`MongoDB sync error for ${collectionName}:`, err);
  }
}

let hasInitializedFromMongo = false;
export async function initMongoSync() {
  if (!isMongoConfigured || hasInitializedFromMongo) return;
  try {
    const db = await getMongoDb();
    if (!db) return;
    hasInitializedFromMongo = true;

    // 1. Products
    const dbProducts = await db.collection("products").find({}).toArray();
    if (dbProducts.length > 0) {
      const clean = dbProducts.map(({ _id, ...rest }) => rest);
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(clean, null, 2), "utf8");
    } else {
      const local = getProducts();
      if (local.length > 0) saveToMongo("products", local);
    }

    // 2. Categories
    const dbCategories = await db.collection("categories").find({}).toArray();
    if (dbCategories.length > 0) {
      const clean = dbCategories.map(({ _id, ...rest }) => rest);
      fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(clean, null, 2), "utf8");
    } else {
      const local = getCategories();
      if (local.length > 0) saveToMongo("categories", local);
    }

    // 3. Subcategories
    const dbSubCategories = await db.collection("subcategories").find({}).toArray();
    if (dbSubCategories.length > 0) {
      const clean = dbSubCategories.map(({ _id, ...rest }) => rest);
      fs.writeFileSync(SUBCATEGORIES_FILE, JSON.stringify(clean, null, 2), "utf8");
    } else {
      const local = getSubCategories();
      if (local.length > 0) saveToMongo("subcategories", local);
    }

    // 4. Hero Settings
    const dbHero = await db.collection("settings").findOne({ _id: "hero" as any });
    if (dbHero) {
      const { _id, ...clean } = dbHero;
      fs.writeFileSync(HERO_FILE, JSON.stringify(clean, null, 2), "utf8");
    } else {
      const local = getHeroConfig();
      saveToMongo("hero", local, true);
    }

    // 5. About Settings
    const dbAbout = await db.collection("settings").findOne({ _id: "about" as any });
    if (dbAbout) {
      const { _id, ...clean } = dbAbout;
      fs.writeFileSync(ABOUT_FILE, JSON.stringify(clean, null, 2), "utf8");
    } else {
      const local = getAboutConfig();
      saveToMongo("about", local, true);
    }
  } catch (err) {
    console.error("Error during initial MongoDB sync:", err);
  }
}

const DEFAULT_ABOUT_CONFIG: AboutConfig = {
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
    },
    {
      id: "about-slide-2",
      image: "/commitment-v3.png",
      badge: "Pure Traditional Heritage",
      headingPrimary: "Sun-Cured In Martabans.",
      headingSecondary: "Stone-Crushed Spices.",
      subtitle: "Whole spices stone-crushed on traditional sil-batta and sun-cured in porcelain martabans with pure cold-pressed oil.",
      primaryBtnText: "Explore Mithila Makhana",
      primaryBtnLink: "/shop/makhana",
      secondaryBtnText: "Read Quality Promise",
      secondaryBtnLink: "/about#process",
      imagePosition: "left",
      textAlign: "right",
      hideText: false,
    }
  ]
};

const DEFAULT_HERO_CONFIG: HeroConfig = {
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
    },
    {
      id: "slide-2",
      image: "/h3.png",
      badge: "Sun-Cured In Earthen Martabans",
      headingPrimary: "Pure Desi Flavours.",
      headingSecondary: "Preserved Naturally.",
      subtitle: "Aged slowly under golden sunshine with cold-pressed mustard oil and hand-ground spices.",
      primaryBtnText: "Explore Pickles",
      primaryBtnLink: "/shop/achar",
      secondaryBtnText: "Why Sun-Cured?",
      secondaryBtnLink: "/about",
      imagePosition: "left",
      textAlign: "right",
      hideText: false,
    },
    {
      id: "slide-3",
      image: "/h4.png",
      badge: "GI-Tagged Mithila Sourcing",
      headingPrimary: "Jumbo Fox Nuts.",
      headingSecondary: "Crisp & Nutrient-Rich.",
      subtitle: "Popped from pristine lotus wetlands of Bihar and roasted in pure A2 Desi Cow Ghee.",
      primaryBtnText: "Shop Makhana",
      primaryBtnLink: "/shop/makhana",
      secondaryBtnText: "Discover Benefits",
      secondaryBtnLink: "/about",
      imagePosition: "right",
      textAlign: "left",
      hideText: false,
    }
  ]
};

function ensureDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2), "utf8");
  }

  if (!fs.existsSync(CATEGORIES_FILE)) {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(INITIAL_CATEGORIES, null, 2), "utf8");
  }

  if (!fs.existsSync(SUBCATEGORIES_FILE)) {
    fs.writeFileSync(SUBCATEGORIES_FILE, JSON.stringify([], null, 2), "utf8");
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf8");
  }

  if (!fs.existsSync(HERO_FILE)) {
    fs.writeFileSync(HERO_FILE, JSON.stringify(DEFAULT_HERO_CONFIG, null, 2), "utf8");
  }
}

// ----------------- PRODUCTS -----------------
export function getProducts(): Product[] {
  ensureDb();
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
}

export function saveProducts(products: Product[]): boolean {
  ensureDb();
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf8");
    saveToMongo("products", products);
    return true;
  } catch (error) {
    console.error("Error saving products:", error);
    return false;
  }
}

export function addProduct(product: Product): Product {
  const products = getProducts();
  products.unshift(product);
  saveProducts(products);
  return product;
}

export function updateProduct(id: string, updatedFields: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...updatedFields };
  saveProducts(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}

// ----------------- CATEGORIES -----------------
export function getCategories(): CategoryInfo[] {
  ensureDb();
  try {
    const data = fs.readFileSync(CATEGORIES_FILE, "utf8");
    const parsed: CategoryInfo[] = JSON.parse(data);
    return parsed.map((cat) => ({
      ...cat,
      imagePosition: cat.imagePosition === "left" ? "left" : "right",
      textAlign: cat.textAlign === "right" ? "right" : "left",
    }));
  } catch (error) {
    console.error("Error reading categories:", error);
    return [];
  }
}

export function saveCategories(categories: CategoryInfo[]): boolean {
  ensureDb();
  try {
    const normalized = categories.map((cat) => ({
      ...cat,
      imagePosition: cat.imagePosition === "left" ? "left" : "right",
      textAlign: cat.textAlign === "right" ? "right" : "left",
    }));
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(normalized, null, 2), "utf8");
    saveToMongo("categories", normalized);
    return true;
  } catch (error) {
    console.error("Error saving categories:", error);
    return false;
  }
}

export function addCategory(category: CategoryInfo): CategoryInfo {
  const categories = getCategories();
  const normalized: CategoryInfo = {
    ...category,
    imagePosition: category.imagePosition === "left" ? "left" : "right",
    textAlign: category.textAlign === "right" ? "right" : "left",
  };
  categories.push(normalized);
  saveCategories(categories);
  return normalized;
}

export function updateCategory(
  id: string,
  updatedFields: Partial<CategoryInfo>
): CategoryInfo | null {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id || c.slug === id);
  if (index === -1) return null;

  const existing = categories[index];
  const updatedCategory: CategoryInfo = {
    ...existing,
    ...updatedFields,
    id: existing.id,
    // Directly use the provided value — no sticky fallback that prevents reverting
    imagePosition: (updatedFields.imagePosition === "left" || updatedFields.imagePosition === "right")
      ? updatedFields.imagePosition
      : (existing.imagePosition === "left" ? "left" : "right"),
    textAlign: (updatedFields.textAlign === "left" || updatedFields.textAlign === "right")
      ? updatedFields.textAlign
      : (existing.textAlign === "right" ? "right" : "left"),
  };

  categories[index] = updatedCategory;
  saveCategories(categories);
  return updatedCategory;
}

export function deleteCategory(id: string): boolean {
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id && c.slug !== id);
  if (filtered.length === categories.length) return false;
  saveCategories(filtered);
  return true;
}

// ----------------- SUBCATEGORIES -----------------
export function getSubCategories(): SubCategoryInfo[] {
  ensureDb();
  try {
    const data = fs.readFileSync(SUBCATEGORIES_FILE, "utf8");
    const parsed: SubCategoryInfo[] = JSON.parse(data);
    return parsed.map((s) => ({
      ...s,
      imagePosition: s.imagePosition === "left" ? "left" : "right",
      textAlign: s.textAlign === "right" ? "right" : "left",
      heroImages: Array.isArray(s.heroImages) ? s.heroImages : s.heroImage ? [s.heroImage] : [],
      highlights: Array.isArray(s.highlights) ? s.highlights : [],
    }));
  } catch (error) {
    console.error("Error reading subcategories:", error);
    return [];
  }
}

export function saveSubCategories(subcategories: SubCategoryInfo[]): boolean {
  ensureDb();
  try {
    const normalized = subcategories.map((s) => ({
      ...s,
      imagePosition: s.imagePosition === "left" ? "left" : "right",
      textAlign: s.textAlign === "right" ? "right" : "left",
      heroImages: Array.isArray(s.heroImages) ? s.heroImages : s.heroImage ? [s.heroImage] : [],
      highlights: Array.isArray(s.highlights) ? s.highlights : [],
    }));
    fs.writeFileSync(SUBCATEGORIES_FILE, JSON.stringify(normalized, null, 2), "utf8");
    saveToMongo("subcategories", normalized);
    return true;
  } catch (error) {
    console.error("Error saving subcategories:", error);
    return false;
  }
}

export function addSubCategory(subcategory: SubCategoryInfo): SubCategoryInfo {
  const subcategories = getSubCategories();
  const normalized: SubCategoryInfo = {
    ...subcategory,
    imagePosition: subcategory.imagePosition === "left" ? "left" : "right",
    textAlign: subcategory.textAlign === "right" ? "right" : "left",
    heroImages: Array.isArray(subcategory.heroImages) ? subcategory.heroImages : subcategory.heroImage ? [subcategory.heroImage] : [],
    highlights: Array.isArray(subcategory.highlights) ? subcategory.highlights : [],
  };
  subcategories.push(normalized);
  saveSubCategories(subcategories);
  return normalized;
}

export function updateSubCategory(
  id: string,
  updatedFields: Partial<SubCategoryInfo>
): SubCategoryInfo | null {
  const subcategories = getSubCategories();
  const index = subcategories.findIndex((s) => s.id === id);
  if (index === -1) return null;

  const existing = subcategories[index];
  const updated: SubCategoryInfo = {
    ...existing,
    ...updatedFields,
    id: existing.id,
    // Directly use the provided value — no sticky fallback that prevents reverting
    imagePosition: (updatedFields.imagePosition === "left" || updatedFields.imagePosition === "right")
      ? updatedFields.imagePosition
      : (existing.imagePosition === "left" ? "left" : "right"),
    textAlign: (updatedFields.textAlign === "left" || updatedFields.textAlign === "right")
      ? updatedFields.textAlign
      : (existing.textAlign === "right" ? "right" : "left"),
  };

  subcategories[index] = updated;
  saveSubCategories(subcategories);
  return updated;
}

export function deleteSubCategory(id: string): boolean {
  const subcategories = getSubCategories();
  const filtered = subcategories.filter((s) => s.id !== id);
  if (filtered.length === subcategories.length) return false;
  saveSubCategories(filtered);
  return true;
}

// ----------------- ORDERS -----------------
export function getOrders(): Order[] {
  ensureDb();
  try {
    const data = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading orders:", error);
    return [];
  }
}

export function saveOrders(orders: Order[]): boolean {
  ensureDb();
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
    saveToMongo("orders", orders);
    return true;
  } catch (error) {
    console.error("Error saving orders:", error);
    return false;
  }
}

export function addOrder(order: Order): Order {
  const orders = getOrders();
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

export function updateOrderStatus(id: string, status: Order["status"]): Order | null {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  orders[index] = { ...orders[index], status };
  saveOrders(orders);
  return orders[index];
}

export function deleteOrder(id: string): boolean {
  const orders = getOrders();
  const filtered = orders.filter((o) => o.id !== id);
  if (filtered.length === orders.length) return false;
  saveOrders(filtered);
  return true;
}

// ----------------- HOMEPAGE HERO BANNER -----------------
export function normalizeHeroConfig(raw: any): HeroConfig {
  if (!raw || typeof raw !== "object") return DEFAULT_HERO_CONFIG;

  if (Array.isArray(raw.slides) && raw.slides.length > 0) {
    const normalizedSlides: HeroSlideItem[] = raw.slides.map((item: any, idx: number) => {
      if (typeof item === "string") {
        return {
          id: `slide-${idx + 1}`,
          image: item,
          badge: raw.badge || "Mithila Culinary Heritage • 100% Traditional",
          headingPrimary: raw.headingPrimary || "Crafted by Heart.",
          headingSecondary: raw.headingSecondary || "Rooted in Tradition.",
          subtitle: raw.subtitle || "Authentic handcrafted flavours from the heart of India.",
          primaryBtnText: raw.primaryBtnText || "Shop Our Flavours",
          primaryBtnLink: raw.primaryBtnLink || "/shop",
          secondaryBtnText: raw.secondaryBtnText || "Our Heritage Story",
          secondaryBtnLink: raw.secondaryBtnLink || "/about",
          imagePosition: raw.imagePosition === "left" || raw.imagePosition === "center" ? raw.imagePosition : "right",
          textAlign: raw.textAlign === "right" ? "right" : "left",
          hideText: Boolean(raw.hideText),
        };
      }
      return {
        id: item.id || `slide-${idx + 1}-${Date.now()}`,
        image: item.image || "/heros2.png",
        badge: item.badge || "",
        headingPrimary: item.headingPrimary || "Crafted by Heart.",
        headingSecondary: item.headingSecondary || "Rooted in Tradition.",
        subtitle: item.subtitle || "",
        primaryBtnText: item.primaryBtnText || "Shop Our Flavours",
        primaryBtnLink: item.primaryBtnLink || "/shop",
        secondaryBtnText: item.secondaryBtnText || "",
        secondaryBtnLink: item.secondaryBtnLink || "",
        imagePosition: item.imagePosition === "left" ? "left" : "right",
        textAlign: item.textAlign === "right" ? "right" : "left",
      };
    });

    return { slides: normalizedSlides };
  }

  return DEFAULT_HERO_CONFIG;
}

export function getHeroConfig(): HeroConfig {
  ensureDb();
  try {
    if (fs.existsSync(HERO_FILE)) {
      const data = fs.readFileSync(HERO_FILE, "utf8");
      const parsed = JSON.parse(data);
      return normalizeHeroConfig(parsed);
    }
  } catch (error) {
    console.error("Error reading hero config:", error);
  }
  return DEFAULT_HERO_CONFIG;
}

export function saveHeroConfig(config: HeroConfig): boolean {
  ensureDb();
  try {
    const normalized = normalizeHeroConfig(config);
    fs.writeFileSync(HERO_FILE, JSON.stringify(normalized, null, 2), "utf8");
    saveToMongo("hero", normalized, true);
    return true;
  } catch (error) {
    console.error("Error saving hero config:", error);
    return false;
  }
}

// ----------------- ABOUT US HERO BANNER -----------------
export function normalizeAboutConfig(raw: any): AboutConfig {
  if (!raw || typeof raw !== "object") return DEFAULT_ABOUT_CONFIG;

  if (Array.isArray(raw.slides) && raw.slides.length > 0) {
    const normalizedSlides: HeroSlideItem[] = raw.slides.map((item: any, idx: number) => {
      if (typeof item === "string") {
        return {
          id: `about-slide-${idx + 1}`,
          image: item,
          badge: raw.badge || "Our Roots in Vaishali, Bihar",
          headingPrimary: raw.headingPrimary || "Crafted by Heart.",
          headingSecondary: raw.headingSecondary || "Ground by Hand.",
          subtitle: raw.subtitle || "Chachiji was born from an unwavering devotion to the authentic tastes of home.",
          primaryBtnText: raw.primaryBtnText || "Explore Our Heritage Jars",
          primaryBtnLink: raw.primaryBtnLink || "/shop/achar",
          secondaryBtnText: raw.secondaryBtnText || "Our Story & Vision",
          secondaryBtnLink: raw.secondaryBtnLink || "/about#story",
          imagePosition: raw.imagePosition === "left" || raw.imagePosition === "center" ? raw.imagePosition : "right",
          textAlign: raw.textAlign === "right" ? "right" : "left",
          hideText: Boolean(raw.hideText),
        };
      }
      return {
        id: item.id || `about-slide-${idx + 1}-${Date.now()}`,
        image: item.image || "/about-hero-v2.png",
        badge: item.badge || "",
        headingPrimary: item.headingPrimary || "Crafted by Heart.",
        headingSecondary: item.headingSecondary || "Ground by Hand.",
        subtitle: item.subtitle || "",
        primaryBtnText: item.primaryBtnText || "Explore Our Heritage Jars",
        primaryBtnLink: item.primaryBtnLink || "/shop/achar",
        secondaryBtnText: item.secondaryBtnText || "",
        secondaryBtnLink: item.secondaryBtnLink || "",
        imagePosition: item.imagePosition === "left" ? "left" : "right",
        textAlign: item.textAlign === "right" ? "right" : "left",
        hideText: Boolean(item.hideText),
      };
    });

    return { slides: normalizedSlides };
  }

  return DEFAULT_ABOUT_CONFIG;
}

export function getAboutConfig(): AboutConfig {
  ensureDb();
  try {
    if (fs.existsSync(ABOUT_FILE)) {
      const data = fs.readFileSync(ABOUT_FILE, "utf8");
      const parsed = JSON.parse(data);
      return normalizeAboutConfig(parsed);
    }
  } catch (error) {
    console.error("Error reading about config:", error);
  }
  return DEFAULT_ABOUT_CONFIG;
}

export function saveAboutConfig(config: AboutConfig): boolean {
  ensureDb();
  try {
    const normalized = normalizeAboutConfig(config);
    fs.writeFileSync(ABOUT_FILE, JSON.stringify(normalized, null, 2), "utf8");
    saveToMongo("about", normalized, true);
    return true;
  } catch (error) {
    console.error("Error saving about config:", error);
    return false;
  }
}

