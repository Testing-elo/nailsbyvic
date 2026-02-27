import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
    lang: Language;
    toggleLang: () => void;
    t: typeof translations.fr;
}

const translations = {
    en: {
        nav: {
            home: 'Home',
            services: 'Services',
            portfolio: 'Portfolio',
            availability: 'Availability',
            book: 'Book Now',
            policy: 'Policy',
        },
        home: {
            title: 'Nailsbyvic',
            subtitle: 'Elegant nail artistry tailored to perfection. Experience luxury and precision in every detail.',
            bookBtn: 'Book Appointment',
            portfolioBtn: 'View Portfolio',
            feature1Title: 'Premium Quality',
            feature1Desc: 'Using only the finest products for lasting, stunning results',
            feature2Title: 'Flexible Scheduling',
            feature2Desc: 'Book appointments that fit your busy lifestyle',
            feature3Title: 'Personalized Care',
            feature3Desc: 'Every design customized to match your unique style',
            ctaTitle: 'Ready to Transform Your Nails?',
            ctaDesc: 'Browse our services, check availability, and book your appointment in just a few clicks.',
            ctaBtn: 'Explore Services',
        },
        services: {
            title: 'Our Services',
            subtitle: 'Pricing at Nails by Vic',
            gelxTitle: 'Gel X Nail Application',
            builderTitle: 'Builder Gel (on natural nails)',
            remplissageTitle: 'Gel X Refill',
            otherTitle: 'Builder Gel Refill & Soak Off',
            designAddons: 'Design Add-ons',
            ctaTitle: 'Ready to book?',
            ctaDesc: 'Choose your service and book your appointment',
            ctaBtn: 'Book Now',
        },
        portfolio: {
            title: 'Portfolio',
            subtitle: 'Explore our collection of stunning nail designs',
            loading: 'Loading portfolio...',
            empty: 'No portfolio items yet. Check back soon!',
            error: 'Error loading portfolio',
        },
        availability: {
            title: 'Availability',
            subtitle: 'Check available appointment slots and book your preferred time',
            loading: 'Loading availability...',
            empty: 'No available slots at the moment. Please check back later!',
            error: 'Error loading availability',
            ctaText: 'Found your perfect time slot?',
            ctaBtn: 'Book Appointment',
        },
        book: {
            title: 'Book Appointment',
            step: 'Step',
            of: 'of',
            service: 'Service',
            addons: 'Add-ons',
            datetime: 'Date & Time',
            details: 'Details',
            summary: 'Booking Summary',
            estimatedTotal: 'Estimated Total',
            previous: 'Previous',
            next: 'Next Step',
            confirm: 'Confirm Booking',
            submitting: 'Submitting...',
        },
        policy: {
            title: 'Service Policy',
            subtitle: 'Please read these policies carefully to ensure a pleasant experience for all clients.',
            lateTitle: 'Late Arrivals',
            lateText1: 'Clients arriving up to <b>15 minutes late</b> will be accommodated, provided prior notice has been given.',
            lateText2: 'Arrivals exceeding 15 minutes late will be subject to a <b>$10 late fee</b>.',
            cancelTitle: 'Cancellations & No-Shows',
            cancelText1: 'A minimum of <b>24 hours\' notice</b> is required for all appointment cancellations.',
            cancelText2: 'Clients who fail to provide notice will have their appointment cancelled.',
            cancelText3: 'Any <b>no-show without notice</b> will result in a permanent loss of booking privileges.',
            cancelText4: 'Please be considerate of my time and that of other clients scheduled after you.',
            repairTitle: 'Nail Repairs',
            repair48Title: 'Within 48 hours',
            repair48Desc: 'If a nail breaks, lifts, or falls off within <b>48 hours</b> of your appointment, it will be repaired at no additional charge.',
            repair48Price: 'Free',
            repairAfterTitle: 'After 48 hours',
            repairAfterDesc: 'Any repair requested after the 48-hour window will be charged based on the type of repair required.',
            repairAfterPrice: 'Fee applies',
            conditionsTitle: 'Service Conditions',
            conditionsText1: 'I reserve the right to <b>refuse service</b> on damaged or weakened nails.',
            conditionsText2: '<b>Soak-off removal</b> must be requested in advance — walk-in removal requests cannot be accommodated.',
            artistTitle: 'Cancellations by Me',
            artistText: 'In the rare event that I must cancel an appointment for personal reasons, a <b>15% discount</b> will be applied to your rescheduled appointment.',
            ctaTitle: 'Questions?',
            ctaDesc: 'Thank you for your understanding — these policies allow me to provide the best possible experience for every client.',
            ctaBtn: 'Book an Appointment',
        },
    },
    fr: {
        nav: {
            home: 'Accueil',
            services: 'Services',
            portfolio: 'Portfolio',
            availability: 'Disponibilités',
            book: 'Réserver',
            policy: 'Politique',
        },
        home: {
            title: 'Nailsbyvic',
            subtitle: 'Un art des ongles élégant, taillé à la perfection. Découvrez le luxe et la précision dans chaque détail.',
            bookBtn: 'Prendre rendez-vous',
            portfolioBtn: 'Voir le portfolio',
            feature1Title: 'Qualité Premium',
            feature1Desc: 'Seulement les meilleurs produits pour des résultats durables et époustouflants',
            feature2Title: 'Horaires Flexibles',
            feature2Desc: 'Réservez un rendez-vous qui s\'adapte à votre emploi du temps',
            feature3Title: 'Soin Personnalisé',
            feature3Desc: 'Chaque design est personnalisé pour correspondre à votre style unique',
            ctaTitle: 'Prête à transformer vos ongles?',
            ctaDesc: 'Parcourez nos services, vérifiez les disponibilités et réservez votre rendez-vous en quelques clics.',
            ctaBtn: 'Explorer les services',
        },
        services: {
            title: 'Nos Services',
            subtitle: 'Tarifs chez Nails by Vic',
            gelxTitle: 'Pose d\'Ongles Gel X',
            builderTitle: 'Builder Gel (sur ongles naturels)',
            remplissageTitle: 'Remplissage Gel X',
            otherTitle: 'Remplissage Builder Gel & Soak Off',
            designAddons: 'Suppléments de design',
            ctaTitle: 'Prête à réserver?',
            ctaDesc: 'Choisissez votre service et réservez votre rendez-vous',
            ctaBtn: 'Réserver',
        },
        portfolio: {
            title: 'Portfolio',
            subtitle: 'Explorez notre collection de designs d\'ongles époustouflants',
            loading: 'Chargement du portfolio...',
            empty: 'Aucun élément pour l\'instant. Revenez bientôt!',
            error: 'Erreur lors du chargement du portfolio',
        },
        availability: {
            title: 'Disponibilités',
            subtitle: 'Consultez les créneaux disponibles et réservez votre heure préférée',
            loading: 'Chargement des disponibilités...',
            empty: 'Aucun créneau disponible pour le moment. Revenez plus tard!',
            error: 'Erreur lors du chargement des disponibilités',
            ctaText: 'Vous avez trouvé votre créneau idéal?',
            ctaBtn: 'Prendre rendez-vous',
        },
        book: {
            title: 'Prendre Rendez-vous',
            step: 'Étape',
            of: 'sur',
            service: 'Service',
            addons: 'Suppléments',
            datetime: 'Date & Heure',
            details: 'Détails',
            summary: 'Résumé de la réservation',
            estimatedTotal: 'Total estimé',
            previous: 'Précédent',
            next: 'Étape suivante',
            confirm: 'Confirmer la réservation',
            submitting: 'Envoi en cours...',
        },
        policy: {
            title: 'Politique de Service',
            subtitle: 'Veuillez lire attentivement ces politiques afin d\'assurer une expérience agréable pour toutes les clientes.',
            lateTitle: 'Retards',
            lateText1: 'Les clients arrivant jusqu\'à <b>15 minutes en retard</b> seront accommodés, à condition d\'avoir avisé à l\'avance.',
            lateText2: 'Tout retard dépassant 15 minutes entraînera des frais supplémentaires de <b>10 $</b>.',
            cancelTitle: 'Annulations et Absences',
            cancelText1: 'Un préavis d\'au moins <b>24 heures</b> est requis pour toute annulation de rendez-vous.',
            cancelText2: 'Les clients n\'ayant pas fourni d\'avis verront leur rendez-vous annulé.',
            cancelText3: 'Toute <b>absence sans préavis</b> entraînera la perte définitive des privilèges de réservation.',
            cancelText4: 'Veuillez respecter mon temps ainsi que celui des autres clientes planifiées après vous.',
            repairTitle: 'Réparations d\'Ongles',
            repair48Title: 'Dans les 48 heures',
            repair48Desc: 'Si un ongle vient à casser, se décoller ou tomber dans les <b>48 heures</b> suivant votre rendez-vous, la réparation sera effectuée sans frais supplémentaires.',
            repair48Price: 'Gratuit',
            repairAfterTitle: 'Après 48 heures',
            repairAfterDesc: 'Toute réparation demandée après le délai de 48 heures sera facturée selon le type de réparation requise.',
            repairAfterPrice: 'Frais applicables',
            conditionsTitle: 'Conditions de Service',
            conditionsText1: 'Je me réserve le droit de <b>refuser tout service</b> sur des ongles endommagés ou affaiblis.',
            conditionsText2: 'Le retrait de pose <b>(soak-off)</b> doit être demandé à l\'avance — les demandes sans préavis ne pourront pas être accommodées.',
            artistTitle: 'Annulations de ma Part',
            artistText: 'Dans le cas où je devrais annuler un rendez-vous pour des raisons personnelles, un <b>rabais de 15 %</b> sera appliqué lors de votre prochain rendez-vous.',
            ctaTitle: 'Des questions?',
            ctaDesc: 'Merci de votre compréhension — ces politiques me permettent d\'offrir la meilleure expérience possible à chaque cliente.',
            ctaBtn: 'Réserver un rendez-vous',
        },
    },
};

const LanguageContext = createContext<LanguageContextType>({
    lang: 'fr',
    toggleLang: () => {},
    t: translations.fr,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>('fr');
    const toggleLang = () => setLang(prev => prev === 'fr' ? 'en' : 'fr');

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
