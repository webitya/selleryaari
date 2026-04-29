'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Zap, Star, Heart, ArrowRight, Loader2 } from 'lucide-react';

const ProductCard = ({ name, price, originalPrice, rating, reviews, image, tag, category }) => (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all group cursor-pointer flex flex-col h-full">
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
            {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform duration-700">
                    <Zap size={48} className="opacity-20" />
                </div>
            )}
            {tag && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    {tag}
                </div>
            )}
            <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90">
                <Heart size={14} />
            </button>
            <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-[#0f1729]/60 backdrop-blur-md text-white text-[8px] font-bold rounded uppercase">
                {category}
            </div>
        </div>
        <div className="p-3 flex-1 flex flex-col">
            <h3 className="text-[12px] font-bold text-[#0f1729] line-clamp-2 mb-1.5 group-hover:text-[#0A66C2] transition-colors leading-snug">
                {name}
            </h3>
            <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center text-yellow-400">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-black ml-0.5 text-slate-700">4.8</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">(120)</span>
            </div>
            <div className="mt-auto pt-2 flex items-end justify-between border-t border-slate-50">
                <div>
                    <p className="text-[9px] text-slate-400 line-through font-medium">₹{Math.round(price * 1.5)}</p>
                    <p className="text-base font-black text-[#0f1729]">₹{price}</p>
                </div>
                <button className="bg-[#0f1729] hover:bg-[#0A66C2] text-white p-1.5 rounded-lg transition-all active:scale-90">
                    <ArrowRight size={16} />
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
