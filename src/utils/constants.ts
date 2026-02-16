import { Service, Addon } from '@/types';

// Available services
export const SERVICES: Service[] = [
    {
        id: 'manicure-classic',
        name: 'Classic Manicure',
        description: 'Traditional manicure with nail shaping, cuticle care, and polish',
        duration: 45,
        price: 35,
        category: 'manicure',
    },
    {
        id: 'manicure-gel',
        name: 'Gel Manicure',
        description: 'Long-lasting gel polish with professional finish',
        duration: 60,
        price: 55,
        category: 'manicure',
    },
    {
        id: 'pedicure-classic',
        name: 'Classic Pedicure',
        description: 'Relaxing pedicure with foot soak, exfoliation, and polish',
        duration: 60,
        price: 45,
        category: 'pedicure',
    },
    {
        id: 'pedicure-spa',
        name: 'Spa Pedicure',
        description: 'Luxurious spa pedicure with massage and premium treatments',
        duration: 75,
        price: 65,
        category: 'pedicure',
    },
    {
        id: 'nailart-simple',
        name: 'Simple Nail Art',
        description: 'Elegant nail art designs with up to 3 colors',
        duration: 75,
        price: 70,
        category: 'nailart',
    },
    {
        id: 'nailart-complex',
        name: 'Complex Nail Art',
        description: 'Intricate custom designs with embellishments',
        duration: 120,
        price: 120,
        category: 'nailart',
    },
];

// Available add-ons
export const ADDONS: Addon[] = [
    {
        id: 'addon-french',
        name: 'French Tips',
        description: 'Classic or modern French tip design',
        price: 10,
    },
    {
        id: 'addon-massage',
        name: 'Hand/Foot Massage',
        description: '10-minute relaxing massage',
        price: 15,
    },
    {
        id: 'addon-paraffin',
        name: 'Paraffin Treatment',
        description: 'Moisturizing paraffin wax treatment',
        price: 12,
    },
    {
        id: 'addon-design',
        name: 'Accent Nail Design',
        description: 'Special design on 1-2 accent nails',
        price: 8,
    },
    {
        id: 'addon-removal',
        name: 'Gel/Acrylic Removal',
        description: 'Safe removal of previous gel or acrylic',
        price: 20,
    },
];

// Portfolio categories
export const PORTFOLIO_CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'natural', label: 'Natural' },
    { id: 'french', label: 'French' },
    { id: 'gel', label: 'Gel' },
    { id: 'acrylic', label: 'Acrylic' },
    { id: 'nailart', label: 'Nail Art' },
    { id: 'other', label: 'Other' },
];

// Contact methods
export const CONTACT_METHODS = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'instagram', label: 'Instagram' },
] as const;

// Webhook URL for booking submissions
export const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || 'https://webhook.site/placeholder';
