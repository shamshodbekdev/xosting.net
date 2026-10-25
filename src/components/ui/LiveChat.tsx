"use client";

import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 - forma, 2 - chat
const [name, setName] = useState<string>("");
const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<{ name: boolean; phone: boolean }>({ name: false, phone: false });

  const handleStartChat = () => {
    const newErrors = {
      name: name.trim() === "",
      phone: phone.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.phone) {
      setStep(2); // Chatga o'tish
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Orqa fon (Faqat telefonda ko'rinadi) */}
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
        rounded-3xl shadow-2xl 
        transition-all duration-300 z-[100] 
        bg-surface/95 backdrop-blur-xl border border-white/10 
        ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
        overflow-hidden
      `}>
        {/* Sarlavha (Ko'k fon) */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-4 flex justify-between items-center">
          <span className="font-bold text-white text-lg">xosting.net Chat</span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-white/80 hover:text-white bg-white/20 p-1.5 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 ? (
            // 1-qadam: Ism va Telefon
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Assalomu alaykum!</h3>
                <p className="text-sm text-gray-400">Sizga qanday yordam bera olamiz?</p>
              </div>

              <div>
                <input 
                  type="text" 
                  placeholder="Ismingiz *" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: false });
                  }}
                  className={`w-full bg-black/40 border ${errors.name ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 transition-all`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">Ismingizni kiriting</p>}
              </div>

              <div>
                <input 
                  type="tel" 
                  placeholder="+998 90 123 45 67 *" 
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: false });
                  }}
                  className={`w-full bg-black/40 border ${errors.phone ? "border-red-500/50" : "border-white/10"} rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 transition-all`}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1 ml-1">Telefon raqamingizni kiriting</p>}
              </div>

              <button 
                onClick={handleStartChat}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity mt-2"
              >
                Suhbatni boshlash
              </button>
            </div>
          ) : (
            // 2-qadam: Chat (Ism kiritilgandan keyin)
            <div>
              <div className="bg-black/40 rounded-2xl p-4 text-sm text-gray-300 mb-4 h-48 overflow-y-auto flex flex-col gap-3">
                <div className="text-center text-xs text-gray-500 mb-2">Suhbat boshlandi. Operator tez orada javob beradi.</div>
                <div className="bg-primary-500/20 text-white p-3 rounded-xl rounded-tl-none self-start max-w-[80%]">
                  Salom, {name}! Sizga qanday yordam bera olamiz?
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Xabar yozing..." 
                  className="w-full bg-black/40 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary-500 transition-all" 
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Tugmasi (Suzuvchi) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full bg-primary-500/20 border border-primary-500/30 backdrop-blur-md flex items-center justify-center text-primary-400 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:bg-primary-500/30 hover:scale-105 active:scale-95 transition-all z-[100]"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}