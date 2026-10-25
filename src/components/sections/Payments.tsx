export function Payments() {
  const payments = [
    { name: "Payme", logo: "/tolov-tizimlar/payme-uz-icon.png" },
    { name: "Click", logo: "/tolov-tizimlar/click-uz-icon.png" },
    { name: "Paynet", logo: "/tolov-tizimlar/paynet.png" },
    { name: "Xazna", logo: "/tolov-tizimlar/xazna.png" },
    { name: "Humo", logo: "/tolov-tizimlar/humo.png" },
    { name: "Ucard", logo: "/tolov-tizimlar/uzcard.png" },
    { name: "Oson", logo: "/tolov-tizimlar/oson.png" },
    { name: "Plum", logo: "/tolov-tizimlar/plum-uz.png" },
    { name: "Paylov", logo: "/tolov-tizimlar/paylov-uz.png" },
    { name: "Visa", logo: "/tolov-tizimlar/visa.png" },
    { name: "Mastercard", logo: "/tolov-tizimlar/mastercard.png" },
    { name: "Crypto", logo: "/tolov-tizimlar/crypto.png" },
  ];

  // Uzluksiz harakatlanish uchun ro'yxatni ikki marta takrorlaymiz
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
              className="glass-card px-6 py-4 rounded-2xl flex items-center justify-center min-w-[120px] h-[70px] shrink-0 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <img 
                src={payment.logo} 
                alt={payment.name} 
                className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}