import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Jasurbek T.",
      role: "Backend Dasturchi",
      text: "Django loyihalarim uchun juda tez serverlar. NVMe disklar haqiqatan ham sezilarli farq qiladi. Support 24/7 ishlaydi, har qanday savolga tez javob berishadi.",
      rating: 5
    },
    {
      name: "Malika K.",
      role: "Marketolog",
      text: "Bizning korporativ saytimiz shu yerda joylashgan. DDoS hujumlariga chidamliligi va 99.9% uptime kafolati biznesimiz uchun juda muhim. Narxlar ham hamyonbop.",
      rating: 5
    },
    {
      name: "Sardor M.",
      role: "Loyiha Menejeri",
      text: "ISPmanager paneli juda qulay. Yangi domen va SSL ulash bir necha daqiqada hal bo'ladi. Texnik yordam xizmati chindan ham professional darajada.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-4 relative bg-surface/30 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Mijozlarimiz <span className="text-primary-500">Fikri</span>
          </h2>
          <p className="text-gray-400 text-lg">Foydalanuvchilarimiz biz haqimizda nima deyishmoqda?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl relative">
              <Quote className="absolute top-6 right-6 text-white/5" size={48} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={16} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}