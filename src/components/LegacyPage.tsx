import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  Sword, 
  Wheat, 
  GraduationCap, 
  Rocket, 
  Globe, 
  Crown,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PhaseProps {
  index: number;
  icon: any;
  title: string;
  period: string;
  content: string;
  image: string;
  stats?: { label: string; value: string }[];
}

const Phase: React.FC<PhaseProps> = ({ index, icon: Icon, title, period, content, image, stats }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center mb-32 relative`}
    >
      {/* Decorative vertical line for timeline */}
      <div className="absolute left-1/2 top-full h-32 w-px bg-gradient-to-b from-amber-500/20 to-transparent hidden lg:block" />

      {/* Content Side */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <Icon className="text-amber-500 w-6 h-6" />
          </div>
          <span className="text-amber-500 font-mono text-sm font-bold uppercase tracking-[0.3em] italic">{period}</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
          {title.split(' ')[0]} <br />
          <span className="text-gray-500">{title.split(' ').slice(1).join(' ')}</span>
        </h2>
        
        <p className="text-gray-400 text-lg leading-relaxed font-medium">
          {content}
        </p>

        {stats && (
          <div className="grid grid-cols-2 gap-4 mt-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-amber-500 font-black text-xl italic uppercase tracking-tighter">{stat.value}</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image/Visual Side */}
      <div className="flex-1 w-full relative">
        <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 group shadow-2xl">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        </div>
        {/* Decorative elements */}
        <div className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} w-32 h-32 bg-amber-500/10 blur-[60px] rounded-full`} />
      </div>
    </motion.div>
  );
};

export default function LegacyPage() {
  const phases = [
    {
      icon: History,
      title: "Phase 1: Origins & Early Formation",
      period: "600–1200 CE",
      content: "The Kamma community traces its origins to the historic region of Kammanadu, located in present-day coastal Andhra Pradesh. Under the rule of the Eastern Chalukyas, early Kamma groups were primary agriculturists and village administrators, developing strong agrarian practices and governance systems.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2070&auto=format&fit=crop",
      stats: [{ label: "Core Region", value: "Kammanadu" }, { label: "Governance", value: "Eastern Chalukyas" }]
    },
    {
      icon: Sword,
      title: "Phase 2: Medieval Consolidation",
      period: "1200–1600 CE",
      content: "During the post-Kakatiya period and the rise of the Vijayanagara Empire, the community emerged as a structured socio-political group. Transitioning from agrarian backgrounds, they played significant roles as military commanders and regional governors.",
      image: "https://images.unsplash.com/photo-1599707334706-ec47082305aa?q=80&w=2036&auto=format&fit=crop",
      stats: [{ label: "Military Role", value: "Commanders" }, { label: "Influence", value: "Vijayanagara" }]
    },
    {
      icon: Wheat,
      title: "Phase 3: Agrarian Dominance",
      period: "1600–1850 CE",
      content: "Prominent Kamma families like the Vasireddy and Pemmasani lineages became key landholders in the fertile Krishna-Guntur delta. Their expertise in irrigation-based farming transformed South India's agricultural productivity.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
      stats: [{ label: "Key Lineage", value: "Vasireddy" }, { label: "Impact", value: "Delta Mastery" }]
    },
    {
      icon: GraduationCap,
      title: "Phase 4: Colonial Transformation",
      period: "1850–1947",
      content: "Adaptability defined this era as the community embraced modern education. By the late 19th century, they became early leaders in institutional development, investing heavily in schools across Guntur and Krishna districts.",
      image: "https://images.unsplash.com/photo-1523050853063-bd8012fec00b?q=80&w=2070&auto=format&fit=crop",
      stats: [{ label: "Population (1890)", value: "8 Lakhs+" }, { label: "Focus", value: "Formal Education" }]
    },
    {
      icon: Rocket,
      title: "Phase 5: Post-Independence Expansion",
      period: "1947–1990",
      content: "Independence opened new horizons in business, politics, and medicine. Leveraged by agricultural wealth and education, a new generation of entrepreneurs and urban developers revitalized the economic landscape of Andhra Pradesh.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
      stats: [{ label: "Diversification", value: "95% Multi-Sector" }, { label: "Influence", value: "Urbanization" }]
    },
    {
      icon: Globe,
      title: "Phase 6: Globalization & Modernity",
      period: "1990–Present",
      content: "Economic liberalization saw a global diaspora to the US, UK, and Australia. Establishing dominant networks in IT, Healthcare, and Media, particularly the Telugu film industry, the community maintains high socio-economic influence.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      stats: [{ label: "Global Presence", value: "Worldwide" }, { label: "Key Sectors", value: "IT & Media" }]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-amber-500 selection:text-black pt-20">
      <Navbar onJoinClick={() => {}} />

      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-full mb-8"
          >
            <Crown size={16} className="text-amber-500" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-amber-500">Historical Archives</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter italic uppercase mb-12"
          >
            OUR GOLDEN <br />
            <span className="text-amber-500">LEGACY.</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-px w-32 bg-amber-500 mx-auto mb-12 origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg sm:text-2xl max-w-4xl mx-auto leading-relaxed italic"
          >
            "A thousand-year journey from regional agrarian roots to a global entrepreneurial powerhouse."
          </motion.p>
        </div>

        {/* Floating background elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 blur-[150px] rounded-full" />
      </section>

      {/* Timeline Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {phases.map((phase, idx) => (
            <Phase 
              key={idx} 
              index={idx} 
              icon={phase.icon}
              title={phase.title}
              period={phase.period}
              content={phase.content}
              image={phase.image}
              stats={phase.stats}
            />
          ))}
        </div>
      </section>

      {/* Summary Insight */}
      <section className="py-24 bg-[#0A0A0A] border-y border-white/5 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center space-x-2 text-amber-500 mb-8">
            <TrendingUp size={24} />
            <span className="text-xs font-black uppercase tracking-[0.4em]">Strategic Conclusion</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight mb-8">
            Evolution of <span className="text-amber-500">Sustained Impact</span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-12">
            Over more than a millennium, the community has evolved. Its growth driven by agricultural strength, early adoption of education, and administrative participation—resulting in a sustained and measurable impact on society.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl w-full sm:w-auto">
              <ChevronRight className="text-amber-500" />
              <span className="text-white font-bold uppercase tracking-widest text-xs">Innovation Focused</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl w-full sm:w-auto">
              <ChevronRight className="text-amber-500" />
              <span className="text-white font-bold uppercase tracking-widest text-xs">Globally Connected</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl w-full sm:w-auto">
              <ChevronRight className="text-amber-500" />
              <span className="text-white font-bold uppercase tracking-widest text-xs">Economic Resilience</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
