"use client";

import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "#tariflar", key: "pricing" },
  { href: "#imkoniyatlar", key: "features" },
  { href: "#faq", key: "faq" },
  { href: "#aloqa", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menyu ochilganda ekran aylanishini to'xtatish
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div className={`w-full max-w-6xl glass-card rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 z-50 relative ${scrolled ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-white/5"}`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center group z-50">
          <img
            src="/logo-full.png"
            alt="xosting.net"
            className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, key }) => (
            <NextLink key={key} href={href} className="text-sm text-gray-300 hover:text-white transition-colors">
              {t(key)}
            </NextLink>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2">
            {t("login")}
          </Link>
          <Button size="sm">{t("getStarted")}</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white z-50 relative p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-2xl z-40 md:hidden"
            />
                      
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-x-4 top-24 z-50 rounded-3xl p-6 flex flex-col gap-2 md:hidden bg-surface/90 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)]"
            >
              {NAV_LINKS.map(({ href, key }) => (
                <NextLink
                  key={key}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-200 hover:text-white text-lg py-4 border-b border-white/5 font-medium"
                >
                  {t(key)}
                </NextLink>
              ))}
              <div className="py-4 border-b border-white/5">
                <LanguageSwitcher variant="inline" onChange={() => setIsOpen(false)} />
              </div>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-200 hover:text-white text-lg py-4 font-medium">
                {t("login")}
              </Link>
              <Button className="w-full mt-4 py-6 text-lg" onClick={() => setIsOpen(false)}>{t("getStarted")}</Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}