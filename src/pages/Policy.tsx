import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';

export default function Policy() {
    return (
        <div className="section-padding animate-fade-in">
            <div className="container-custom">

                {/* Page Title */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">Politique de Service</h1>
                    <p className="text-xl text-mediumGray max-w-2xl mx-auto">
                        Veuillez lire attentivement ces politiques afin d'assurer une expérience agréable pour toutes les clientes.
                    </p>
                </div>

                {/* Retards */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Retards
                    </h2>
                    <div className="card-elegant">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <p className="text-mediumGray">
                                    Les clients arrivant jusqu'à <span className="text-elegantBlack font-semibold">15 minutes en retard</span> seront accommodés, à condition d'avoir avisé à l'avance.
                                </p>
                                <p className="text-mediumGray">
                                    Tout retard dépassant 15 minutes entraînera des frais supplémentaires de <span className="text-elegantBlack font-semibold">10 $</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Annulations */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Annulations et Absences
                    </h2>
                    <div className="card-elegant">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <p className="text-mediumGray">
                                    Un préavis d'au moins <span className="text-elegantBlack font-semibold">24 heures</span> est requis pour toute annulation de rendez-vous.
                                </p>
                                <p className="text-mediumGray">
                                    Les clients n'ayant pas fourni d'avis verront leur rendez-vous annulé.
                                </p>
                                <p className="text-mediumGray">
                                    Toute <span className="text-elegantBlack font-semibold">absence sans préavis</span> entraînera la perte définitive des privilèges de réservation.
                                </p>
                                <p className="text-mediumGray">
                                    Veuillez respecter mon temps ainsi que celui des autres clientes planifiées après vous.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Réparations */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Réparations d'Ongles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card-elegant">
                            <h3 className="text-2xl font-serif mb-2">Dans les 48 heures</h3>
                            <p className="text-mediumGray mb-4">
                                Si un ongle vient à casser, se décoller ou tomber dans les <span className="text-elegantBlack font-semibold">48 heures</span> suivant votre rendez-vous, la réparation sera effectuée sans frais supplémentaires.
                            </p>
                            <span className="text-xl font-semibold">Gratuit</span>
                        </div>
                        <div className="card-elegant">
                            <h3 className="text-2xl font-serif mb-2">Après 48 heures</h3>
                            <p className="text-mediumGray mb-4">
                                Toute réparation demandée après le délai de 48 heures sera facturée selon le type de réparation requise.
                            </p>
                            <span className="text-xl font-semibold">Frais applicables</span>
                        </div>
                    </div>
                </section>

                {/* Conditions de service */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Conditions de Service
                    </h2>
                    <div className="card-elegant">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <p className="text-mediumGray">
                                    Je me réserve le droit de <span className="text-elegantBlack font-semibold">refuser tout service</span> sur des ongles endommagés ou affaiblis.
                                </p>
                                <p className="text-mediumGray">
                                    Le retrait de pose <span className="text-elegantBlack font-semibold">(soak-off)</span> doit être demandé à l'avance — les demandes sans préavis ne pourront pas être accommodées.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Annulations de ma part */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                        Annulations de ma Part
                    </h2>
                    <div className="card-elegant">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <p className="text-mediumGray">
                                Dans le cas où je devrais annuler un rendez-vous pour des raisons personnelles, un <span className="text-elegantBlack font-semibold">rabais de 15 %</span> sera appliqué lors de votre prochain rendez-vous.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center mt-16 p-12 bg-softGray">
                    <h2 className="text-3xl font-serif mb-4">Des questions?</h2>
                    <p className="text-mediumGray mb-6">
                        Merci de votre compréhension — ces politiques me permettent d'offrir la meilleure expérience possible à chaque cliente.
                    </p>
                    <Link to="/book">
                        <Button>Réserver un rendez-vous</Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
