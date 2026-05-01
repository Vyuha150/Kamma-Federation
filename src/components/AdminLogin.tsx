import { API_URL } from '../config';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.user));
            navigate('/admin');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 selection:bg-amber-500 selection:text-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-zinc-900 border border-white/5 rounded-3xl p-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ShieldCheck size={120} />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-black/20 rounded-full p-1 border border-white/10">
                            <img
                                src="/logo.jpg"
                                alt="Logo"
                                className="w-full h-full object-contain rounded-full"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/200?text=UKSF';
                                }}
                            />
                        </div>
                        <div>
                            <h1 className="text-white font-black uppercase tracking-tight italic text-xl">Admin Hub</h1>
                            <p className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">Federation Access</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl font-mono">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none transition-colors"
                                    placeholder="admin@uksf.org"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-amber-500 outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-500 text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-amber-400 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>{loading ? 'Authenticating...' : 'Secure Login'}</span>
                            {!loading && <LogIn size={16} />}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
