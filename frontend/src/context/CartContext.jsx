import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('carimakan_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('carimakan_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.idMeal === item.idMeal);
      if (existing) {
        return prev.map(i => i.idMeal === item.idMeal ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(i => i.idMeal !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) => prev.map(i => i.idMeal === id ? { ...i, quantity: i.quantity + 1 } : i));
  };

  const decreaseQuantity = (id) => {
    setCart((prev) => prev.map(i => i.idMeal === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};
