import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/lib/LanguageContext';

interface DBService {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    sort_order: number;
}

interface DBAddon {
    id: string;
    name: string;
    description: string;
    price: number;
    applicable_categories: string[];
}

const CATEGORY_ORDER = ['gelx', 'builder', 'remplissage', 'other'];

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
    gelx:        { fr: "Pose d'Ongles Gel X",                          en: 'Gel X Nail Application' },
    builder:     { fr: 'Builder Gel (sur ongles naturels)',             en: 'Builder Gel (on natural nails)' },
    remplissage: { fr: 'Remplissage Gel X',                            en: 'Gel X Refill' },
    other:       { fr: 'Remplissage Builder Gel & Soak Off',           en: 'Builder Gel Refill & Soak Off' },
};

export default function Services() {
    const { t, lang } = useLanguage();
    const s = t.services;

    const [services, setServices] = useState<DBService[]>([]);
    const [addons, setAddons] = useState<DBAddon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const [sRes, aRes] = await Promise.all([
                supabase.from('services').select('*').order('sort_order'),
                supabase.from('addons').select('*').order('sort_order'),
            ]);
            if (sRes.data) setServices(sRes.data);
            if (aRes.data) setAddons(aRes.data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const remplissageAddons = addons.filter(a => a.applicable_categories.includes('remplissage'));

    if (loading) {
        return (
            <div className="section-padding animate-fade-in">
                <div className="container-custom text-center">
                    <p className="text-mediumGray">Loading services...</p>
                </div>
            </div>
        );
    }

    const renderCards = (group: DBService[]) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {group.map(service => (
                <div key={service.id} className="card-elegant">
                    <h3 className="text-2xl font-serif mb-2">{service.name}</h3>
                    <p className="text-mediumGray mb-4">{service.description}</p>
                    <span className="text-xl font-semibold">${service.price}</span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="section-padding animate-fade-in">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">{s.title}</h1>
                    <p className="text-xl text-mediumGray max-w-2xl mx-auto">{s.subtitle}</p>
                </div>

                {CATEGORY_ORDER.map(cat => {
                    const group = services.filter(sv => sv.category === cat);
                    if (group.length === 0) return null;
                    const label = CATEGORY_LABELS[cat]?.[lang] || cat;

                    return (
                        <section key={cat} className="mb-16">
                            <h2 className="text-3xl font-serif mb-8 border-b border-mediumGray pb-4">
                                {label}
                            </h2>
                            {renderCards(group)}

                            {/* Show add-on legend for remplissage category */}
                            {cat === 'remplissage' && remplissageAddons.length > 0 && (
                                <div className="mt-6 p-6 bg-softGray">
                                    <p className="text-sm font-semibold uppercase tracking-widest mb-3 text-mediumGray">
                                        {s.designAddons}
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        {remplissageAddons.map(addon => (
                                            <div key={addon.id}>
                                                {addon.name} <span className="font-semibold">+${addon.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    );
                })}

                <div className="text-center mt-16 p-12 bg-softGray">
                    <h2 className="text-3xl font-serif mb-4">{s.ctaTitle}</h2>
                    <p className="text-mediumGray mb-6">{s.ctaDesc}</p>
                    <Link to="/book">
                        <Button>{s.ctaBtn}</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
