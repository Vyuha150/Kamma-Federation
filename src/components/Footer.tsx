import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch(`${API_URL}/api/content/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <footer className="bg-[#050505] pt-24 pb-12 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-8 justify-center md:justify-start">
              <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
                <span className="text-black font-black text-xl">U</span>
              </div>
              <span className="text-white font-black text-xl uppercase tracking-tighter italic">UKSF</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Empowering the next generation of leaders through unity, entrepreneurship, and a long-term vision for the Kamma community.
            </p>
            <div className="flex items-center space-x-4 justify-center md:justify-start">
              {[Linkedin, Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-amber-500 hover:border-amber-500 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#vision" className="hover:text-white transition-colors">Our Vision</a></li>
              <li><Link to="/legacy" className="hover:text-white transition-colors">Our Golden Legacy</Link></li>
              <li><Link to="/hall-of-fame" className="hover:text-white transition-colors">Hall of Fame</Link></li>
              <li><a href="#pillars" className="hover:text-white transition-colors">Pillars of Growth</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Membership</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events & Workshops</a></li>
              <li><a href="/admin" className="text-amber-500/50 hover:text-amber-500 transition-colors flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                <span>Federation Admin Hub</span>
              </a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Federation HQ</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-start space-x-3 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Banjara Hills, Road No. 12 <br /> Hyderabad, TS - 500034</span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+91 99000 88000</span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>connect@uksf.org</span>
              </li>
            </ul>
          </div>

          <div id="join">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Join Movement</h4>
            <p className="text-gray-500 text-sm mb-6">Stay updated with our latest vision releases.</p>
            {subscribed ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-3 rounded-2xl text-xs font-bold uppercase text-center">
                Subscribed Successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="bg-zinc-900 border border-white/10 p-2 rounded-2xl flex">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="bg-transparent border-none text-white text-xs px-4 w-full focus:ring-0 font-bold uppercase outline-none"
                />
                <button type="submit" className="bg-amber-500 text-black px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-colors shrink-0">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">
            © 2026 UNIFIED KAMMA STUDENT FEDERATION. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center space-x-8 text-gray-600 font-mono text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Vision</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
