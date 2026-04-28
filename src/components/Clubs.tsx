import { motion } from 'motion/react';
import { Briefcase, Building2, GraduationCap, Heart, CheckCircle2 } from 'lucide-react';

const clubTypes = [
  {
    name: 'Business Club',
    desc: 'For young entrepreneurs and students aiming to disrupt industries and build corporations.',
    icon: Briefcase,
    color: 'amber',
    perks: ['Equity Networking', 'Seed Access', 'Market Insights'],
  },
  {
    name: 'Political & Leadership',
    desc: 'Preparing for governance and administrative authority. Planning for power.',
    icon: Building2,
    color: 'blue',
    perks: ['Policy Workshops', 'Civic Action', 'Debate Forums'],
  },
  {
    name: 'Innovation Student Club',
    desc: 'Focusing on deep tech, research, and technical cooperative networking.',
    icon: GraduationCap,
    color: 'purple',
    perks: ['Hackathons', 'Research Grants', 'Mentorship'],
  },
  {
    name: 'Women’s High Table',
    desc: 'Uniting women leaders for specialized professional growth and networking.',
    icon: Heart,
    color: 'red',
    perks: ['Exec Mentorship', 'Board Prep', 'Social Impact'],
  },
];

export default function Clubs({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section id="clubs" className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter mb-6 italic">
            Elite <span className="text-amber-500">Clubs</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Membership is free for all students of the Kamma community who are ready to commit to the vision of unity and growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {clubTypes.map((club, idx) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-zinc-900/50 border border-white/10 rounded-[3rem] p-8 flex flex-col items-center text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={`w-20 h-20 rounded-3xl bg-${club.color}-500/10 border border-${club.color}-500/20 flex items-center justify-center mb-8`}>
                <club.icon className={`text-${club.color}-500 w-10 h-10`} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">{club.name}</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                {club.desc}
              </p>

              <div className="w-full space-y-3 mb-10">
                {club.perks.map((perk) => (
                  <div key={perk} className="flex items-center justify-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={onJoinClick}
                className="mt-auto w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-amber-500 transition-colors z-10"
              >
                Join Sub-Club
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
