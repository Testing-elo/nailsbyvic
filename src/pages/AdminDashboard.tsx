import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AvailabilityManager from '@/components/admin/AvailabilityManager';
import PortfolioManager from '@/components/admin/PortfolioManager';
import BookingsView from '@/components/admin/BookingsView';
import ServicesManager from '@/components/admin/ServicesManager';
import Button from '@/components/ui/Button';

type Tab = 'availability' | 'portfolio' | 'bookings' | 'services';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('availability');

    useEffect(() => {
        const isAuth = sessionStorage.getItem('adminAuth');
        if (!isAuth) navigate('/admin');
    }, [navigate]);

    function handleLogout() {
        sessionStorage.removeItem('adminAuth');
        navigate('/admin');
    }

    const tabs: { id: Tab; label: string }[] = [
        { id: 'availability', label: 'Availability' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'bookings', label: 'Bookings' },
        { id: 'services', label: 'Services & Add-ons' },
    ];

    return (
        <div className="min-h-screen bg-softGray">
            {/* Header */}
            <div className="bg-elegantWhite border-b border-mediumGray">
                <div className="container-custom px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-serif">Admin Dashboard</h1>
                        <Button variant="outline" onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-elegantWhite border-b border-mediumGray">
                <div className="container-custom px-6">
                    <div className="flex gap-8 overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id
                                    ? 'border-elegantBlack text-elegantBlack font-medium'
                                    : 'border-transparent text-mediumGray hover:text-elegantBlack'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom px-6 py-8">
                {activeTab === 'availability' && <AvailabilityManager />}
                {activeTab === 'portfolio' && <PortfolioManager />}
                {activeTab === 'bookings' && <BookingsView />}
                {activeTab === 'services' && <ServicesManager />}
            </div>
        </div>
    );
}
