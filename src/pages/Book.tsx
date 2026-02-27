import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { sendBookingToWebhook } from '@/utils/webhook';
import Button from '@/components/ui/Button';
import Step1Service from '@/components/booking/Step1Service';
import Step2Addons from '@/components/booking/Step2Addons';
import Step3DateTime from '@/components/booking/Step3DateTime';
import Step4Details from '@/components/booking/Step4Details';
import { useLanguage } from '@/lib/LanguageContext';

interface DBService {
    id: string; name: string; description: string; price: number; category: string;
}
interface DBAddon {
    id: string; name: string; description: string; price: number; applicable_categories: string[];
}
interface DBBookingFormData {
    service?: DBService; selectedAddons: DBAddon[]; date?: string; time?: string;
    customerName: string; contactMethod: 'phone' | 'instagram'; contactDetail: string; inspirationPhoto?: File;
}

export default function Book() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const b = t.book;
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<DBBookingFormData>({
        selectedAddons: [], customerName: '', contactMethod: 'phone', contactDetail: '',
    });
    const totalSteps = 4;

    function calculateTotal(): number {
        let total = formData.service?.price || 0;
        formData.selectedAddons.forEach(addon => { total += addon.price; });
        return total;
    }
    function handleServiceSelect(service: DBService) { setFormData({ ...formData, service, selectedAddons: [] }); }
    function handleAddonToggle(addon: DBAddon) {
        const isSelected = formData.selectedAddons.some(a => a.id === addon.id);
        setFormData({ ...formData, selectedAddons: isSelected ? formData.selectedAddons.filter(a => a.id !== addon.id) : [...formData.selectedAddons, addon] });
    }
    function handleDateTimeSelect(date: string, time: string) { setFormData({ ...formData, date, time }); }
    function handleDetailUpdate(field: string, value: string) { setFormData(prev => ({ ...prev, [field]: value })); }
    function handleFileSelect(file: File | undefined) { setFormData({ ...formData, inspirationPhoto: file }); }

    async function uploadInspirationPhoto(file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file);
            if (error) throw error;
            const { data: urlData } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
            return urlData.publicUrl;
        } catch (err) { console.error('Error uploading inspiration photo:', err); return null; }
    }

    async function handleSubmit() {
        if (!formData.service || !formData.date || !formData.time || !formData.customerName || !formData.contactDetail || !formData.inspirationPhoto) {
            alert('Please complete all required fields'); return;
        }
        setIsSubmitting(true);
        try {
            let inspirationPhotoUrl: string | undefined;
            if (formData.inspirationPhoto) { const url = await uploadInspirationPhoto(formData.inspirationPhoto); if (url) inspirationPhotoUrl = url; }
            const booking = { date: formData.date, time: formData.time, customer_name: formData.customerName, contact_method: formData.contactMethod, contact_detail: formData.contactDetail, service: formData.service.name, addons: formData.selectedAddons.map(a => a.name), inspiration_photo_url: inspirationPhotoUrl, estimated_total: calculateTotal() };
            const { error } = await supabase.from('bookings').insert([booking]);
            if (error) throw error;
            const { data: slotsToDelete } = await supabase.from('availabilities').select('*').eq('date', formData.date);
            if (slotsToDelete) { const slotToRemove = slotsToDelete.find(slot => slot.time.startsWith(formData.time)); if (slotToRemove) await supabase.from('availabilities').delete().eq('id', slotToRemove.id); }
            await sendBookingToWebhook(booking);
            alert('Booking submitted successfully! We will contact you soon.');
            navigate('/');
        } catch (err: any) { alert(`Error submitting booking: ${err.message}`); } finally { setIsSubmitting(false); }
    }

    function canProceed(): boolean {
        switch (currentStep) {
            case 1: return !!formData.service;
            case 2: return true;
            case 3: return !!formData.date && !!formData.time;
            case 4: {
                if (!formData.customerName || !formData.contactDetail || !formData.inspirationPhoto) return false;
                if (formData.contactMethod === 'phone') return /^\(\d{3}\)-\d{3}-\d{4}$/.test(formData.contactDetail);
                if (formData.contactMethod === 'instagram') return /^@[a-zA-Z0-9._]{1,30}$/.test(formData.contactDetail);
                return false;
            }
            default: return false;
        }
    }

    const stepLabels = [b.service, b.addons, b.datetime, b.details];

    return (
        <div className="section-padding animate-fade-in">
            <div className="container-custom max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-serif mb-4">{b.title}</h1>
                    <p className="text-xl text-mediumGray">{b.step} {currentStep} {b.of} {totalSteps}</p>
                </div>
                <div className="mb-12">
                    <div className="flex justify-between mb-2">
                        {[1, 2, 3, 4].map((step) => (<div key={step} className={`w-1/4 h-2 ${step <= currentStep ? 'bg-elegantBlack' : 'bg-mediumGray'} ${step !== 1 ? 'ml-2' : ''}`} />))}
                    </div>
                    <div className="flex justify-between text-sm text-mediumGray mt-2">
                        {stepLabels.map((label, i) => <span key={i}>{label}</span>)}
                    </div>
                </div>
                <div className="mb-12">
                    {currentStep === 1 && <Step1Service selectedService={formData.service} onSelect={handleServiceSelect} />}
                    {currentStep === 2 && <Step2Addons selectedAddons={formData.selectedAddons} onToggleAddon={handleAddonToggle} serviceCategory={formData.service?.category} />}
                    {currentStep === 3 && <Step3DateTime selectedDate={formData.date} selectedTime={formData.time} onSelectDateTime={handleDateTimeSelect} />}
                    {currentStep === 4 && <Step4Details customerName={formData.customerName} contactMethod={formData.contactMethod} contactDetail={formData.contactDetail} onUpdate={handleDetailUpdate} onFileSelect={handleFileSelect} />}
                </div>
                {formData.service && (
                    <div className="bg-softGray p-6 mb-8">
                        <h3 className="font-serif text-xl mb-4">{b.summary}</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span>{formData.service.name}</span><span>${formData.service.price}</span></div>
                            {formData.selectedAddons.map(addon => (<div key={addon.id} className="flex justify-between text-mediumGray"><span>{addon.name}</span><span>+${addon.price}</span></div>))}
                            <div className="border-t border-mediumGray pt-2 mt-2 flex justify-between font-bold"><span>{b.estimatedTotal}</span><span>${calculateTotal()}</span></div>
                        </div>
                    </div>
                )}
                <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setCurrentStep(Math.max(1, currentStep - 1))} disabled={currentStep === 1}>{b.previous}</Button>
                    {currentStep < totalSteps ? (
                        <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={!canProceed()}>{b.next}</Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting}>{isSubmitting ? b.submitting : b.confirm}</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
