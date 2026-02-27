import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface PortfolioItem {
    id: string;
    url: string;
    title: string;
    category: string;
    created_at?: string;
}

interface DBCategory {
    id: string;
    label: string;
}

export default function PortfolioManager() {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [categories, setCategories] = useState<DBCategory[]>([]);
    const [uploading, setUploading] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchAll();
    }, []);

    async function fetchAll() {
        const [portfolio, cats] = await Promise.all([
            supabase.from('portfolio').select('*').order('created_at', { ascending: false }),
            supabase.from('portfolio_categories').select('*').order('sort_order'),
        ]);
        if (portfolio.data) setPortfolioItems(portfolio.data);
        if (cats.data) {
            setCategories(cats.data);
            if (cats.data.length > 0 && !newCategory) {
                setNewCategory(cats.data[0].id);
            }
        }
    }

    async function handleUpload() {
        if (!selectedFile || !newTitle || !newCategory) {
            alert('Please select a file, enter a title, and choose a category');
            return;
        }
        setUploading(true);
        try {
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(fileName, selectedFile);
            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);

            const { error: dbError } = await supabase.from('portfolio').insert([{
                url: urlData.publicUrl,
                title: newTitle,
                category: newCategory,
            }]);
            if (dbError) throw dbError;

            setNewTitle('');
            setSelectedFile(null);
            await fetchAll();
            alert('Photo uploaded successfully!');
        } catch (err: any) {
            alert(`Error uploading: ${err.message}`);
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete(id: string, url: string) {
        if (!confirm('Are you sure you want to delete this portfolio item?')) return;
        try {
            const fileName = url.split('/').pop();
            if (fileName) await supabase.storage.from('portfolio-images').remove([fileName]);
            const { error } = await supabase.from('portfolio').delete().eq('id', id);
            if (error) throw error;
            await fetchAll();
        } catch (err: any) {
            alert(`Error deleting: ${err.message}`);
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-serif mb-6">Manage Portfolio</h2>

            {/* Upload Form */}
            <div className="bg-elegantWhite border border-mediumGray p-6 mb-8">
                <h3 className="text-xl font-serif mb-4">Upload New Photo</h3>
                <div className="space-y-4">
                    <Input
                        type="text"
                        label="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g., French Manicure Design"
                    />
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-mediumGray bg-elegantWhite focus:outline-none focus:border-elegantBlack"
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>
                        {categories.length === 0 && (
                            <p className="text-sm text-mediumGray mt-1">
                                No categories yet. Add some in the Services & Add-ons tab → Portfolio Categories.
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Image File</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="w-full"
                        />
                        {selectedFile && <p className="text-sm text-mediumGray mt-1">{selectedFile.name}</p>}
                    </div>
                    <Button onClick={handleUpload} disabled={uploading || !selectedFile || !newTitle || !newCategory}>
                        {uploading ? 'Uploading...' : 'Upload Photo'}
                    </Button>
                </div>
            </div>

            {/* Portfolio Grid */}
            <div className="bg-elegantWhite border border-mediumGray p-6">
                <h3 className="text-xl font-serif mb-4">Current Portfolio ({portfolioItems.length} items)</h3>
                {portfolioItems.length === 0 ? (
                    <p className="text-mediumGray">No portfolio items yet.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {portfolioItems.map((item) => (
                            <div key={item.id} className="group relative">
                                <div className="aspect-square overflow-hidden bg-softGray">
                                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="mt-2">
                                    <p className="font-medium text-sm">{item.title}</p>
                                    <p className="text-xs text-mediumGray capitalize">{item.category}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(item.id, item.url)}
                                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
