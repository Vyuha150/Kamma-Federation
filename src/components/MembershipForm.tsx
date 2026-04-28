import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Check, Target, Brain, Wallet, UserCircle, Rocket } from 'lucide-react';

type FormStep = 'INTEREST' | 'PERSONAL' | 'PSYCHOGRAPHIC' | 'GOALS' | 'FINANCIAL' | 'SUCCESS';

export default function MembershipForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<FormStep>('INTEREST');
  const [selectedClub, setSelectedClub] = useState<string>('');

  if (!isOpen) return null;

  const nextStep = (current: FormStep) => {
    const steps: FormStep[] = ['INTEREST', 'PERSONAL', 'PSYCHOGRAPHIC', 'GOALS', 'FINANCIAL', 'SUCCESS'];
    const nextIndex = steps.indexOf(current) + 1;
    if (nextIndex < steps.length) setStep(steps[nextIndex]);
  };

  const prevStep = (current: FormStep) => {
    const steps: FormStep[] = ['INTEREST', 'PERSONAL', 'PSYCHOGRAPHIC', 'GOALS', 'FINANCIAL', 'SUCCESS'];
    const prevIndex = steps.indexOf(current) - 1;
    if (prevIndex >= 0) setStep(steps[prevIndex]);
  };

  const Progress = () => {
    const steps: FormStep[] = ['INTEREST', 'PERSONAL', 'PSYCHOGRAPHIC', 'GOALS', 'FINANCIAL'];
    const currentIdx = steps.indexOf(step as FormStep);
    return (
      <div className="flex space-x-2 mb-8">
        {steps.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 flex-1 rounded-full transition-colors ${i <= currentIdx ? 'bg-amber-500' : 'bg-white/10'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2 z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            {/* Step 1: Interest Selection */}
            {step === 'INTEREST' && (
              <motion.div
                key="interest"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-10 text-center">
                  <span className="text-amber-500 font-mono text-[10px] uppercase tracking-widest font-bold mb-2 block">Phase 01</span>
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Choose Your Path</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {['Entrepreneurship', 'Leadership & Politics', 'Student Innovation', 'Women’s High Table'].map((club) => (
                    <button
                      key={club}
                      onClick={() => setSelectedClub(club)}
                      className={`p-6 rounded-2xl border transition-all text-left group ${
                        selectedClub === club ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center transition-colors ${
                        selectedClub === club ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-500'
                      }`}>
                        {club === 'Entrepreneurship' && <Rocket className="w-5 h-5" />}
                        {club === 'Leadership & Politics' && <Target className="w-5 h-5" />}
                        {club === 'Student Innovation' && <Brain className="w-5 h-5" />}
                        {club === 'Women’s High Table' && <UserCircle className="w-5 h-5" />}
                      </div>
                      <h3 className="text-white font-bold uppercase text-xs tracking-wider mb-1">{club}</h3>
                      <p className="text-gray-500 text-[10px] leading-tight">Master your domain through collective power.</p>
                    </button>
                  ))}
                </div>
                <button 
                  disabled={!selectedClub}
                  onClick={() => nextStep('INTEREST')}
                  className="w-full bg-amber-500 disabled:opacity-50 text-black py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Begin Application</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Personal Details */}
            {step === 'PERSONAL' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Progress />
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Profile Essentials</h2>
                  <p className="text-gray-500 text-sm">Identity documentation for the Federation archives.</p>
                </div>
                <div className="space-y-6 mb-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors" placeholder="Vikas Chowdary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
                      <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors" placeholder="+91 00000 00000" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Educational Institution</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors" placeholder="IIT Hyderabad / BITS Pilani / etc." />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Semester/Year</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors appearance-none">
                        <option>Year 1</option>
                        <option>Year 2</option>
                        <option>Year 3</option>
                        <option>Year 4</option>
                        <option>Graduate</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Native District</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors" placeholder="e.g., Guntur, Krishna" />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => prevStep('PERSONAL')} className="px-8 py-5 rounded-2xl font-bold uppercase text-xs text-white border border-white/10 hover:bg-white/5 transition-all flex items-center space-x-2">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button onClick={() => nextStep('PERSONAL')} className="flex-1 bg-white text-black py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl flex items-center justify-center space-x-2">
                    <span>Continue</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Psychographic/Mindset */}
            {step === 'PSYCHOGRAPHIC' && (
              <motion.div
                key="psychographic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Progress />
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Mindset Assessment</h2>
                  <p className="text-gray-500 text-sm">We believe in quality over quantity. How do you think?</p>
                </div>
                <div className="space-y-8 mb-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Which best describes your philosophy?</label>
                    <div className="space-y-2">
                      {[
                        "I believe in building systems that outlast generations.",
                        "I focus on rapid disruptive growth and innovation.",
                        "I want to lead the community through governance.",
                        "I am here to learn and contribute to something bigger."
                      ].map((option, i) => (
                        <button key={i} className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-sm text-gray-300">
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">What is your biggest failure so far and what did it teach you?</label>
                    <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors resize-none" placeholder="Your depth of thought determines your placement." />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => prevStep('PSYCHOGRAPHIC')} className="px-8 py-5 rounded-2xl font-bold uppercase text-xs text-white border border-white/10 hover:bg-white/5 transition-all flex items-center space-x-2">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button onClick={() => nextStep('PSYCHOGRAPHIC')} className="flex-1 bg-white text-black py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl flex items-center justify-center space-x-2">
                    <span>Next Phase</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Goals & Interests */}
            {step === 'GOALS' && (
              <motion.div
                key="goals"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Progress />
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Vision Mapping</h2>
                  <p className="text-gray-500 text-sm">Where do you see yourself in the next decade?</p>
                </div>
                <div className="space-y-6 mb-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">3-Year Professional Goal</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors" placeholder="e.g., Founding a Series A startup" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Primary Interest Area</label>
                    <div className="flex flex-wrap gap-2">
                      {['Scalable Business', 'Policy Making', 'Deep Tech', 'Strategic Networking', 'Social Equity'].map((tag) => (
                        <button key={tag} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-gray-400 hover:border-amber-500 hover:text-white transition-all">
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">How can the Federation best serve you?</label>
                    <textarea rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors resize-none" placeholder="We optimize our resources based on your needs." />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => prevStep('GOALS')} className="px-8 py-5 rounded-2xl font-bold uppercase text-xs text-white border border-white/10 hover:bg-white/5 transition-all flex items-center space-x-2">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button onClick={() => nextStep('GOALS')} className="flex-1 bg-white text-black py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl flex items-center justify-center space-x-2">
                    <span>Critical Step</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Financial/Resource Assessment */}
            {step === 'FINANCIAL' && (
              <motion.div
                key="financial"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Progress />
                <div className="mb-10">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4 border border-amber-500/20">
                    <Wallet className="w-6 h-6 text-amber-500" />
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Resource Assessment</h2>
                  <p className="text-gray-500 text-sm">Strictly used for Scholarship qualification or Investment tiering.</p>
                </div>
                <div className="space-y-8 mb-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Financial Situation Statement</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-amber-500 outline-none transition-colors appearance-none">
                      <option>Requiring Full Scholarship/Support</option>
                      <option>Self-Sufficient / Looking for Network</option>
                      <option>Ready to Invest / Angel Background</option>
                      <option>Seeking Strategic Partnerships</option>
                    </select>
                  </div>
                  <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl">
                    <p className="text-amber-500 font-bold text-xs uppercase mb-2">Unity Clause</p>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      "I hereby commit to the long-term vision of the Federation and agree to contribute my time, skills, and energy towards the common growth of the Kamma community."
                    </p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => prevStep('FINANCIAL')} className="px-8 py-5 rounded-2xl font-bold uppercase text-xs text-white border border-white/10 hover:bg-white/5 transition-all flex items-center space-x-2">
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button onClick={() => nextStep('FINANCIAL')} className="flex-1 bg-amber-500 text-black py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl flex items-center justify-center space-x-2">
                    <Check className="w-5 h-5" />
                    <span>Finalize Application</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {step === 'SUCCESS' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border-4 border-emerald-500 animate-pulse">
                  <Check className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">Application Sealed</h2>
                <p className="text-gray-400 text-lg mb-12 max-w-sm mx-auto leading-relaxed">
                  Your profile is now being reviewed by the Federation's Council. You will receive a verification link once approved.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-gray-100 transition-all shadow-2xl"
                >
                  Return to Portal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
