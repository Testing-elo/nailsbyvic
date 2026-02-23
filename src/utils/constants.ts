import { Service, Addon } from '@/types';

// Available services
export const SERVICES: Service[] = [
    // ── Gel X Poses ──────────────────────────────────────────────────────────
    {
        id: 'gelx-simple',
        name: 'Gel X Simple (1 couleur)',
        description: "Pose d'ongles gel x avec une couleur simple",
        duration: 0,
        price: 45,
        category: 'manicure',
    },
    {
        id: 'gelx-french',
        name: 'Gel X + Manicure Français',
        description: "Pose d'ongles gel x avec finition française",
        duration: 0,
        price: 50,
        category: 'manicure',
    },
    {
        id: 'gelx-design1',
        name: 'Gel X + Design Niveau 1',
        description: "Pose d'ongles gel x avec design niveau 1",
        duration: 0,
        price: 55,
        category: 'manicure',
    },
    {
        id: 'gelx-design2',
        name: 'Gel X + Design Niveau 2',
        description: "Pose d'ongles gel x avec design niveau 2",
        duration: 0,
        price: 60,
        category: 'manicure',
    },
    {
        id: 'gelx-design3',
        name: 'Gel X + Design Niveau 3',
        description: "Pose d'ongles gel x avec design niveau 3",
        duration: 0,
        price: 65,
        category: 'manicure',
    },

    // ── Builder Gel (sur ongles naturels) ────────────────────────────────────
    {
        id: 'builder-simple',
        name: 'Builder Gel + 1 Couleur',
        description: 'Manicure de soin + application de builder gel + 1 couleur (sur ongles naturels)',
        duration: 0,
        price: 35,
        category: 'pedicure',
    },
    {
        id: 'builder-design1',
        name: 'Builder Gel + Design Niveau 1',
        description: 'Manicure de soin + application de builder gel + design niveau 1 (sur ongles naturels)',
        duration: 0,
        price: 40,
        category: 'pedicure',
    },
    {
        id: 'builder-design2',
        name: 'Builder Gel + Design Niveau 2',
        description: 'Manicure de soin + application de builder gel + design niveau 2 (sur ongles naturels)',
        duration: 0,
        price: 45,
        category: 'pedicure',
    },

    // ── Remplissage Gel X ────────────────────────────────────────────────────
    {
        id: 'remplissage-gelx-2sem',
        name: 'Remplissage Gel X (2 semaines)',
        description: 'Couleur simple +$5 · Niveau 1 +$8 · Niveau 2 +$10 · Niveau 3 +$12',
        duration: 0,
        price: 40,
        category: 'nailart',
    },
    {
        id: 'remplissage-gelx-3sem',
        name: 'Remplissage Gel X (3 semaines)',
        description: 'Couleur simple +$5 · Niveau 1 +$8 · Niveau 2 +$10 · Niveau 3 +$12',
        duration: 0,
        price: 45,
        category: 'nailart',
    },
    {
        id: 'remplissage-gelx-4sem',
        name: 'Remplissage Gel X (4 semaines)',
        description: 'Couleur simple +$5 · Niveau 1 +$8 · Niveau 2 +$10 · Niveau 3 +$12',
        duration: 0,
        price: 45,
        category: 'nailart',
    },

    // ── Remplissage Builder Gel & Soak Off ───────────────────────────────────
    {
        id: 'remplissage-builder',
        name: 'Remplissage Builder Gel',
        description: 'Peu importe le design inclus',
        duration: 0,
        price: 40,
        category: 'other',
    },
    {
        id: 'soak-off',
        name: 'Soak Off',
        description: 'Retrait des ongles en gel',
        duration: 0,
        price: 10,
        category: 'other',
    },
];

// Available add-ons (design supplements for Remplissage Gel X)
export const ADDONS: Addon[] = [
    {
        id: 'addon-couleur-simple',
        name: 'Couleur Simple',
        description: 'Supplément couleur simple pour remplissage gel x',
        price: 5,
    },
    {
        id: 'addon-design1',
        name: 'Design Niveau 1',
        description: 'Supplément design niveau 1 pour remplissage gel x',
        price: 8,
    },
    {
        id: 'addon-design2',
        name: 'Design Niveau 2',
        description: 'Supplément design niveau 2 pour remplissage gel x',
        price: 10,
    },
    {
        id: 'addon-design3',
        name: 'Design Niveau 3',
        description: 'Supplément design niveau 3 pour remplissage gel x',
        price: 12,
    },
    {
        id: 'addon-soakoff',
        name: 'Soak Off',
        description: 'Retrait des ongles en gel',
        price: 10,
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
