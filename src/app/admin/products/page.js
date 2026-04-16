'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Trash2, Edit2, Search, Package, Image as ImageIcon, Loader2 } from 'lucide-react';
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
    category: 'Trending',
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
      <div className="flex justify-between items-center mb-10">
        <div>
            <h1 className="text-2xl font-bold text-[#0f1729]">Winning Products</h1>
            <p className="text-slate-500 mt-1">Manage the product catalog shown on the landing page</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary !py-2.5 !px-6"
        >
            <Plus size={20} />
            Add New Product
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="form-input !pl-12 !py-2"
                />
            </div>
            <select className="form-input !w-auto !py-2 !text-sm">
                <option>All Categories</option>
                <option>Tech</option>
                <option>Health</option>
                <option>Home</option>
            </select>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Product</th>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Price (₹)</th>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                        <th className="p-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="p-20 text-center">
                                <Loader2 className="animate-spin mx-auto text-[#0A66C2]" size={32} />
                                <p className="mt-4 text-slate-500">Loading your catalog...</p>
                            </td>
                        </tr>
                    ) : products.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="p-20 text-center">
                                <Package className="mx-auto text-slate-200" size={48} />
                                <p className="mt-4 text-slate-500">No products found. Start by adding one!</p>
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product._id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                                            {product.images?.[0] ? (
                                                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={20} className="text-slate-300" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-[#0f1729]">{product.name}</h4>
                                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{product.description}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">{product.category}</span>
                                </td>
                                <td className="p-6 font-bold text-slate-700">₹{product.price}</td>
                                <td className="p-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <span className="text-xs font-medium text-slate-600">Active</span>
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-[#0A66C2]">
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 hover:bg-red-50 rounded-lg border border-transparent text-slate-400 hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
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

      {/* Add Product Modal (Simple implementation) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0f1729]/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-[32px] p-10 shadow-2xl relative animate-fade-up">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full">
                    <Trash2 size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-8">Add New Winner Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Product Name</label>
                            <input required className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Price (₹)</label>
                            <input required type="number" className="form-input" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Description</label>
                        <textarea required className="form-input" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Category</label>
                            <select className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option>Tech</option>
                                <option>Health</option>
                                <option>Home</option>
                                <option>Fashion</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Image URL (Direct)</label>
                            <input className="form-input" placeholder="https://..." value={formData.images[0]} onChange={e => setFormData({...formData, images: [e.target.value]})} />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-4">Save Product</button>
                </form>
            </div>
        </div>
      )}
    </AdminLayout>
  );
}
