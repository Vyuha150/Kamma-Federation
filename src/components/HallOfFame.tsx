import React, { useState } from 'react';
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

interface Leader {
  name: string;
  category: 'History' | 'Politics' | 'Cinema' | 'Business';
  role: string;
  desc: string;
  verified: boolean;
  image: string;
}

const leaders: Leader[] = [
  // Historical & Pre-Modern
  {
    name: "Pemmasani Ramalinga Nayudu",
    category: "History",
    role: "Military Commander",
    desc: "A distinguished military commander of the Vijayanagara Empire, he represented the early emergence of Kamma leadership in warfare and governance. He played a crucial role in defending imperial territories.",
    verified: true,
    image: "https://images.unsplash.com/photo-1599707334706-ec47082305aa?q=80&w=2036&auto=format&fit=crop"
  },
  {
    name: "Vasireddy Venkatadri Nayudu",
    category: "History",
    role: "Zamindar of Amaravati",
    desc: "Transformed the Amaravati region into a center of prosperity through irrigation development and temple construction. His legacy is associated with administrative excellence.",
    verified: true,
    image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Tripuraneni Ramaswamy",
    category: "History",
    role: "Social Reformer & Writer",
    desc: "A pioneering social reformer and writer who challenged rigid social structures and promoted rationalism in early 20th-century Andhra.",
    verified: true,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop"
  },
  // Politics
  {
    name: "N. T. Rama Rao",
    category: "Politics",
    role: "Founder, TDP",
    desc: "A legendary figure who redefined regional political identity in Andhra Pradesh. His governance emphasized self-respect and welfare policies.",
    verified: true,
    image: "https://images.unsplash.com/photo-1517732359159-40d783114de0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "N. Chandrababu Naidu",
    category: "Politics",
    role: "Former CM, Andhra Pradesh",
    desc: "Played a key role in transforming Hyderabad into a global IT hub. His focus on infrastructure and technology positioned Andhra Pradesh as a modernizing state.",
    verified: true,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "N. G. Ranga",
    category: "Politics",
    role: "Freedom Fighter",
    desc: "One of India's longest-serving parliamentarians and a tireless advocate for farmers' rights and rural development.",
    verified: true,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
  },
  // Cinema
  {
    name: "Nandamuri Balakrishna",
    category: "Cinema",
    role: "Legendary Actor",
    desc: "A prominent actor and public figure, carrying forward the legacy of NTR through both cinema and regional political engagement.",
    verified: true,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
  },
  {
    name: "Jr NTR",
    category: "Cinema",
    role: "Global Star",
    desc: "One of the most globally recognized Telugu actors, known for powerful performances and international reach. Represents the new generation with a strong cultural footprint.",
    verified: true,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop"
  },
  {
    name: "Ghattamaneni Krishna",
    category: "Cinema",
    role: "Pioneering Actor",
    desc: "Introduced several technological innovations to Telugu cinema. An experimental filmmaker and actor who influenced generations.",
    verified: true,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Mahesh Babu",
    category: "Cinema",
    role: "Contemporary Icon",
    desc: "Leading actor known for consistent box-office success and pan-India appeal. Combines commercial cinema with social messaging.",
    verified: true,
    image: "https://images.unsplash.com/photo-1533928198648-d055e03295fe?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "D. Ramanaidu",
    category: "Cinema",
    role: "Legendary Producer",
    desc: "Founder of Suresh Productions, holding a Guinness World Record for producing films in the highest number of languages.",
    verified: true,
    image: "https://images.unsplash.com/photo-1535016120720-40c646bebb94?q=80&w=2070&auto=format&fit=crop"
  },
  // Business
  {
    name: "Mullapudi Harishchandra Prasad",
    category: "Business",
    role: "Industrialist",
    desc: "Key leader of the Andhra Sugars group, played a significant role in advancing industrialization and agro-based manufacturing.",
    verified: true,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
  },
  {
    name: "Ramoji Rao",
    category: "Business",
    role: "Media Tycoon",
    desc: "Founder of the Ramoji Group, built one of India's largest media networks, Eenadu, and the iconic Ramoji Film City.",
    verified: true,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function HallOfFame() {
  const [filter, setFilter] = useState<'All' | 'History' | 'Politics' | 'Cinema' | 'Business'>('All');
  const [searchQuery, setSearchQuery] = useState('');

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
      <Navbar onJoinClick={() => {}} />

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
                      src={leader.image} 
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
