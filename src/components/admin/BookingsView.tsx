import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Booking } from '@/types';

export default function BookingsView() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setBookings(data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
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

    if (loading) {
        return <p className="text-mediumGray">Loading bookings...</p>;
    }

    return (
        <div>
            <h2 className="text-3xl font-serif mb-6">All Bookings ({bookings.length})</h2>

            {bookings.length === 0 ? (
                <div className="bg-elegantWhite border border-mediumGray p-12 text-center">
                    <p className="text-mediumGray">No bookings yet.</p>
                </div>
            ) : (
                <div className="bg-elegantWhite border border-mediumGray overflow-hidden">
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
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
