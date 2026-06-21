import React from 'react';
import FoodCard from './FoodCard';

const FoodGrid = ({ foods }) => {
  if (!foods || foods.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-xl text-gray-500 font-medium">Makanan tidak ditemukan.</p>
        <p className="text-gray-400 mt-2">Coba kata kunci lain.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-12 container mx-auto">
      {foods.map((food) => (
        <FoodCard key={food.idMeal} food={food} />
      ))}
    </div>
  );
};

export default FoodGrid;
