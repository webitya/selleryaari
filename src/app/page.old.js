import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      
      <section id="products" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f1729] mt-4 mb-4">
              Latest <span className="text-[#0A66C2]">Winning Products</span>
            </h2>
            <p className="text-slate-500 mb-12 max-w-xl mx-auto">
                We research thousands of products to find the ones that actually sell. Register to see the full list.
            </p>
            
            <ProductGrid />
        </div>
      </section>

      <Process />
      
      {/* Stats Section */}
      <section className="py-20 bg-[#0A66C2]">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
                <div>
                    <div className="text-4xl font-black mb-2">500+</div>
                    <div className="text-blue-100 text-sm">Stores Launched</div>
                </div>
                <div>
                    <div className="text-4xl font-black mb-2">12k+</div>
                    <div className="text-blue-100 text-sm">Winner Products</div>
                </div>
                <div>
                    <div className="text-4xl font-black mb-2">$2M+</div>
                    <div className="text-blue-100 text-sm">Ad Spend Managed</div>
                </div>
                <div>
                    <div className="text-4xl font-black mb-2">98%</div>
                    <div className="text-blue-100 text-sm">Client Satisfaction</div>
                </div>
            </div>
        </div>
      </section>

      <LeadForm />
      <FAQ />
      <Footer />
    </main>
  );
}
