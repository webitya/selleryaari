'use client';
import WhatsAppIcon from './WhatsAppIcon';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917300067345?text=Hi%20SellerYaari,%20I'm%20interested%20in%20your%20services!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[90] bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all hover:scale-110 active:scale-95 group flex items-center gap-2"
      aria-label="Contact on WhatsApp"
    >
      <div className="relative">
        <WhatsAppIcon size={24} className="text-white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
      </div>
      <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500 font-bold text-sm whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}
