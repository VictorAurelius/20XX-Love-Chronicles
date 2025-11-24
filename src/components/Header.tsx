'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getDaysSince } from '@/lib/date-utils';
import coupleInfo from '@/data/couple-info.json';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loveDays, setLoveDays] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Calculate love days
    const days = getDaysSince(coupleInfo.couple.relationship.startDate);
    setLoveDays(days);

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/#timeline', label: 'Hành Trình' },
    { href: '/gallery', label: 'Thư Viện Ảnh' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-romantic shadow-romantic'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="text-4xl animate-heart-beat">💕</span>
            <div>
              <h1 className="text-2xl font-heading font-bold text-gradient-romantic">
                Love Chronicles
              </h1>
              <p className="text-xs text-romantic-rose font-accent">
                {coupleInfo.couple.relationship.motto}
              </p>
            </div>
          </Link>

          {/* Love Counter - Desktop */}
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-romantic-1 shadow-romantic">
            <span className="text-xl">💖</span>
            <div className="text-center">
              <p className="text-2xl font-bold text-romantic-deepRose">{loveDays}</p>
              <p className="text-xs font-medium text-gray-700">ngày bên nhau</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-accent font-semibold text-gray-800 hover:text-romantic-deepRose transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-romantic-deepRose transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-romantic-softGray transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-romantic-rose"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 space-y-4 animate-fade-in">
            {/* Love Counter - Mobile */}
            <div className="flex items-center justify-center space-x-2 px-4 py-3 rounded-full bg-gradient-romantic-1 shadow-romantic">
              <span className="text-xl">💖</span>
              <div className="text-center">
                <p className="text-2xl font-bold text-romantic-deepRose">{loveDays}</p>
                <p className="text-xs font-medium text-gray-700">ngày bên nhau</p>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-center text-lg font-accent font-semibold text-gray-800 hover:bg-romantic-softGray rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
