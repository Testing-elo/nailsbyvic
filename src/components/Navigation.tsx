import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function Navigation() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const { lang, toggleLang, t } = useLanguage();

    const navLinks = [
        { path: '/', label: t.nav.home },
        { path: '/services', label: t.nav.services },
        { path: '/portfolio', label: t.nav.portfolio },
        { path: '/availability', label: t.nav.availability },
        { path: '/book', label: t.nav.book },
        { path: '/policy', label: t.nav.policy },
    ];

    return (
        <nav className="bg-elegantWhite border-b border-mediumGray sticky top-0 z-40">
            <div className="container-custom px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-serif font-bold text-elegantBlack hover:text-darkGray transition-colors"
                    >
                        Nailsbyvic
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-medium transition-colors ${
                                    location.pathname === link.path
                                        ? 'text-elegantBlack border-b-2 border-elegantBlack'
                                        : 'text-mediumGray hover:text-elegantBlack'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="text-sm font-medium border border-mediumGray px-3 py-1 hover:border-elegantBlack hover:text-elegantBlack text-mediumGray transition-colors"
                        >
                            {lang === 'fr' ? 'EN' : 'FR'}
                        </button>
                    </div>

                    {/* Mobile: lang toggle + hamburger */}
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={toggleLang}
                            className="text-sm font-medium border border-mediumGray px-3 py-1 hover:border-elegantBlack text-mediumGray transition-colors"
                        >
                            {lang === 'fr' ? 'EN' : 'FR'}
                        </button>
                        <button
                            className="text-elegantBlack"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="md:hidden mt-4 space-y-2 pb-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className={`block py-2 font-medium transition-colors ${
                                    location.pathname === link.path
                                        ? 'text-elegantBlack'
                                        : 'text-mediumGray hover:text-elegantBlack'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
