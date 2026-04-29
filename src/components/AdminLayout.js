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
    Image as ImageIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';

const SidebarItem = ({ icon: Icon, label, href, active, badge }) => (
    <Link 
        href={href || '#'} 
        className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
            active ? 'bg-[#F0F7FF] text-[#0A66C2] border-r-2 border-[#0A66C2]' : 'text-slate-600 hover:bg-slate-50'
        }`}
    >
        <div className="flex items-center gap-3">
            <Icon size={20} className={active ? 'text-[#0A66C2]' : 'text-slate-400'} />
            <span>{label}</span>
        </div>
        {badge && (
            <span className="bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
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

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  if (status === 'loading' || !session) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#0A66C2] border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-medium">Securing session...</p>
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
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
          <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                  <span className="text-2xl font-black text-[#0f1729]">
                      selleryaari<span className="text-[#0A66C2]">.</span>
                  </span>
                  <span className="bg-[#0f1729] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                      Admin
                  </span>
              </Link>
          </div>

          <div className="flex-1 max-w-xl mx-12">
              <div className="relative flex items-center">
                  <input
                      type="text"
                      placeholder="Search for anything..."
                      className="w-full bg-[#F5F5F5] border-none rounded-md py-2 px-10 text-sm focus:ring-2 focus:ring-[#0A66C2]/10 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={18} className="absolute left-3 text-slate-400" />
              </div>
          </div>

          <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                  <div className="w-2 h-2 rounded-full bg-[#0A66C2] animate-pulse" />
                  <span className="text-[10px] font-bold text-[#0A66C2] uppercase">Live Mode</span>
              </div>
              <button className="text-slate-600 hover:text-[#0f1729] relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-[#0f1729]">{session.user?.name || 'Admin'}</p>
                      <p className="text-[10px] text-slate-500">{session.user?.email}</p>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-[#F0F7FF] flex items-center justify-center text-[#0A66C2] border border-blue-100">
                      <UserIcon size={20} />
                  </button>
              </div>
          </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-16 h-[calc(100vh-64px)]">
            <nav className="flex-1 py-6">
                <div className="px-6 mb-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Menu</p>
                </div>
                {menuItems.map((item) => (
                    <SidebarItem 
                        key={item.name} 
                        label={item.name}
                        icon={item.icon}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
            <div className="p-8 max-w-7xl mx-auto">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
}
