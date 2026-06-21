import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={food.strMealThumb} 
          alt={food.strMeal} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {food.strCategory && (
          <span className="absolute top-3 right-3 bg-accent text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm backdrop-blur-sm">
            {food.strCategory}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={food.strMeal}>
          {food.strMeal}
        </h3>
        <div className="mt-auto pt-4">
          <Link 
            to={`/food/${food.idMeal}`}
            className="block w-full text-center bg-primary text-secondary py-2.5 rounded-xl font-medium hover:brightness-95 active:scale-[0.98] transition-all"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
