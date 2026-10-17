export type Role = "admin" | "manager" | "staff" | "customer" | "vendor";

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: Role;
  language: "en" | "hi";
  created_at: string;
}

export type EventType =
  | "wedding"
  | "walima"
  | "engagement"
  | "aqiqah"
  | "birthday"
  | "corporate"
  | "other";

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "quotation_sent"
  | "negotiation"
  | "confirmed"
  | "lost";

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  event_type: EventType;
  event_date: string;
  guests: number;
  city_venue?: string;
  message?: string;
  source?: string;
  status: EnquiryStatus;
  notes?: string;
  follow_up_date?: string;
  created_at?: string;
}

export type PackageType = "veg" | "non-veg" | "mixed";

export interface MenuItem {
  id: string;
  name_en: string;
  name_hi: string;
  category: "starter" | "main_course" | "bread_rice" | "dessert" | "beverage";
  is_veg: boolean;
  image?: string;
  cost?: number;
}

export interface CateringPackage {
  id: string;
  name: string;
  name_hi: string;
  type: PackageType;
  price_per_plate: number;
  description_en: string;
  description_hi: string;
  items_en: string[];
  items_hi: string[];
  popular?: boolean;
}

export type KiranaCategory =
  | "atta_flour"
  | "rice"
  | "dal_pulses"
  | "oil_ghee"
  | "spices"
  | "sugar_salt"
  | "dry_fruits"
  | "beverages"
  | "packaging"
  | "others";

export interface KiranaProduct {
  id: string;
  name_en: string;
  name_hi: string;
  category: KiranaCategory;
  unit: string; // kg, litre, tin, bag
  price: number; // 0 if on request
  price_on_request?: boolean;
  min_qty: number;
  stock_qty?: number;
  reorder_level?: number;
  image?: string;
}

export interface KiranaCartItem {
  product: KiranaProduct;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  event_type: string;
  quote_en: string;
  quote_hi: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  id: string;
  question_en: string;
  question_hi: string;
  answer_en: string;
  answer_hi: string;
  category: "booking" | "catering" | "kirana" | "payment";
}
