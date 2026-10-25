"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div className="w-full max-w-6xl glass-card rounded-full px-6 py-3 flex items-center justify-between">
        
{/* Logo */}
<Link href="/" className="flex items-center gap-2 group">
  <img 
    src="/logo.png" 
    alt="xosting.net logo" 
    className="w-8 h-8 rounded-lg object-cover group-hover:scale-105 transition-transform" 
  />
  <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-400 transition-colors">
    xosting<span className="text-primary-500">.net</span>
  </span>
</Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#tariflar" className="text-sm text-gray-300 hover:text-white transition-colors">Tariflar</Link>
          <Link href="#imkoniyatlar" className="text-sm text-gray-300 hover:text-white transition-colors">Imkoniyatlar</Link>
          <Link href="#faq" className="text-sm text-gray-300 hover:text-white transition-colors">FAQ</Link>
          <Link href="#aloqa" className="text-sm text-gray-300 hover:text-white transition-colors">Aloqa</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2">
            Kirish
          </Link>
          <Button size="sm">Boshlash</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6 flex flex-col gap-4 md:hidden">
          <Link href="#tariflar" className="text-gray-300 hover:text-white">Tariflar</Link>
          <Link href="#imkoniyatlar" className="text-gray-300 hover:text-white">Imkoniyatlar</Link>
          <Link href="#faq" className="text-gray-300 hover:text-white">FAQ</Link>
          <hr className="border-white/10" />
          <Link href="/login" className="text-gray-300 hover:text-white">Kirish</Link>
          <Button className="w-full">Boshlash</Button>
        </div>
      )}
    </nav>
  );
}