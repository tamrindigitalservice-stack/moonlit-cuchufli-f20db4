import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Menu, X, MapPin, Clock, ChevronRight } from 'lucide-react';
import { TDSLogo } from './TDSLogo';
import { BUSINESS_INFO } from '../data/services';

interface HeaderProps {
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'হোম', href: '#home', id: 'home' },
    { name: 'আমাদের পরিষেবা', href: '#services', id: 'services' },
    { name: 'কেন্দ্রীয় পরিষেবা', href: '#central-services', id: 'central-services' },
    { name: 'রাজ্য সরকারি পরিষেবা', href: '#wb-services', id: 'wb-services' },
    { name: 'ডকুমেন্ট নির্দেশিকা', href: '#document-helper', id: 'document-helper' },
    { name: 'আমাদের সম্পর্কে', href: '#about', id: 'about' },
    { name: 'যোগাযোগ', href: '#contact', id: 'contact' },
  ];

  const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('নমস্কার, Tamrin Digital Service থেকে একটি অনলাইন পরিষেবা সম্পর্কে জানতে চাই।')}`;

  return (
    <>
      {/* Top Utility Bar (Hidden on tiny mobile screens) */}
      <div className="bg-[#081A2B] text-[#D9E5F0] text-xs py-1.5 px-4 hidden md:block border-b border-[#1E3A52]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#2DD4BF] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#2DD4BF]" />
              <span className="text-[#D9E5F0]">{BUSINESS_INFO.address}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#D9E5F0]">
              <Clock className="w-3.5 h-3.5 text-[#2DD4BF]" />
              {BUSINESS_INFO.hours}
            </span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <span className="text-[#2DD4BF] bg-[#1E3A52] px-2 py-0.5 rounded border border-[#2DD4BF]/30">
              গ্যারান্টিযুক্ত দ্রুত সেবা
            </span>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-white hover:text-[#2DD4BF] transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-[#2DD4BF]" />
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-[#0B1F33] border-b border-[#1E3A52] ${
          isScrolled
            ? 'bg-[#0B1F33]/95 backdrop-blur-md shadow-xl py-2'
            : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-2 group">
            <TDSLogo className="h-10 sm:h-12" variant="light" showTagline={true} />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeSection === link.id
                    ? 'text-[#2DD4BF] bg-[#1E3A52] font-bold border-b-2 border-[#2DD4BF]'
                    : 'text-white hover:text-[#2DD4BF] hover:bg-[#1E3A52]/70'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons (Desktop) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              id="header-call-btn"
              className="inline-flex items-center gap-2 bg-[#1E3A52] hover:bg-[#152E43] text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-[#2DD4BF]/40 transition-all hover:border-[#2DD4BF]"
            >
              <Phone className="w-4 h-4 text-[#2DD4BF]" />
              <span>Call Now</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="inline-flex items-center gap-2 bg-[#2DD4BF] hover:bg-[#22B8A5] text-[#081A2B] font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 text-[#081A2B]" />
              <span>WhatsApp Now</span>
            </a>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="lg:hidden p-2 rounded-xl text-white hover:bg-[#1E3A52] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0B1F33] border-b border-[#1E3A52] px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="p-3 bg-[#1E3A52] rounded-xl mb-3 text-xs text-[#D9E5F0] font-medium flex items-center justify-between border border-[#1E3A52]">
              <span>{BUSINESS_INFO.sloganPoster}</span>
              <span className="font-bold text-[#2DD4BF]">রামনগর</span>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    activeSection === link.id
                      ? 'text-[#2DD4BF] bg-[#1E3A52] font-bold'
                      : 'text-white hover:text-[#2DD4BF] hover:bg-[#1E3A52]/60'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-[#D9E5F0]" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1E3A52] grid grid-cols-2 gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center justify-center gap-1.5 bg-[#1E3A52] text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-[#1E3A52]"
              >
                <Phone className="w-4 h-4 text-[#2DD4BF]" />
                <span>কল করুন</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-[#2DD4BF] text-[#081A2B] text-xs font-extrabold py-2.5 px-3 rounded-xl shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1F33]/95 backdrop-blur-md border-t border-[#1E3A52] p-2 sm:hidden flex items-center justify-around gap-2 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#1E3A52] text-white font-bold text-xs py-2.5 px-3 rounded-xl active:scale-95 transition-transform border border-[#1E3A52]"
        >
          <Phone className="w-4 h-4 text-[#2DD4BF]" />
          <span>Call Now</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#2DD4BF] text-[#081A2B] font-extrabold text-xs py-2.5 px-3 rounded-xl active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
};
