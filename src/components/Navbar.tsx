import { motion } from 'motion/react';
import { Users, Briefcase, TrendingUp, Handshake, Lightbulb, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onJoinClick }: { onJoinClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Vision', href: '#vision' },
    { name: 'Pillars', href: '#pillars' },
    { name: 'Clubs', href: '#clubs' },
    { name: 'Events', href: '#events' },
    { name: 'Join Us', href: '#join' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Users className="text-black w-6 h-6" />
            </div>
            <span className="text-white font-sans font-bold text-xl tracking-tight leading-none uppercase">
              Unified Kamma <br />
              <span className="text-amber-500 text-sm tracking-widest font-medium">Student Federation</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onJoinClick}
              className="bg-amber-500 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
            >
              Member Portal
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0A0A0A] border-b border-white/10 px-4 pt-2 pb-6 space-y-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-400 hover:text-white py-3 text-lg font-medium border-b border-white/5 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <button className="w-full bg-amber-500 text-black px-6 py-3 rounded-xl font-bold text-lg uppercase tracking-wider mt-4">
            Member Portal
          </button>
        </motion.div>
      )}
    </nav>
  );
}
