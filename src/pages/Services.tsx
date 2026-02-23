import { Link } from 'react-router-dom';
import { SERVICES } from '@/utils/constants';
import Button from '@/components/ui/Button';

export default function Services() {
    const groupedServices = {
        gelx:        SERVICES.filter(s => s.category === 'manicure'),
        builder:     SERVICES.filter(s => s.category === 'pedicure'),
        remplissage: SERVICES.filter(s => s.category === 'nailart'),
        other:       SERVICES.filter(s => s.category === 'other'),
    };

    const renderCards = (services: typeof SERVICES) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
                <div key={service.id} className="card-elegant">
                    <h3 className="text-2xl font-serif mb-2">{service.name}</h3>
                    <p className="text-mediumGray mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-xl font-semibold">${service.price}</span>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="section-padding animate-fade-in">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">Nos Services</h1>
                    <p className="text-xl text-mediumGray max-w-2xl mx-auto">
                        Tarifs chez Nails by Vic
                    </p>
                </div>

                {/* Gel X Poses */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Pose d&apos;Ongles Gel X
                    </h2>
                    {renderCards(groupedServices.gelx)}
                </section>

                {/* Builder Gel */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Builder Gel{' '}
                        <span className="text-lg font-sans text-mediumGray">(sur ongles naturels)</span>
                    </h2>
                    {renderCards(groupedServices.builder)}
                </section>

                {/* Remplissage Gel X */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Remplissage Gel X
                    </h2>
                    {renderCards(groupedServices.remplissage)}

                    {/* Design add-on legend */}
                    <div className="mt-6 p-6 bg-softGray">
                        <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-mediumGray">
                            Suppléments de design
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>Couleur simple <span className="font-semibold">+$5</span></div>
                            <div>Niveau 1 <span className="font-semibold">+$8</span></div>
                            <div>Niveau 2 <span className="font-semibold">+$10</span></div>
                            <div>Niveau 3 <span className="font-semibold">+$12</span></div>
                        </div>
                    </div>
                </section>

                {/* Remplissage Builder Gel & Soak Off */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Remplissage Builder Gel &amp; Soak Off
                    </h2>
                    {renderCards(groupedServices.other)}
                </section>

                {/* CTA */}
                <div className="text-center mt-16 p-12 bg-softGray">
                    <h2 className="text-3xl font-serif mb-4">Prête à réserver?</h2>
                    <p className="text-mediumGray mb-6">
                        Choisissez votre service et réservez votre rendez-vous
                    </p>
                    <Link to="/book">
                        <Button>Réserver</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
