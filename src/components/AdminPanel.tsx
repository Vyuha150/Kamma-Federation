import { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Search,
  Bell,
  User,
  ExternalLink,
  Menu,
  ShieldAlert,
  Trophy,
  Building
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AdminUserManagement from './AdminUserManagement';
import AdminContentManagement from './AdminContentManagement';

// Type definitions for our entities
interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
}

interface Submission {
  id: string;
  name: string;
  email: string;
  club: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'submissions' | 'operations' | 'admins' | 'hof' | 'clubs'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data for initial UI
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'UKSF Annual Vision Summit', date: '2026-10-12', location: 'Hyderabad', type: 'Conference' },
    { id: '2', title: 'Seed Funding Workshop', date: '2026-11-05', location: 'Vizag', type: 'Workshop' },
  ]);

  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: '1', name: 'Vikas Chowdary', email: 'vikas@gmail.com', club: 'Entrepreneurship', date: '2024-04-20', status: 'Pending' },
    { id: '2', name: 'Ananya Rao', email: 'ananya@gmail.com', club: 'Student Innovation', date: '2024-04-21', status: 'Approved' },
  ]);

  const Sidebar = () => (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`w-64 bg-zinc-950 border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 pt-8 z-[60] transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-6 mb-12 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center bg-black/20 rounded-full p-1 overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/200?text=UKSF';
                }}
              />
            </div>
            <span className="text-white font-black uppercase tracking-tight italic">Admin Hub</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
            <LogOut size={20} className="rotate-180" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'hof', label: 'Hall of Fame', icon: Trophy },
            { id: 'events', label: 'Events', icon: Calendar },
            { id: 'clubs', label: 'Elite Clubs', icon: Building },
            { id: 'submissions', label: 'Applications', icon: Users },
            { id: 'admins', label: 'Admins', icon: ShieldAlert },
            { id: 'operations', label: 'Operations', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as any); setIsSidebarOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-amber-500 text-black font-bold' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 mb-8">
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              localStorage.removeItem('adminUser');
              navigate('/admin/login');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:text-white rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          <Link to="/" className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:text-white rounded-xl transition-all mt-2">
            <LogOut size={20} className="rotate-180" />
            <span>Return Site</span>
          </Link>
        </div>
      </div>
    </>
  );

  const Header = ({ title }: { title: string }) => (
    <div className="h-20 border-b border-white/5 flex items-center justify-between px-4 sm:px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-gray-500 hover:text-white"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight italic">{title}</h1>
      </div>
      <div className="flex items-center space-x-3 sm:space-x-6 text-gray-500">
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white focus:border-amber-500 outline-none w-40 md:w-64 transition-all"
          />
        </div>
        <Bell size={20} className="cursor-pointer hover:text-amber-500 hidden xs:block" />
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-bold cursor-pointer shrink-0">
          <User size={18} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] lg:pl-64 selection:bg-amber-500 selection:text-black">
      <Sidebar />

      <main className="min-h-screen flex flex-col">
        {activeTab === 'dashboard' && (
          <>
            <Header title="Overview" />
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                {[
                  { label: 'Total Members', value: '5,420', trend: '+12% this month' },
                  { label: 'Active Events', value: '08', trend: 'Next: Oct 12' },
                  { label: 'Unread Applications', value: '142', trend: 'Needs Review' },
                ].map((stat, i) => (
                  <div key={i} className="bg-zinc-900 border border-white/5 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <LayoutDashboard size={80} />
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className="text-4xl text-white font-black italic uppercase tracking-tighter mb-4">{stat.value}</p>
                    <p className="text-amber-500 text-[10px] font-mono font-bold uppercase tracking-widest">{stat.trend}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-white font-bold uppercase text-sm tracking-widest italic">Recent Submissions</h3>
                    <button onClick={() => setActiveTab('submissions')} className="text-amber-500 text-[10px] uppercase font-bold tracking-widest hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {submissions.map(sub => (
                      <div key={sub.id} className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5">
                        <div>
                          <p className="text-white text-sm font-bold">{sub.name}</p>
                          <p className="text-gray-500 text-[10px] uppercase tracking-widest">{sub.club}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${sub.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                          {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-white font-bold uppercase text-sm tracking-widest italic">Upcoming Events</h3>
                    <button onClick={() => setActiveTab('events')} className="text-amber-500 text-[10px] uppercase font-bold tracking-widest hover:underline">Manage</button>
                  </div>
                  <div className="space-y-4">
                    {events.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-black/30 rounded-2xl border border-white/5 text-xs">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex flex-col items-center justify-center border border-amber-500/20">
                            <span className="text-amber-500 font-bold text-[10px] leading-none uppercase">Oct</span>
                            <span className="text-amber-500 font-black text-lg leading-none uppercase">12</span>
                          </div>
                          <div>
                            <p className="text-white font-bold">{event.title}</p>
                            <p className="text-gray-500 uppercase tracking-widest">{event.location}</p>
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-gray-700 hover:text-amber-500 cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'events' && (
          <AdminContentManagement type="events" />
        )}

        {activeTab === 'hof' && (
          <AdminContentManagement type="hof" />
        )}

        {activeTab === 'clubs' && (
          <AdminContentManagement type="clubs" />
        )}

        {activeTab === 'submissions' && (
          <>
            <Header title="Form Submissions" />
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-500 text-sm">Review applications from potential members.</p>
                <div className="flex space-x-4">
                  <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer">
                    <option>All Clubs</option>
                    <option>Entrepreneurship</option>
                    <option>Innovation</option>
                  </select>
                </div>
              </div>

              <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-x-auto custom-scrollbar">
                <table className="w-full text-left min-w-[900px]">
                  <thead className="bg-black/50 border-b border-white/5">
                    <tr>
                      <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Applicant</th>
                      <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Club Target</th>
                      <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Applied Date</th>
                      <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                      <th className="p-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {submissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-white/5 transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-black text-xs uppercase italic">
                              {sub.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white font-bold uppercase tracking-tight">{sub.name}</p>
                              <p className="text-gray-500 text-[10px]">{sub.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6 text-gray-400 text-xs uppercase font-bold tracking-widest">{sub.club}</td>
                        <td className="p-6 text-gray-500 text-xs font-mono">{sub.date}</td>
                        <td className="p-6">
                          <span className={`px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${sub.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                            }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end space-x-3">
                            <button className="bg-white/5 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all">
                              Review
                            </button>
                            <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'operations' && (
          <>
            <Header title="Platform Operations" />
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                  <h3 className="text-white font-bold uppercase text-lg italic tracking-tighter mb-6">Core Content Control</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Platform Mission Statement</label>
                      <textarea className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-amber-500 outline-none h-32" defaultValue="Promoting Entrepreneurship, building deep rooted business and professional cooperative network..." />
                    </div>
                    <button className="w-full bg-amber-500 text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-amber-400">Update Core Mission</button>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
                  <h3 className="text-white font-bold uppercase text-lg italic tracking-tighter mb-6">Security & Access</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-black/50 rounded-2xl border border-white/5">
                      <div>
                        <p className="text-white font-bold text-sm uppercase">Maintenance Mode</p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest">Restrict public access</p>
                      </div>
                      <div className="w-12 h-6 bg-zinc-800 rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-gray-500 rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/50 rounded-2xl border border-white/5">
                      <div>
                        <p className="text-white font-bold text-sm uppercase">Applications Closed</p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest">Disable new submissions</p>
                      </div>
                      <div className="w-12 h-6 bg-amber-500 rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-black rounded-full ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'admins' && (
          <>
            <Header title="User Management" />
            <AdminUserManagement />
          </>
        )}
      </main>
    </div>
  );
}
