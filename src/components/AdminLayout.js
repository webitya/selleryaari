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
    ChevronRight,
    Menu,
    X,
    ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';

const SidebarItem = ({ icon: Icon, label, href, active, badge, onClick }) => (
    <Link 
        href={href || '#'} 
        onClick={onClick}
        className={`flex items-center justify-between px-6 py-3.5 text-[13px] font-black uppercase tracking-widest transition-all ${
            active 
            ? 'bg-[#F0F7FF] text-[#0A66C2] border-r-4 border-[#0A66C2]' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-[#0f1729]'
        }`}
    >
        <div className="flex items-center gap-3">
            <Icon size={18} className={active ? 'text-[#0A66C2]' : 'text-slate-400 group-hover:text-slate-600'} />
            <span>{label}</span>
        </div>
        {badge && (
            <span className="bg-red-50 text-red-500 text-[10px] font-black px-1.5 py-0.5 rounded-full">
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
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading' || !session) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-4 border-[#0A66C2] border-t-transparent rounded-full animate-spin shadow-xl shadow-blue-100" />
                <div className="text-center">
                    <p className="text-[#0f1729] font-black uppercase tracking-[0.2em] text-sm">System Secure</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Initializing workspace...</p>
                </div>
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-inter">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-[60] shadow-sm">
          <div className="flex items-center gap-4">
              <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 lg:hidden"
              >
                  {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <Link href="/" className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0f1729] tracking-tighter">
                      selleryaari<span className="text-[#0A66C2]">.</span>
                  </span>
                  <div className="hidden sm:flex items-center gap-1.5 bg-[#0f1729] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                      <ShieldCheck size={10} />
                      Admin
                  </div>
              </Link>
          </div>

          <div className="flex-1 max-w-xl mx-8 hidden lg:block">
              <div className="relative flex items-center">
                  <input
                      type="text"
                      placeholder="Search for metrics, leads or products..."
                      className="w-full bg-[#F5F5F5] border-none rounded-xl py-2.5 px-11 text-xs font-bold focus:bg-white focus:ring-4 focus:ring-[#0A66C2]/5 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={16} className="absolute left-4 text-slate-400" />
              </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
              <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl relative transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                  <div className="text-right hidden sm:block">
                      <p className="text-[11px] font-black text-[#0f1729] uppercase tracking-tighter">{session.user?.name || 'Admin User'}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Root Access</p>
                  </div>
                  <button className="w-10 h-10 rounded-xl bg-[#F0F7FF] flex items-center justify-center text-[#0A66C2] border border-blue-100 shadow-sm transition-transform active:scale-95">
                      <UserIcon size={20} />
                  </button>
              </div>
          </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar Overlay for Mobile */}
        {isMobile && isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[55] transition-opacity"
                onClick={() => setIsSidebarOpen(false)}
            />
        )}

        {/* Sidebar */}
        <aside className={`bg-white border-r border-slate-200 flex flex-col fixed lg:sticky top-16 h-[calc(100vh-64px)] z-[56] transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:w-0'
        } overflow-hidden shadow-xl lg:shadow-none`}>
            <nav className="flex-1 py-8">
                <div className="px-6 mb-6">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none">Management</p>
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

            <div className="p-4 border-t border-slate-50">
                <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-[11px] uppercase tracking-widest active:scale-95 shadow-sm hover:shadow-md"
                >
                    <LogOut size={18} />
                    Terminal Exit
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] min-w-0">
            <div className="p-4 sm:p-8 max-w-7xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
}
