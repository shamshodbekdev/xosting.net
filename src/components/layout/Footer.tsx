import Link from "next/link";
import { Send, MessageCircle, Globe, Briefcase } from "lucide-react";

export function Footer() {
  return (
    <footer id="aloqa" className="bg-surface/50 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Logo & Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
          <img 
            src="/logo.png" 
            alt="xosting.net logo" 
            className="w-8 h-8 rounded-lg object-cover" 
          />
              <span className="text-xl font-bold tracking-tight text-white">
                xosting<span className="text-primary-500">.net</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              O'zbekistonda professional hosting va server yechimlari. Ishonchli, tez va xavfsiz.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all">
                <Send size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gray-400 hover:text-white hover:border-primary-500 transition-all">
                <Briefcase size={18} />
              </a>
            </div>
          </div>

          {/* Xizmatlar */}
          <div>
            <h4 className="font-semibold text-white mb-4">Xizmatlar</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#tariflar" className="hover:text-primary-400 transition-colors">Web Hosting</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Domen Ro'yxatdan O'tkazish</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Korporativ Pochta</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">SSL Sertifikatlar</Link></li>
            </ul>
          </div>

          {/* Kompaniya */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kompaniya</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Biz haqimizda</Link></li>
              <li><Link href="#aloqa" className="hover:text-primary-400 transition-colors">Aloqa</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Ommaviy oferta</Link></li>
              <li><Link href="#" className="hover:text-primary-400 transition-colors">Maxfiylik siyosati</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 xosting.net. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>O'zbekistonda ishlab chiqilgan</span>
            <span className="text-red-500">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}