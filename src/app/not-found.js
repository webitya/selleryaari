import PublicLayout from '@/components/PublicLayout';

export default function NotFound() {
    return (
        <PublicLayout>
            <div className="min-h-[60vh] flex items-center justify-center p-8 bg-[#F9F9F9] font-outfit">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <h1 className="text-8xl font-black text-[#1a1a1a]">404</h1>
                    <div className="hidden md:block w-[2px] h-20 bg-[#F4BC1C]" />
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-[#1a1a1a] mb-2 uppercase tracking-tight">Oops! Page Not Found</p>
                        <p className="text-slate-500 mb-8 font-medium">The page you are looking for doesn't exist or has been moved.</p>
                        <a href="/" className="inline-block bg-[#F4BC1C] text-black px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-yellow-500/20 hover:scale-105 transition-transform">
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
