import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
      <img 
        src={item.strMealThumb} 
        alt={item.strMeal} 
        className="w-24 h-24 object-cover rounded-xl"
      />
      
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-800">{item.strMeal}</h4>
        <p className="text-sm text-gray-500 mb-3">{item.strCategory}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 bg-gray-50 px-3 py-1.5 rounded-lg">
            <button 
              onClick={() => decreaseQuantity(item.idMeal)}
              className="p-1 hover:bg-white rounded-md transition-colors text-gray-600 hover:text-accent"
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold w-4 text-center">{item.quantity}</span>
            <button 
              onClick={() => increaseQuantity(item.idMeal)}
              className="p-1 hover:bg-white rounded-md transition-colors text-gray-600 hover:text-primary"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={() => removeFromCart(item.idMeal)}
            className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
            title="Hapus item"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
