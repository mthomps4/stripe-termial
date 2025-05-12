import { CartItem } from "@/types/cart";
import { Product } from "@/types/products";
import React, { createContext, useContext, useState, useCallback } from "react";

interface CartContextType {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  // Add item to cart
  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update existing item
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * product.price,
              }
            : item
        );
      }

      // Add new item
      return [
        ...currentItems,
        {
          product,
          quantity,
          subtotal: quantity * product.price,
        },
      ];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id.toString() !== productId)
    );
  }, []);

  // Update item quantity
  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setItems((currentItems) =>
        currentItems.map((item) =>
          item.product.id.toString() === productId
            ? {
                ...item,
                quantity,
                subtotal: quantity * item.product.price,
              }
            : item
        )
      );
    },
    [removeItem]
  );

  // Clear cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = {
    items,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
