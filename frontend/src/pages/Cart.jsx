import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ChevronRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, totalItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="bg-gray-50 rounded-full p-8 mb-6">
          <ShoppingBag size={80} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang masih kosong</h2>
        <p className="text-gray-500 mb-8">Sepertinya Anda belum memilih makanan apa pun.</p>
        <Link 
          to="/" 
          className="bg-primary text-secondary px-8 py-3 rounded-xl font-medium hover:brightness-95 active:scale-95 transition-all flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Mulai Cari Makanan</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-primary transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Keranjang Anda</h1>
        </div>
        <div className="bg-accent/20 text-gray-900 px-4 py-2 rounded-full font-bold">
          {totalItems} Item
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-end mb-4">
            <button 
              onClick={clearCart}
              className="flex items-center space-x-2 text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              <Trash2 size={18} />
              <span>Kosongkan Keranjang</span>
            </button>
          </div>
          
          {cart.map((item) => (
            <CartItem key={item.idMeal} item={item} />
          ))}
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Ringkasan</h3>
            
            <div className="flex justify-between items-center mb-4 text-gray-600">
              <span>Total Item</span>
              <span className="font-bold text-gray-800">{totalItems}</span>
            </div>
            
            <button
              onClick={() => navigate('/payment')}
              className="w-full bg-primary text-secondary py-3.5 rounded-xl font-bold text-lg mt-6 hover:brightness-110 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Lanjut Checkout</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
