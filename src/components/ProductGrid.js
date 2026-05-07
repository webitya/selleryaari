'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Star, Heart, Zap, Loader2 } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';



const ProductCard = ({ name, price, originalPrice, image, tag, category }) => (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 group cursor-pointer flex flex-col font-inter">
        <div className="relative aspect-square bg-[#F9F9F9] overflow-hidden">
            {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <Package size={36} className="text-slate-200 group-hover:scale-110 transition-transform duration-500" />
                </div>
            )}
            {tag && (
                <div className="absolute top-2 left-2 bg-[#F4BC1C] text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tight z-10">
                    {tag}
                </div>
            )}
            <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90 z-10 opacity-0 group-hover:opacity-100">
                <Heart size={13} />
            </button>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-white/90 text-[#1a1a1a] text-[9px] font-bold rounded-full border border-slate-100 uppercase z-10">
                {category}
            </div>
        </div>
        <div className="p-3 flex-1 flex flex-col">
            <h3 className="text-[12px] font-bold text-[#1a1a1a] line-clamp-2 mb-1.5 group-hover:text-[#D4A017] transition-colors leading-snug">
                {name}
            </h3>
            <div className="flex items-center gap-1 mb-2">
                <Star size={10} fill="#F4BC1C" className="text-[#F4BC1C]" />
                <span className="text-[10px] font-bold text-slate-400">4.8</span>
                <span className="text-[9px] text-slate-300 font-medium">(120)</span>
            </div>
            <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-50">
                <div>
                    {originalPrice && (
                        <div className="flex items-center gap-1">
                            <p className="text-[9px] text-slate-400 line-through font-medium">₹{originalPrice.toLocaleString()}</p>
                            <span className="text-[9px] font-black text-emerald-500 tracking-tighter">
                                {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                            </span>
                        </div>
                    )}
                    <p className="text-base font-black text-[#1a1a1a]">₹{price?.toLocaleString()}</p>
                </div>

                <a 
                    href={`https://wa.me/917300067345?text=Hi%20SellerYaari,%20I'm%20interested%20in%20this%20product:%20${encodeURIComponent(name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm shadow-emerald-100"
                >
                    <WhatsAppIcon size={12} className="text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Enquiry Now</span>
                </a>


            </div>
        </div>
    </div>
);

export default function ProductGrid({ limit }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(limit ? res.data.slice(0, limit) : res.data);
      } catch (err) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="aspect-[4/5] bg-slate-100 animate-pulse rounded-xl" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
        <div className="py-16 text-center bg-white rounded-xl border border-dashed border-slate-200">
            <Package size={32} className="mx-auto text-slate-200 mb-3" />
            <p className="text-slate-400 font-bold text-[12px] uppercase tracking-widest">No products yet. Check back soon!</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
      {products.map((product) => (
        <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            category={product.category}
            image={product.images?.[0]}
            tag={product.tags?.[0]}
        />

      ))}
    </div>
  );
}
