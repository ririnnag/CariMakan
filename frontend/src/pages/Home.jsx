import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FoodGrid from '../components/FoodGrid';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { API_URL } from '../services/api';

const CATEGORIES = [
  { label: '🍗 Ayam', keyword: 'Chicken' },
  { label: '🥩 Daging', keyword: 'Beef' },
  { label: '🦐 Seafood', keyword: 'Seafood' },
  { label: '🍝 Pasta', keyword: 'Pasta' },
  { label: '🍰 Dessert', keyword: 'Dessert' }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].keyword);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFoods = async (query = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}?search=${query}`);
      const data = await response.json();
      
      if (data.success) {
        setFoods(data.data);
      } else {
        setError(data.message || 'Gagal mengambil data.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Terjadi kesalahan koneksi ke server. Pastikan backend berjalan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Jika searchTerm terisi, gunakan searchTerm (mengabaikan kategori)
      // Jika kosong, gunakan activeCategory
      const queryToFetch = searchTerm.trim() !== '' ? searchTerm : activeCategory;
      fetchFoods(queryToFetch);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeCategory]);

  // Saat pengguna mulai mengetik, biarkan UI tahu bahwa kategori sedang di-override
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white pb-6 shadow-sm border-b border-gray-100">
        <div className="container mx-auto">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {/* Category Menu */}
          <div className={`flex flex-wrap justify-center gap-3 mt-4 px-4 transition-all duration-300 ${searchTerm ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.keyword}
                onClick={() => {
                  setActiveCategory(cat.keyword);
                  setSearchTerm(''); // Kosongkan search bar jika kategori diklik
                }}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === cat.keyword && !searchTerm
                    ? 'bg-primary text-secondary shadow-md scale-105 hover:brightness-95'
                    : 'bg-secondary text-primary border border-primary hover:brightness-95'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-8 bg-background">
        <div className="container mx-auto px-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {searchTerm 
              ? `Hasil pencarian: "${searchTerm}"` 
              : `Rekomendasi ${CATEGORIES.find(c => c.keyword === activeCategory)?.label || ''}`
            }
          </h2>
        </div>
        
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => fetchFoods(searchTerm || activeCategory)} />
        ) : (
          <FoodGrid foods={foods} />
        )}
      </main>
    </div>
  );
};

export default Home;
