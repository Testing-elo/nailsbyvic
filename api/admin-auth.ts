import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password } = req.body;
    const ADMIN_CODE = process.env.ADMIN_CODE;

    if (!ADMIN_CODE) {
        console.error('ADMIN_CODE environment variable is not set');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    if (password === ADMIN_CODE) {
        return res.status(200).json({
            success: true,
            token: 'authenticated' // In production, use JWT or session tokens
        });
    } else {
        return res.status(401).json({
            success: false,
            error: 'Invalid password'
        });
    }
}
