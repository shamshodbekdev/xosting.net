import { useTranslations } from "next-intl";
import { Quote, Star } from "lucide-react";

const IMAGES = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
];

export function Testimonials() {
  const t = useTranslations("Testimonials");

  const texts = t.raw("reviews") as { name: string; role: string; text: string }[];
  const reviews = texts.map((review, i) => ({ ...review, rating: 5, image: IMAGES[i] }));

  return (
    <section className="py-24 px-4 relative bg-surface/30 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("titleBefore")} <span className="text-primary-500">{t("titleHighlight")}</span>
          </h2>
          <p className="text-gray-400 text-lg">{t("subtitle")}</p>
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