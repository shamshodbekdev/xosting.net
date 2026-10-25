"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 glass-card rounded-2xl p-4 mb-4 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-white">Livechat</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="bg-black/20 rounded-xl p-4 text-sm text-gray-400 mb-4 h-32 flex items-center justify-center">
            Salom! Sizga qanday yordam bera olamiz?
          </div>
          <input type="text" placeholder="Xabar yozing..." className="w-full bg-black/20 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500" />
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}