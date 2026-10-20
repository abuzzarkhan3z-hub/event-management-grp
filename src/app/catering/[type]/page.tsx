import React from "react";
import Link from "next/link";
import { SAMPLE_PACKAGES } from "@/lib/sampleData";
import { formatINR } from "@/lib/utils";
import { CheckCircle2, ArrowLeft, PhoneCall, Sparkles } from "lucide-react";

export function generateStaticParams() {
  return [
    { type: "wedding" },
    { type: "walima" },
    { type: "engagement" },
    { type: "aqiqah" },
    { type: "birthday" },
    { type: "corporate" },
    { type: "other" },
  ];
}

interface Props {
  params: Promise<{ type: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const eventType = resolvedParams.type || "wedding";

  const eventNames: Record<string, string> = {
    wedding: "Royal Wedding & Reception Banquet",
    walima: "Traditional Walima Dawat",
    engagement: "Engagement & Ring Ceremony",
    aqiqah: "Aqiqah Celebration Feast",
    birthday: "Birthday & Anniversary Party",
    corporate: "Corporate Conference & Luncheon",
  };

  const displayName = eventNames[eventType] || `${eventType.toUpperCase()} Catering`;

  return (
    <div className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <Link
        href="/catering"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b2a1f] hover:text-[#b89326] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to All Catering Services
      </Link>

      <div className="bg-[#0b2a1f] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4af37]/40 bg-black/20 text-xs font-semibold text-[#f3dc8e]">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" /> Dedicated Event Experience
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            {displayName}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Every celebration has its unique rhythm and expectations. Abu Maa&apos;s Event Group delivers end-to-end master cooking, live service staff, crockery, buffet counters, and pristine cleanup.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href={`/quote?event=${eventType}`}
              className="px-6 py-3 rounded-xl font-bold text-sm text-[#0b2a1f] gold-gradient-bg"
            >
              Get Custom Quote For {displayName}
            </Link>
            <a
              href="tel:+917983319874"
              className="px-6 py-3 rounded-xl font-bold text-sm text-white border border-[#d4af37] flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#d4af37]" /> Call Master Bawarchi
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-[#0b2a1f]">
          Recommended Packages For This Event
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-bold text-[#0b2a1f]">{pkg.name}</h3>
                <p className="text-2xl font-extrabold text-[#d4af37] font-serif">
                  {formatINR(pkg.price_per_plate)}{" "}
                  <span className="text-xs text-gray-500 font-sans font-normal">/ plate</span>
                </p>
                <p className="text-xs text-gray-600">{pkg.description_en}</p>
                <ul className="space-y-1.5 text-xs text-gray-700 pt-2 border-t border-gray-100">
                  {pkg.items_en.slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Link
                  href={`/quote?package=${pkg.id}&event=${eventType}`}
                  className="w-full block py-2.5 rounded-lg text-center text-xs font-bold text-[#0b2a1f] gold-gradient-bg"
                >
                  Book This Package
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
