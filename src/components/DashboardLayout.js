'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
    Search, 
    Bell, 
    User, 
    LayoutDashboard, 
    Home, 
    ClipboardList, 
    Truck, 
    Ship, 
    Package, 
    SearchCode, 
    Lightbulb, 
    FileText,
    ChevronRight,
    Image as ImageIcon,
    Menu,
    X
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, href, active, badge, onClick }) => (
    <Link 
        href={href || '#'} 
        onClick={onClick}
        className={`flex items-center justify-between px-4 py-2.5 text-[13px] font-semibold transition-all ${
            active 
            ? 'bg-[#F0F7FF] text-[#0A66C2] border-r-4 border-[#0A66C2]' 
            : 'text-slate-600 hover:bg-slate-50 hover:text-[#0f1729]'
        }`}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} className={active ? 'text-[#0A66C2]' : 'text-slate-400 group-hover:text-slate-600'} />
            <span>{label}</span>
        </div>
        {badge && (
            <span className="bg-[#E6FFFB] text-[#08979C] text-[9px] font-black px-1.5 py-0.5 rounded border border-[#B5F5EC] uppercase tracking-tighter">
                {badge}
            </span>
        )}
        {label === 'RTO Intelligence' && <ChevronRight size={14} className="text-slate-400" />}
    </Link>
);

export default function DashboardLayout({ children }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Analytics', href: '/admin/dashboard' },
        { icon: Home, label: 'Home', href: '/' },
        { icon: ClipboardList, label: 'Manage Orders', href: '#' },
        { icon: Truck, label: 'Manage NDR', href: '#' },
        { icon: Ship, label: 'Supplier Re-Routing', badge: 'New', href: '#' },
        { icon: Package, label: 'Manage Products', href: '/admin/products' },
        { icon: SearchCode, label: 'Source a Product', href: '#' },
        { icon: Lightbulb, label: 'RTO Intelligence', href: '#' },
        { icon: FileText, label: 'Reports', href: '#' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-inter">
            {/* Header */}
            <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-[60] shadow-sm shadow-slate-100/50">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 lg:hidden"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-1.5">
                            <span className="text-xl font-black text-[#0f1729] tracking-tighter">
                                selleryaari<span className="text-[#0A66C2]">.</span>
                            </span>
                            <span className="bg-[#FFF7E6] text-[#FAAD14] text-[9px] font-black px-1.5 py-0.5 rounded border border-[#FFE7BA] uppercase">
                                Marketplace
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="flex-1 max-w-xl mx-8 hidden md:block">
                    <div className="relative flex items-center group">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search Products (e.g. Magic Book, Bedsheet etc.)"
                                className="w-full bg-[#F5F5F5] border border-transparent rounded-l-lg py-2 px-10 text-[13px] focus:bg-white focus:border-[#0A66C2]/20 focus:ring-4 focus:ring-[#0A66C2]/5 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0A66C2]" />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 cursor-pointer">
                                <ImageIcon size={18} />
                            </div>
                        </div>
                        <button className="bg-[#0f1729] hover:bg-[#1a2641] text-white px-5 py-2 rounded-r-lg flex items-center gap-2 text-[13px] font-bold transition-colors">
                            Search
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-5">
                    <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                        <User size={20} />
                    </button>
                    <button className="hidden sm:flex bg-[#F9F0FF] text-[#722ED1] border border-[#D3ADF7] px-3 py-1.5 rounded-lg text-[12px] font-bold items-center gap-2 hover:bg-[#f3e5ff] transition-all active:scale-95">
                        <div className="w-4 h-4 bg-[#722ED1] rounded-full flex items-center justify-center">
                            <span className="text-white text-[9px] font-bold">↑</span>
                        </div>
                        Upgrade
                    </button>
                </div>
            </header>

            <div className="flex flex-1 relative">
                {/* Sidebar Overlay */}
                {isMobile && isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`bg-white border-r border-slate-200 flex flex-col fixed lg:sticky top-14 h-[calc(100vh-56px)] z-50 transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? 'w-60 translate-x-0' : 'w-0 -translate-x-full lg:w-0'
                } overflow-hidden`}>
                    <div className="p-3">
                        <div className="bg-[#FFFBE6] border border-[#FFE58F] p-2.5 rounded-xl flex items-center justify-between cursor-pointer group hover:bg-[#fff9db] transition-colors shadow-sm shadow-yellow-100/50">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-[#FFE58F] shadow-sm">
                                    <Package size={16} className="text-[#FAAD14]" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold leading-none uppercase tracking-tighter">Introducing</p>
                                    <p className="text-[11px] font-black text-[#0f1729] leading-tight mt-0.5">Products For Testing</p>
                                </div>
                            </div>
                            <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-2">
                        {menuItems.map((item, idx) => (
                            <SidebarItem 
                                key={idx} 
                                {...item} 
                                active={pathname === item.href}
                                onClick={() => isMobile && setIsSidebarOpen(false)}
                            />
                        ))}
                    </nav>

                    <div className="p-4 mt-auto border-t border-slate-50">
                        <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-medium">
                            <Link href="#" className="hover:text-[#0A66C2]">Terms & Conditions</Link>
                            <span className="text-slate-200">•</span>
                            <Link href="#" className="hover:text-[#0A66C2]">Privacy Policy</Link>
                        </div>
                        <p className="text-[9px] text-slate-300 mt-2">© 2026 SellerYaari Inc.</p>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto min-w-0">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
