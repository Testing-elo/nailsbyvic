import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/lib/LanguageContext';

interface PortfolioItem {
    id: string;
    url: string;
    title: string;
    category: string;
}

interface DBCategory {
    id: string;
    label: string;
    sort_order: number;
}

export default function Portfolio() {
    const { t } = useLanguage();
    const p = t.portfolio;

    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [categories, setCategories] = useState<DBCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [itemsRes, catsRes] = await Promise.all([
                    supabase.from('portfolio').select('*').order('created_at', { ascending: false }),
                    supabase.from('portfolio_categories').select('*').order('sort_order'),
                ]);
                if (itemsRes.error) throw itemsRes.error;
                if (catsRes.error) throw catsRes.error;
                setPortfolioItems(itemsRes.data || []);
                setCategories(catsRes.data || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredItems = selectedCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory);

    return (
        <div className="section-padding animate-fade-in">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">{p.title}</h1>
                    <p className="text-xl text-mediumGray max-w-2xl mx-auto">{p.subtitle}</p>
                </div>

                {/* Category Filters */}
                {categories.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2 border-2 transition-all ${selectedCategory === 'all'
                                ? 'bg-elegantBlack text-elegantWhite border-elegantBlack'
                                : 'bg-elegantWhite text-elegantBlack border-mediumGray hover:border-elegantBlack'
                            }`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-2 border-2 transition-all ${selectedCategory === cat.id
                                    ? 'bg-elegantBlack text-elegantWhite border-elegantBlack'
                                    : 'bg-elegantWhite text-elegantBlack border-mediumGray hover:border-elegantBlack'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12">
                        <p className="text-mediumGray">{p.loading}</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-500">{p.error}: {error}</p>
                    </div>
                )}

                {!loading && !error && filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-mediumGray">{p.empty}</p>
                    </div>
                )}

                {!loading && !error && filteredItems.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredItems.map(item => (
                            <div key={item.id} className="group cursor-pointer">
                                <div className="aspect-square overflow-hidden bg-softGray">
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="mt-2">
                                    <h3 className="font-medium">{item.title}</h3>
                                    <p className="text-sm text-mediumGray capitalize">{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
