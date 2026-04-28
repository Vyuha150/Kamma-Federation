import { motion } from 'motion/react';
import { Target, Search, BarChart3, Fingerprint, Zap } from 'lucide-react';

const programs = [
  {
    title: 'Mentorship 1:1',
    value: 'Direct access to community tycoons and industry veterans.',
    icon: BarChart3,
  },
  {
    title: 'Business Cooperative',
    value: 'A shared resource pool for student-led startups and ventures.',
    icon: Zap,
  },
  {
    title: 'Problem Clearing House',
    value: 'Submit community-specific hurdles; solve them collectively.',
    icon: Search,
  },
  {
    title: 'Voice Unification',
    value: 'A digital town hall for gathering consensus on critical issues.',
    icon: Fingerprint,
  },
];

export default function InnovationHub({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-6">
            <Target className="w-6 h-6 mr-3" />
            <span className="text-xs font-black uppercase tracking-[0.2em]">Innovative Impact Systems</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-[0.85]">
            Bridging <br />
            <span className="text-gray-500">The Future</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((program, idx) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-[2.5rem] hover:border-amber-500/30 transition-all text-left"
            >
              <program.icon className="text-amber-500 w-10 h-10 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{program.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {program.value}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-zinc-900 border border-white/10 rounded-[3rem] text-white overflow-hidden relative group">
          <div className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" 
              alt="Mentorship" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
          
          <div className="relative z-10 text-left max-w-2xl">
            <div className="text-amber-500 mb-6">
              <Target className="w-12 h-12" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-none text-white">
              Apply for the <span className="text-amber-500">FOUNDER-60</span> Mentorship Cohort
            </h3>
            <p className="text-gray-400 text-lg font-medium mb-10 leading-relaxed">
              We are selecting 60 high-potential student entrepreneurs for a 12-month direct mentorship with the Federation's top-tier business tycoons.
            </p>
            <button 
              onClick={onJoinClick}
              className="bg-amber-500 text-black px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-2xl"
            >
              Initiate Application
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
