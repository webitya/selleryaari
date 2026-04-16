'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, TrendingUp, Loader2 } from 'lucide-react';

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card h-[400px] skeleton" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
        <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
            <Package size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No products available yet</h3>
            <p className="text-slate-500">Check back later for winner product updates.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product._id} className="glass-card overflow-hidden group">
          <div className="relative h-64 bg-slate-100 overflow-hidden">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Verified
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-2 text-[#0A66C2]">
                <TrendingUp size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
            </div>
            <h3 className="text-lg font-bold text-[#0f1729] mb-2">{product.name}</h3>
            <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">
                {product.description}
            </p>
            <div className="flex justify-between items-center text-sm mb-6 pb-6 border-b border-slate-100">
              <span className="text-slate-900 font-bold text-xl">₹{product.price}</span>
              <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded">High Margin</span>
            </div>
            <button className="btn-primary w-full justify-center !text-sm !py-2.5">
              Unlock Supplier Data
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
