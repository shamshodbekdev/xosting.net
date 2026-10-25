import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 glass-card p-12 md:p-20 rounded-[3rem]">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Loyihangizni Biz Bilan <br /> <span className="text-gradient">Boshlang</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Bugunoq ro'yxatdan o'ting va birinchi oylik hosting uchun 20% chegirmaga ega bo'ling. Sifatni sinab ko'rish uchun ajoyib imkoniyat!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto">Hisob yaratish</Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">Operator bilan bog'lanish</Button>
        </div>
      </div>
    </section>
  );
}