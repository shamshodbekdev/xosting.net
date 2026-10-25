"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Orqa fon (Faqat telefonda ko'rinadi, shaffof va xira) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/70 backdrop-blur-md z-[90] md:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}
      
      {/* Chat Oynasi */}
      <div className={`
        fixed bottom-24 right-4 w-[calc(100vw-2rem)] max-w-sm 
        md:absolute md:bottom-16 md:right-0 
        rounded-3xl p-5 shadow-2xl 
        transition-all duration-300 z-[100] 
        bg-surface/90 backdrop-blur-xl border border-white/10 
        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}>
        {/* Sarlavha */}
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold text-white text-lg">Livechat</span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-gray-400 hover:text-white bg-white/5 p-2 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Xabarlar maydoni */}
        <div className="bg-black/40 rounded-2xl p-4 text-sm text-gray-300 mb-4 h-40 flex items-center justify-center text-center border border-white/5">
          Salom! Sizga qanday yordam bera olamiz?
        </div>

        {/* Xabar yozish */}
        <input 
          type="text" 
          placeholder="Xabar yozing..." 
          className="w-full bg-black/40 border border-white/10 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all" 
        />
      </div>

      {/* Chat Tugmasi */}
<button 
  onClick={() => setIsOpen(!isOpen)}
  className="relative w-14 h-14 rounded-full bg-primary-500/20 border border-primary-500/30 backdrop-blur-md flex items-center justify-center text-primary-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:bg-primary-500/30 hover:scale-105 active:scale-95 transition-all z-[100]"
>
  {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
</button>
    </div>
  );
}