import { ShieldCheck, Users, Clock, Zap } from "lucide-react";

export function TrustBar() {
  const stats = [
    { icon: ShieldCheck, value: "99.99%", label: "Uptime Kafolati" },
    { icon: Users, value: "1000+", label: "Faol Mijozlar" },
    { icon: Clock, value: "24/7", label: "Texnik Yordam" },
    { icon: Zap, value: "NVMe", label: "Tezkor Disklar" },
  ];

  return (
    <section className="border-y border-white/5 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <stat.icon className="text-primary-500 mb-2 md:mb-3" size={24} />
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}