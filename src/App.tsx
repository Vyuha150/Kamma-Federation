import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Clubs from './components/Clubs';
import Events from './components/Events';
import InnovationHub from './components/InnovationHub';
import Footer from './components/Footer';
import MembershipForm from './components/MembershipForm';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="bg-[#050505] selection:bg-amber-500 selection:text-black">
      <Navbar onJoinClick={() => setIsFormOpen(true)} />
      <Hero onJoinClick={() => setIsFormOpen(true)} />
      <Features onJoinClick={() => setIsFormOpen(true)} />
      <InnovationHub onJoinClick={() => setIsFormOpen(true)} />
      <Clubs onJoinClick={() => setIsFormOpen(true)} />
      <Events />
      <Footer />
      
      <AnimatePresence>
        {isFormOpen && (
          <MembershipForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
