export function Payments() {
  const payments = [
    "Payme", "Click", "Paynet", "Xazna", "Humo", "Ucard", 
    "Oson", "Plum", "Visa", "Mastercard", "Crypto"
  ];

  // Ro'yxatni ikki marta takrorlaymiz, shunda uzluksiz aylanadi
  const marqueeItems = [...payments, ...payments];

  return (
    <section className="py-16 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 uppercase tracking-widest mb-8">
          Qulay va xavfsiz to'lov tizimlari orqali to'lang
        </p>
      </div>
      
      {/* Harakatlanuvchi qism */}
      <div className="relative w-full max-w-[1200px] mx-auto overflow-hidden mask-image">
        <div className="flex w-max animate-marquee gap-4 md:gap-8 items-center">
          {marqueeItems.map((payment, i) => (
            <div 
              key={i} 
              className="glass-card px-8 py-4 rounded-xl flex items-center justify-center min-w-[140px] shrink-0"
            >
              <span className="text-lg font-bold text-white/80">{payment}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}