import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Booking } from '@/types';

export default function BookingsView() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null | undefined>(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('date', { ascending: true });

            if (error) throw error;
            setBookings(data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    }

    async function deleteBooking(id: string | undefined) {
        if (!id) return;
        if (!confirm('Are you sure you want to delete this booking?')) return;
        try {
            setDeletingId(id);
            const { error } = await supabase.from('bookings').delete().eq('id', id);
            if (error) throw error;
            setBookings(prev => prev.filter(b => b.id !== id));
        } catch (err) {
            console.error('Error deleting booking:', err);
        } finally {
            setDeletingId(null);
        }
    }

    function formatDateTime(date: string, time: string): string {
        const d = new Date(date + 'T' + time);
        return d.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        });
    }

    const now = new Date();
    const upcoming = bookings.filter(b => new Date(b.date + 'T' + b.time) >= now);
    const past = bookings.filter(b => new Date(b.date + 'T' + b.time) < now);

    if (loading) {
        return <p className="text-mediumGray">Loading bookings...</p>;
    }

    const renderTable = (list: Booking[], isPast = false) => (
        list.length === 0 ? (
            <div className="bg-elegantWhite border border-mediumGray p-8 text-center">
                <p className="text-mediumGray">No bookings.</p>
            </div>
        ) : (
            <div className={`bg-elegantWhite border border-mediumGray overflow-hidden ${isPast ? 'opacity-60' : ''}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-softGray border-b border-mediumGray">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">Date & Time</th>
                                <th className="px-4 py-3 text-left font-medium">Customer</th>
                                <th className="px-4 py-3 text-left font-medium">Contact</th>
                                <th className="px-4 py-3 text-left font-medium">Service</th>
                                <th className="px-4 py-3 text-left font-medium">Add-ons</th>
                                <th className="px-4 py-3 text-left font-medium">Total</th>
                                <th className="px-4 py-3 text-left font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((booking, index) => (
                                <tr key={booking.id || index} className="border-b border-mediumGray last:border-b-0 hover:bg-softGray">
                                    <td className="px-4 py-3">
                                        {formatDateTime(booking.date, booking.time)}
                                    </td>
                                    <td className="px-4 py-3 font-medium">{booking.customer_name}</td>
                                    <td className="px-4 py-3">
                                        <div className="text-sm">
                                            <div className="capitalize text-mediumGray">{booking.contact_method}</div>
                                            <div>{booking.contact_detail}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{booking.service}</td>
                                    <td className="px-4 py-3">
                                        {booking.addons && booking.addons.length > 0 ? (
                                            <div className="text-sm text-mediumGray">
                                                {booking.addons.join(', ')}
                                            </div>
                                        ) : (
                                            <span className="text-mediumGray">None</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-bold">
                                        ${booking.estimated_total}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => deleteBooking(booking.id)}
                                            disabled={deletingId === booking.id}
                                            className="text-sm text-mediumGray hover:text-red-600 transition-colors disabled:opacity-50"
                                        >
                                            {deletingId === booking.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    );

    return (
        <div>
            {/* Upcoming */}
            <section className="mb-12">
                <h2 className="text-3xl font-serif mb-6">
                    Upcoming Bookings ({upcoming.length})
                </h2>
                {renderTable(upcoming)}
            </section>

            {/* Past */}
            <section>
                <h2 className="text-3xl font-serif mb-6 border-t border-mediumGray pt-8">
                    Past Bookings ({past.length})
                </h2>
                {renderTable(past, true)}
            </section>
        </div>
    );
}
