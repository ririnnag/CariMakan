import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  User,
  Phone,
  MapPin,
  FileText,
  CreditCard,
  Wallet,
  Truck,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { CartContext } from '../context/CartContext';

import { getPriceByCategory, formatCurrency } from '../utils/pricing';

// ===================== Sub-components =====================

const SectionCard = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="p-2 bg-blue-50 rounded-xl">
      <Icon size={20} className="text-primary" />
    </div>
    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
  </div>
);

const InputField = ({ label, id, required, error, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && (
      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
        <AlertCircle size={12} />
        {error}
      </p>
    )}
  </div>
);

// ===================== Main Component =====================

const Payment = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);

  // Form state
  const [form, setForm] = useState({
    nama: '',
    noHp: '',
    alamat: '',
    catatan: '',
  });
  const [errors, setErrors] = useState({});

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bankChoice, setBankChoice] = useState('');
  const [ewalletChoice, setEwalletChoice] = useState('');

  // Loading state
  const [loading, setLoading] = useState(false);

  // ---- Empty cart guard ----
  if (cart.length === 0) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="bg-orange-50 rounded-full p-8 mb-6">
          <ShoppingBag size={72} className="text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Anda Kosong</h2>
        <p className="text-gray-500 mb-8 text-center max-w-sm">
          Tambahkan makanan ke keranjang terlebih dahulu sebelum melanjutkan ke pembayaran.
        </p>
        <Link
          to="/"
          className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-md"
        >
          <ArrowLeft size={20} />
          <span>Cari Makanan Dulu</span>
        </Link>
      </div>
    );
  }

  // ---- Price calculations ----
  const cartWithPrice = cart.map((item) => ({
    ...item,
    price: getPriceByCategory(item),
  }));
  const subtotal = cartWithPrice.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const serviceFee = Math.round(subtotal * 0.05);
  const shippingFee = 15000;
  const total = subtotal + serviceFee + shippingFee;

  // ---- Validation ----
  const validate = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = 'Nama lengkap wajib diisi.';
    if (!form.noHp.trim()) {
      newErrors.noHp = 'Nomor HP wajib diisi.';
    } else if (!/^[0-9+\-\s]{8,15}$/.test(form.noHp.trim())) {
      newErrors.noHp = 'Nomor HP tidak valid.';
    }
    if (!form.alamat.trim()) newErrors.alamat = 'Alamat pengiriman wajib diisi.';
    if (!paymentMethod) newErrors.paymentMethod = 'Pilih metode pembayaran.';
    if (paymentMethod === 'bank' && !bankChoice) newErrors.bankChoice = 'Pilih bank tujuan.';
    if (paymentMethod === 'ewallet' && !ewalletChoice) newErrors.ewalletChoice = 'Pilih e-wallet.';
    return newErrors;
  };

  // ---- Submit ----
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // scroll to first error
      const firstErr = document.querySelector('.error-field');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErrors({});
    setLoading(true);

    // Simulasi proses pembayaran 2 detik
    setTimeout(() => {
      const paymentDetail =
        paymentMethod === 'bank'
          ? `Transfer Bank ${bankChoice}`
          : paymentMethod === 'ewallet'
          ? `E-Wallet ${ewalletChoice}`
          : 'COD (Cash on Delivery)';

      navigate('/payment/success', {
        state: {
          nama: form.nama,
          paymentMethod: paymentDetail,
          total,
          catatan: form.catatan,
        },
      });
      clearCart();
    }, 2000);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const inputCls = (field) =>
    `w-full px-4 py-3 rounded-xl border text-gray-800 text-sm transition-all outline-none focus:ring-2 focus:ring-primary/30 ${
      errors[field]
        ? 'border-red-400 bg-red-50 error-field'
        : 'border-gray-200 bg-gray-50 focus:border-primary focus:bg-white'
    }`;

  // ===================== Render =====================
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/cart"
            className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={22} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pembayaran</h1>
            <p className="text-sm text-gray-500">Lengkapi informasi untuk menyelesaikan pesanan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* ===== LEFT COLUMN ===== */}
            <div className="lg:col-span-3 space-y-6">

              {/* Informasi Pemesan */}
              <SectionCard>
                <SectionTitle icon={User} title="Informasi Pemesan" />
                <div className="space-y-4">
                  <InputField label="Nama Lengkap" id="nama" required error={errors.nama}>
                    <input
                      id="nama"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={form.nama}
                      onChange={handleChange('nama')}
                      className={inputCls('nama')}
                    />
                  </InputField>

                  <InputField label="Nomor HP" id="noHp" required error={errors.noHp}>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="noHp"
                        type="tel"
                        placeholder="08xx-xxxx-xxxx"
                        value={form.noHp}
                        onChange={handleChange('noHp')}
                        className={`${inputCls('noHp')} pl-10`}
                      />
                    </div>
                  </InputField>

                  <InputField label="Alamat Pengiriman" id="alamat" required error={errors.alamat}>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                      <textarea
                        id="alamat"
                        rows={3}
                        placeholder="Jalan, nomor rumah, kota..."
                        value={form.alamat}
                        onChange={handleChange('alamat')}
                        className={`${inputCls('alamat')} pl-10 resize-none`}
                      />
                    </div>
                  </InputField>

                  <InputField label="Catatan Pesanan" id="catatan" error={errors.catatan}>
                    <div className="relative">
                      <FileText size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                      <textarea
                        id="catatan"
                        rows={2}
                        placeholder="Catatan untuk kurir atau penjual (opsional)"
                        value={form.catatan}
                        onChange={handleChange('catatan')}
                        className={`${inputCls('catatan')} pl-10 resize-none`}
                      />
                    </div>
                  </InputField>
                </div>
              </SectionCard>

              {/* Metode Pembayaran */}
              <SectionCard>
                <SectionTitle icon={CreditCard} title="Metode Pembayaran" />
                {errors.paymentMethod && (
                  <p className="mb-3 text-xs text-red-500 flex items-center gap-1 error-field">
                    <AlertCircle size={12} /> {errors.paymentMethod}
                  </p>
                )}

                <div className="space-y-3">
                  {/* Transfer Bank */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-100 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={() => { setPaymentMethod('bank'); setErrors(p => ({...p, paymentMethod: ''})); }}
                      className="accent-primary w-4 h-4"
                    />
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <CreditCard size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">Transfer Bank</p>
                      <p className="text-xs text-gray-500">BCA, BNI, BRI, Mandiri</p>
                    </div>
                    {paymentMethod === 'bank' && <CheckCircle size={18} className="text-primary" />}
                  </label>

                  {paymentMethod === 'bank' && (
                    <div className="ml-4 pl-4 border-l-2 border-primary/30 space-y-2 animate-fadeIn">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Pilih Bank:</p>
                      {errors.bankChoice && (
                        <p className="text-xs text-red-500 flex items-center gap-1 error-field">
                          <AlertCircle size={12} /> {errors.bankChoice}
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        {['BCA', 'BNI', 'BRI', 'Mandiri'].map((bank) => (
                          <label
                            key={bank}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-sm font-medium transition-all ${
                              bankChoice === bank
                                ? 'border-primary bg-blue-50 text-primary'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name="bankChoice"
                              value={bank}
                              checked={bankChoice === bank}
                              onChange={() => { setBankChoice(bank); setErrors(p => ({...p, bankChoice: ''})); }}
                              className="accent-primary"
                            />
                            {bank}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* E-Wallet */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'ewallet'
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-100 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ewallet"
                      checked={paymentMethod === 'ewallet'}
                      onChange={() => { setPaymentMethod('ewallet'); setErrors(p => ({...p, paymentMethod: ''})); }}
                      className="accent-primary w-4 h-4"
                    />
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Wallet size={20} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">E-Wallet</p>
                      <p className="text-xs text-gray-500">Dana, OVO, GoPay, ShopeePay</p>
                    </div>
                    {paymentMethod === 'ewallet' && <CheckCircle size={18} className="text-primary" />}
                  </label>

                  {paymentMethod === 'ewallet' && (
                    <div className="ml-4 pl-4 border-l-2 border-primary/30 space-y-2 animate-fadeIn">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Pilih E-Wallet:</p>
                      {errors.ewalletChoice && (
                        <p className="text-xs text-red-500 flex items-center gap-1 error-field">
                          <AlertCircle size={12} /> {errors.ewalletChoice}
                        </p>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        {['Dana', 'OVO', 'GoPay', 'ShopeePay'].map((ew) => (
                          <label
                            key={ew}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-sm font-medium transition-all ${
                              ewalletChoice === ew
                                ? 'border-primary bg-blue-50 text-primary'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name="ewalletChoice"
                              value={ew}
                              checked={ewalletChoice === ew}
                              onChange={() => { setEwalletChoice(ew); setErrors(p => ({...p, ewalletChoice: ''})); }}
                              className="accent-primary"
                            />
                            {ew}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* COD */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-100 hover:border-gray-300 bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => { setPaymentMethod('cod'); setErrors(p => ({...p, paymentMethod: ''})); }}
                      className="accent-primary w-4 h-4"
                    />
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Truck size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">COD (Cash on Delivery)</p>
                      <p className="text-xs text-gray-500">Bayar saat pesanan tiba</p>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle size={18} className="text-primary" />}
                  </label>

                  {paymentMethod === 'cod' && (
                    <div className="ml-4 pl-4 border-l-2 border-green-400 animate-fadeIn">
                      <div className="bg-green-50 rounded-lg p-3 flex gap-2">
                        <Truck size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-700">
                          Pembayaran dilakukan secara tunai kepada kurir saat pesanan diterima di alamat tujuan.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-4">
                {/* Ringkasan Pesanan */}
                <SectionCard>
                  <SectionTitle icon={ShoppingBag} title="Ringkasan Pesanan" />

                  <div className="space-y-3 mb-4">
                    {cartWithPrice.map((item) => (
                      <div key={item.idMeal} className="flex items-center gap-3">
                        <img
                          src={item.strMealThumb}
                          alt={item.strMeal}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{item.strMeal}</p>
                          <p className="text-xs text-gray-500">{formatCurrency(item.price)} × {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-4 space-y-2.5">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-800">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Biaya Layanan (5%)</span>
                      <span className="font-medium text-gray-800">{formatCurrency(serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Ongkos Kirim</span>
                      <span className="font-medium text-gray-800">{formatCurrency(shippingFee)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                      <span className="font-bold text-gray-800">Total Pembayaran</span>
                      <span className="font-bold text-lg text-primary">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </SectionCard>

                {/* Tombol Bayar */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>Memproses Pembayaran...</span>
                    </>
                  ) : (
                    <>
                      <span>Bayar Sekarang</span>
                      <ChevronRight size={20} />
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-400">
                  🔒 Transaksi ini merupakan simulasi dan tidak memproses data asli.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
