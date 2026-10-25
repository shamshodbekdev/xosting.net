"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { FadeIn } from "@/components/ui/FadeIn";

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Start",
      desc: "Kichik loyihalar va boshlang'ich saytlar uchun",
      priceMonthly: 12000,
      priceYearly: 9600,
      features: ["5 GB NVMe SSD", "1 ta Sayt", "1 ta Email", "1 ta Database", "Bepul SSL", "10% CPU, 256MB RAM"],
      popular: false,
    },
    {
      name: "Business",
      desc: "Kichik biznes va bir necha saytlar uchun",
      priceMonthly: 29000,
      priceYearly: 23200,
      features: ["15 GB NVMe SSD", "5 ta Sayt", "10 ta Email", "5 ta Database", "Bepul SSL", "25% CPU, 512MB RAM", "Avtomatik Backup"],
      popular: true,
    },
    {
      name: "Premium",
      desc: "O'rta loyihalar va ko'p resurs talab qiladigan saytlar uchun",
      priceMonthly: 59000,
      priceYearly: 47200,
      features: ["40 GB NVMe SSD", "20 ta Sayt", "50 ta Email", "20 ta Database", "Bepul SSL", "50% CPU, 1GB RAM", "Avtomatik Backup", "LiteSpeed Cache"],
      popular: false,
    },
    {
      name: "Ultimate",
      desc: "Yirik loyihalar va yuqori trafik uchun",
      priceMonthly: 99000,
      priceYearly: 79200,
      features: ["100 GB NVMe SSD", "Cheksiz Sayt", "Cheksiz Email", "Cheksiz Database", "Bepul SSL", "75% CPU, 2GB RAM", "Avtomatik Backup", "Priority Support"],
      popular: false,
    },
  ];

  return (
    <section id="tariflar" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Moslashuvchan <span className="text-primary-500">Narxlar</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Hosting tariflar. Loyihangiz hajmidan qat'i nazar, bizda siz uchun mos yechim bor.
            </p>

            <div className="inline-flex items-center p-1 glass-card rounded-full">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  !isYearly ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                )}
              >
                Oylik
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  isYearly ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white"
                )}
              >
                Yillik
                <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded-full">-20%</span>
              </button>
            </div>
          </div>
        </FadeIn>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                className={cn(
                  "glass-card p-8 rounded-3xl relative flex flex-col h-full",
                  plan.popular && "border-primary-500/50 bg-primary-500/5"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    TAVSIYA ETILADI
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 min-h-[40px]">{plan.desc}</p>
                </div>

                <div className="mb-8">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {isYearly ? formatPrice(plan.priceYearly) : formatPrice(plan.priceMonthly)}
                  </span>
                  <span className="text-gray-400 ml-2">so'm / oy</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check size={18} className="text-primary-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant={plan.popular ? "primary" : "secondary"} className="w-full">
                  Tanlash
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}