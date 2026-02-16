import { WEBHOOK_URL } from './constants';

export async function sendBookingToWebhook(bookingData: any): Promise<void> {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                event: 'new_booking',
                timestamp: new Date().toISOString(),
                data: bookingData,
            }),
        });

        if (!response.ok) {
            throw new Error(`Webhook request failed: ${response.statusText}`);
        }

        console.log('Booking data sent to webhook successfully');
    } catch (error) {
        console.error('Failed to send booking to webhook:', error);
        // Don't throw - we don't want webhook failures to block bookings
    }
}
