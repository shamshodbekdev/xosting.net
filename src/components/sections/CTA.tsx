import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

export function CTA() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Orqa fondagi harakatlanuvchi nurlar */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary-600/20 blur-[100px] rounded-full pointer-events-none animate-aurora" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent-500/20 blur-[100px] rounded-full pointer-events-none animate-aurora" style={{ animationDelay: '-5s' }} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden bg-surface/40 backdrop-blur-2xl border border-white/10 p-8 md:p-14 text-center shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            
            {/* Ichki gradient chegara */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Loyihangizni Biz Bilan <br /> 
              <span className="text-gradient">Boshlang</span>
            </h2>
            
            <p className="text-gray-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Bugunoq ro'yxatdan o'ting va birinchi oylik hosting uchun <span className="text-white font-semibold">20% chegirmaga</span> ega bo'ling.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="md" className="w-full sm:w-auto px-8 py-4 text-base">
                Hisob yaratish
              </Button>
              <Button variant="outline" size="md" className="w-full sm:w-auto px-8 py-4 text-base border-white/20 hover:bg-white/5">
                Operator bilan bog'lanish
              </Button>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}