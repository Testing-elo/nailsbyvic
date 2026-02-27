import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface DBService {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
}

interface Step1Props {
    selectedService?: DBService;
    onSelect: (service: DBService) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
    gelx: 'Gel X',
    builder: 'Builder Gel',
    remplissage: 'Remplissage',
    other: 'Other',
};

const CATEGORY_ORDER = ['gelx', 'builder', 'remplissage', 'other'];

export default function Step1Service({ selectedService, onSelect }: Step1Props) {
    const [services, setServices] = useState<DBService[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchServices() {
            const { data } = await supabase.from('services').select('*').order('sort_order');
            if (data) setServices(data);
            setLoading(false);
        }
        fetchServices();
    }, []);

    if (loading) {
        return <p className="text-mediumGray">Loading services...</p>;
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-serif mb-6">Select Your Service</h2>
            {CATEGORY_ORDER.map(cat => {
                const group = services.filter(s => s.category === cat);
                if (group.length === 0) return null;
                return (
                    <div key={cat} className="mb-8">
                        <h3 className="text-lg font-medium text-mediumGray mb-3 uppercase tracking-widest text-sm">
                            {CATEGORY_LABELS[cat] || cat}
                        </h3>
                        <div className="space-y-3">
                            {group.map(service => (
                                <div
                                    key={service.id}
                                    onClick={() => onSelect(service)}
                                    className={`p-6 border-2 cursor-pointer transition-all ${selectedService?.id === service.id
                                        ? 'border-elegantBlack bg-softGray'
                                        : 'border-mediumGray hover:border-elegantBlack'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-xl font-serif">{service.name}</h4>
                                        <p className="text-xl font-bold ml-4">${service.price}</p>
                                    </div>
                                    <p className="text-mediumGray text-sm">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
