import { useState } from 'react';
import Input from '@/components/ui/Input';
import { CONTACT_METHODS } from '@/utils/constants';

interface Step4Props {
    customerName: string;
    contactMethod: 'email' | 'phone' | 'instagram';
    contactDetail: string;
    onUpdate: (field: string, value: string) => void;
    onFileSelect: (file: File | undefined) => void;
}

function formatPhone(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits.length ? `(${digits}` : '';
    if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
    return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidInstagram(handle: string): boolean {
    return /^@[a-zA-Z0-9._]{1,30}$/.test(handle);
}

function isValidPhone(phone: string): boolean {
    return /^\(\d{3}\)-\d{3}-\d{4}$/.test(phone);
}

export default function Step4Details({
    customerName,
    contactMethod,
    contactDetail,
    onUpdate,
    onFileSelect,
}: Step4Props) {
    const [fileName, setFileName] = useState<string>('');
    const [contactTouched, setContactTouched] = useState(false);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        } else {
            setFileName('');
            onFileSelect(undefined);
        }
    }

    function handleContactChange(value: string) {
        if (contactMethod === 'phone') {
            onUpdate('contactDetail', formatPhone(value));
        } else if (contactMethod === 'instagram') {
            // Auto-add @ if missing
            let formatted = value;
            if (value.length > 0 && !value.startsWith('@')) {
                formatted = '@' + value;
            }
            onUpdate('contactDetail', formatted);
        } else {
            onUpdate('contactDetail', value);
        }
    }

    function getContactError(): string | null {
        if (!contactTouched || !contactDetail) return null;
        if (contactMethod === 'phone' && !isValidPhone(contactDetail)) {
            return 'Please enter a valid phone number: (514)-123-1234';
        }
        if (contactMethod === 'email' && !isValidEmail(contactDetail)) {
            return 'Please enter a valid email: johndoe@gmail.com';
        }
        if (contactMethod === 'instagram' && !isValidInstagram(contactDetail)) {
            return 'Please enter a valid Instagram handle: @username';
        }
        return null;
    }

    const contactError = getContactError();

    return (
        <div className="animate-fade-in">
            <h2 className="text-3xl font-serif mb-2">Your Details</h2>
            <p className="text-mediumGray mb-6">Tell us how to reach you</p>

            <div className="space-y-6">
                <Input
                    label="Full Name *"
                    type="text"
                    value={customerName}
                    onChange={(e) => onUpdate('customerName', e.target.value)}
                    placeholder="Jane Doe"
                    required
                />

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Preferred Contact Method *
                    </label>
                    <select
                        value={contactMethod}
                        onChange={(e) => {
                            onUpdate('contactMethod', e.target.value);
                            onUpdate('contactDetail', '');
                            setContactTouched(false);
                        }}
                        className="w-full px-4 py-3 border border-mediumGray bg-elegantWhite focus:outline-none focus:border-elegantBlack"
                    >
                        {CONTACT_METHODS.map((method) => (
                            <option key={method.value} value={method.value}>
                                {method.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <Input
                        label={
                            contactMethod === 'email'
                                ? 'Email Address *'
                                : contactMethod === 'phone'
                                    ? 'Phone Number *'
                                    : 'Instagram Handle *'
                        }
                        type="text"
                        value={contactDetail}
                        onChange={(e) => handleContactChange(e.target.value)}
                        onBlur={() => setContactTouched(true)}
                        placeholder={
                            contactMethod === 'email'
                                ? 'johndoe@gmail.com'
                                : contactMethod === 'phone'
                                    ? '(514)-123-1234'
                                    : '@yourusername'
                        }
                        required
                    />
                    {contactError && (
                        <p className="text-red-500 text-sm mt-1">{contactError}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Inspiration Photo (Optional)
                    </label>
                    <div className="border-2 border-dashed border-mediumGray p-6 text-center hover:border-elegantBlack transition-colors">
                        <input
                            type="file"
                            id="inspiration-photo"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="inspiration-photo" className="cursor-pointer">
                            <svg className="w-12 h-12 mx-auto mb-2 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-mediumGray">
                                {fileName ? (
                                    <span className="text-elegantBlack font-medium">{fileName}</span>
                                ) : (
                                    <>Click to upload a photo of your desired nail design</>
                                )}
                            </p>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
