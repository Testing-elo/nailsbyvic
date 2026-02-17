import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Availability } from '@/types';

function formatTime(time: string) {
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${m} ${ampm}`;
}

const DEFAULT_PRESETS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'];

export default function AvailabilityManager() {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [newTime, setNewTime] = useState('');
    const [activeTab, setActiveTab] = useState<'calendar' | 'presets'>('calendar');
    const [presets, setPresets] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem('availability_presets');
            return saved ? JSON.parse(saved) : DEFAULT_PRESETS;
        } catch { return DEFAULT_PRESETS; }
    });
    const [newPresetTime, setNewPresetTime] = useState('');

    useEffect(() => { fetchAvailabilities(); }, []);
    useEffect(() => { localStorage.setItem('availability_presets', JSON.stringify(presets)); }, [presets]);

    async function fetchAvailabilities() {
        try {
            const { data, error } = await supabase.from('availabilities').select('*').order('date', { ascending: true }).order('time', { ascending: true });
            if (error) throw error;
            setAvailabilities(data || []);
        } catch (err) { console.error('Error fetching availabilities:', err); }
    }

    async function addTimeSlot(time: string) {
        if (!selectedDate || !time) return;
        const formattedTime = time.length === 5 ? `${time}:00` : time;
        const already = availabilities.some(a => a.date === selectedDate && a.time.startsWith(time));
        if (already) return;
        setLoading(true);
        try {
            const { data, error } = await supabase.from('availabilities').insert([{ date: selectedDate, time: formattedTime }]).select();
            if (error) throw error;
            if (data) setAvailabilities(prev => [...prev, ...data]);
            setNewTime('');
        } catch (err: any) { alert(`Error: ${err.message}`); } finally { setLoading(false); }
    }

    async function deleteSlot(id: string) {
        try {
            const { error } = await supabase.from('availabilities').delete().eq('id', id);
            if (error) throw error;
            setAvailabilities(prev => prev.filter(a => a.id !== id));
        } catch (err: any) { alert(`Error: ${err.message}`); }
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
        } catch (err: any) { alert(`Error: ${err.message}`); } finally { setLoading(false); }
    }

    function addPreset() {
        if (!newPresetTime) return;
        if (presets.includes(newPresetTime)) { alert('This preset already exists'); return; }
        setPresets(prev => [...prev, newPresetTime].sort());
        setNewPresetTime('');
    }

    function removePreset(time: string) { setPresets(prev => prev.filter(p => p !== time)); }

    function formatDate(dateStr: string) {
        return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date().toISOString().split('T')[0];
    function getDateStr(day: number) { return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; }
    function getSlotsForDate(dateStr: string) { return availabilities.filter(a => a.date === dateStr); }
    const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const selectedSlots = selectedDate ? getSlotsForDate(selectedDate) : [];

    return (
        <div>
            <h2 className="text-3xl font-serif mb-6">Manage Availability</h2>

            {/* Tabs */}
            <div className="flex border-b border-mediumGray mb-6">
                <button onClick={() => setActiveTab('calendar')} className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'calendar' ? 'border-b-2 border-elegantBlack text-elegantBlack' : 'text-mediumGray hover:text-elegantBlack'}`}>
                    Calendar
                </button>
                <button onClick={() => setActiveTab('presets')} className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'presets' ? 'border-b-2 border-elegantBlack text-elegantBlack' : 'text-mediumGray hover:text-elegantBlack'}`}>
                    Manage Presets ({presets.length})
                </button>
            </div>

            {/* Presets Tab */}
            {activeTab === 'presets' && (
                <div className="bg-white border border-mediumGray p-6 max-w-md">
                    <p className="text-sm text-mediumGray mb-4">Presets are quick-add times that appear when scheduling a day.</p>
                    <div className="flex gap-2 mb-6">
                        <input type="time" value={newPresetTime} onChange={(e) => setNewPresetTime(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addPreset()} className="flex-1 border border-mediumGray px-3 py-2 text-sm focus:outline-none focus:border-elegantBlack" />
                        <button onClick={addPreset} disabled={!newPresetTime} className="px-4 py-2 bg-elegantBlack text-elegantWhite text-sm disabled:opacity-40 hover:bg-darkGray transition-colors">Add Preset</button>
                    </div>
                    <div className="space-y-2">
                        {presets.length === 0 ? (
                            <p className="text-sm text-mediumGray">No presets yet.</p>
                        ) : presets.map(time => (
                            <div key={time} className="flex items-center justify-between px-3 py-2 border border-mediumGray">
                                <span className="text-sm font-medium">{formatTime(time)}</span>
                                <button onClick={() => removePreset(time)} className="text-red-400 hover:text-red-600 text-lg leading-none transition-colors">×</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-mediumGray p-6">
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="p-2 hover:bg-softGray transition-colors text-lg">‹</button>
                            <h3 className="text-lg font-serif">{monthName}</h3>
                            <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="p-2 hover:bg-softGray transition-colors text-lg">›</button>
                        </div>
                        <div className="grid grid-cols-7 mb-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <div key={d} className="text-center text-xs text-mediumGray font-medium py-1">{d}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const dateStr = getDateStr(day);
                                const slots = getSlotsForDate(dateStr);
                                const isPast = dateStr < today;
                                const isSelected = selectedDate === dateStr;
                                return (
                                    <button key={day} onClick={() => !isPast && setSelectedDate(isSelected ? null : dateStr)} disabled={isPast}
                                        className={`aspect-square flex flex-col items-center justify-center text-sm transition-all ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer hover:bg-softGray'} ${isSelected ? 'bg-elegantBlack text-elegantWhite hover:bg-elegantBlack' : ''} ${slots.length > 0 && !isSelected ? 'font-semibold' : ''}`}>
                                        {day}
                                        {slots.length > 0 && <span className={`text-xs ${isSelected ? 'text-gray-300' : 'text-mediumGray'}`}>{slots.length}</span>}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-mediumGray mt-4 text-center">Click a date to manage time slots</p>
                    </div>

                    <div className="bg-white border border-mediumGray p-6">
                        {!selectedDate ? (
                            <div className="flex items-center justify-center h-full min-h-48">
                                <p className="text-mediumGray text-center">Select a date on the calendar<br />to manage time slots</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-serif">{formatDate(selectedDate)}</h3>
                                        <p className="text-sm text-mediumGray">{selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''} added</p>
                                    </div>
                                    {selectedSlots.length > 0 && (
                                        <button onClick={() => clearDay(selectedDate)} disabled={loading} className="text-xs text-red-500 hover:text-red-700 transition-colors">Clear all</button>
                                    )}
                                </div>

                                {/* Presets */}
                                {presets.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-mediumGray mb-2">Quick add from presets:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {presets.map(time => {
                                                const isAdded = availabilities.some(a => a.date === selectedDate && a.time.startsWith(time));
                                                return (
                                                    <button key={time} onClick={() => !isAdded && addTimeSlot(time)} disabled={isAdded}
                                                        className={`px-3 py-1 text-xs border transition-all ${isAdded ? 'bg-elegantBlack text-elegantWhite border-elegantBlack opacity-50 cursor-not-allowed' : 'border-mediumGray hover:border-elegantBlack'}`}>
                                                        {formatTime(time)}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Manual input */}
                                <div className="flex gap-2 mb-4">
                                    <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTimeSlot(newTime)}
                                        className="flex-1 border border-mediumGray px-3 py-2 text-sm focus:outline-none focus:border-elegantBlack" />
                                    <button onClick={() => addTimeSlot(newTime)} disabled={!newTime || loading}
                                        className="px-4 py-2 bg-elegantBlack text-elegantWhite text-sm disabled:opacity-40 hover:bg-darkGray transition-colors">Add</button>
                                </div>

                                {/* Slots list */}
                                {selectedSlots.length === 0 ? (
                                    <p className="text-sm text-mediumGray">No time slots yet.</p>
                                ) : (
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {selectedSlots.sort((a, b) => a.time.localeCompare(b.time)).map(slot => (
                                            <div key={slot.id} className="flex items-center justify-between px-3 py-2 border border-mediumGray">
                                                <span className="text-sm font-medium">{formatTime(slot.time)}</span>
                                                <button onClick={() => deleteSlot(slot.id)} className="text-red-400 hover:text-red-600 text-lg leading-none transition-colors">×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
