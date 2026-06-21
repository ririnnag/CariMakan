import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import CartIcon from './CartIcon';

const Header = () => {
  const { totalItems } = useContext(CartContext);

  return (
    <header className="sticky top-0 z-50 bg-primary text-secondary shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:opacity-90 transition-opacity">
          <Utensils size={32} />
          <span>CariMakan</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="font-semibold hover:text-gray-200 transition-colors">Home</Link>
          <Link to="/cart">
            <CartIcon itemCount={totalItems} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
