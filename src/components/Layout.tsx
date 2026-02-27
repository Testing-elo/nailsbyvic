import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useLanguage } from '@/lib/LanguageContext';

export default function Layout() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="bg-elegantBlack text-elegantWhite py-8">
                <div className="container-custom px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-serif mb-4">Nailsbyvic</h3>
                            <p className="text-mediumGray">
                                Professional nail services with elegant designs.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-mediumGray">
                                <li><a href="/services" className="hover:text-elegantWhite">{t.nav.services}</a></li>
                                <li><a href="/portfolio" className="hover:text-elegantWhite">{t.nav.portfolio}</a></li>
                                <li><a href="/availability" className="hover:text-elegantWhite">{t.nav.availability}</a></li>
                                <li><a href="/book" className="hover:text-elegantWhite">{t.nav.book}</a></li>
                                <li><a href="/policy" className="hover:text-elegantWhite">{t.nav.policy}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <ul className="space-y-2 text-mediumGray">
                                <li>Instagram: @nailsbyvic</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-darkGray text-center text-mediumGray">
                        <p>&copy; {new Date().getFullYear()} Nailsbyvic. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
