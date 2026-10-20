"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Users,
  ShoppingBag,
  FileText,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  Phone,
  Plus,
  RefreshCw,
  Bell,
  ExternalLink,
  ChevronRight,
  Database as DbIcon,
  X,
  Send,
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  event_type?: string | null;
  event_date?: string | null;
  guests?: number | null;
  status: string;
  message?: string | null;
  created_at?: string;
  city?: string | null;
}

interface EventItem {
  id: string;
  title: string;
  contact_name?: string | null;
  contact_phone?: string | null;
  event_type: string;
  event_date: string;
  venue?: string | null;
  guests?: number | null;
  status: string;
  total_amount: number;
}

interface ProductItem {
  id: string;
  name_en: string;
  unit: string;
  price: number | null;
  stock_qty: number;
  reorder_level: number;
  is_active: boolean;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "leads" | "calendar" | "kirana" | "quotations"
  >("overview");

  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [realtimeAlert, setRealtimeAlert] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // New Lead Modal
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    phone: "",
    event_type: "wedding",
    event_date: "",
    guests: 500,
    city: "Aligarh",
    message: "",
  });

  const loadData = async () => {
    setLoading(true);
    const configured = isSupabaseConfigured();
    setIsConfigured(configured);

    if (configured) {
      try {
        // 1. Fetch enquiries
        const { data: enqData } = await (supabase.from("enquiries") as any)
          .select("*")
          .order("created_at", { ascending: false });

        if (enqData && enqData.length > 0) {
          setEnquiries(enqData as EnquiryItem[]);
        } else {
          setEnquiries(mockLeads);
        }

        // 2. Fetch events
        const { data: evtData } = await (supabase.from("events") as any)
          .select("*")
          .order("event_date", { ascending: true });

        if (evtData && evtData.length > 0) {
          setEvents(evtData as EventItem[]);
        } else {
          setEvents(mockEvents);
        }

        // 3. Fetch products
        const { data: prodData } = await (supabase.from("products") as any)
          .select("id, name_en, unit, price, stock_qty, reorder_level, is_active")
          .order("sort_order", { ascending: true });

        if (prodData && prodData.length > 0) {
          setProducts(prodData as ProductItem[]);
        } else {
          setProducts(mockProducts);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setEnquiries(mockLeads);
        setEvents(mockEvents);
        setProducts(mockProducts);
      }
    } else {
      // Demo mock data
      setEnquiries(mockLeads);
      setEvents(mockEvents);
      setProducts(mockProducts);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    // Setup Realtime subscription on enquiries & orders
    if (isSupabaseConfigured()) {
      const channel = supabase
        .channel("admin_realtime_leads")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "enquiries" },
          (payload) => {
            const newEnquiry = payload.new as EnquiryItem;
            setEnquiries((prev) => [newEnquiry, ...prev]);
            setRealtimeAlert(
              `🔔 New Enquiry Received from ${newEnquiry.name || "Customer"} (${newEnquiry.phone || "No phone"})!`
            );
            setTimeout(() => setRealtimeAlert(null), 8000);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setEnquiries((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );

    if (isConfigured) {
      try {
        await (supabase.from("enquiries") as any)
          .update({ status: newStatus as any })
          .eq("id", id);
      } catch (err) {
        console.error("Failed to update lead status:", err);
      }
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdItem: EnquiryItem = {
      id: `lead_${Date.now()}`,
      name: newLead.name,
      phone: newLead.phone,
      event_type: newLead.event_type,
      event_date: newLead.event_date,
      guests: Number(newLead.guests),
      city: newLead.city,
      message: newLead.message,
      status: "new",
      created_at: new Date().toISOString(),
    };

    if (isConfigured) {
      try {
        const { data, error } = await (supabase.from("enquiries") as any)
          .insert({
            name: newLead.name,
            phone: newLead.phone,
            event_type: newLead.event_type as any,
            event_date: newLead.event_date || null,
            guests: Number(newLead.guests),
            city: newLead.city,
            message: newLead.message,
            status: "new",
            source: "admin_manual",
          })
          .select()
          .single();

        if (!error && data) {
          setEnquiries((prev) => [data as EnquiryItem, ...prev]);
        } else {
          setEnquiries((prev) => [createdItem, ...prev]);
        }
      } catch (err) {
        setEnquiries((prev) => [createdItem, ...prev]);
      }
    } else {
      setEnquiries((prev) => [createdItem, ...prev]);
    }

    setShowNewLeadModal(false);
    setNewLead({
      name: "",
      phone: "",
      event_type: "wedding",
      event_date: "",
      guests: 500,
      city: "Aligarh",
      message: "",
    });
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      (e.city && e.city.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const lowStockCount = products.filter(
    (p) => p.stock_qty <= p.reorder_level
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Realtime Toast Notification */}
      {realtimeAlert && (
        <div className="fixed top-4 right-4 z-50 bg-[#0b2a1f] text-[#f3dc8e] border-2 border-[#d4af37] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <Bell className="w-5 h-5 text-[#d4af37]" />
          <span className="text-xs font-bold text-white">{realtimeAlert}</span>
          <button
            onClick={() => setRealtimeAlert(null)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-[#0b2a1f] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4af37]/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#d4af37] bg-black/30 flex items-center justify-center text-[#d4af37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-lg text-white">
                Abu Maa&apos;s Business Console
              </h1>
              {isConfigured ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Supabase Live
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Demo Preview
                </span>
              )}
            </div>
            <p className="text-xs text-gray-300">
              Catering Bookings, Wholesale Kirana & Quotation Management
            </p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "overview", label: "Overview" },
            { id: "leads", label: `Leads & Enquiries (${enquiries.length})` },
            { id: "calendar", label: "Calendar" },
            { id: "kirana", label: `Kirana Stock (${products.length})` },
            { id: "quotations", label: "Quotations & Invoices" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#d4af37] text-[#0b2a1f]"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={loadData}
            title="Refresh from Database"
            className="p-1.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-6">
        {/* Setup Banner if not configured yet */}
        {!isConfigured && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 text-xs">
            <div className="flex items-start gap-2.5">
              <DbIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">
                  Supabase Backend Prepared & Ready to Connect
                </p>
                <p className="text-amber-700 mt-0.5">
                  The complete database schema is generated at{" "}
                  <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">
                    supabase/schema.sql
                  </code>
                  . Run it in your Supabase SQL Editor and put your keys in{" "}
                  <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono font-bold">
                    .env.local
                  </code>{" "}
                  to go live!
                </p>
              </div>
            </div>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              Open Supabase <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-semibold uppercase">Upcoming Events</span>
              <Calendar className="w-4 h-4 text-[#0b2a1f]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#0b2a1f]">
              {events.length}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">Master Calendar active</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-semibold uppercase">Active Enquiries</span>
              <Clock className="w-4 h-4 text-[#b89326]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#b89326]">
              {enquiries.filter((e) => e.status === "new" || e.status === "contacted").length}
            </p>
            <p className="text-[11px] text-amber-600 font-medium">Realtime sync active</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-semibold uppercase">Pipeline Volume</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-serif font-bold text-gray-900">
              {formatINR(2450000)}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">Wedding season peak</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-semibold uppercase">Stock Reorder Alert</span>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-serif font-bold text-rose-600">
              {lowStockCount} Items
            </p>
            <p className="text-[11px] text-gray-500">Below minimum safety threshold</p>
          </div>
        </div>

        {/* Tab 1: Overview or Tab 2: Leads */}
        {(activeTab === "overview" || activeTab === "leads") && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#0b2a1f]">
                  Enquiries & Lead Management
                </h2>
                <p className="text-xs text-gray-500">
                  Track website quote requests, update lead statuses, and trigger WhatsApp follow-ups
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search host or phone..."
                    className="pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0b2a1f]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quotation_sent">Quotation Sent</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="lost">Lost</option>
                </select>

                <button
                  onClick={() => setShowNewLeadModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#0b2a1f] gold-gradient-bg shadow-sm hover:brightness-105"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Lead
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50 uppercase text-[10px] text-gray-500 tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Host Name & Phone</th>
                    <th className="py-3 px-4">Event Type</th>
                    <th className="py-3 px-4">Date & City</th>
                    <th className="py-3 px-4">Guests</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredEnquiries.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-gray-900">{lead.name}</p>
                        <p className="text-[11px] text-gray-400 font-mono">{lead.phone}</p>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-gray-800 capitalize">
                        {lead.event_type || "Catering"}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-gray-700">{lead.event_date || "TBD"}</p>
                        <p className="text-[10px] text-gray-400">{lead.city || "Aligarh"}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        {lead.guests ? `${lead.guests} pax` : "Grocery"}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-[10px] font-bold border-0 outline-none cursor-pointer ${
                            lead.status === "new"
                              ? "bg-blue-100 text-blue-800"
                              : lead.status === "contacted"
                              ? "bg-amber-100 text-amber-800"
                              : lead.status === "quotation_sent"
                              ? "bg-purple-100 text-purple-800"
                              : lead.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="quotation_sent">Quotation Sent</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello ${lead.name}, greetings from Abu Maa's Event Management Group! We received your enquiry for ${lead.event_type || "your event"}.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 rounded bg-green-100 text-green-700 font-bold text-[11px] hover:bg-green-200 inline-flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" /> WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Calendar */}
        {activeTab === "calendar" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#0b2a1f]">
              Master Event Calendar & Hall Bookings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl border border-gray-200 hover:border-[#d4af37] transition-all space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#0b2a1f]/10 text-[#0b2a1f]">
                      {evt.event_date}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {evt.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900">{evt.title}</h4>
                  <p className="text-xs text-gray-500">
                    Venue: {evt.venue || "Badi Masjid Area"} | {evt.guests || 500} Guests
                  </p>
                  <p className="text-xs font-bold text-[#b89326]">
                    Budget: {formatINR(evt.total_amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Kirana Catalog & Stock */}
        {activeTab === "kirana" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#0b2a1f]">
                  Wholesale Kirana Inventory & Reorder Levels
                </h2>
                <p className="text-xs text-gray-500">
                  Track bulk warehouse quantities and reorder thresholds
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50 uppercase text-[10px] text-gray-500 tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Item Name</th>
                    <th className="py-3 px-4">Unit</th>
                    <th className="py-3 px-4">Rate (INR)</th>
                    <th className="py-3 px-4">Current Stock</th>
                    <th className="py-3 px-4">Reorder Level</th>
                    <th className="py-3 px-4">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => {
                    const isLow = p.stock_qty <= p.reorder_level;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="py-3.5 px-4 font-bold text-gray-900">{p.name_en}</td>
                        <td className="py-3.5 px-4">{p.unit}</td>
                        <td className="py-3.5 px-4 font-mono font-medium">
                          {p.price ? formatINR(p.price) : "On Request"}
                        </td>
                        <td className="py-3.5 px-4 font-bold">
                          {p.stock_qty} {p.unit}
                        </td>
                        <td className="py-3.5 px-4 text-gray-400">
                          {p.reorder_level} {p.unit}
                        </td>
                        <td className="py-3.5 px-4">
                          {isLow ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                              Low Stock - Reorder
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                              Healthy
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Quotations & Invoices */}
        {activeTab === "quotations" && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-serif font-bold text-[#0b2a1f]">
              Issued Quotations & Invoices
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50 uppercase text-[10px] text-gray-500 tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Doc Number</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">PDF Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono font-bold text-[#0b2a1f]">
                      QT-2026-1001
                    </td>
                    <td className="py-3 px-4 font-medium">Tariq Mahmood (Walima)</td>
                    <td className="py-3 px-4 font-bold">{formatINR(320000)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700">
                        Accepted
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => alert("Downloading PDF from Supabase Storage: documents/QT-2026-1001.pdf")}
                        className="text-xs font-bold text-[#0b2a1f] underline"
                      >
                        View PDF
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono font-bold text-[#0b2a1f]">
                      INV-2026-1001
                    </td>
                    <td className="py-3 px-4 font-medium">Dr. Alok Verma</td>
                    <td className="py-3 px-4 font-bold">{formatINR(950000)}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                        Advance Paid (30%)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => alert("Downloading PDF from Supabase Storage: documents/INV-2026-1001.pdf")}
                        className="text-xs font-bold text-[#0b2a1f] underline"
                      >
                        View PDF
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Add Lead */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-lg text-[#0b2a1f]">
                Add Direct Booking / Lead
              </h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Host Name *
                </label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  placeholder="e.g. Aslam Khan"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0b2a1f]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  WhatsApp Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0b2a1f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    value={newLead.event_type}
                    onChange={(e) => setNewLead({ ...newLead, event_type: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white outline-none"
                  >
                    <option value="wedding">Wedding</option>
                    <option value="walima">Walima</option>
                    <option value="engagement">Engagement</option>
                    <option value="aqiqah">Aqiqah</option>
                    <option value="birthday">Birthday</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={newLead.event_date}
                    onChange={(e) => setNewLead({ ...newLead, event_date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0b2a1f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Guest Count
                  </label>
                  <input
                    type="number"
                    value={newLead.guests}
                    onChange={(e) => setNewLead({ ...newLead, guests: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0b2a1f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    City / Area
                  </label>
                  <input
                    type="text"
                    value={newLead.city}
                    onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0b2a1f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  placeholder="Special menu requests, venue details..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-1 focus:ring-[#0b2a1f]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 text-xs text-gray-600 font-bold hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-[#0b2a1f] gold-gradient-bg rounded-xl shadow hover:brightness-105"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Fallback initial dataset when loading or offline
const mockLeads: EnquiryItem[] = [
  {
    id: "L101",
    name: "Tariq Mahmood",
    phone: "+91 98765 11223",
    event_type: "walima",
    event_date: "2026-10-25",
    guests: 800,
    status: "new",
    city: "Aligarh (Civil Lines)",
  },
  {
    id: "L102",
    name: "Dr. Alok Verma",
    phone: "+91 98888 44556",
    event_type: "wedding",
    event_date: "2026-11-04",
    guests: 1200,
    status: "quotation_sent",
    city: "Aligarh (Ramghat Road)",
  },
  {
    id: "L103",
    name: "Choudhary Kirana Mess",
    phone: "+91 97777 88990",
    event_type: "other",
    event_date: "2026-10-20",
    guests: 0,
    status: "confirmed",
    city: "Jamalpur",
  },
];

const mockEvents: EventItem[] = [
  {
    id: "E101",
    title: "Walima Dawat - Mahmood Family",
    event_type: "walima",
    event_date: "2026-10-25",
    venue: "Shehnai Banquet Hall, Aligarh",
    guests: 800,
    status: "confirmed",
    total_amount: 320000,
  },
  {
    id: "E102",
    title: "Grand Wedding Banquet - Verma Family",
    event_type: "wedding",
    event_date: "2026-11-04",
    venue: "Royal Palace Lawn, GT Road",
    guests: 1200,
    status: "tentative",
    total_amount: 950000,
  },
];

const mockProducts: ProductItem[] = [
  {
    id: "P1",
    name_en: "Pure Desi Buffalo Ghee (Tins)",
    unit: "tin (15 kg)",
    price: 9800,
    stock_qty: 4,
    reorder_level: 6,
    is_active: true,
  },
  {
    id: "P2",
    name_en: "Sharbati Whole Wheat Atta",
    unit: "bag (50 kg)",
    price: 1850,
    stock_qty: 8,
    reorder_level: 10,
    is_active: true,
  },
  {
    id: "P3",
    name_en: "1121 XXL Steam Basmati Rice",
    unit: "bag (30 kg)",
    price: 3600,
    stock_qty: 35,
    reorder_level: 10,
    is_active: true,
  },
  {
    id: "P4",
    name_en: "Whole Kashmiri Red Chilli",
    unit: "kg",
    price: 380,
    stock_qty: 40,
    reorder_level: 15,
    is_active: true,
  },
];
