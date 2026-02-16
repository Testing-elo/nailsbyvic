import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

export default function Home() {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="section-padding bg-elegantBlack text-elegantWhite">
                <div className="container-custom text-center">
                    <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-slide-up">
                        Nailsbyvic
                    </h1>
                    <p className="text-xl md:text-2xl text-mediumGray mb-8 max-w-2xl mx-auto">
                        Elegant nail artistry tailored to perfection. Experience luxury and precision in every detail.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/book">
                            <Button className="w-full sm:w-auto bg-elegantWhite text-elegantBlack hover:bg-softGray">
                                Book Appointment
                            </Button>
                        </Link>
                        <Link to="/portfolio">
                            <Button variant="outline" className="w-full sm:w-auto border-elegantWhite text-elegantWhite hover:bg-elegantWhite hover:text-elegantBlack">
                                View Portfolio
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center animate-fade-in-up">
                            <div className="w-16 h-16 mx-auto mb-4 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-2">Premium Quality</h3>
                            <p className="text-mediumGray">
                                Using only the finest products for lasting, stunning results
                            </p>
                        </div>

                        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="w-16 h-16 mx-auto mb-4 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-2">Flexible Scheduling</h3>
                            <p className="text-mediumGray">
                                Book appointments that fit your busy lifestyle
                            </p>
                        </div>

                        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <div className="w-16 h-16 mx-auto mb-4 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif mb-2">Personalized Care</h3>
                            <p className="text-mediumGray">
                                Every design customized to match your unique style
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-softGray">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">
                        Ready to Transform Your Nails?
                    </h2>
                    <p className="text-lg text-mediumGray mb-8 max-w-xl mx-auto">
                        Browse our services, check availability, and book your appointment in just a few clicks.
                    </p>
                    <Link to="/services">
                        <Button>Explore Services</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
