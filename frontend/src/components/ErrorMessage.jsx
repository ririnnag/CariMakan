import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertCircle className="text-red-500 mb-4" size={56} />
      <h3 className="text-xl font-bold text-gray-800 mb-2">Terjadi Kesalahan</h3>
      <p className="text-gray-500 mb-6 max-w-md">{message || 'Gagal memuat data. Silakan coba lagi.'}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center space-x-2 bg-primary text-secondary px-6 py-3 rounded-xl font-medium hover:brightness-95 active:scale-95 transition-all"
        >
          <RefreshCw size={20} />
          <span>Coba Lagi</span>
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
