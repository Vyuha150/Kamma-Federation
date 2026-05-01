import { API_URL } from '../config';
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminContentManagement({ type }: { type: 'hof' | 'events' | 'clubs' }) {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const [formData, setFormData] = useState<any>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/content/${type}`);
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            }
        } catch (err) {
            console.error('Failed to fetch', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const url = editingItem
            ? `${API_URL}/api/content/${type}/${editingItem._id}`
            : `${API_URL}/api/content/${type}`;

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'imageFile') data.append(key, formData[key]);
        });

        if (formData.imageFile) {
            data.append('image', formData.imageFile);
        } else if (formData.imageUrl) {
            data.append('image', formData.imageUrl);
        }

        try {
            const response = await fetch(url, {
                method: editingItem ? 'PUT' : 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: data
            });
            if (response.ok) {
                setShowModal(false);
                fetchData();
            } else {
                alert('Action failed');
            }
        } catch (err) {
            alert('Error saving data');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        try {
            const response = await fetch(`${API_URL}/api/content/${type}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (response.ok) fetchData();
        } catch (err) {
            alert('Error deleting');
        }
    };

    const openModal = (item?: any) => {
        if (item) {
            setEditingItem(item);
            setFormData({ ...item, imageFile: null, imageUrl: item.image });
        } else {
            setEditingItem(null);
            setFormData({ verified: 'true' });
        }
        setShowModal(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, imageFile: e.target.files[0] });
        }
    };

    const renderFormFields = () => {
        if (type === 'hof') return (
            <>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Name</label>
                    <input required type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Category (History, Politics, Cinema, Business)</label>
                    <input required type="text" value={formData.category || ''} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Role/Title</label>
                    <input required type="text" value={formData.role || ''} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Description</label>
                    <textarea required value={formData.desc || ''} onChange={e => setFormData({ ...formData, desc: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
            </>
        );
        if (type === 'events') return (
            <>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Title</label>
                    <input required type="text" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Date</label>
                    <input required type="text" value={formData.date || ''} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Location</label>
                    <input required type="text" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Type</label>
                    <input required type="text" value={formData.type || ''} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Description</label>
                    <textarea value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
            </>
        );
        if (type === 'clubs') return (
            <>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Name</label>
                    <input required type="text" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Tagline</label>
                    <input required type="text" value={formData.tagline || ''} onChange={e => setFormData({ ...formData, tagline: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
                <div className="mb-4">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Member Count</label>
                    <input type="number" value={formData.memberCount || 0} onChange={e => setFormData({ ...formData, memberCount: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" />
                </div>
            </>
        );
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <p className="text-gray-500 text-sm capitalize">Manage {type.replace('-', ' ')} records.</p>
                <button
                    onClick={() => openModal()}
                    className="bg-amber-500 text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest flex items-center space-x-2 hover:bg-amber-400 transition-colors"
                >
                    <Plus size={16} />
                    <span>Add New</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item._id} className="bg-zinc-900 border border-white/5 rounded-3xl p-6 relative group flex flex-col h-full overflow-hidden">
                        <div className="mb-4 h-32 w-full bg-black/50 rounded-xl overflow-hidden flex items-center justify-center relative">
                            {item.image ? (
                                <img src={item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`} className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon size={32} className="text-gray-600" />
                            )}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-white font-bold text-lg mb-1">{item.name || item.title}</h3>
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">
                                {item.category || item.date || item.tagline}
                            </p>
                            <p className="text-gray-400 text-sm line-clamp-3">
                                {item.desc || item.description || `Members: ${item.memberCount}`}
                            </p>
                        </div>

                        <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-white/5">
                            <button onClick={() => openModal(item)} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-xl flex-1 flex justify-center">
                                <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-500 hover:text-red-500 transition-colors bg-white/5 rounded-xl flex-1 flex justify-center">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 w-full max-w-lg my-8">
                        <h3 className="text-white font-bold uppercase text-lg italic tracking-tighter mb-6">{editingItem ? 'Edit' : 'Add'} Record</h3>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-6 bg-black/30 p-4 rounded-xl border border-white/5">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Upload Image</label>
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="text-sm text-gray-400 mb-2 w-full" />
                                <p className="text-xs text-gray-500">OR provide a URL:</p>
                                <input type="text" value={formData.imageUrl || ''} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white mt-2" placeholder="https://..." />
                            </div>

                            {renderFormFields()}

                            <div className="flex space-x-3 pt-6 mt-6 border-t border-white/10">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-amber-500 text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-400">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
