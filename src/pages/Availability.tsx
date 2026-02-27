import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Availability } from '@/types';
import { useLanguage } from '@/lib/LanguageContext';

export default function AvailabilityPage() {
    const { t, lang } = useLanguage();
    const a = t.availability;

    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    async function fetchAvailabilities() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('availabilities')
                .select('*')
                .gte('date', new Date().toISOString().split('T')[0])
                .order('date', { ascending: true })
                .order('time', { ascending: true });

            if (error) throw error;
            setAvailabilities(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const groupedByDate = availabilities.reduce((acc, avail) => {
        if (!acc[avail.date]) acc[avail.date] = [];
        acc[avail.date].push(avail);
        return acc;
    }, {} as Record<string, Availability[]>);

    function formatDate(dateString: string): string {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    function formatTime(timeString: string): string {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    return (
        <div className="section-padding animate-fade-in">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">{a.title}</h1>
                    <p className="text-xl text-mediumGray">{a.subtitle}</p>
                </div>

                {loading && (
                    <div className="text-center py-12">
                        <p className="text-mediumGray">{a.loading}</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-500">{a.error}: {error}</p>
                    </div>
                )}

                {!loading && !error && availabilities.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-mediumGray">{a.empty}</p>
                    </div>
                )}

                {!loading && !error && Object.keys(groupedByDate).length > 0 && (
                    <div className="space-y-8">
                        {Object.entries(groupedByDate).map(([date, slots]) => (
                            <div key={date} className="border border-mediumGray p-6">
                                <h2 className="text-2xl font-serif mb-4 capitalize">{formatDate(date)}</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    {slots.map((slot) => (
                                        <div
                                            key={slot.id}
                                            className="px-4 py-3 text-center border border-mediumGray hover:bg-elegantBlack hover:text-elegantWhite transition-colors cursor-pointer"
                                        >
                                            {formatTime(slot.time)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <p className="text-mediumGray mb-4">{a.ctaText}</p>
                    <a
                        href="/book"
                        className="inline-block px-8 py-3 bg-elegantBlack text-elegantWhite hover:bg-darkGray transition-colors"
                    >
                        {a.ctaBtn}
                    </a>
                </div>
            </div>
        </div>
    );
}
