import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Availability } from '@/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AvailabilityManager() {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [loading, setLoading] = useState(false);

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

    async function handleAdd() {
        if (!newDate || !newTime) {
            alert('Please enter both date and time');
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase
                .from('availabilities')
                .insert([{ date: newDate, time: newTime }]);

            if (error) throw error;

            setNewDate('');
            setNewTime('');
            await fetchAvailabilities();
            alert('Availability added successfully!');
        } catch (err: any) {
            alert(`Error adding availability: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this time slot?')) return;

        try {
            const { error } = await supabase
                .from('availabilities')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchAvailabilities();
        } catch (err: any) {
            alert(`Error deleting availability: ${err.message}`);
        }
    }

    const groupedByDate = availabilities.reduce((acc, avail) => {
        if (!acc[avail.date]) {
            acc[avail.date] = [];
        }
        acc[avail.date].push(avail);
        return acc;
    }, {} as Record<string, Availability[]>);

    return (
        <div>
            <h2 className="text-3xl font-serif mb-6">Manage Availability</h2>

            {/* Add New Slot */}
            <div className="bg-elegantWhite border border-mediumGray p-6 mb-8">
                <h3 className="text-xl font-serif mb-4">Add New Time Slot</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        type="date"
                        label="Date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                    <Input
                        type="time"
                        label="Time"
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                    />
                    <div className="flex items-end">
                        <Button
                            onClick={handleAdd}
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? 'Adding...' : 'Add Slot'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Existing Slots */}
            <div className="bg-elegantWhite border border-mediumGray p-6">
                <h3 className="text-xl font-serif mb-4">Current Availability</h3>

                {Object.keys(groupedByDate).length === 0 ? (
                    <p className="text-mediumGray">No availability slots yet.</p>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(groupedByDate).map(([date, slots]) => (
                            <div key={date} className="border-b border-mediumGray pb-4 last:border-b-0">
                                <h4 className="font-semibold mb-3">{new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                    {slots.map((slot) => (
                                        <div
                                            key={slot.id}
                                            className="flex items-center justify-between px-3 py-2 border border-mediumGray"
                                        >
                                            <span>{slot.time}</span>
                                            <button
                                                onClick={() => handleDelete(slot.id)}
                                                className="text-red-500 hover:text-red-700 ml-2"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
