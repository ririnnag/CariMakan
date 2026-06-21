import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Home, User, CreditCard, Receipt } from 'lucide-react';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // Guard: jika akses langsung tanpa state, redirect ke home
  if (!state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Halaman ini tidak dapat diakses langsung.</p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:brightness-110 transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const { nama, paymentMethod, total } = state;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-br from-primary to-blue-700 px-8 pt-10 pb-16 text-center relative">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Animated Check Icon */}
            <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl mb-5 mx-auto">
              <CheckCircle size={52} className="text-green-500" strokeWidth={2} />
            </div>

            <h1 className="text-2xl font-bold text-white relative z-10">Pembayaran Berhasil!</h1>
            <p className="text-blue-100 text-sm mt-2 relative z-10">
              Terima kasih telah menggunakan CariMakan.
            </p>
          </div>

          {/* Content */}
          <div className="-mt-8 mx-6 bg-white rounded-2xl shadow-md border border-gray-100 p-5 relative z-10">
            <p className="text-center text-sm text-gray-500 mb-4 font-medium">Detail Pesanan</p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Nama Pemesan</p>
                  <p className="text-sm font-bold text-gray-800">{nama}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CreditCard size={16} className="text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Metode Pembayaran</p>
                  <p className="text-sm font-bold text-gray-800">{paymentMethod}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/20">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Receipt size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Total Pembayaran</p>
                  <p className="text-base font-bold text-primary">{formatCurrency(total)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Info */}
          <div className="mx-6 mt-4 bg-green-50 border border-green-100 rounded-xl p-4 flex gap-3">
            <div className="text-green-500 mt-0.5 flex-shrink-0">📦</div>
            <p className="text-sm text-green-700">
              <span className="font-semibold">Pesanan Anda sedang diproses.</span> Kurir akan segera mengantarkan pesanan ke alamat Anda.
            </p>
          </div>

          {/* CTA Button */}
          <div className="p-6">
            <Link
              to="/"
              className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-md"
            >
              <Home size={20} />
              <span>Kembali ke Beranda</span>
            </Link>
            <p className="text-xs text-center text-gray-400 mt-3">
              Keranjang telah dikosongkan secara otomatis.
            </p>
          </div>
        </div>

        {/* Order ID simulasi */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Order ID: #CM-{Math.random().toString(36).substring(2, 10).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
