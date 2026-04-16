'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    LayoutDashboard, 
    Package, 
    Users, 
    LogOut, 
    MoreHorizontal,
    Menu,
    X
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Sidebar */}
      <aside className={`bg-[#0f1729] text-white transition-all duration-300 fixed md:static h-full z-40 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="p-6 flex items-center justify-between">
            {isSidebarOpen && (
                <span className="text-xl font-bold tracking-tight">Admin<span className="text-[#0A66C2]">Panel</span></span>
            )}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>

        <nav className="mt-10 px-4 space-y-2">
            {menuItems.map((item) => (
                <Link 
                    key={item.name} 
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#0A66C2] transition-all group"
                >
                    <item.icon size={20} className="shrink-0" />
                    {isSidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
            ))}
        </nav>

        <div className="absolute bottom-10 left-0 right-0 px-4">
            <button 
                onClick={() => signOut()}
                className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-500/20 text-red-400 transition-all"
            >
                <LogOut size={20} className="shrink-0" />
                {isSidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-200 p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#0f1729]">Workspace</h2>
            <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500 font-medium">Admin Mode</span>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0A66C2]">
                    <MoreHorizontal size={20} />
                </div>
            </div>
        </header>

        <div className="p-8">
            {children}
        </div>
      </main>
    </div>
  );
}
