import { motion } from 'motion/react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1,
          ease: "easeOut"
        }}
        className="relative mb-12"
      >
        {/* Animated Glow Back */}
        <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full animate-pulse" />
        
        {/* Logo Container */}
        <div className="relative w-48 h-48 rounded-full border-4 border-amber-500/30 p-2 overflow-hidden bg-black shadow-[0_0_50px_rgba(245,158,11,0.2)]">
          <img 
            src="/input_file_0.png" 
            alt="UKSF Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('input_file_1.png')) {
                target.src = '/input_file_1.png';
              } else {
                target.src = 'https://via.placeholder.com/200?text=UKSF';
              }
            }}
          />
        </div>

        {/* Orbiting Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border-t-2 border-amber-500 rounded-full opacity-40 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
        />
      </motion.div>

      <div className="text-center">
        <h2 className="text-white font-black text-2xl uppercase tracking-[0.3em] italic mb-4 animate-pulse">
          Initializing <span className="text-amber-500">Vision</span>
        </h2>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"
          />
        </div>
        <p className="mt-4 text-gray-500 font-mono text-[10px] uppercase tracking-widest opacity-50">
          United Kamma Student Federation
        </p>
      </div>
    </div>
  );
}
