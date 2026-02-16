import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function Layout() {
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
                                <li><a href="/services" className="hover:text-elegantWhite">Services</a></li>
                                <li><a href="/portfolio" className="hover:text-elegantWhite">Portfolio</a></li>
                                <li><a href="/book" className="hover:text-elegantWhite">Book Now</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <ul className="space-y-2 text-mediumGray">
                                <li>Instagram: @nailsbyvic</li>
                                <li>Email: hello@nailsbyvic.com</li>
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
