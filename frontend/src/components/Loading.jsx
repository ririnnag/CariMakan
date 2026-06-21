import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="animate-spin text-primary mb-4" size={48} />
      <p className="text-gray-500 font-medium">Memuat data...</p>
    </div>
  );
};

export default Loading;
