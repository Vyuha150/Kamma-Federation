import { motion } from 'motion/react';
import { Briefcase, Link, MessageSquare, GraduationCap, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    id: '01',
    title: 'Entrepreneurship',
    desc: 'Promoting innovation and building deep-rooted professional cooperative networks to enhance job opportunities and business wealth.',
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: '02',
    title: 'Unity & Power',
    desc: 'Preparing a decades-lasting vision. Cleverly planning for sustained authority and long-term community impact.',
    icon: ShieldCheck,
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: '03',
    title: 'Unified Voice',
    desc: 'A common platform for solving specific community problems, facilitating knowledge sharing and collaborative ventures.',
    icon: MessageSquare,
    color: 'from-red-500 to-red-600',
  },
  {
    id: '04',
    title: 'Growth Hub',
    desc: 'Organizing thought-provoking events, workshops, and high-level conferences to foster innovation and leadership.',
    icon: GraduationCap,
    color: 'from-purple-500 to-purple-600',
  },
];

export default function Features({ onJoinClick }: { onJoinClick: () => void }) {
  const handlePlanClick = () => {
    // Elegant disclaimer for strategic documents
    if (confirm("RESTRICTED ACCESS: UKSF Strategic Documents are classified. Only verified Federation members can access proprietary planning data. Would you like to proceed to the Membership Portal to gain access?")) {
      onJoinClick();
    }
  };

  return (
    <section id="pillars" className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <p className="text-amber-500 font-mono text-sm uppercase tracking-[0.3em] font-bold mb-4">Core Philosophy</p>
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter italic">
              The 4 Pillars of <br />
              <span className="text-gray-500">Foundation</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="text-gray-500 font-mono text-sm tracking-widest text-right">EST. 2024 / <br /> REVISION 1.0</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-12 bg-[#0A0A0A] hover:bg-zinc-900 transition-colors group relative"
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center shadow-2xl`}>
                  <pillar.icon className="text-white w-8 h-8" />
                </div>
                <span className="text-6xl font-black text-white/5 font-sans group-hover:text-white/10 transition-colors">{pillar.id}</span>
              </div>
              
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-amber-500 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                {pillar.desc}
              </p>

              <div 
                onClick={handlePlanClick}
                className="mt-12 flex items-center text-amber-500 font-bold uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 cursor-pointer"
              >
                <span>View Strategic Plan</span>
                <Link className="ml-2 w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
