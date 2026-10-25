import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Jasurbek T.",
      role: "Backend Dasturchi",
      text: "Django loyihalarim uchun juda tez serverlar. NVMe disklar haqiqatan ham sezilarli farq qiladi. Support 24/7 ishlaydi, har qanday savolga tez javob berishadi.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Malika K.",
      role: "Marketolog",
      text: "Bizning korporativ saytimiz shu yerda joylashgan. DDoS hujumlariga chidamliligi va 99.99% uptime kafolati biznesimiz uchun juda muhim. Narxlar ham hamyonbop.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Sardor M.",
      role: "Loyiha Menejeri",
      text: "ISPmanager paneli juda qulay. Yangi domen va SSL ulash bir necha daqiqada hal bo'ladi. Texnik yordam xizmati chindan ham professional darajada.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/46.jpg"
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
                <img 
                  src={review.image} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-500/20"
                />
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