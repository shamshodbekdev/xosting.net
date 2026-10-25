import Link from "next/link";
import { Send, MessageCircle, Globe, Briefcase, Phone, Mail, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer id="aloqa" className="bg-background border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Orqa fonda yumshoq ko'k nur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1-ustun: Logo va tavsif */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <img 
                src="/logo.png" 
                alt="xosting.net logo" 
                className="w-9 h-9 rounded-lg object-cover group-hover:scale-105 transition-transform" 
              />
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-primary-400 transition-colors">
                xosting<span className="text-primary-500">.net</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              O'zbekistonda professional hosting va server yechimlari. Ishonchli, tez va xavfsiz. Bizning serverlarimiz sizning loyihangiz uchun eng yaxshi muhitni ta'minlaydi.
            </p>
            <div className="flex gap-3">
              <a href="https://t.me/xosting_support" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all">
                <Send size={18} />
              </a>
              <a href="https://t.me/xosting_net" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-all">
                <Briefcase size={18} />
              </a>
            </div>
          </div>

          {/* 2-ustun: Xizmatlar */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Xizmatlar</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#tariflar" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Web Hosting</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Domen Ro'yxatdan O'tkazish</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Korporativ Pochta</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> SSL Sertifikatlar</Link></li>
            </ul>
          </div>

          {/* 3-ustun: Kompaniya */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Kompaniya</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Biz haqimizda</Link></li>
              <li><Link href="#aloqa" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Aloqa</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Ommaviy oferta</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Maxfiylik siyosati</Link></li>
            </ul>
          </div>

          {/* 4-ustun: Aloqa */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Aloqa</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Send size={18} className="text-primary-500 shrink-0" />
                <a href="https://t.me/xosting_support" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @xosting_support <span className="text-xs text-gray-500 block">(Support)</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <a href="tel:+998945094909" className="hover:text-white transition-colors">+998 94 509 49 09</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <a href="mailto:info@xosting.net" className="hover:text-white transition-colors">info@xosting.net</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="text-primary-500 shrink-0" />
                <a href="https://t.me/xosting_net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @xosting_net <span className="text-xs text-gray-500 block">(Guruh)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Pastki qism (Mualliflik) */}
        <div className="border-t border-white/5 pt-8 flex items-center justify-center">
          <p className="text-sm text-gray-500">
            © 2026 <span className="text-white font-medium">xosting.net</span>. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}