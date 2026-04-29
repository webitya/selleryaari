'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Trash2, Edit2, Search, Package, Image as ImageIcon, Loader2, Filter, MoreHorizontal } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Tech',
    images: [''],
    tags: ''
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()) : formData.tags,
        price: Number(formData.price)
      };
      await axios.post('/api/products', data);
      toast.success('Product added successfully!');
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success('Product removed');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <Toaster />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
            <h1 className="text-xl font-black text-[#0f1729] tracking-tight">Product Catalog</h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manage your winning product inventory</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#0f1729] hover:bg-[#1a2641] text-white px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-slate-200"
        >
            <Plus size={16} />
            Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs focus:ring-4 focus:ring-[#0A66C2]/5 focus:border-[#0A66C2]/20 transition-all"
                />
            </div>
            <button className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-[#0f1729] transition-all flex items-center gap-2 text-[11px] font-bold">
                <Filter size={14} />
                Filters
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-white border-b border-slate-100">
                    <tr>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Product Info</th>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Category</th>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Price</th>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                        <th className="p-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="p-16 text-center">
                                <Loader2 className="animate-spin mx-auto text-[#0A66C2]" size={24} />
                                <p className="mt-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Syncing Catalog...</p>
                            </td>
                        </tr>
                    ) : products.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-16 text-center">
                                <Package className="mx-auto text-slate-100 mb-4" size={40} />
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No products found</p>
                                <button onClick={() => setIsModalOpen(true)} className="text-[#0A66C2] text-[11px] font-black mt-2 hover:underline">CREATE FIRST PRODUCT</button>
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                            {product.images?.[0] ? (
                                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={16} className="text-slate-300" />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[13px] font-bold text-[#0f1729] truncate max-w-[200px]">{product.name}</h4>
                                            <p className="text-[10px] text-slate-400 truncate max-w-[200px] font-medium">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-center">
                                    <span className="text-[9px] font-black px-2 py-0.5 bg-blue-50 text-[#0A66C2] rounded-full border border-blue-100 uppercase tracking-tighter">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-4 text-center font-black text-[#0f1729] text-[13px]">₹{product.price}</td>
                                <td className="p-4">
                                    <div className="flex items-center justify-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Active</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-1">
                                        <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-[#0A66C2] transition-colors">
                                            <Edit2 size={14} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={14} />
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

      {/* Compact Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f1729]/20 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                    <X size={18} />
                </button>
                
                <div className="mb-6">
                    <h2 className="text-lg font-black text-[#0f1729]">Add New Product</h2>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Enter product details below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="col-span-full">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Product Name</label>
                            <input required className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Magic Blender" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Price (₹)</label>
                            <input required type="number" className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Category</label>
                            <select className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all cursor-pointer" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option>Tech</option>
                                <option>Health</option>
                                <option>Home</option>
                                <option>Fashion</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Description</label>
                        <textarea required className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe your winning product..." />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Image URL</label>
                        <input className="w-full bg-[#F5F5F5] border-none rounded-lg py-2.5 px-4 text-xs font-bold focus:ring-4 focus:ring-[#0A66C2]/5 transition-all" placeholder="https://..." value={formData.images[0]} onChange={e => setFormData({...formData, images: [e.target.value]})} />
                    </div>
                    
                    <div className="pt-2">
                        <button type="submit" className="w-full bg-[#0f1729] hover:bg-[#1a2641] text-white py-3 rounded-xl font-black text-sm transition-all active:scale-[0.98] shadow-lg shadow-slate-200">
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
