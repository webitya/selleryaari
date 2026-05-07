'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Zap, Star, Heart, ArrowRight, Loader2 } from 'lucide-react';

const ProductCard = ({ name, price, originalPrice, rating, reviews, image, tag, category }) => (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group cursor-pointer flex flex-col h-full font-outfit">
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
            {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform duration-700">
                    <Zap size={48} className="opacity-10" />
                </div>
            )}
            {tag && (
                <div className="absolute top-2 left-2 bg-[#F4BC1C] text-black text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tight z-10">
                    {tag}
                </div>
            )}
            <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90 z-10">
                <Heart size={14} />
            </button>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-md text-[#1a1a1a] text-[9px] font-bold rounded-full border border-slate-100 uppercase z-10">
                {category}
            </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-[13px] font-bold text-[#1a1a1a] line-clamp-2 mb-2 group-hover:text-[#F4BC1C] transition-colors leading-snug">
                {name}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center text-[#F4BC1C]">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[11px] font-black ml-1 text-slate-400">4.8</span>
                </div>
                <span className="text-[10px] text-slate-300 font-bold">(120 Reviews)</span>
            </div>
            <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-50">
                <div>
                    <p className="text-[10px] text-slate-400 line-through font-bold">₹{originalPrice || Math.round(price * 1.5)}</p>
                    <p className="text-lg font-black text-[#1a1a1a]">₹{price}</p>
                </div>
                <button className="bg-[#1a1a1a] hover:bg-[#F4BC1C] hover:text-black text-white w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-md">
                    <ShoppingBag size={18} />
                </button>
            </div>
        </div>
    </div>
);

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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="aspect-[4/5] bg-slate-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <Zap size={40} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-500 font-bold">No products found. Check back later!</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <ProductCard 
            key={product._id} 
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.images?.[0]}
            tag={product.tags?.[0] || 'Winner'}
        />
      ))}
    </div>
  );
}
