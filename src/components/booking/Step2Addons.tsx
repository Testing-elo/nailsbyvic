import { Addon } from '@/types';
import { ADDONS } from '@/utils/constants';

interface Step2Props {
    selectedAddons: Addon[];
    onToggleAddon: (addon: Addon) => void;
}

export default function Step2Addons({ selectedAddons, onToggleAddon }: Step2Props) {
    const isSelected = (addon: Addon) =>
        selectedAddons.some(a => a.id === addon.id);

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-serif mb-2">Enhance Your Service</h2>
            <p className="text-mediumGray mb-6">Select any add-ons (optional)</p>

            <div className="space-y-4">
                {ADDONS.map((addon) => (
                    <div
                        key={addon.id}
                        onClick={() => onToggleAddon(addon)}
                        className={`p-6 border-2 cursor-pointer transition-all ${isSelected(addon)
                                ? 'border-elegantBlack bg-softGray'
                                : 'border-mediumGray hover:border-elegantBlack'
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 border-2 flex items-center justify-center ${isSelected(addon) ? 'border-elegantBlack bg-elegantBlack' : 'border-mediumGray'
                                        }`}>
                                        {isSelected(addon) && (
                                            <svg className="w-3 h-3 text-elegantWhite" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-medium">{addon.name}</h3>
                                </div>
                                <p className="text-mediumGray mt-2 ml-8">{addon.description}</p>
                            </div>
                            <p className="text-xl font-bold ml-4">+${addon.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedAddons.length === 0 && (
                <p className="text-center text-mediumGray mt-6 italic">
                    No add-ons selected. You can continue to the next step.
                </p>
            )}
        </div>
    );
}
