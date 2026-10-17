"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { KiranaCartItem, KiranaProduct } from "@/lib/types";

interface CartContextType {
  items: KiranaCartItem[];
  addItem: (product: KiranaProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalEstimatedAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<KiranaCartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("abumaaz_cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  const saveCart = (newItems: KiranaCartItem[]) => {
    setItems(newItems);
    localStorage.setItem("abumaaz_cart", JSON.stringify(newItems));
  };

  const addItem = (product: KiranaProduct, quantity: number = product.min_qty || 1) => {
    const existingIndex = items.findIndex((i) => i.product.id === product.id);
    let updated: KiranaCartItem[];
    if (existingIndex > -1) {
      updated = items.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updated = [...items, { product, quantity }];
    }
    saveCart(updated);
  };

  const removeItem = (productId: string) => {
    const updated = items.filter((item) => item.product.id !== productId);
    saveCart(updated);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    const updated = items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalEstimatedAmount = items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalEstimatedAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
