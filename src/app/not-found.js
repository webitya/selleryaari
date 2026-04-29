import DashboardLayout from '@/components/DashboardLayout';

export default function NotFound() {
    return (
        <DashboardLayout>
            <div className="h-full flex items-center justify-center p-8">
                <div className="flex items-center gap-10">
                    <h1 className="text-6xl font-black text-[#0f1729]">404</h1>
                    <div className="w-[1px] h-12 bg-slate-300" />
                    <p className="text-xl text-slate-500">This page could not be found.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}
