"use client";

import { Button } from "@/components/ui/Button";
import { Search, ShieldCheck, Zap, Server } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 px-4 overflow-hidden">
      
      {/* Orqa fondagi ko'k nur (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-glow pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs font-medium text-primary-400 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
          Yangi avlod NVMe Hosting
        </div>

        {/* Sarlavha */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Loyihangiz uchun <br />
          <span className="text-gradient">mukammal muhit</span>
        </h1>

        {/* Matn */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Tezkor NVMe SSD disklar, kuchli DDoS himoyasi va 99.9% Uptime kafolati. 
          Bizning serverlarimiz orqali saytingizni tezlashtiring.
        </p>

        {/* Domen Qidiruv */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass-card rounded-full p-2 flex items-center">
            <Search className="ml-4 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Mukammal domenni qidiring..." 
              className="w-full bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder:text-gray-500"
            />
            <Button className="rounded-full px-8 py-3">Qidirish</Button>
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