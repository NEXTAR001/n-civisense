import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { languageList, LanguageCode } from './config/languages';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const languageRef = useRef<HTMLDivElement>(null);

    interface NavLink {
        key: string;
        href: string;
    }

    const navLinks: NavLink[] = [
        { key: 'nav.home', href: '#' },
        { key: 'nav.services', href: '#' },
        { key: 'nav.howItWorks', href: '#' },
        { key: 'nav.about', href: '#' },
    ];

    const { language, setLanguage, t } = useLanguage();
    const currentLanguage = languageList.find(lang => lang.code === language);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
                setIsLanguageOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
                scrolled ? 'shadow-md border-b border-gray-100' : 'border-b border-gray-200'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo - Fixed width to prevent shift */}
                    <div className="flex-shrink-0 w-40">
                        <a
                            href="#"
                            className="text-xl lg:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors tracking-tight whitespace-nowrap"
                        >
                            n-CIVISENSE
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.key}
                                href={link.href}
                                className="relative px-4 py-2 text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors group"
                            >
                                {t(link.key)}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {/* Language Selector - Fixed width */}
                        <div className="relative w-32" ref={languageRef}>
                            <button
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                                aria-expanded={isLanguageOpen}
                                aria-haspopup="true"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{currentLanguage?.name}</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        isLanguageOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Language Dropdown */}
                            {isLanguageOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                                {languageList.map((lang: typeof languageList[number]) => (
                                    <button
                                        key={lang.code}
                                        className={`flex items-center w-full px-4 py-2 text-sm text-left whitespace-nowrap ${
                                            lang.code === language ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                        onClick={() => {
                                            setLanguage(lang.code as LanguageCode);
                                            setIsLanguageOpen(false);
                                        }}
                                    >
                                        {lang.name} {lang.nativeName !== lang.name ? `(${lang.nativeName})` : ''}
                                    </button>
                                ))}
                            </div>
                            )}
                        </div>

                        {/* Sign In Button */}
                        <Link
                            href="/auth/login"
                            className="px-8 py-2.5 border border-gray-700 text-gray-900 rounded-lg text-sm font-semibold hover:bg-[#16A34A] hover:text-white transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
                        >
                            Sign In
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div
                className={`fixed top-16 left-0 right-0 bottom-0 bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="px-4 py-6 space-y-1">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.key}
                            href={link.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t(link.key)}
                        </a>
                    ))}

                    <div className="pt-4 mt-4 border-t border-gray-200 space-y-3">
                        {/* Mobile Language Selector */}
                        <div className="px-4">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                Language
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                {languageList.map((lang) => (
                                    <button
                                        key={lang.code}
                                        className={`flex items-center justify-center space-x-2 px-4 py-2.5 text-sm ${
                                            language === lang.code 
                                                ? 'bg-gray-100 font-medium' 
                                                : 'text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100'
                                        } rounded-lg transition-colors w-full`}
                                        onClick={() => {
                                            setLanguage(lang.code as LanguageCode);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <span>{lang.name} {lang.nativeName !== lang.name ? `(${lang.nativeName})` : ''}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile Sign In Button */}
                        <div className="px-4 pt-2">
                            <a
                                href="#"
                                className="block w-full px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg text-base font-semibold hover:bg-gray-900 hover:text-white transition-all text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;