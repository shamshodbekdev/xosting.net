"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Xosting sotib olgandan keyin qancha vaqtda aktivlashadi?",
      a: "To'lov amalga oshirilganidan so'ng hosting xizmatlari avtomatik ravishda, bir necha daqiqa ichida aktivlashadi va sizga barcha kirish ma'lumotlari email orqali yuboriladi."
    },
    {
      q: "Boshqa provayderdan saytimni ko'chirib o'ta olamanmi?",
      a: "Ha, albatta! Bizning texnik jamoamiz sizning saytingizni boshqa provayderdan bizga bepul va hech qanday ma'lumot yo'qotishsiz ko'chirib o'tishga yordam beradi."
    },
    {
      q: "Qaysi to'lov usullari mavjud?",
      a: "Bizda Payme, Click, Paynet, Xazna, Humo, Ucard, Oson, Plum, Visa, Mastercard va kriptovalyutalar orqali to'lov qilish mumkin."
    },
    {
      q: "DDoS hujumlardan himoya bormi?",
      a: "Ha, barcha tariflarimiz L3-L7 darajasidagi kuchli DDoS himoyasi bilan jihozlangan. Hujumlar sizning saytingizga yetib kelmaydi."
    },
    {
      q: "Texnik yordam qanday ishlaydi?",
      a: "Bizning 24/7 texnik yordam jamoamiz Telegram, Livechat va telefon orqali doim aloqada. Har qanday muammoni tezda hal qilamiz."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Tez-tez So'raladigan <span className="text-primary-500">Savollar</span></h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronDown 
                  size={20} 
                  className={cn("text-gray-400 transition-transform duration-300", openIndex === i && "rotate-180")} 
                />
              </button>
              <div 
                className={cn(
                  "px-6 overflow-hidden transition-all duration-300 text-gray-400 leading-relaxed",
                  openIndex === i ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}