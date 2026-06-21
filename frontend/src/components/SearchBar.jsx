import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative max-w-2xl mx-auto my-8 w-full px-4">
      <div className="relative flex items-center">
        <Search className="absolute left-6 text-gray-400" size={20} />
        <input
          type="text"
          className="w-full pl-14 pr-6 py-4 rounded-full border-2 border-transparent shadow-md focus:border-primary focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all text-lg bg-white"
          placeholder="Cari makanan favorit Anda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
