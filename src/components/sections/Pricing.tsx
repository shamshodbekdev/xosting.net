"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";

export function Pricing() {
  const t = useTranslations("Pricing");
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    { key: "start", name: "Start", priceMonthly: 12000, priceYearly: 9600 },
    { key: "business", name: "Business", priceMonthly: 29000, priceYearly: 23200 },
    { key: "premium", name: "Premium", priceMonthly: 59000, priceYearly: 47200 },
    { key: "ultimate", name: "Ultimate", priceMonthly: 99000, priceYearly: 79200 },
  ] as const;

  return (
    <section id="tariflar" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {t("titleBefore")} <span className="text-primary-500">{t("titleHighlight")}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>

            <div className="inline-flex items-center p-1 glass-card rounded-full">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  !isYearly ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                )}
              >
                {t("monthly")}
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  isYearly ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                )}
              >
                {t("yearly")}
                <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">{t("yearlyDiscount")}</span>
              </button>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card p-8 rounded-3xl relative flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 min-h-[40px]">{t(`plans.${plan.key}.desc`)}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">
                    {isYearly ? formatPrice(plan.priceYearly) : formatPrice(plan.priceMonthly)}
                  </span>
                  <span className="text-gray-400 ml-2">{t("perMonth")}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {(t.raw(`plans.${plan.key}.features`) as string[]).map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check size={18} className="text-primary-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="secondary" className="w-full">
                  {t("choose")}
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}