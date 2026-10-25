import { Zap, Shield, Lock, Code2, Database, RotateCcw } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export function Features() {
  const features = [
    { icon: Zap, title: "NVMe SSD Disklar", desc: "An'anaviy SSD'dan 10 baravar tezroq. Saytingiz bir zumda ochiladi." },
    { icon: Lock, title: "Bepul SSL Sertifikat", desc: "Barcha saytlaringiz avtomatik ravishda HTTPS bilan himoyalanadi." },
    { icon: Shield, title: "DDoS Himoyasi", desc: "Kuchli L3-L7 darajasidagi himoya. Hujumlar sizning saytingizga yetib kelmaydi." },
    { icon: Code2, title: "PHP, Python, Node.js", desc: "WordPress, Laravel, Django yoki Express — o'zingizga qulay stekda ishlang." },
    { icon: Database, title: "MySQL va PostgreSQL", desc: "Ma'lumotlar bazalarini ISPmanager paneli orqali bir necha bosishda boshqaring." },
    { icon: RotateCcw, title: "Avtomatik Zaxira", desc: "Ma'lumotlaringiz har kuni avtomatik saqlanadi. Xavotir olmang." }
  ];

  return (
    <section id="imkoniyatlar" className="py-16 md:py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Har bir tarifda kerak <br />
              <span className="text-gray-500">bo'ladigan hamma narsa</span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-base md:text-lg">
              Bizning hosting xizmatlarimiz zamonaviy veb-saytlar uchun zarur bo'lgan barcha vositalar bilan jihozlangan.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card p-6 md:p-8 rounded-2xl group cursor-default h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary-500/20 transition-colors">
                  <feature.icon className="text-primary-400" size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}