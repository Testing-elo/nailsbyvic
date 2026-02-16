import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PortfolioItem } from '@/types';
import { PORTFOLIO_CATEGORIES } from '@/utils/constants';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function PortfolioManager() {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [uploading, setUploading] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState<PortfolioItem['category']>('nailart');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    async function fetchPortfolio() {
        try {
            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPortfolioItems(data || []);
        } catch (err) {
            console.error('Error fetching portfolio:', err);
        }
    }

    async function handleUpload() {
        if (!selectedFile || !newTitle) {
            alert('Please select a file and enter a title');
            return;
        }

        setUploading(true);
        try {
            // Upload image to Supabase Storage
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(fileName, selectedFile);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('portfolio-images')
                .getPublicUrl(fileName);

            // Save to database
            const { error: dbError } = await supabase
                .from('portfolio')
                .insert([{
                    url: urlData.publicUrl,
                    title: newTitle,
                    category: newCategory,
                }]);

            if (dbError) throw dbError;

            // Reset form
            setNewTitle('');
            setNewCategory('nailart');
            setSelectedFile(null);
            await fetchPortfolio();
            alert('Portfolio item uploaded successfully!');
        } catch (err: any) {
            alert(`Error uploading: ${err.message}`);
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete(id: string, url: string) {
        if (!confirm('Are you sure you want to delete this portfolio item?')) return;

        try {
            // Extract filename from URL
            const fileName = url.split('/').pop();

            // Delete from storage
            if (fileName) {
                await supabase.storage
                    .from('portfolio-images')
                    .remove([fileName]);
            }

            // Delete from database
            const { error } = await supabase
                .from('portfolio')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchPortfolio();
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
                            onChange={(e) => setNewCategory(e.target.value as PortfolioItem['category'])}
                            className="w-full px-4 py-3 border border-mediumGray bg-elegantWhite focus:outline-none focus:border-elegantBlack"
                        >
                            {PORTFOLIO_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Image File</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="w-full"
                        />
                        {selectedFile && (
                            <p className="text-sm text-mediumGray mt-1">{selectedFile.name}</p>
                        )}
                    </div>

                    <Button
                        onClick={handleUpload}
                        disabled={uploading || !selectedFile || !newTitle}
                    >
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
                                    <img
                                        src={item.url}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mt-2">
                                    <p className="font-medium text-sm">{item.title}</p>
                                    <p className="text-xs text-mediumGray capitalize">{item.category}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(item.id, item.url)}
                                    className="absolute top-2 right-2 bg-red-500 text-elegantWhite p-2 opacity-0 group-hover:opacity-100 transition-opacity"
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
