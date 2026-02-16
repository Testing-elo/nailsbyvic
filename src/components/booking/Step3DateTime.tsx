import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Availability } from '@/types';

interface Step3Props {
    selectedDate?: string;
    selectedTime?: string;
    onSelectDateTime: (date: string, time: string) => void;
}

export default function Step3DateTime({ selectedDate, selectedTime, onSelectDateTime }: Step3Props) {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    async function fetchAvailabilities() {
        try {
            const { data, error } = await supabase
                .from('availabilities')
                .select('*')
                .gte('date', new Date().toISOString().split('T')[0])
                .order('date', { ascending: true })
                .order('time', { ascending: true });

            if (error) throw error;
            setAvailabilities(data || []);
        } catch (err) {
            console.error('Error fetching availabilities:', err);
        } finally {
            setLoading(false);
        }
    }

    const groupedByDate = availabilities.reduce((acc, avail) => {
        if (!acc[avail.date]) {
            acc[avail.date] = [];
        }
        acc[avail.date].push(avail);
        return acc;
    }, {} as Record<string, Availability[]>);

    function formatDate(dateString: string): string {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    function formatTime(timeString: string): string {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    if (loading) {
        return (
            <div className="text-center py-12">
                <p className="text-mediumGray">Loading available times...</p>
            </div>
        );
    }

    if (Object.keys(groupedByDate).length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-mediumGray">No available slots at the moment. Please check back later!</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-serif mb-2">Choose Date & Time</h2>
            <p className="text-mediumGray mb-6">Select your preferred appointment slot</p>

            <div className="space-y-8">
                {Object.entries(groupedByDate).map(([date, slots]) => (
                    <div key={date}>
                        <h3 className="text-xl font-serif mb-4">{formatDate(date)}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => onSelectDateTime(slot.date, slot.time)}
                                    className={`px-4 py-3 border-2 transition-all ${selectedDate === slot.date && selectedTime === slot.time
                                            ? 'border-elegantBlack bg-elegantBlack text-elegantWhite'
                                            : 'border-mediumGray hover:border-elegantBlack'
                                        }`}
                                >
                                    {formatTime(slot.time)}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
