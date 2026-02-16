// Service types
export interface Service {
    id: string;
    name: string;
    description: string;
    duration: number; // in minutes
    price: number;
    category: 'manicure' | 'pedicure' | 'nailart' | 'other';
}

// Add-on types
export interface Addon {
    id: string;
    name: string;
    description: string;
    price: number;
}

// Availability types
export interface Availability {
    id: string;
    date: string; // YYYY-MM-DD format
    time: string; // HH:MM format
    created_at?: string;
}

// Booking types
export interface Booking {
    id?: string;
    date: string; // YYYY-MM-DD format
    time: string; // HH:MM format
    customer_name: string;
    contact_method: 'email' | 'phone' | 'instagram';
    contact_detail: string;
    service: string;
    addons: string[]; // Array of addon IDs
    inspiration_photo_url?: string;
    estimated_total: number;
    created_at?: string;
}

// Portfolio types
export interface PortfolioItem {
    id: string;
    url: string;
    title: string;
    category: 'natural' | 'french' | 'gel' | 'acrylic' | 'nailart' | 'other';
    created_at?: string;
}

// Form state for booking flow
export interface BookingFormData {
    step: number;
    service?: Service;
    selectedAddons: Addon[];
    date?: string;
    time?: string;
    customerName: string;
    contactMethod: 'email' | 'phone' | 'instagram';
    contactDetail: string;
    inspirationPhoto?: File;
}
