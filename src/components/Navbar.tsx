import { motion } from 'motion/react';
import { Users, Briefcase, TrendingUp, Handshake, Lightbulb, Menu, X, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onJoinClick }: { onJoinClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Vision', href: '#vision' },
    { name: 'Pillars', href: '#pillars' },
    { name: 'Clubs', href: '#clubs' },
    { name: 'Events', href: '#events' },
    { name: 'Legacy', href: '/legacy', isExternal: true },
    { name: 'Join Us', href: '#join' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110 bg-black/20 rounded-full p-1">
              <img 
                src="/input_file_0.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
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
            <span className="text-white font-sans font-bold text-lg sm:text-xl tracking-tight leading-none uppercase group-hover:text-amber-500 transition-colors">
              Unified Kamma <br />
              <span className="text-amber-500 text-[10px] sm:text-sm tracking-widest font-medium group-hover:text-white transition-colors">Student Federation</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              link.isExternal ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {link.name}
                </a>
              )
            ))}
            
            <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
              <Link 
                to="/admin" 
                className="text-gray-500 hover:text-amber-500 transition-colors"
                title="Federation Admin Hub"
              >
                <ShieldCheck className="w-5 h-5" />
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onJoinClick}
                className="bg-amber-500 text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                Member Portal
              </motion.button>
            </div>
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
            link.isExternal ? (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-400 hover:text-white py-3 text-lg font-medium border-b border-white/5 last:border-0"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-400 hover:text-white py-3 text-lg font-medium border-b border-white/5 last:border-0"
              >
                {link.name}
              </a>
            )
          ))}
          <button 
            onClick={() => { setIsOpen(false); onJoinClick(); }}
            className="w-full bg-amber-500 text-black px-6 py-3 rounded-xl font-bold text-lg uppercase tracking-wider mt-4"
          >
            Member Portal
          </button>

          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center space-x-2 text-gray-500 hover:text-amber-500 py-4 text-sm font-bold uppercase tracking-widest border-t border-white/5 mt-4"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Hub</span>
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
