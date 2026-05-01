import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Crown,
  Users,
  Film,
  Briefcase,
  ChevronRight,
  Search,
  ExternalLink,
  ShieldCheck,
  Star
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { API_URL } from '../config';

interface Leader {
  _id: string;
  name: string;
  category: 'History' | 'Politics' | 'Cinema' | 'Business';
  role: string;
  desc: string;
  verified: boolean;
  image: string;
}

export default function HallOfFame() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [filter, setFilter] = useState<'All' | 'History' | 'Politics' | 'Cinema' | 'Business'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/content/hof`)
      .then(res => res.json())
      .then(data => setLeaders(data))
      .catch(err => console.error("Failed fetching leaders", err));
  }, []);

  const filteredLeaders = leaders.filter(l =>
    (filter === 'All' || l.category === filter) &&
    (l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = [
    { id: 'All', icon: Trophy },
    { id: 'History', icon: Crown },
    { id: 'Politics', icon: Users },
    { id: 'Cinema', icon: Film },
    { id: 'Business', icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-amber-500 selection:text-black pt-20">
      <Navbar onJoinClick={() => { }} />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mb-8"
          >
            <Star size={16} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-500">Excellence & Vision</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl sm:text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter italic uppercase mb-12"
          >
            HALL OF <br />
            <span className="text-amber-500">FAME.</span>
          </motion.h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed italic">
            Celebrating the architects of our identity and the pioneers who shaped the future of a community.
          </p>
        </div>

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-40 bg-[#050505]/80 backdrop-blur-md border-y border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id as any)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === cat.id ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-white/5 text-gray-500 hover:text-white border border-white/10'}`}
                >
                  <cat.icon size={14} />
                  <span>{cat.id}</span>
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search Legends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-4 text-sm text-white focus:border-amber-500 outline-none transition-all placeholder:text-gray-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leaders Grid */}
      <section className="py-24 sm:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredLeaders.map((leader, idx) => (
                <motion.div
                  key={leader.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-[#0A0A0A] border border-white/5 rounded-[2rem] overflow-hidden hover:border-amber-500/30 transition-all flex flex-col h-full"
                >
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img
                      src={leader.image?.startsWith('/uploads') ? `${API_URL}${leader.image}` : leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent" />

                    <div className="absolute top-6 left-6 flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                      <ShieldCheck size={12} className="text-amber-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Verified Legacy</span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{leader.role}</p>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-tight italic">
                        {leader.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                      {leader.desc}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-amber-500 animate-pulse`} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{leader.category} Phase</span>
                      </div>
                      <button className="text-white hover:text-amber-500 transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredLeaders.length === 0 && (
            <div className="py-32 text-center">
              <p className="text-gray-500 font-mono italic">No legends found matching your selection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Statistical Insight */}
      <section className="py-24 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Generations', value: '45+' },
              { label: 'Global Impact', value: '100%' },
              { label: 'Pioneer Leaders', value: '250+' },
              { label: 'Institutional Growth', value: 'A+' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-5xl font-black text-white italic tracking-tighter uppercase">{stat.value}</p>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.4em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
