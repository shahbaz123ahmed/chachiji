"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  ArrowUpRight,
  Sparkles,
  Filter,
  Plus,
  Eye,
  Settings,
  Bell,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "products" | "customers" | "settings">("overview");

  const recentOrders = [
    {
      id: "CH-948210",
      customer: "Ramesh Sharma",
      city: "Patna, Bihar",
      items: "Bharwa Lal Mirch (400g), Raw Makhana (250g)",
      total: 738,
      status: "Processing",
      date: "18 Feb 2026, 11:20 AM",
      payment: "COD",
    },
    {
      id: "CH-948209",
      customer: "Ananya Deshmukh",
      city: "Mumbai, MH",
      items: "Pickle Lover's Heritage 3-Jar Box",
      total: 899,
      status: "Shipped",
      date: "18 Feb 2026, 10:05 AM",
      payment: "UPI",
    },
    {
      id: "CH-948208",
      customer: "Vikram Mehta",
      city: "Bengaluru, KA",
      items: "Everyday Mithila Makhana Trio",
      total: 799,
      status: "Delivered",
      date: "17 Feb 2026, 06:45 PM",
      payment: "Card",
    },
    {
      id: "CH-948207",
      customer: "Pooja Verma",
      city: "New Delhi, DL",
      items: "Traditional Kacha Aam (400g)",
      total: 329,
      status: "Delivered",
      date: "17 Feb 2026, 02:15 PM",
      payment: "UPI",
    },
    {
      id: "CH-948206",
      customer: "Siddharth Jha",
      city: "Darbhanga, Bihar",
      items: "Bihari Oal Jimikand Achar (400g)",
      total: 339,
      status: "Delivered",
      date: "17 Feb 2026, 11:00 AM",
      payment: "COD",
    },
  ];

  const salesTrend = [
    { month: "Sep", sales: 184000, orders: 310 },
    { month: "Oct", sales: 245000, orders: 420 },
    { month: "Nov", sales: 312000, orders: 540 },
    { month: "Dec", sales: 428000, orders: 710 },
    { month: "Jan", sales: 389000, orders: 630 },
    { month: "Feb", sales: 492000, orders: 820 },
  ];

  const maxSales = Math.max(...salesTrend.map((s) => s.sales));

  return (
    <div className="bg-[#FFFFFF] min-h-screen flex flex-col lg:flex-row">
      {/* 1. ADMIN SIDEBAR - 100% Solid Deep Red (#8C201C) */}
      <aside className="w-full lg:w-64 bg-[#8C201C] text-[#FFFFFF] flex flex-col justify-between shrink-0 p-5 lg:min-h-screen border-r border-[#6B1815]">
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#6B1815] mb-6">
            <Link href="/" className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FFFFFF]">
                CHACHIJI
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#E07A4A] font-bold">
                Admin Console
              </span>
            </Link>
            <span className="bg-[#E07A4A] text-[#231F20] text-[9px] font-bold px-2 py-0.5 rounded-md">
              v2.4
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-[#E07A4A] text-[#231F20] shadow-sm font-bold"
                  : "text-[#FFFFFF] hover:bg-[#6B1815]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "orders"
                  ? "bg-[#E07A4A] text-[#231F20] shadow-sm font-bold"
                  : "text-[#FFFFFF] hover:bg-[#6B1815]"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              <span className="bg-[#FFFFFF]/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                18 New
              </span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "products"
                  ? "bg-[#E07A4A] text-[#231F20] shadow-sm font-bold"
                  : "text-[#FFFFFF] hover:bg-[#6B1815]"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products &amp; Batches</span>
            </button>

            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "customers"
                  ? "bg-[#E07A4A] text-[#231F20] shadow-sm font-bold"
                  : "text-[#FFFFFF] hover:bg-[#6B1815]"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                activeTab === "settings"
                  ? "bg-[#E07A4A] text-[#231F20] shadow-sm font-bold"
                  : "text-[#FFFFFF] hover:bg-[#6B1815]"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Kitchen Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-[#6B1815] text-xs text-[#FFFFFF] flex items-center justify-between">
          <div>
            <span className="font-bold block text-white">Vaishali Kitchen Hub</span>
            <span className="text-[10px] text-[#E07A4A] font-bold">Status: Active &amp; Sun-Curing</span>
          </div>
          <Link
            href="/"
            className="p-2 bg-[#6B1815] hover:bg-[#E07A4A] hover:text-[#231F20] rounded-lg text-white transition-colors"
            title="View Live Storefront"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[rgba(51,51,51,0.10)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#8C201C]">
              Dashboard Analytics
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#231F20] mt-0.5">
              Kitchen Performance &amp; Operations
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[rgba(51,51,51,0.12)] text-[#231F20] hover:text-[#8C201C] shadow-2xs relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8C201C]" />
            </button>
            <button className="bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] font-bold text-xs px-5 py-3 rounded-xl shadow-sm flex items-center gap-1.5 transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span>New Batch / Product</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1: Total Revenue */}
          <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#555555] font-bold mb-2">
              <span>February Revenue</span>
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                <ArrowUpRight className="w-3 h-3" /> +26.4%
              </span>
            </div>
            <span className="font-serif text-3xl font-bold text-[#8C201C] block">
              ₹4,92,450
            </span>
            <span className="text-[11px] text-[#777777] font-medium mt-1 block">
              820 orders fulfilled this month
            </span>
          </div>

          {/* Card 2: Active Orders */}
          <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#555555] font-bold mb-2">
              <span>Orders in Pipeline</span>
              <span className="inline-flex items-center text-[10px] font-bold text-[#231F20] bg-[#E07A4A] px-2 py-0.5 rounded-md shadow-2xs">
                18 Pending Dispatch
              </span>
            </div>
            <span className="font-serif text-3xl font-bold text-[#231F20] block">
              42 Orders
            </span>
            <span className="text-[11px] text-[#777777] font-medium mt-1 block">
              Average fulfillment time: 28 hrs
            </span>
          </div>

          {/* Card 3: Curing Batches */}
          <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#555555] font-bold mb-2">
              <span>Sun-Curing Batches</span>
              <span className="inline-flex items-center text-[10px] font-bold text-[#8C201C] bg-[#FFF9F3] px-2 py-0.5 rounded-md border border-[rgba(51,51,51,0.10)]">
                Day 8 of 14
              </span>
            </div>
            <span className="font-serif text-3xl font-bold text-[#8C201C] block">
              14 Martabans
            </span>
            <span className="text-[11px] text-[#777777] font-medium mt-1 block">
              Banarasi Lal Mirch &amp; Raw Mango
            </span>
          </div>

          {/* Card 4: Customer Satisfaction */}
          <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#555555] font-bold mb-2">
              <span>Customer Satisfaction</span>
              <span className="inline-flex items-center text-[10px] font-bold text-[#231F20] bg-amber-200 px-2 py-0.5 rounded-md">
                ★ 4.9 Rating
              </span>
            </div>
            <span className="font-serif text-3xl font-bold text-[#231F20] block">
              98.2%
            </span>
            <span className="text-[11px] text-[#777777] font-medium mt-1 block">
              Based on 1,480 verified reviews
            </span>
          </div>
        </div>

        {/* 2-COLUMN SECTION: CHART + RECENT ORDERS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Revenue Chart Box using Brand Palette */}
          <div className="lg:col-span-7 bg-[#FFFFFF] p-6 sm:p-7 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[rgba(51,51,51,0.10)] pb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#231F20]">
                  6-Month Revenue &amp; Growth
                </h3>
                <span className="text-xs text-[#555555] font-medium">
                  Consistent growth across Achar and GI Mithila Makhana
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-[#8C201C] font-bold">
                  <span className="w-3 h-3 rounded-full bg-[#8C201C]" />
                  Sales (₹)
                </span>
                <span className="flex items-center gap-1.5 text-[#E07A4A] font-bold">
                  <span className="w-3 h-3 rounded-full bg-[#E07A4A]" />
                  Orders
                </span>
              </div>
            </div>

            {/* Custom Bar Chart in solid brand colors */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-6 gap-3 items-end h-44 border-b border-[rgba(51,51,51,0.12)] pb-2">
                {salesTrend.map((item, idx) => {
                  const heightPercent = Math.round((item.sales / maxSales) * 100);
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[10px] font-bold text-[#8C201C] opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{(item.sales / 1000).toFixed(0)}k
                      </div>
                      <div className="w-full max-w-[36px] bg-[#FFF9F3] rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                        <div
                          className="w-full bg-[#8C201C] hover:bg-[#6B1815] rounded-t-lg transition-all"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#231F20]">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Stock & Top Categories */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-6 sm:p-7 rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#231F20] border-b border-[rgba(51,51,51,0.10)] pb-3">
              Top Selling Flavour Categories
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-[#231F20] mb-1">
                  <span>Bharwa Lal Mirch &amp; Mango Achar</span>
                  <span className="text-[#8C201C]">54% (₹2.65L)</span>
                </div>
                <div className="w-full bg-[#FFF9F3] rounded-full h-2.5">
                  <div className="bg-[#8C201C] h-2.5 rounded-full" style={{ width: "54%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#231F20] mb-1">
                  <span>GI-Tagged Mithila Makhana</span>
                  <span className="text-[#8C201C]">28% (₹1.38L)</span>
                </div>
                <div className="w-full bg-[#FFF9F3] rounded-full h-2.5">
                  <div className="bg-[#E07A4A] h-2.5 rounded-full" style={{ width: "28%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#231F20] mb-1">
                  <span>Curated Heritage 3-Jar Gift Boxes</span>
                  <span className="text-[#8C201C]">18% (₹88.5k)</span>
                </div>
                <div className="w-full bg-[#FFF9F3] rounded-full h-2.5">
                  <div className="bg-[#6B1815] h-2.5 rounded-full" style={{ width: "18%" }} />
                </div>
              </div>
            </div>

            <div className="bg-[#FFF9F3] p-4 rounded-2xl border border-[rgba(51,51,51,0.10)] space-y-1">
              <span className="font-bold text-xs text-[#8C201C] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E07A4A]" />
                Low Stock Alert
              </span>
              <p className="text-[11px] text-[#231F20] font-medium">
                Only 12 jars left of <strong>Bihari Oal Jimikand Achar (400g)</strong>. Next batch unlocks from sun-curing on Friday.
              </p>
            </div>
          </div>
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="bg-[#FFFFFF] rounded-3xl border-2 border-[rgba(51,51,51,0.10)] shadow-xs overflow-hidden">
          <div className="p-6 border-b border-[rgba(51,51,51,0.10)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#231F20]">
                Recent Customer Orders
              </h3>
              <span className="text-xs text-[#555555] font-medium">
                Live dispatch requests from website customers
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-xs bg-[#FFF9F3] text-[#231F20] font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-[rgba(51,51,51,0.10)]">
                <Filter className="w-3.5 h-3.5 text-[#8C201C]" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FFF9F3] text-[#8C201C] font-bold border-b border-[rgba(51,51,51,0.10)] uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Items</th>
                  <th className="py-3.5 px-6">Total</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(51,51,51,0.08)]">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FFF9F3]/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-[#8C201C]">
                      {ord.id}
                      <span className="block text-[10px] font-medium text-[#777777]">
                        {ord.date}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-[#231F20] block">{ord.customer}</span>
                      <span className="text-[#555555] text-[11px] font-medium">{ord.city}</span>
                    </td>
                    <td className="py-4 px-6 text-[#231F20] font-medium max-w-xs truncate">
                      {ord.items}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#231F20] text-sm">
                      ₹{ord.total}
                      <span className="block text-[10px] font-medium text-[#777777]">
                        {ord.payment}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          ord.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : ord.status === "Shipped"
                            ? "bg-[#E07A4A] text-[#231F20]"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="bg-[#8C201C] hover:bg-[#6B1815] text-[#FFFFFF] text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors shadow-2xs">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

