'use client';
import DashboardLayout from '@/components/DashboardLayout';
import React from 'react';
import { 
    ChevronLeft, 
    ChevronRight,
    ArrowRight
} from 'lucide-react';

const CategoryItem = ({ label, image }) => (
    <div className="flex flex-col items-center gap-3 cursor-pointer group">
        <div className="w-24 h-24 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            {image ? (
                <img src={image} alt={label} className="w-full h-full object-cover" />
            ) : (
                <div className="w-12 h-12 bg-slate-100 rounded-full" />
            )}
        </div>
        <span className="text-[11px] font-bold text-slate-700 text-center uppercase tracking-tight max-w-[80px]">
            {label}
        </span>
    </div>
);

export default function DemoPage() {
    const categories = [
        { label: 'Quirky Home Essentials' },
        { label: 'Beauty & Personal Care' },
        { label: 'Car & Bike Accessories' },
        { label: 'Gym & Wellness' },
        { label: 'Footwear' },
        { label: 'Accessories' },
        { label: 'Jewellery' },
        { label: 'Kids' },
        { label: 'Electronics' },
    ];

    return (
        <DashboardLayout>
            <div className="p-8 space-y-10">
                {/* Promo Banner */}
                <div className="relative bg-[#FFFBE6] rounded-2xl p-10 flex items-center justify-between overflow-hidden border border-[#FFE58F]">
                    <div className="relative z-10 flex-1">
                        <p className="text-slate-500 font-medium mb-1">Introducing</p>
                        <h1 className="text-4xl font-black text-[#722ED1] mb-4">
                            Products For Testing
                        </h1>
                        <p className="text-slate-700 font-bold mb-8">
                            Test and discover your next hero product & get exciting benefits!
                        </p>
                        
                        <button className="bg-[#0f1729] text-white px-8 py-3 rounded-md font-bold flex items-center gap-4 hover:bg-slate-800 transition-colors">
                            Start Product Testing Now
                            <ArrowRight size={20} />
                        </button>
                        
                        <p className="text-[10px] text-slate-400 mt-4">*T&C Apply</p>
                    </div>

                    <div className="relative z-10 w-1/3 flex justify-end">
                        {/* Placeholder for character illustration */}
                        <div className="w-64 h-64 bg-[#722ED1]/10 rounded-full flex items-center justify-center">
                            <div className="w-48 h-48 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white">
                                <span className="text-slate-400 text-sm italic">Illustration</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute top-4 right-6 text-[10px] font-bold text-slate-400">1/2</div>
                </div>

                {/* Categories Slider */}
                <div className="relative">
                    <div className="flex items-center gap-8 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                        {categories.map((cat, idx) => (
                            <CategoryItem key={idx} label={cat.label} />
                        ))}
                    </div>
                    
                    {/* Navigation Buttons */}
                    <button className="absolute -left-4 top-12 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0f1729]">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="absolute -right-4 top-12 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0f1729]">
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* Skeleton / Placeholder Grid */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
                        <div className="h-6 w-24 bg-slate-100 rounded-md animate-pulse" />
                    </div>
                    
                    <div className="grid grid-cols-5 gap-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="space-y-4">
                                <div className="aspect-[4/5] bg-slate-200 rounded-2xl animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                                    <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </DashboardLayout>
    );
}
