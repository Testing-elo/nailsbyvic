import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/admin-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success) {
                // Store auth token in sessionStorage (simple approach)
                sessionStorage.setItem('adminAuth', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Authentication failed. Please try again.');
            console.error('Auth error:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-softGray">
            <div className="bg-elegantWhite border border-mediumGray p-8 w-full max-w-md">
                <h1 className="text-4xl font-serif mb-2 text-center">Admin Login</h1>
                <p className="text-mediumGray text-center mb-8">
                    Enter your admin password
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="password"
                        label="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        error={error}
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || !password}
                    >
                        {isLoading ? 'Authenticating...' : 'Login'}
                    </Button>

                    <div className="text-center">
                        <a href="/" className="text-sm text-mediumGray hover:text-elegantBlack">
                            ← Back to Home
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
