import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Clubs from './components/Clubs';
import Events from './components/Events';
import InnovationHub from './components/InnovationHub';
import Footer from './components/Footer';
import MembershipForm from './components/MembershipForm';
import LoadingScreen from './components/LoadingScreen';
import AdminPanel from './components/AdminPanel';
import LegacyPage from './components/LegacyPage';
import HallOfFame from './components/HallOfFame';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import AdminLogin from './components/AdminLogin';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function HomePage({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <>
      <Navbar onJoinClick={onJoinClick} />
      <Hero onJoinClick={onJoinClick} />
      <Features onJoinClick={onJoinClick} />
      <InnovationHub onJoinClick={onJoinClick} />
      <Clubs onJoinClick={onJoinClick} />
      <Events />
      <Footer />
    </>
  );
}

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading experience
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <main className="bg-[#050505] selection:bg-amber-500 selection:text-black min-h-screen">
        <AnimatePresence>
          {isLoading && <LoadingScreen key="loader" />}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={<HomePage onJoinClick={() => setIsFormOpen(true)} />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          } />
          <Route path="/legacy" element={<LegacyPage />} />
          <Route path="/hall-of-fame" element={<HallOfFame />} />
        </Routes>

        <AnimatePresence>
          {isFormOpen && (
            <MembershipForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
          )}
        </AnimatePresence>
      </main>
    </Router>
  );
}
