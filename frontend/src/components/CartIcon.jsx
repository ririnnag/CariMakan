import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartIcon = ({ itemCount }) => {
  return (
    <div className="relative flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
      <ShoppingCart size={28} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
