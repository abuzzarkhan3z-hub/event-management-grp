"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { formatINR } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "leads" | "calendar" | "kirana" | "quotations"
  >("overview");

  // Sample lead data for pipeline preview
  const leads = [
    {
      id: "L101",
      name: "Tariq Mahmood",
      phone: "+91 98765 11223",
      event: "Walima Dawat",
      date: "25 Oct 2026",
      guests: 800,
      status: "New",
      budget: 600000,
    },
    {
      id: "L102",
      name: "Dr. Alok Verma",
      phone: "+91 98888 44556",
      event: "Wedding Banquet",
      date: "04 Nov 2026",
      guests: 1200,
      status: "Quotation Sent",
      budget: 950000,
    },
    {
      id: "L103",
      name: "Choudhary Kirana Mess",
      phone: "+91 97777 88990",
      event: "Bulk Basmati & Ghee",
      date: "20 Oct 2026",
      guests: 0,
      status: "Confirmed",
      budget: 145000,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#0b2a1f] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d4af37]/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#d4af37] bg-black/30 flex items-center justify-center text-[#d4af37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-white">
              Abu Maaz Business Console
            </h1>
            <p className="text-xs text-gray-300">Phase 2 Management Dashboard (Preview)</p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "overview", label: "Overview" },
            { id: "leads", label: "Leads & Enquiries" },
            { id: "calendar", label: "Calendar" },
            { id: "kirana", label: "Kirana Stock" },
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
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-semibold uppercase">Upcoming Events</span>
              <Calendar className="w-4 h-4 text-[#0b2a1f]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#0b2a1f]">14</p>
            <p className="text-[11px] text-emerald-600 font-medium">3 events this week</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-semibold uppercase">Pending Enquiries</span>
              <Clock className="w-4 h-4 text-[#b89326]" />
            </div>
            <p className="text-2xl font-serif font-bold text-[#b89326]">8</p>
            <p className="text-[11px] text-amber-600 font-medium">5 requiring follow-up</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-semibold uppercase">Oct Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-serif font-bold text-gray-900">{formatINR(2450000)}</p>
            <p className="text-[11px] text-emerald-600 font-medium">+18% vs last month</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-semibold uppercase">Stock Reorder Alert</span>
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-serif font-bold text-rose-600">2 Items</p>
            <p className="text-[11px] text-gray-500">Pure Ghee & Sharbati Atta low</p>
          </div>
        </div>

        {/* Section: Leads & Pipeline Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#0b2a1f]">
                Active Enquiries & Pipeline (Phase 2 Module)
              </h2>
              <p className="text-xs text-gray-500">
                Track status from New to Confirmed, one-click WhatsApp callback and quotation creation
              </p>
            </div>
            <button
              onClick={() => alert("Phase 2 Feature: New Lead creation modal")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#0b2a1f] gold-gradient-bg shadow-sm hover:brightness-105"
            >
              <Plus className="w-4 h-4" /> Add Lead / Booking
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 uppercase text-[10px] text-gray-500 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Lead ID & Host</th>
                  <th className="py-3 px-4">Event Type</th>
                  <th className="py-3 px-4">Event Date</th>
                  <th className="py-3 px-4">Guests</th>
                  <th className="py-3 px-4">Est. Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-gray-900">{lead.name}</p>
                      <p className="text-[11px] text-gray-400">{lead.phone}</p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-800">{lead.event}</td>
                    <td className="py-3.5 px-4">{lead.date}</td>
                    <td className="py-3.5 px-4">{lead.guests > 0 ? `${lead.guests} pax` : "Grocery"}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">{formatINR(lead.budget)}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0b2a1f]/10 text-[#0b2a1f]">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-green-100 text-green-700 font-bold text-[11px] hover:bg-green-200"
                      >
                        WhatsApp
                      </a>
                      <button
                        onClick={() => alert(`Phase 2: Generate Quotation PDF for ${lead.name}`)}
                        className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 font-bold text-[11px] hover:bg-gray-200"
                      >
                        Quote PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
