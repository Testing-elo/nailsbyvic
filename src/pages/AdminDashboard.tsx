import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailabilityManager from '@/components/admin/AvailabilityManager';
import PortfolioManager from '@/components/admin/PortfolioManager';
import BookingsView from '@/components/admin/BookingsView';
import Button from '@/components/ui/Button';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'availability' | 'portfolio' | 'bookings'>('availability');

    useEffect(() => {
        // Check authentication
        const isAuth = sessionStorage.getItem('adminAuth');
        if (!isAuth) {
            navigate('/admin');
        }
    }, [navigate]);

    function handleLogout() {
        sessionStorage.removeItem('adminAuth');
        navigate('/admin');
    }

    return (
        <div className="min-h-screen bg-softGray">
            {/* Header */}
            <div className="bg-elegantWhite border-b border-mediumGray">
                <div className="container-custom px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-serif">Admin Dashboard</h1>
                        <Button variant="outline" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-elegantWhite border-b border-mediumGray">
                <div className="container-custom px-6">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('availability')}
                            className={`py-4 border-b-2 transition-colors ${activeTab === 'availability'
                                    ? 'border-elegantBlack text-elegantBlack font-medium'
                                    : 'border-transparent text-mediumGray hover:text-elegantBlack'
                                }`}
                        >
                            Availability
                        </button>
                        <button
                            onClick={() => setActiveTab('portfolio')}
                            className={`py-4 border-b-2 transition-colors ${activeTab === 'portfolio'
                                    ? 'border-elegantBlack text-elegantBlack font-medium'
                                    : 'border-transparent text-mediumGray hover:text-elegantBlack'
                                }`}
                        >
                            Portfolio
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`py-4 border-b-2 transition-colors ${activeTab === 'bookings'
                                    ? 'border-elegantBlack text-elegantBlack font-medium'
                                    : 'border-transparent text-mediumGray hover:text-elegantBlack'
                                }`}
                        >
                            Bookings
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom px-6 py-8">
                {activeTab === 'availability' && <AvailabilityManager />}
                {activeTab === 'portfolio' && <PortfolioManager />}
                {activeTab === 'bookings' && <BookingsView />}
            </div>
        </div>
    );
}
