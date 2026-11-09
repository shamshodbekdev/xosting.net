"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = t.raw("items") as { q: string; a: string }[];

  return (
    <section id="faq" className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t("titleBefore")} <span className="text-primary-500">{t("titleHighlight")}</span></h2>
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
                  openIndex === i ? "max-h-72 pb-6 opacity-100" : "max-h-0 opacity-0"
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