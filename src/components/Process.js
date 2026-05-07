import { MousePointer2, Settings, Rocket, LineChart } from 'lucide-react';

const steps = [
  { icon: MousePointer2, title: "Find", desc: "Select from our researched winning product lists." },
  { icon: Settings, title: "Setup", desc: "We build and configure your automated store." },
  { icon: Rocket, title: "Launch", desc: "Go live with our proven marketing frameworks." },
  { icon: LineChart, title: "Scale", desc: "Use our data to scale your winning campaigns." },
];

export default function Process() {
  return (
    <section id="process" className="py-10 bg-[#F9F9F9] font-inter">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-[14px] font-bold text-[#1a1a1a] uppercase tracking-tight whitespace-nowrap">The Process</h2>
          <div className="h-px bg-slate-100 flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 bg-black text-[#F4BC1C] rounded-lg flex items-center justify-center shrink-0 font-bold text-sm">
                0{i + 1}
              </div>
              <div>
                <h3 className="text-[12px] font-bold text-[#1a1a1a] uppercase mb-1 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-[10px] leading-relaxed font-medium uppercase tracking-wider">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
