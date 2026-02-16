import { Link } from 'react-router-dom';
import { SERVICES } from '@/utils/constants';
import Button from '@/components/ui/Button';

export default function Services() {
    const groupedServices = {
        manicure: SERVICES.filter(s => s.category === 'manicure'),
        pedicure: SERVICES.filter(s => s.category === 'pedicure'),
        nailart: SERVICES.filter(s => s.category === 'nailart'),
    };

    return (
        <div className="section-padding animate-fade-in">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">Our Services</h1>
                    <p className="text-xl text-mediumGray max-w-2xl mx-auto">
                        Indulge in premium nail services designed to bring out your elegance
                    </p>
                </div>

                {/* Manicure Services */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Manicure Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {groupedServices.manicure.map((service) => (
                            <div key={service.id} className="card-elegant">
                                <h3 className="text-2xl font-serif mb-2">{service.name}</h3>
                                <p className="text-mediumGray mb-4">{service.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold">${service.price}</span>
                                    <span className="text-sm text-mediumGray">{service.duration} min</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Pedicure Services */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Pedicure Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {groupedServices.pedicure.map((service) => (
                            <div key={service.id} className="card-elegant">
                                <h3 className="text-2xl font-serif mb-2">{service.name}</h3>
                                <p className="text-mediumGray mb-4">{service.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold">${service.price}</span>
                                    <span className="text-sm text-mediumGray">{service.duration} min</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Nail Art Services */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Nail Art
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {groupedServices.nailart.map((service) => (
                            <div key={service.id} className="card-elegant">
                                <h3 className="text-2xl font-serif mb-2">{service.name}</h3>
                                <p className="text-mediumGray mb-4">{service.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-semibold">${service.price}</span>
                                    <span className="text-sm text-mediumGray">{service.duration} min</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center mt-16 p-12 bg-softGray">
                    <h2 className="text-3xl font-serif mb-4">Ready to Book?</h2>
                    <p className="text-mediumGray mb-6">
                        Choose your perfect service and schedule your appointment
                    </p>
                    <Link to="/book">
                        <Button>Book Now</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
