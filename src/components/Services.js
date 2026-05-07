import { Search, Package, ShoppingCart, BarChart3, Globe, ShieldCheck } from 'lucide-react';

const services = [
  { icon: Search, title: "Product Research", desc: "Data-backed winning products with high margins." },
  { icon: Package, title: "Supplier Sourcing", desc: "Direct links to verified Indian wholesalers." },
  { icon: ShoppingCart, title: "Store Setup", desc: "Conversion-optimized Shopify/Woo stores." },
  { icon: BarChart3, title: "Marketing", desc: "High-ROI ad templates and strategy." },
  { icon: Globe, title: "Scaling", desc: "Support for multi-platform expansion." },
  { icon: ShieldCheck, title: "Compliance", desc: "GST and business registration assistance." },
];

export default function Services() {
  return (
    <section id="services" className="py-10 bg-white font-inter">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-[14px] font-bold text-[#1a1a1a] uppercase tracking-tight whitespace-nowrap">Core Services</h2>
          <div className="h-px bg-slate-100 flex-1" />
          <span className="text-[8px] font-bold text-[#D4A017] uppercase tracking-widest bg-[#FFFBE6] px-2 py-0.5 rounded border border-[#FFE58F] whitespace-nowrap">Full Support</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {services.map((service, i) => (
            <div key={i} className="group p-4 rounded-xl border border-slate-50 hover:border-[#F4BC1C]/20 hover:bg-[#F9F9F9] transition-all flex flex-col items-center text-center">
              <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#F4BC1C] transition-colors">
                <service.icon size={18} className="text-[#1a1a1a]" />
              </div>
              <h3 className="text-[11px] font-bold text-[#1a1a1a] uppercase mb-1.5 tracking-tight">{service.title}</h3>
              <p className="text-slate-500 text-[9px] leading-relaxed font-medium">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
