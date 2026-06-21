import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { CartContext } from '../context/CartContext';
import { API_URL } from '../services/api';

const FoodDetail = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchFoodDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setFood(data.data);
        } else {
          setError(data.message || 'Makanan tidak ditemukan.');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Terjadi kesalahan koneksi ke server.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (food) {
      addToCart(food);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  // Helper function to extract ingredients
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push({
          ingredient: meal[`strIngredient${i}`],
          measure: meal[`strMeasure${i}`]
        });
      }
    }
    return ingredients;
  };

  if (loading) return <div className="min-h-screen pt-20"><Loading /></div>;
  if (error) return <div className="min-h-screen pt-20"><ErrorMessage message={error} /></div>;
  if (!food) return null;

  const ingredients = getIngredients(food);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl min-h-screen">
      <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:brightness-75 font-medium mb-8 transition-colors">
        <ArrowLeft size={20} />
        <span>Kembali ke Home</span>
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-64 md:h-auto">
            <img 
              src={food.strMealThumb} 
              alt={food.strMeal} 
              className="w-full h-full object-cover"
            />
            {food.strCategory && (
              <span className="absolute top-4 left-4 bg-accent text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-md backdrop-blur-sm">
                {food.strCategory}
              </span>
            )}
            {food.strArea && (
              <span className="absolute top-4 left-28 bg-primary/90 text-secondary px-4 py-1.5 rounded-full text-sm font-bold shadow-md backdrop-blur-sm ml-2">
                {food.strArea}
              </span>
            )}
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{food.strMeal}</h1>
            
            <div className="mb-8 flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Bahan-bahan</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                    <span><span className="font-medium text-gray-700">{item.measure}</span> {item.ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 transition-all ${
                added 
                  ? 'bg-green-500 text-white scale-100' 
                  : 'bg-primary text-secondary hover:brightness-95 active:scale-[0.98]'
              }`}
            >
              {added ? (
                <>
                  <Check size={24} />
                  <span>Berhasil Ditambahkan!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={24} />
                  <span>Tambah ke Keranjang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Instruksi Memasak</h3>
        <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
          {food.strInstructions}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
