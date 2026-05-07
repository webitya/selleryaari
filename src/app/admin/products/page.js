'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Trash2, Edit2, Search, Package, Image as ImageIcon, Loader2, Filter, X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CATEGORIES = ['Tech', 'Health', 'Home', 'Fashion', 'Beauty', 'Sports', 'Kids', 'Auto'];

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: 'Tech', images: [''], tags: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
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
      const data = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags,
        price: Number(formData.price)
      };
      await axios.post('/api/products', data);
      toast.success('Product added!');
      setIsModalOpen(false);
      setFormData({ name: '', description: '', price: '', category: 'Tech', images: [''], tags: '' });
      fetchProducts();
    } catch (err) {
      toast.error('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
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
        <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#F4BC1C] hover:bg-[#D4A017] text-black px-4 py-2 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all active:scale-95 shadow-sm uppercase tracking-wider"
        >
            <Plus size={14} />
            Add Product
        </button>
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
                        <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Price</th>
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
                            <td colSpan="5" className="py-16 text-center">
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
                                <td className="px-4 py-3 text-center font-black text-[#1a1a1a] text-[13px]">₹{product.price?.toLocaleString()}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase">Active</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex justify-end gap-1">
                                        <button className="p-1.5 hover:bg-[#FFFBE6] rounded-lg text-slate-300 hover:text-[#D4A017] transition-colors">
                                            <Edit2 size={13} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product._id)}
                                            className="p-1.5 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={13} />
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-50">
                    <div>
                        <h2 className="text-base font-black text-[#1a1a1a] tracking-tight">Add New Product</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Fill in the details below</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
                        <X size={16} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Product Name *</label>
                        <input 
                            required 
                            className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-3 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})} 
                            placeholder="e.g. Magic Blender Pro" 
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Price (₹) *</label>
                            <input 
                                required 
                                type="number" 
                                className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-3 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none" 
                                value={formData.price} 
                                onChange={e => setFormData({...formData, price: e.target.value})} 
                                placeholder="999" 
                            />
                        </div>
                        <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Category *</label>
                            <select 
                                className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-3 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none cursor-pointer" 
                                value={formData.category} 
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description *</label>
                        <textarea 
                            required 
                            className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-3 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none resize-none" 
                            rows="2" 
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})} 
                            placeholder="Describe the product..." 
                        />
                    </div>

                    <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Image URL</label>
                        <input 
                            className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-3 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none" 
                            placeholder="https://..." 
                            value={formData.images[0]} 
                            onChange={e => setFormData({...formData, images: [e.target.value]})} 
                        />
                    </div>

                    <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tags (comma separated)</label>
                        <input 
                            className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-3 text-[13px] font-medium focus:ring-2 focus:ring-[#F4BC1C]/20 outline-none" 
                            placeholder="winner, trending, sale" 
                            value={formData.tags} 
                            onChange={e => setFormData({...formData, tags: e.target.value})} 
                        />
                    </div>
                    
                    <div className="flex gap-2 pt-1">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)} 
                            className="flex-1 bg-[#F5F5F5] text-slate-600 py-2.5 rounded-lg font-bold text-[12px] transition-all hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 bg-[#F4BC1C] hover:bg-[#D4A017] text-black py-2.5 rounded-lg font-bold text-[12px] transition-all active:scale-[0.98]"
                        >
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </AdminLayout>
  );
}
