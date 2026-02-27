import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PortfolioItem } from '@/types';
import { PORTFOLIO_CATEGORIES } from '@/utils/constants';
import { useLanguage } from '@/lib/LanguageContext';

export default function Portfolio() {
    const { t } = useLanguage();
    const p = t.portfolio;

    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    async function fetchPortfolio() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPortfolioItems(data || []);
        } catch (err: any) {
            setError(err.message);
            console.error('Error fetching portfolio:', err);
        } finally {
            setLoading(false);
        }
    }

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

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {PORTFOLIO_CATEGORIES.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-2 border-2 transition-all ${selectedCategory === category.id
                                ? 'bg-elegantBlack text-elegantWhite border-elegantBlack'
                                : 'bg-elegantWhite text-elegantBlack border-mediumGray hover:border-elegantBlack'
                            }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

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
                        {filteredItems.map((item) => (
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
