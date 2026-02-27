import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface DBAddon {
    id: string;
    name: string;
    description: string;
    price: number;
    applicable_categories: string[];
}

interface Step2Props {
    selectedAddons: DBAddon[];
    onToggleAddon: (addon: DBAddon) => void;
    serviceCategory?: string; // passed from Book.tsx
}

export default function Step2Addons({ selectedAddons, onToggleAddon, serviceCategory }: Step2Props) {
    const [addons, setAddons] = useState<DBAddon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAddons() {
            const { data } = await supabase.from('addons').select('*').order('sort_order');
            if (data) {
                // Filter addons applicable to the selected service category
                const filtered = serviceCategory
                    ? data.filter(a => a.applicable_categories.includes(serviceCategory))
                    : data;
                setAddons(filtered);
            }
            setLoading(false);
        }
        fetchAddons();
    }, [serviceCategory]);

    const isSelected = (addon: DBAddon) => selectedAddons.some(a => a.id === addon.id);

    if (loading) return <p className="text-mediumGray">Loading add-ons...</p>;

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-serif mb-2">Enhance Your Service</h2>
            <p className="text-mediumGray mb-6">Select any add-ons (optional)</p>

            {addons.length === 0 ? (
                <div className="text-center py-12 border border-mediumGray">
                    <p className="text-mediumGray">No add-ons available for this service.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {addons.map(addon => (
                        <div
                            key={addon.id}
                            onClick={() => onToggleAddon(addon)}
                            className={`p-6 border-2 cursor-pointer transition-all ${isSelected(addon)
                                ? 'border-elegantBlack bg-softGray'
                                : 'border-mediumGray hover:border-elegantBlack'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 ${isSelected(addon) ? 'border-elegantBlack bg-elegantBlack' : 'border-mediumGray'}`}>
                                            {isSelected(addon) && (
                                                <svg className="w-3 h-3 text-elegantWhite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-medium">{addon.name}</h3>
                                    </div>
                                    <p className="text-mediumGray mt-2 ml-8">{addon.description}</p>
                                </div>
                                <p className="text-xl font-bold ml-4">+${addon.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedAddons.length === 0 && addons.length > 0 && (
                <p className="text-center text-mediumGray mt-6 italic">
                    No add-ons selected. You can continue to the next step.
                </p>
            )}
        </div>
    );
}
