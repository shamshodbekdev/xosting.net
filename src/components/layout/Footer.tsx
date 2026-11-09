import Link from "next/link";
import { useTranslations } from "next-intl";
import { Link as LocaleLink } from "@/i18n/navigation";
import { Send, MessageCircle, Globe, Briefcase, Phone, Mail, ChevronRight } from "lucide-react";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer id="aloqa" className="bg-background border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Orqa fonda yumshoq ko'k nur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1-ustun: Logo va tavsif */}
          <div className="col-span-1 lg:col-span-1">
            <LocaleLink href="/" className="inline-flex items-center mb-6 group">
              <img
                src="/logo-full.png"
                alt="xosting.net"
                className="h-9 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </LocaleLink>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              {t("description")}
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
            <h4 className="font-bold text-white mb-6 text-lg">{t("servicesTitle")}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#tariflar" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> {t("webHosting")}</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> {t("domainRegistration")}</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> {t("corporateMail")}</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> {t("sslCertificates")}</Link></li>
            </ul>
          </div>

          {/* 3-ustun: Kompaniya */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">{t("companyTitle")}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> {t("about")}</Link></li>
              <li><Link href="#aloqa" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> {t("contact")}</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> {t("offer")}</Link></li>
              <li><Link href="#" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> {t("privacy")}</Link></li>
            </ul>
          </div>

          {/* 4-ustun: Aloqa */}
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">{t("contactTitle")}</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Send size={18} className="text-primary-500 shrink-0" />
                <a href="https://t.me/xosting_support" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @xosting_support <span className="text-xs text-gray-500 block">{t("support")}</span>
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
                  @xosting_net <span className="text-xs text-gray-500 block">{t("group")}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Pastki qism (Mualliflik) */}
        <div className="border-t border-white/5 pt-8 flex items-center justify-center">
          <p className="text-sm text-gray-500">
            {t.rich("copyright", {
              brand: (chunks) => <span className="text-white font-medium">{chunks}</span>,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}