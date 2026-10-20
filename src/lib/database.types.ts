export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'admin' | 'manager' | 'staff' | 'customer' | 'vendor'
export type LeadStatus = 'new' | 'contacted' | 'quotation_sent' | 'negotiation' | 'confirmed' | 'lost'
export type EventType = 'wedding' | 'engagement' | 'walima' | 'aqiqah' | 'birthday' | 'corporate' | 'other'
export type EventStatus = 'tentative' | 'confirmed' | 'completed' | 'cancelled'
export type OrderType = 'catering' | 'grocery'
export type OrderStatus = 'requested' | 'quoted' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
export type InvoiceStatus = 'unpaid' | 'partial' | 'paid' | 'cancelled'
export type PaymentMethod = 'cash' | 'upi' | 'bank_transfer' | 'cheque' | 'online'
export type FoodType = 'veg' | 'non_veg' | 'mixed'
export type PackageTier = 'silver' | 'gold' | 'premium' | 'custom'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          email: string | null
          role: UserRole
          language: 'en' | 'hi'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          email?: string | null
          role?: UserRole
          language?: 'en' | 'hi'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          email?: string | null
          role?: UserRole
          language?: 'en' | 'hi'
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      enquiries: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          event_type: EventType | null
          event_date: string | null
          guests: number | null
          city: string | null
          message: string | null
          source: string
          status: LeadStatus
          notes: string | null
          follow_up_date: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          event_type?: EventType | null
          event_date?: string | null
          guests?: number | null
          city?: string | null
          message?: string | null
          source?: string
          status?: LeadStatus
          notes?: string | null
          follow_up_date?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          event_type?: EventType | null
          event_date?: string | null
          guests?: number | null
          city?: string | null
          message?: string | null
          source?: string
          status?: LeadStatus
          notes?: string | null
          follow_up_date?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          name_en: string
          name_hi: string | null
          category: string
          is_veg: boolean
          description_en: string | null
          description_hi: string | null
          image_url: string | null
          cost_per_plate: number | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_hi?: string | null
          category: string
          is_veg?: boolean
          description_en?: string | null
          description_hi?: string | null
          image_url?: string | null
          cost_per_plate?: number | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_hi?: string | null
          category?: string
          is_veg?: boolean
          description_en?: string | null
          description_hi?: string | null
          image_url?: string | null
          cost_per_plate?: number | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      packages: {
        Row: {
          id: string
          name_en: string
          name_hi: string | null
          tier: PackageTier
          food_type: FoodType
          price_per_plate: number
          description_en: string | null
          description_hi: string | null
          image_url: string | null
          is_popular: boolean
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_hi?: string | null
          tier?: PackageTier
          food_type?: FoodType
          price_per_plate: number
          description_en?: string | null
          description_hi?: string | null
          image_url?: string | null
          is_popular?: boolean
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_hi?: string | null
          tier?: PackageTier
          food_type?: FoodType
          price_per_plate?: number
          description_en?: string | null
          description_hi?: string | null
          image_url?: string | null
          is_popular?: boolean
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          category_id: string | null
          name_en: string
          name_hi: string | null
          unit: string
          price: number | null
          price_on_request: boolean
          min_qty: number
          stock_qty: number
          reorder_level: number
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          name_en: string
          name_hi?: string | null
          unit?: string
          price?: number | null
          price_on_request?: boolean
          min_qty?: number
          stock_qty?: number
          reorder_level?: number
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          name_en?: string
          name_hi?: string | null
          unit?: string
          price?: number | null
          price_on_request?: boolean
          min_qty?: number
          stock_qty?: number
          reorder_level?: number
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          customer_id: string | null
          enquiry_id: string | null
          title: string
          contact_name: string | null
          contact_phone: string | null
          event_type: EventType
          event_date: string
          start_time: string | null
          venue: string | null
          city: string | null
          guests: number | null
          package_id: string | null
          status: EventStatus
          total_amount: number
          notes: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          enquiry_id?: string | null
          title: string
          contact_name?: string | null
          contact_phone?: string | null
          event_type?: EventType
          event_date: string
          start_time?: string | null
          venue?: string | null
          city?: string | null
          guests?: number | null
          package_id?: string | null
          status?: EventStatus
          total_amount?: number
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          enquiry_id?: string | null
          title?: string
          contact_name?: string | null
          contact_phone?: string | null
          event_type?: EventType
          event_date?: string
          start_time?: string | null
          venue?: string | null
          city?: string | null
          guests?: number | null
          package_id?: string | null
          status?: EventStatus
          total_amount?: number
          notes?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          order_type: OrderType
          customer_id: string | null
          guest_name: string | null
          guest_phone: string | null
          guest_email: string | null
          delivery_address: string | null
          required_date: string | null
          event_id: string | null
          status: OrderStatus
          notes: string | null
          total_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number?: string
          order_type: OrderType
          customer_id?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          guest_email?: string | null
          delivery_address?: string | null
          required_date?: string | null
          event_id?: string | null
          status?: OrderStatus
          notes?: string | null
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          order_type?: OrderType
          customer_id?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          guest_email?: string | null
          delivery_address?: string | null
          required_date?: string | null
          event_id?: string | null
          status?: OrderStatus
          notes?: string | null
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      quotations: {
        Row: {
          id: string
          quote_number: string
          customer_id: string | null
          enquiry_id: string | null
          order_id: string | null
          event_id: string | null
          guest_name: string | null
          guest_phone: string | null
          status: QuoteStatus
          subtotal: number
          discount: number
          tax_percent: number
          total: number
          valid_until: string | null
          terms: string | null
          pdf_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quote_number?: string
          customer_id?: string | null
          enquiry_id?: string | null
          order_id?: string | null
          event_id?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          status?: QuoteStatus
          subtotal?: number
          discount?: number
          tax_percent?: number
          total?: number
          valid_until?: string | null
          terms?: string | null
          pdf_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quote_number?: string
          customer_id?: string | null
          enquiry_id?: string | null
          order_id?: string | null
          event_id?: string | null
          guest_name?: string | null
          guest_phone?: string | null
          status?: QuoteStatus
          subtotal?: number
          discount?: number
          tax_percent?: number
          total?: number
          valid_until?: string | null
          terms?: string | null
          pdf_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          invoice_number: string
          quotation_id: string | null
          customer_id: string | null
          event_id: string | null
          order_id: string | null
          total: number
          paid: number
          balance: number
          status: InvoiceStatus
          due_date: string | null
          pdf_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invoice_number?: string
          quotation_id?: string | null
          customer_id?: string | null
          event_id?: string | null
          order_id?: string | null
          total: number
          paid?: number
          status?: InvoiceStatus
          due_date?: string | null
          pdf_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invoice_number?: string
          quotation_id?: string | null
          customer_id?: string | null
          event_id?: string | null
          order_id?: string | null
          total?: number
          paid?: number
          status?: InvoiceStatus
          due_date?: string | null
          pdf_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          invoice_id: string
          amount: number
          method: PaymentMethod
          paid_on: string
          reference: string | null
          notes: string | null
          received_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          invoice_id: string
          amount: number
          method?: PaymentMethod
          paid_on?: string
          reference?: string | null
          notes?: string | null
          received_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          invoice_id?: string
          amount?: number
          method?: PaymentMethod
          paid_on?: string
          reference?: string | null
          notes?: string | null
          received_by?: string | null
          created_at?: string
        }
      }
    }
    Functions: {
      get_date_availability: {
        Args: { check_date: string }
        Returns: 'available' | 'limited' | 'booked'
      }
      submit_grocery_request: {
        Args: {
          p_name: string
          p_phone: string
          p_address: string
          p_required_date: string
          p_notes: string
          p_items: Json
        }
        Returns: string
      }
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      is_manager_or_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
  }
}
