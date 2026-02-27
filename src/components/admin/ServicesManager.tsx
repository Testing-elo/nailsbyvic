import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface DBService {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    sort_order: number;
}

interface DBAddon {
    id: string;
    name: string;
    description: string;
    price: number;
    applicable_categories: string[];
    sort_order: number;
}

interface DBCategory {
    id: string;
    label: string;
    sort_order: number;
}

const SERVICE_CATEGORIES = [
    { value: 'gelx', label: 'Gel X' },
    { value: 'builder', label: 'Builder Gel' },
    { value: 'remplissage', label: 'Remplissage' },
    { value: 'other', label: 'Other' },
];

const ADDON_CATEGORY_OPTIONS = ['gelx', 'builder', 'remplissage', 'other'];

type ActiveSection = 'services' | 'addons' | 'categories';

export default function ServicesManager() {
    const [section, setSection] = useState<ActiveSection>('services');

    // Services
    const [services, setServices] = useState<DBService[]>([]);
    const [newService, setNewService] = useState({ name: '', description: '', price: '', category: 'gelx' });
    const [editingService, setEditingService] = useState<DBService | null>(null);

    // Addons
    const [addons, setAddons] = useState<DBAddon[]>([]);
    const [newAddon, setNewAddon] = useState({ name: '', description: '', price: '', applicable_categories: ['remplissage'] });
    const [editingAddon, setEditingAddon] = useState<DBAddon | null>(null);

    // Portfolio categories
    const [categories, setCategories] = useState<DBCategory[]>([]);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newCategoryLabel, setNewCategoryLabel] = useState('');

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchAll();
    }, []);

    async function fetchAll() {
        const [s, a, c] = await Promise.all([
            supabase.from('services').select('*').order('sort_order'),
            supabase.from('addons').select('*').order('sort_order'),
            supabase.from('portfolio_categories').select('*').order('sort_order'),
        ]);
        if (s.data) setServices(s.data);
        if (a.data) setAddons(a.data);
        if (c.data) setCategories(c.data);
    }

    // ── Services ──────────────────────────────────────────────────────────────

    async function addService() {
        if (!newService.name || !newService.price) return;
        setSaving(true);
        const { error } = await supabase.from('services').insert([{
            name: newService.name,
            description: newService.description,
            price: parseFloat(newService.price),
            category: newService.category,
            sort_order: services.length + 1,
        }]);
        if (!error) {
            setNewService({ name: '', description: '', price: '', category: 'gelx' });
            await fetchAll();
        }
        setSaving(false);
    }

    async function saveService(service: DBService) {
        setSaving(true);
        const { error } = await supabase.from('services').update({
            name: service.name,
            description: service.description,
            price: service.price,
            category: service.category,
        }).eq('id', service.id);
        if (!error) { setEditingService(null); await fetchAll(); }
        setSaving(false);
    }

    async function deleteService(id: string) {
        if (!confirm('Delete this service?')) return;
        await supabase.from('services').delete().eq('id', id);
        await fetchAll();
    }

    // ── Addons ────────────────────────────────────────────────────────────────

    async function addAddon() {
        if (!newAddon.name || !newAddon.price) return;
        setSaving(true);
        const { error } = await supabase.from('addons').insert([{
            name: newAddon.name,
            description: newAddon.description,
            price: parseFloat(newAddon.price),
            applicable_categories: newAddon.applicable_categories,
            sort_order: addons.length + 1,
        }]);
        if (!error) {
            setNewAddon({ name: '', description: '', price: '', applicable_categories: ['remplissage'] });
            await fetchAll();
        }
        setSaving(false);
    }

    async function saveAddon(addon: DBAddon) {
        setSaving(true);
        const { error } = await supabase.from('addons').update({
            name: addon.name,
            description: addon.description,
            price: addon.price,
            applicable_categories: addon.applicable_categories,
        }).eq('id', addon.id);
        if (!error) { setEditingAddon(null); await fetchAll(); }
        setSaving(false);
    }

    async function deleteAddon(id: string) {
        if (!confirm('Delete this add-on?')) return;
        await supabase.from('addons').delete().eq('id', id);
        await fetchAll();
    }

    function toggleAddonCategory(current: string[], cat: string): string[] {
        return current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat];
    }

    // ── Portfolio Categories ───────────────────────────────────────────────────

    async function addCategory() {
        if (!newCategoryId || !newCategoryLabel) return;
        setSaving(true);
        const { error } = await supabase.from('portfolio_categories').insert([{
            id: newCategoryId.toLowerCase().replace(/\s+/g, '-'),
            label: newCategoryLabel,
            sort_order: categories.length + 1,
        }]);
        if (!error) { setNewCategoryId(''); setNewCategoryLabel(''); await fetchAll(); }
        setSaving(false);
    }

    async function deleteCategory(id: string) {
        if (!confirm('Delete this category?')) return;
        await supabase.from('portfolio_categories').delete().eq('id', id);
        await fetchAll();
    }

    const sectionBtn = (s: ActiveSection, label: string) => (
        <button
            onClick={() => setSection(s)}
            className={`px-5 py-2 border-2 text-sm font-medium transition-all ${section === s ? 'bg-elegantBlack text-elegantWhite border-elegantBlack' : 'border-mediumGray text-mediumGray hover:border-elegantBlack hover:text-elegantBlack'}`}
        >
            {label}
        </button>
    );

    return (
        <div>
            <h2 className="text-3xl font-serif mb-6">Manage Services & Add-ons</h2>

            {/* Section Toggle */}
            <div className="flex gap-3 mb-8">
                {sectionBtn('services', 'Services')}
                {sectionBtn('addons', 'Add-ons')}
                {sectionBtn('categories', 'Portfolio Categories')}
            </div>

            {/* ── SERVICES ── */}
            {section === 'services' && (
                <div className="space-y-8">
                    {/* Add new */}
                    <div className="bg-elegantWhite border border-mediumGray p-6">
                        <h3 className="text-xl font-serif mb-4">Add New Service</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input label="Name *" type="text" value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} placeholder="Gel X Simple" />
                            <Input label="Price ($) *" type="number" value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} placeholder="45" />
                            <Input label="Description" type="text" value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })} placeholder="Short description" />
                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <select value={newService.category} onChange={e => setNewService({ ...newService, category: e.target.value })} className="w-full px-4 py-3 border border-mediumGray bg-elegantWhite focus:outline-none focus:border-elegantBlack">
                                    {SERVICE_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                            </div>
                        </div>
                        <Button onClick={addService} disabled={saving || !newService.name || !newService.price}>Add Service</Button>
                    </div>

                    {/* List */}
                    <div className="bg-elegantWhite border border-mediumGray overflow-hidden">
                        {SERVICE_CATEGORIES.map(cat => {
                            const group = services.filter(s => s.category === cat.value);
                            if (group.length === 0) return null;
                            return (
                                <div key={cat.value}>
                                    <div className="px-6 py-3 bg-softGray border-b border-mediumGray">
                                        <p className="font-semibold text-sm uppercase tracking-widest">{cat.label}</p>
                                    </div>
                                    {group.map(service => (
                                        <div key={service.id} className="border-b border-mediumGray last:border-b-0">
                                            {editingService?.id === service.id ? (
                                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <Input label="Name" type="text" value={editingService.name} onChange={e => setEditingService({ ...editingService, name: e.target.value })} />
                                                    <Input label="Price ($)" type="number" value={String(editingService.price)} onChange={e => setEditingService({ ...editingService, price: parseFloat(e.target.value) })} />
                                                    <Input label="Description" type="text" value={editingService.description} onChange={e => setEditingService({ ...editingService, description: e.target.value })} />
                                                    <div>
                                                        <label className="block text-sm font-medium mb-2">Category</label>
                                                        <select value={editingService.category} onChange={e => setEditingService({ ...editingService, category: e.target.value })} className="w-full px-4 py-3 border border-mediumGray bg-elegantWhite focus:outline-none focus:border-elegantBlack">
                                                            {SERVICE_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="md:col-span-2 flex gap-3">
                                                        <Button onClick={() => saveService(editingService)} disabled={saving}>Save</Button>
                                                        <Button variant="outline" onClick={() => setEditingService(null)}>Cancel</Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="px-6 py-4 flex justify-between items-center hover:bg-softGray">
                                                    <div>
                                                        <p className="font-medium">{service.name}</p>
                                                        <p className="text-sm text-mediumGray">{service.description}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold">${service.price}</span>
                                                        <button onClick={() => setEditingService(service)} className="text-sm text-mediumGray hover:text-elegantBlack transition-colors">Edit</button>
                                                        <button onClick={() => deleteService(service.id)} className="text-sm text-mediumGray hover:text-red-600 transition-colors">Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── ADDONS ── */}
            {section === 'addons' && (
                <div className="space-y-8">
                    <div className="bg-elegantWhite border border-mediumGray p-6">
                        <h3 className="text-xl font-serif mb-4">Add New Add-on</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input label="Name *" type="text" value={newAddon.name} onChange={e => setNewAddon({ ...newAddon, name: e.target.value })} placeholder="Design Niveau 1" />
                            <Input label="Price ($) *" type="number" value={newAddon.price} onChange={e => setNewAddon({ ...newAddon, price: e.target.value })} placeholder="8" />
                            <Input label="Description" type="text" value={newAddon.description} onChange={e => setNewAddon({ ...newAddon, description: e.target.value })} placeholder="Short description" />
                            <div>
                                <label className="block text-sm font-medium mb-2">Applies to categories</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {ADDON_CATEGORY_OPTIONS.map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setNewAddon({ ...newAddon, applicable_categories: toggleAddonCategory(newAddon.applicable_categories, cat) })}
                                            className={`px-3 py-1 border text-sm transition-all ${newAddon.applicable_categories.includes(cat) ? 'bg-elegantBlack text-elegantWhite border-elegantBlack' : 'border-mediumGray text-mediumGray hover:border-elegantBlack'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Button onClick={addAddon} disabled={saving || !newAddon.name || !newAddon.price}>Add Add-on</Button>
                    </div>

                    <div className="bg-elegantWhite border border-mediumGray overflow-hidden">
                        {addons.map(addon => (
                            <div key={addon.id} className="border-b border-mediumGray last:border-b-0">
                                {editingAddon?.id === addon.id ? (
                                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Input label="Name" type="text" value={editingAddon.name} onChange={e => setEditingAddon({ ...editingAddon, name: e.target.value })} />
                                        <Input label="Price ($)" type="number" value={String(editingAddon.price)} onChange={e => setEditingAddon({ ...editingAddon, price: parseFloat(e.target.value) })} />
                                        <Input label="Description" type="text" value={editingAddon.description} onChange={e => setEditingAddon({ ...editingAddon, description: e.target.value })} />
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Applies to categories</label>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {ADDON_CATEGORY_OPTIONS.map(cat => (
                                                    <button
                                                        key={cat}
                                                        type="button"
                                                        onClick={() => setEditingAddon({ ...editingAddon, applicable_categories: toggleAddonCategory(editingAddon.applicable_categories, cat) })}
                                                        className={`px-3 py-1 border text-sm transition-all ${editingAddon.applicable_categories.includes(cat) ? 'bg-elegantBlack text-elegantWhite border-elegantBlack' : 'border-mediumGray text-mediumGray hover:border-elegantBlack'}`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 flex gap-3">
                                            <Button onClick={() => saveAddon(editingAddon)} disabled={saving}>Save</Button>
                                            <Button variant="outline" onClick={() => setEditingAddon(null)}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="px-6 py-4 flex justify-between items-center hover:bg-softGray">
                                        <div>
                                            <p className="font-medium">{addon.name}</p>
                                            <p className="text-sm text-mediumGray">{addon.description}</p>
                                            <div className="flex gap-1 mt-1">
                                                {addon.applicable_categories.map(cat => (
                                                    <span key={cat} className="text-xs px-2 py-0.5 bg-softGray border border-mediumGray">{cat}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold">+${addon.price}</span>
                                            <button onClick={() => setEditingAddon(addon)} className="text-sm text-mediumGray hover:text-elegantBlack transition-colors">Edit</button>
                                            <button onClick={() => deleteAddon(addon.id)} className="text-sm text-mediumGray hover:text-red-600 transition-colors">Delete</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {addons.length === 0 && <p className="p-6 text-mediumGray">No add-ons yet.</p>}
                    </div>
                </div>
            )}

            {/* ── PORTFOLIO CATEGORIES ── */}
            {section === 'categories' && (
                <div className="space-y-8">
                    <div className="bg-elegantWhite border border-mediumGray p-6">
                        <h3 className="text-xl font-serif mb-4">Add New Category</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input label="ID (no spaces) *" type="text" value={newCategoryId} onChange={e => setNewCategoryId(e.target.value)} placeholder="e.g. chrome" />
                            <Input label="Label *" type="text" value={newCategoryLabel} onChange={e => setNewCategoryLabel(e.target.value)} placeholder="e.g. Chrome" />
                        </div>
                        <Button onClick={addCategory} disabled={saving || !newCategoryId || !newCategoryLabel}>Add Category</Button>
                    </div>

                    <div className="bg-elegantWhite border border-mediumGray overflow-hidden">
                        {categories.map(cat => (
                            <div key={cat.id} className="border-b border-mediumGray last:border-b-0 px-6 py-4 flex justify-between items-center hover:bg-softGray">
                                <div>
                                    <p className="font-medium">{cat.label}</p>
                                    <p className="text-sm text-mediumGray">id: {cat.id}</p>
                                </div>
                                <button onClick={() => deleteCategory(cat.id)} className="text-sm text-mediumGray hover:text-red-600 transition-colors">Delete</button>
                            </div>
                        ))}
                        {categories.length === 0 && <p className="p-6 text-mediumGray">No categories yet.</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
