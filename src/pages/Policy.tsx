import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/lib/LanguageContext';

export default function Policy() {
    const { t } = useLanguage();
    const p = t.policy;

    return (
        <div className="section-padding animate-fade-in">
            <div className="container-custom">

                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">{p.title}</h1>
                    <p className="text-xl text-mediumGray max-w-2xl mx-auto">{p.subtitle}</p>
                </div>

                {/* Late Arrivals */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">{p.lateTitle}</h2>
                    <div className="card-elegant">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.lateText1 }} />
                                <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.lateText2 }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cancellations */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">{p.cancelTitle}</h2>
                    <div className="card-elegant">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.cancelText1 }} />
                                <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.cancelText2 }} />
                                <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.cancelText3 }} />
                                <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.cancelText4 }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Repairs */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">{p.repairTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card-elegant">
                            <h3 className="text-2xl font-serif mb-2">{p.repair48Title}</h3>
                            <p className="text-mediumGray mb-4" dangerouslySetInnerHTML={{ __html: p.repair48Desc }} />
                            <span className="text-xl font-semibold">{p.repair48Price}</span>
                        </div>
                        <div className="card-elegant">
                            <h3 className="text-2xl font-serif mb-2">{p.repairAfterTitle}</h3>
                            <p className="text-mediumGray mb-4" dangerouslySetInnerHTML={{ __html: p.repairAfterDesc }} />
                            <span className="text-xl font-semibold">{p.repairAfterPrice}</span>
                        </div>
                    </div>
                </section>

                {/* Conditions */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">{p.conditionsTitle}</h2>
                    <div className="card-elegant">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.conditionsText1 }} />
                                <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.conditionsText2 }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Artist cancellations */}
                <section className="mb-16">
                    <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">{p.artistTitle}</h2>
                    <div className="card-elegant">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex-shrink-0 border-2 border-elegantBlack flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <p className="text-mediumGray" dangerouslySetInnerHTML={{ __html: p.artistText }} />
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center mt-16 p-12 bg-softGray">
                    <h2 className="text-3xl font-serif mb-4">{p.ctaTitle}</h2>
                    <p className="text-mediumGray mb-6">{p.ctaDesc}</p>
                    <Link to="/book">
                        <Button>{p.ctaBtn}</Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
