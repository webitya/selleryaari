'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
    LayoutDashboard, 
    Package, 
    Users, 
    LogOut, 
    Search,
    Bell,
    User as UserIcon,
    Menu,
    X,
    ShieldCheck,
    Zap,
    Home
} from 'lucide-react';
import { useState, useEffect } from 'react';

const SidebarItem = ({ icon: Icon, label, href, active, badge, onClick }) => (
    <Link 
        href={href || '#'} 
        onClick={onClick}
        className={`flex items-center justify-between px-4 py-2.5 text-[12px] font-bold uppercase tracking-wider transition-all rounded-lg mx-3 mb-0.5 ${
            active 
            ? 'bg-[#F4BC1C] text-black' 
            : 'text-slate-500 hover:bg-slate-100 hover:text-[#1a1a1a]'
        }`}
    >
        <div className="flex items-center gap-2.5">
            <Icon size={15} className={active ? 'text-black' : 'text-slate-400'} />
            <span>{label}</span>
        </div>
        {badge && (
            <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {badge}
            </span>
        )}
    </Link>
);

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    if (status === 'unauthenticated' || (session && session.user.role !== 'admin')) {
      router.push('/admin/login');
    }
  }, [status, session, router]);

  if (status === 'loading' || !session || session.user.role !== 'admin') {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-[3px] border-[#F4BC1C] border-t-transparent rounded-full animate-spin" />
                <p className="text-[#1a1a1a] font-bold uppercase tracking-widest text-[10px]">Verifying credentials...</p>
            </div>
        </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Products', icon: Package, href: '/admin/products' },
    { name: 'Leads', icon: Users, href: '/admin/leads' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-inter">
      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 sticky top-0 z-[60] shadow-sm">
          <div className="flex items-center gap-3">
              <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 lg:hidden"
              >
                  {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              
              <Link href="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#F4BC1C] rounded-lg flex items-center justify-center">
                      <span className="text-black font-black text-sm">S</span>
                  </div>
                  <span className="text-base font-black text-[#1a1a1a] tracking-tighter hidden sm:block">
                      selleryaari<span className="text-[#F4BC1C]">.</span>
                  </span>
                  <div className="hidden sm:flex items-center gap-1 bg-[#1a1a1a] text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      <ShieldCheck size={8} />
                      Admin
                  </div>
              </Link>
          </div>

          <div className="flex-1 max-w-md mx-6 hidden lg:block">
              <div className="relative flex items-center">
                  <input
                      type="text"
                      placeholder="Search products, leads..."
                      className="w-full bg-[#F5F5F5] border-none rounded-lg py-2 px-9 text-[12px] font-medium focus:bg-white focus:ring-2 focus:ring-[#F4BC1C]/20 transition-all outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={14} className="absolute left-3 text-slate-400" />
              </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/" className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors group" title="Back to Site">
                  <Home size={18} className="group-hover:text-[#F4BC1C]" />
              </Link>
              <button className="p-1.5 text-slate-500 hover:bg-slate-50 rounded-lg relative transition-colors">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
              </button>
              
              <div className="flex items-center gap-2 pl-3 border-l border-slate-100">
                  <div className="text-right hidden sm:block">
                      <p className="text-[11px] font-black text-[#1a1a1a] tracking-tight leading-none uppercase">{session.user?.name || 'Admin'}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">Root Access</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#FFFBE6] flex items-center justify-center text-[#D4A017] border border-[#FFE58F]">
                      <UserIcon size={16} />
                  </div>
              </div>
          </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar Overlay for Mobile */}
        {isMobile && isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] transition-opacity"
                onClick={() => setIsSidebarOpen(false)}
            />
        )}

        {/* Sidebar */}
        <aside className={`bg-white border-r border-slate-100 flex flex-col fixed lg:sticky top-14 h-[calc(100vh-56px)] z-[56] transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-56 translate-x-0' : 'w-0 -translate-x-full lg:w-0'
        } overflow-hidden shadow-lg lg:shadow-none`}>
            <nav className="flex-1 py-4">
                <div className="px-4 mb-3">
                    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Management</p>
                </div>
                {menuItems.map((item) => (
                    <SidebarItem 
                        key={item.name} 
                        label={item.name}
                        icon={item.icon}
                        href={item.href}
                        active={pathname === item.href}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                    />
                ))}
            </nav>

            <div className="p-3 border-t border-slate-50">
                <button 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-all font-bold text-[12px] uppercase tracking-wide active:scale-95"
                >
                    <LogOut size={14} />
                    Sign Out
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F5F5F5] min-w-0">
            <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
}
