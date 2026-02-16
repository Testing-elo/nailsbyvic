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

export default function Step4Details({
    customerName,
    contactMethod,
    contactDetail,
    onUpdate,
    onFileSelect,
}: Step4Props) {
    const [fileName, setFileName] = useState<string>('');

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
                        onChange={(e) => onUpdate('contactMethod', e.target.value)}
                        className="w-full px-4 py-3 border border-mediumGray bg-elegantWhite focus:outline-none focus:border-elegantBlack"
                    >
                        {CONTACT_METHODS.map((method) => (
                            <option key={method.value} value={method.value}>
                                {method.label}
                            </option>
                        ))}
                    </select>
                </div>

                <Input
                    label={
                        contactMethod === 'email'
                            ? 'Email Address *'
                            : contactMethod === 'phone'
                                ? 'Phone Number *'
                                : 'Instagram Handle *'
                    }
                    type={contactMethod === 'email' ? 'email' : 'text'}
                    value={contactDetail}
                    onChange={(e) => onUpdate('contactDetail', e.target.value)}
                    placeholder={
                        contactMethod === 'email'
                            ? 'jane@example.com'
                            : contactMethod === 'phone'
                                ? '(555) 123-4567'
                                : '@yourusername'
                    }
                    required
                />

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
                        <label
                            htmlFor="inspiration-photo"
                            className="cursor-pointer"
                        >
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
