'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Trash2, Edit2, Search, Package, Image as ImageIcon, Loader2, Filter, X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';



export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Home & Kitchen', 'Beauty & Makeup', 'Electronics', 'Fitness', 'Tech', 'Health', 'Home', 'Fashion', 'Sports', 'Kids', 'Auto']);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', originalPrice: '', category: 'Tech', images: [''], tags: '', isWinner: false
  });
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [uploading, setUploading] = useState(false);


  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      if (Array.isArray(res.data)) {
        setProducts(res.data);
        // Dynamic categories from products
        const dynamicCats = [...new Set(res.data.map(p => p.category))].filter(Boolean);
        setCategories(prev => [...new Set([...prev, ...dynamicCats])]);
      } else {

        setProducts([]);
        if (res.data.error) toast.error(res.data.error);
      }
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalCategory = showNewCategory ? newCategoryName : formData.category;
      
      // ATOMIC FIX: Ensure numeric types are cast and null is handled for empty strings
      const payload = {
        name: String(formData.name).trim(),
        description: String(formData.description).trim(),
        price: parseFloat(formData.price) || 0,
        originalPrice: (formData.originalPrice !== '' && formData.originalPrice !== null) ? parseFloat(formData.originalPrice) : null,
        category: finalCategory || 'Other',
        images: Array.isArray(formData.images) ? formData.images.filter(Boolean) : [],
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags,
        isWinner: Boolean(formData.isWinner)
      };
      
      const toastId = toast.loading('Syncing Cloud Data...');
      
      if (editingId) {
        const response = await axios.put(`/api/products/${editingId}`, payload);
        if (response.status === 200) {
          toast.success('Asset Securely Updated', { id: toastId });
        }
      } else {
        const response = await axios.post('/api/products', payload);
        if (response.status === 201) {
          toast.success('Asset Successfully Published', { id: toastId });
        }
      }
      
      setIsModalOpen(false);
      setEditingId(null);
      setShowNewCategory(false);
      setNewCategoryName('');
      setFormData({ name: '', description: '', price: '', originalPrice: '', category: 'Tech', images: [''], tags: '', isWinner: false });
      fetchProducts();
    } catch (err) {
      toast.error(editingId ? 'Failed to update' : 'Failed to add');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setShowNewCategory(false);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || '',
      category: product.category,
      images: product.images || [''],
      tags: product.tags?.join(', ') || '',
      isWinner: product.isWinner || false
    });
    setIsModalOpen(true);
  };



  const handleDelete = async (id) => {
    if (deletingIds.has(id)) return;
    if (!window.confirm('PERMANENTLY DELETE THIS ASSET?')) return;
    
    setDeletingIds(prev => new Set(prev).add(id));
    const toastId = toast.loading('Purging Asset...');
    
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success('Asset Purged Successfully', { id: toastId });
      fetchProducts();
    } catch (err) {
      toast.error('Purge Failed: System Conflict', { id: toastId });
    } finally {
      setDeletingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <Toaster />

      {/* Page Header */}
      <div className="mb-5 flex justify-between items-center">
        <div>
            <h1 className="text-lg font-black text-[#1a1a1a] tracking-tight">Product Catalog</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{products.length} products in catalog</p>
        </div>
        <div className="flex items-center gap-2">
            <button 
                onClick={fetchProducts}
                className="p-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-[#1a1a1a] transition-all"
                title="Refresh List"
            >
                <Loader2 size={14} className={loading ? 'animate-spin text-[#F4BC1C]' : ''} />
            </button>
            <button 
                onClick={() => {
                    setEditingId(null);
                    setFormData({ name: '', description: '', price: '', originalPrice: '', category: 'Tech', images: [''], tags: '', isWinner: false });
                    setIsModalOpen(true);
                }}
                className="bg-[#F4BC1C] hover:bg-[#D4A017] text-black px-4 py-2 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all active:scale-95 shadow-sm uppercase tracking-wider"
            >
                <Plus size={14} />
                Add Product
            </button>
        </div>

      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
            { label: 'Total Products', value: products.length, color: 'text-[#D4A017]', bg: 'bg-[#FFFBE6]' },
            { label: 'Active', value: products.length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Categories', value: [...new Set(products.map(p => p.category))].length, color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-xl p-3 border border-white/60`}>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                <p className={`text-xl font-black mt-0.5 ${s.color}`}>{s.value}</p>
            </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-slate-50 flex items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                <input 
                    type="text" 
                    placeholder="Search products or categories..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#F5F5F5] border-none rounded-lg py-2 pl-8 pr-4 text-[12px] font-medium focus:bg-white focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none transition-all"
                />
                {search && (
                    <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <X size={12} />
                    </button>
                )}
            </div>
            <button className="h-8 px-3 bg-[#F5F5F5] rounded-lg text-slate-500 hover:text-[#1a1a1a] transition-all flex items-center gap-1.5 text-[11px] font-bold">
                <Filter size={13} />
                Filter
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="border-b border-slate-50">
                    <tr className="bg-[#F9F9F9]">
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Product</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Category</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">MRP/Orig.</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Sale Price</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="py-16 text-center">
                                <Loader2 className="animate-spin mx-auto text-[#F4BC1C]" size={20} />
                                <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading products...</p>
                            </td>
                        </tr>
                    ) : filtered.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="py-16 text-center">

                                <Package className="mx-auto text-slate-200 mb-3" size={32} />
                                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-2">
                                    {search ? 'No matching products' : 'No products yet'}
                                </p>
                                {!search && (
                                    <button onClick={() => setIsModalOpen(true)} className="text-[#D4A017] text-[11px] font-bold hover:underline uppercase tracking-wider">
                                        + Add First Product
                                    </button>
                                )}
                            </td>
                        </tr>
                    ) : (
                        filtered.map((product) => (
                            <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                            {product.images?.[0] ? (
                                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={14} className="text-slate-300" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[13px] font-bold text-[#1a1a1a] truncate max-w-[180px]">{product.name}</h4>
                                            <p className="text-[10px] text-slate-400 truncate max-w-[180px] font-medium">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="text-[9px] font-bold px-2 py-0.5 bg-[#FFFBE6] text-[#D4A017] rounded-full border border-[#FFE58F] uppercase">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span className="text-[11px] font-bold text-slate-300 line-through">
                                        {(product.originalPrice && product.originalPrice > 0) ? `₹${Number(product.originalPrice).toLocaleString()}` : '—'}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center font-black text-black text-[13px]">
                                    ₹{Number(product.price || 0).toLocaleString()}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase">Active</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-1">
                                        <button 
                                            onClick={() => handleEdit(product)}
                                            className="p-1.5 hover:bg-[#FFFBE6] rounded-lg text-slate-300 hover:text-[#D4A017] transition-colors"
                                        >
                                            <Edit2 size={13} />
                                        </button>
                                        <button 
                                            disabled={deletingIds.has(product._id)}
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-500 transition-all active:scale-90 disabled:opacity-30"
                                        >
                                            {deletingIds.has(product._id) ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[4px] animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative border border-slate-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                {/* Premium Header */}
                <div className="bg-slate-50/50 px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-[13px] font-black text-black uppercase tracking-[0.2em] leading-none mb-1.5">{editingId ? 'Secure Edit' : 'New Catalog Entry'}</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">System ID: {editingId ? editingId.slice(-8) : 'Pending'}</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white border border-slate-100 rounded-full text-slate-400 hover:text-black hover:shadow-sm transition-all">
                        <X size={14} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                        <div className="col-span-2">
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">Product Identity</label>
                            <input 
                                required 
                                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-[13px] font-bold text-black placeholder:text-slate-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all" 
                                value={formData.name} 
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                                placeholder="Enter definitive name..." 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">Market Price (MRP)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-[12px] font-bold">₹</span>
                                <input 
                                    type="number" 
                                    className={`w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-8 pr-4 text-[13px] font-bold focus:ring-1 focus:ring-black focus:border-black outline-none transition-all ${formData.originalPrice ? 'text-slate-900' : 'text-slate-400'}`} 
                                    value={formData.originalPrice} 
                                    onChange={e => setFormData({...formData, originalPrice: e.target.value})} 
                                    placeholder="0.00" 
                                />

                            </div>
                        </div>

                        <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">Sale Price</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black text-[12px] font-black">₹</span>
                                <input 
                                    required 
                                    type="number" 
                                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-8 pr-4 text-[13px] font-black text-black focus:ring-1 focus:ring-black focus:border-black outline-none transition-all" 
                                    value={formData.price} 
                                    onChange={e => setFormData({...formData, price: e.target.value})} 
                                    placeholder="0.00" 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">Classification</label>
                            {!showNewCategory ? (
                                <div className="relative">
                                    <select 
                                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-[13px] font-bold text-black focus:ring-1 focus:ring-black focus:border-black outline-none transition-all appearance-none cursor-pointer pr-10"
                                        value={formData.category}
                                        onChange={(e) => {
                                            if (e.target.value === 'NEW') setShowNewCategory(true);
                                            else setFormData({...formData, category: e.target.value});
                                        }}
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        <option value="NEW" className="font-black text-emerald-600">+ ADD NEW CATEGORY</option>
                                    </select>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input 
                                        autoFocus
                                        className="w-full bg-emerald-50/30 border border-emerald-200 rounded-xl py-2.5 pl-4 pr-10 text-[13px] font-bold text-emerald-700 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                                        placeholder="New Name..."
                                        value={newCategoryName}
                                        onChange={e => setNewCategoryName(e.target.value)}
                                    />
                                    <button type="button" onClick={() => setShowNewCategory(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-emerald-600"><X size={14} /></button>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">Search Keywords</label>
                            <input 
                                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-[13px] font-bold text-black placeholder:text-slate-300 focus:ring-1 focus:ring-black focus:border-black outline-none transition-all" 
                                placeholder="e.g. winner, hot" 
                                value={formData.tags} 
                                onChange={e => setFormData({...formData, tags: e.target.value})} 
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">Visual Asset</label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <input 
                                        type="file" id="file-upload" className="hidden" accept="image/*"
                                        onChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            const uploadData = new FormData();
                                            uploadData.append('file', file);
                                            setUploading(true);
                                            try {
                                                const response = await fetch('/api/upload', { method: 'POST', body: uploadData });
                                                const res = await response.json();
                                                if (!response.ok) throw new Error(res.details || 'Upload failed');
                                                setFormData({...formData, images: [res.url]});
                                                toast.success('Asset synced!');
                                            } catch (err) {
                                                toast.error(err.message || 'Sync failed');
                                            } finally {
                                                setUploading(false);
                                            }
                                        }}
                                    />
                                    <label htmlFor="file-upload" className={`w-full flex items-center justify-center gap-3 py-3 border-2 border-dashed rounded-2xl transition-all cursor-pointer ${formData.images[0] ? 'bg-emerald-50/30 border-emerald-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'}`}>
                                        {uploading ? (
                                            <Loader2 size={16} className="animate-spin text-black" />
                                        ) : formData.images[0] ? (
                                            <div className="flex items-center gap-2 text-emerald-600">
                                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                                                    <X size={12} className="text-white rotate-45" />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.1em]">Asset Secured</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Plus size={16} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.1em]">Attach Product Media</span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {formData.images[0] && (
                                    <div className="w-[52px] h-[52px] rounded-2xl border-2 border-white shadow-xl overflow-hidden shrink-0 group relative rotate-3 hover:rotate-0 transition-all duration-300">
                                        <img src={formData.images[0]} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <label htmlFor="file-upload" className="cursor-pointer text-white text-[8px] font-black uppercase">Swap</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mb-2 px-1">Product Context</label>
                            <textarea 
                                required 
                                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 text-[13px] font-bold text-black placeholder:text-slate-300 focus:ring-1 focus:ring-black focus:border-black outline-none resize-none transition-all" 
                                rows="2" 
                                value={formData.description} 
                                onChange={e => setFormData({...formData, description: e.target.value})} 
                                placeholder="Provide detailed context..." 
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="relative inline-flex items-center cursor-pointer group">
                                <input 
                                    type="checkbox" id="isWinner" className="sr-only peer"
                                    checked={formData.isWinner} onChange={e => setFormData({...formData, isWinner: e.target.checked})}
                                />
                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                                <label htmlFor="isWinner" className="ml-3 text-[10px] font-black text-black uppercase tracking-widest cursor-pointer group-hover:text-[#F4BC1C] transition-colors">Promote Winner</label>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-red-500 transition-colors">Discard</button>
                            <button 
                                type="submit" disabled={uploading}
                                className="bg-black hover:bg-[#F4BC1C] hover:text-black text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all active:scale-[0.95] disabled:opacity-50 shadow-lg shadow-black/10"
                            >
                                {uploading ? 'Processing' : editingId ? 'Update Entry' : 'Publish Entry'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      )}
    </AdminLayout>
  );
}
