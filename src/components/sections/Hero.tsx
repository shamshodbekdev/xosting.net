"use client";

import { Button } from "@/components/ui/Button";
import { Search, ShieldCheck, Zap, Server } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-4 overflow-hidden">
      
      {/* Orqa fondagi ko'k nur (Glow) */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* Chap tomondagi ko'k nur */}
  <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] animate-aurora" />
  {/* O'ng tomondagi cyan nur */}
  <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-[100px] animate-aurora" style={{ animationDelay: '-5s' }} />
</div>
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-medium text-primary-400 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
          Yangi avlod NVMe Hosting
        </div>

        {/* Sarlavha */}
<h1 className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
  Loyihangiz uchun <br />
  <span className="text-gradient">mukammal muhit</span>
</h1>

        {/* Matn */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Tezkor NVMe SSD disklar, kuchli DDoS himoyasi va 99.99% Uptime kafolati. 
          Bizning serverlarimiz orqali saytingizni tezlashtiring.
        </p>

        {/* Domen Qidiruv */}
<div className="max-w-2xl mx-auto mb-12 group">
  <div className="glass-card rounded-full p-2 flex items-center transition-all duration-300 group-hover:border-primary-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] group-focus-within:border-primary-500 group-focus-within:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
    <Search className="ml-4 text-gray-400 group-focus-within:text-primary-400 transition-colors" size={20} />
    <input 
      type="text" 
      placeholder="Mukammal domenni qidiring..." 
      className="w-full bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-gray-500"
    />
<Button className="rounded-full px-8 py-3 bg-white text-black font-semibold hover:bg-gray-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)]">
  Qidirish
</Button>
   </div>
</div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-primary-500" />
            Top Xavfsizlik
          </div>
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-accent-400" />
            NVMe Tezlik
          </div>
          <div className="flex items-center gap-2">
            <Server size={18} className="text-primary-400" />
            Premium Qo'llab-quvvatlash
          </div>
        </div>

      </div>
    </section>
  );
}