import { API_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, KeyRound } from 'lucide-react';

export default function UserManagement() {
    const [admins, setAdmins] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);

    // Modals state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<any>(null);

    // Form forms
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });
    const [passwordForm, setPasswordForm] = useState({ newPassword: '' });

    const fetchAdmins = async () => {
        try {
            const response = await fetch(`${API_URL}/api/admins`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAdmins(data);
            }
        } catch (err) {
            console.error('Failed to fetch admins');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const userStr = localStorage.getItem('adminUser');
        if (userStr) {
            setCurrentUser(JSON.parse(userStr));
        }
        fetchAdmins();
    }, []);

    const handleAddAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/admins`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setShowAddModal(false);
                setFormData({ name: '', email: '', password: '', role: 'admin' });
                fetchAdmins();
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to add admin');
            }
        } catch (err) {
            alert('Error adding admin');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this admin?')) return;
        try {
            const response = await fetch(`${API_URL}/api/admins/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (response.ok) {
                fetchAdmins();
            } else {
                alert('Failed to delete admin');
            }
        } catch (err) {
            alert('Error deleting admin');
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/admins/${selectedAdmin._id}/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ newPassword: passwordForm.newPassword })
            });
            if (response.ok) {
                setShowPasswordModal(false);
                setPasswordForm({ newPassword: '' });
                alert('Password changed successfully');
            } else {
                alert('Failed to change password');
            }
        } catch (err) {
            alert('Error changing password');
        }
    };

    if (!currentUser) return <div>Loading...</div>;

    return (
        <div className="p-8">
            {currentUser.role !== 'superadmin' && (
                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl mb-8">
                    Only Super Admins can manage other users. You can only view your own details or change your password.
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <p className="text-gray-500 text-sm">Manage system administrators and roles.</p>

                {currentUser.role === 'superadmin' && (
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-amber-500 text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest flex items-center space-x-2 hover:bg-amber-400 transition-colors"
                    >
                        <Plus size={16} />
                        <span>New Admin</span>
                    </button>
                )}
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-x-auto custom-scrollbar">
                <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-black/50 border-b border-white/5">
                        <tr>
                            <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Name</th>
                            <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email</th>
                            <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Role</th>
                            <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {admins.map((admin) => (
                            <tr key={admin._id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-6">
                                    <p className="text-white font-bold uppercase tracking-tight">{admin.name}</p>
                                </td>
                                <td className="p-6 text-gray-500 text-xs font-mono">{admin.email}</td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${admin.role === 'superadmin' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                                        }`}>
                                        {admin.role}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end space-x-3">
                                        {(currentUser.role === 'superadmin' || currentUser.id === admin._id) && (
                                            <button
                                                onClick={() => { setSelectedAdmin(admin); setShowPasswordModal(true); }}
                                                className="p-2 text-gray-600 hover:text-white transition-colors title='Change Password'"
                                            >
                                                <KeyRound size={16} />
                                            </button>
                                        )}
                                        {currentUser.role === 'superadmin' && admin._id !== currentUser.id && (
                                            <button
                                                onClick={() => handleDelete(admin._id)}
                                                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {admins.length === 0 && currentUser.role !== 'superadmin' && (
                            <tr className="hover:bg-white/5 transition-colors group">
                                <td className="p-6">
                                    <p className="text-white font-bold uppercase tracking-tight">{currentUser.name}</p>
                                </td>
                                <td className="p-6 text-gray-500 text-xs font-mono">{currentUser.email}</td>
                                <td className="p-6">
                                    <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                                        {currentUser.role}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end space-x-3">
                                        <button
                                            onClick={() => { setSelectedAdmin(currentUser); setShowPasswordModal(true); }}
                                            className="p-2 text-gray-600 hover:text-white transition-colors"
                                        >
                                            <KeyRound size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 w-full max-w-md">
                        <h3 className="text-white font-bold uppercase text-lg italic tracking-tighter mb-6">Add New Admin</h3>
                        <form onSubmit={handleAddAdmin} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Email</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Password</label>
                                <input required type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-amber-500 outline-none" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Role</label>
                                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-amber-500 outline-none appearance-none">
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super Admin</option>
                                </select>
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-amber-500 text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-400">Add Admin</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8 w-full max-w-md">
                        <h3 className="text-white font-bold uppercase text-lg italic tracking-tighter mb-6">Change Password</h3>
                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">New Password for {selectedAdmin?.name || selectedAdmin?.email}</label>
                                <input required type="password" value={passwordForm.newPassword} onChange={e => setPasswordForm({ newPassword: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-amber-500 outline-none" />
                            </div>
                            <div className="flex space-x-3 pt-4">
                                <button type="button" onClick={() => setShowPasswordModal(false)} className="flex-1 px-4 py-3 bg-white/5 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10">Cancel</button>
                                <button type="submit" className="flex-1 px-4 py-3 bg-amber-500 text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-amber-400">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
