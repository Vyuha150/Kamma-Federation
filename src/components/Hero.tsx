import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <section id="vision" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Building Legacies Since 2024</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">
              UNITY. <br />
              <span className="text-gray-500 italic font-medium">VISION.</span> <br />
              <span className="text-amber-500">AUTHORITY.</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed mb-10">
              The Unified Kamma Student Federation is more than an organization. It's a decade-lasting power planning for tomorrow's leaders, entrepreneurs, and visionaries.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onJoinClick}
                className="bg-white text-black px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg uppercase flex items-center justify-center space-x-3 shadow-2xl hover:bg-gray-100 transition-all"
              >
                <span>Join Federation</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <button className="px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg uppercase text-white border border-white/20 hover:bg-white/5 transition-all">
                Explore Vision
              </button>
            </div>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black overflow-hidden bg-gray-800">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-black bg-amber-500 flex items-center justify-center text-black font-bold text-xs sm:text-sm">
                  +5k
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-bold">Growing Daily</p>
                <p className="text-gray-500 text-sm">Student & Business Leaders</p>
              </div>
            </div>

            {/* Status Ticker */}
            <div className="mt-12 border-t border-white/5 pt-8 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap space-x-12 items-center">
                {[
                  "ENTREPRENEURIAL NETWORK STATUS: ACTIVE",
                  "VISION COHORT 2026: ENROLLING",
                  "FEDERATION STRENGTH: 5,420 MEMBERS",
                  "UPCOMING SUMMIT: OCT 2026",
                  "LEADERSHIP PIPELINE: OPERATIONAL"
                ].map((text, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white/5 aspect-[4/5] shadow-[0_0_100px_rgba(245,158,11,0.15)]">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" 
                alt="Professional Leadership" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-10 left-10 right-10">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
                  <p className="text-white font-mono text-xs uppercase tracking-widest mb-3 opacity-60">Success Inbound</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-white text-2xl font-bold uppercase tracking-tight italic">Generation X-II</h3>
                      <p className="text-gray-400 text-sm">Founding Visionaries</p>
                    </div>
                    <div className="text-amber-500 font-mono font-bold text-xl">L-04</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-40 h-40 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center p-8 z-20 backdrop-blur-xl"
            >
              <div className="text-center">
                <p className="text-amber-500 font-black text-3xl">100%</p>
                <p className="text-white/40 font-mono text-[10px] uppercase">Unity Rate</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center">
        <span className="text-white/20 text-[10px] uppercase tracking-widest mb-2 font-bold">Scroll Down</span>
        <ChevronDown className="text-white/20 w-6 h-6" />
      </div>
    </section>
  );
}
