export const getPriceByCategory = (item) => {
  const prices = {
    Beef: 75000,
    Chicken: 55000,
    Seafood: 85000,
    Pasta: 50000,
    Dessert: 35000,
    Vegetarian: 40000,
    Lamb: 80000,
    Pork: 65000,
    Side: 25000,
    Starter: 30000,
    Breakfast: 45000,
    Goat: 70000,
    Vegan: 40000,
    Miscellaneous: 45000,
  };
  return prices[item.strCategory] || 50000;
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
