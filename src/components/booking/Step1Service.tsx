import { Service } from '@/types';
import { SERVICES } from '@/utils/constants';

interface Step1Props {
    selectedService?: Service;
    onSelect: (service: Service) => void;
}

export default function Step1Service({ selectedService, onSelect }: Step1Props) {
    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-serif mb-6">Select Your Service</h2>

            <div className="space-y-4">
                {SERVICES.map((service) => (
                    <div
                        key={service.id}
                        onClick={() => onSelect(service)}
                        className={`p-6 border-2 cursor-pointer transition-all ${selectedService?.id === service.id
                                ? 'border-elegantBlack bg-softGray'
                                : 'border-mediumGray hover:border-elegantBlack'
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-serif">{service.name}</h3>
                            <div className="text-right">
                                <p className="text-xl font-bold">${service.price}</p>
                                <p className="text-sm text-mediumGray">{service.duration} min</p>
                            </div>
                        </div>
                        <p className="text-mediumGray">{service.description}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-elegantBlack text-elegantWhite text-xs uppercase">
                            {service.category}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
