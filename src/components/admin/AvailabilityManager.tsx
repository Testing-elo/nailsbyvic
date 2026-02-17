import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Availability } from '@/types';
import Button from '@/components/ui/Button';

const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

function formatTime(time: string) {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
}

export default function AvailabilityManager() {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [savingSlots, setSavingSlots] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchAvailabilities();
    }, []);

    async function fetchAvailabilities() {
        try {
            const { data, error } = await supabase
                .from('availabilities')
                .select('*')
                .order('date', { ascending: true })
                .order('time', { ascending: true });
            if (error) throw error;
            setAvailabilities(data || []);
        } catch (err) {
            console.error('Error fetching availabilities:', err);
        }
    }

    async function toggleTimeSlot(time: string) {
        if (!selectedDate) return;
        const key = `${selectedDate}-${time}`;
        const existing = availabilities.find(a => a.date === selectedDate && a.time.startsWith(time));

        setSavingSlots(prev => new Set(prev).add(key));
        try {
            if (existing) {
                const { error } = await supabase.from('availabilities').delete().eq('id', existing.id);
                if (error) throw error;
                setAvailabilities(prev => prev.filter(a => a.id !== existing.id));
            } else {
                const { data, error } = await supabase.from('availabilities').insert([{ date: selectedDate, time: `${time}:00` }]).select();
                if (error) throw error;
                if (data) setAvailabilities(prev => [...prev, ...data]);
            }
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setSavingSlots(prev => { const next = new Set(prev); next.delete(key); return next; });
        }
    }

    async function clearDay(date: string) {
        if (!confirm(`Clear all slots for ${formatDate(date)}?`)) return;
        setLoading(true);
        try {
            const ids = availabilities.filter(a => a.date === date).map(a => a.id);
            if (ids.length === 0) return;
            const { error } = await supabase.from('availabilities').delete().in('id', ids);
            if (error) throw error;
            setAvailabilities(prev => prev.filter(a => a.date !== date));
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    function formatDate(dateStr: string) {
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    // Calendar helpers
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date().toISOString().split('T')[0];

    function getDateStr(day: number) {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    function getSlotsForDate(dateStr: string) {
        return availabilities.filter(a => a.date === dateStr);
    }

    function prevMonth() {
        setCurrentMonth(new Date(year, month - 1, 1));
        setSelectedDate(null);
    }

    function nextMonth() {
        setCurrentMonth(new Date(year, month + 1, 1));
        setSelectedDate(null);
    }

    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const selectedSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

    return (
        <div>
            <h2 className="text-3xl font-serif mb-6">Manage Availability</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar */}
                <div className="bg-white border border-mediumGray p-6">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={prevMonth}
                            className="p-2 hover:bg-softGray transition-colors"
                        >
                            ‹
                        </button>
                        <h3 className="text-lg font-serif">{monthName}</h3>
                        <button
                            onClick={nextMonth}
                            className="p-2 hover:bg-softGray transition-colors"
                        >
                            ›
                        </button>
                    </div>

                    {/* Day Labels */}
                    <div className="grid grid-cols-7 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="text-center text-xs text-mediumGray font-medium py-1">{d}</div>
                        ))}
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const dateStr = getDateStr(day);
                            const slots = getSlotsForDate(dateStr);
                            const isPast = dateStr < today;
                            const isSelected = selectedDate === dateStr;
                            const hasSlots = slots.length > 0;

                            return (
                                <button
                                    key={day}
                                    onClick={() => !isPast && setSelectedDate(isSelected ? null : dateStr)}
                                    disabled={isPast}
                                    className={`
                                        relative aspect-square flex flex-col items-center justify-center text-sm transition-all
                                        ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-softGray'}
                                        ${isSelected ? 'bg-elegantBlack text-elegantWhite hover:bg-elegantBlack' : ''}
                                        ${hasSlots && !isSelected ? 'font-semibold' : ''}
                                    `}
                                >
                                    {day}
                                    {hasSlots && (
                                        <span className={`text-xs ${isSelected ? 'text-gray-300' : 'text-mediumGray'}`}>
                                            {slots.length}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-xs text-mediumGray mt-4 text-center">
                        Click a date to manage time slots
                    </p>
                </div>

                {/* Time Slots Panel */}
                <div className="bg-white border border-mediumGray p-6">
                    {!selectedDate ? (
                        <div className="flex items-center justify-center h-full min-h-48">
                            <p className="text-mediumGray text-center">
                                Select a date on the calendar<br />to manage time slots
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-serif">{formatDate(selectedDate)}</h3>
                                    <p className="text-sm text-mediumGray">
                                        {selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''} added
                                    </p>
                                </div>
                                {selectedSlots.length > 0 && (
                                    <button
                                        onClick={() => clearDay(selectedDate)}
                                        disabled={loading}
                                        className="text-xs text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {TIME_SLOTS.map(time => {
                                    const isAdded = availabilities.some(a => a.date === selectedDate && a.time.startsWith(time));
                                    const isSaving = savingSlots.has(`${selectedDate}-${time}`);

                                    return (
                                        <button
                                            key={time}
                                            onClick={() => toggleTimeSlot(time)}
                                            disabled={isSaving}
                                            className={`
                                                py-2 px-3 text-sm border transition-all duration-200
                                                ${isAdded
                                                    ? 'bg-elegantBlack text-elegantWhite border-elegantBlack'
                                                    : 'border-mediumGray hover:border-elegantBlack text-elegantBlack'
                                                }
                                                ${isSaving ? 'opacity-50' : ''}
                                            `}
                                        >
                                            {isSaving ? '...' : formatTime(time)}
                                        </button>
                                    );
                                })}
                            </div>

                            <p className="text-xs text-mediumGray mt-4">
                                Click a time to toggle it on/off
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Upcoming Availability Summary */}
            {availabilities.length > 0 && (
                <div className="mt-6 bg-white border border-mediumGray p-6">
                    <h3 className="text-xl font-serif mb-4">Upcoming Availability</h3>
                    <div className="space-y-3">
                        {Object.entries(
                            availabilities
                                .filter(a => a.date >= today)
                                .reduce((acc, avail) => {
                                    if (!acc[avail.date]) acc[avail.date] = [];
                                    acc[avail.date].push(avail);
                                    return acc;
                                }, {} as Record<string, Availability[]>)
                        ).slice(0, 7).map(([date, slots]) => (
                            <div key={date} className="flex items-center justify-between border-b border-softGray pb-3 last:border-0">
                                <span className="font-medium text-sm">{formatDate(date)}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-mediumGray">{slots.length} slot{slots.length !== 1 ? 's' : ''}</span>
                                    <button
                                        onClick={() => { setSelectedDate(date); setCurrentMonth(new Date(date + 'T00:00:00')); }}
                                        className="text-xs underline text-mediumGray hover:text-elegantBlack"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
