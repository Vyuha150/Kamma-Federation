import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Ticket } from 'lucide-react';

const upcomingEvents = [
  {
    title: 'UKSF Annual Vision Summit',
    date: 'OCT 12, 2026',
    location: 'HYDERABAD CONVENTION',
    type: 'Conference',
    image: 'https://images.unsplash.com/photo-1505373633562-22894d9146c4?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Seed Funding & Ventures Workshop',
    date: 'NOV 05, 2026',
    location: 'TECH HUB, VIZAG',
    type: 'Workshop',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Youth Leadership & Power Bootcamp',
    date: 'DEC 15, 2026',
    location: 'CHENNAI CENTER',
    type: 'Bootcamp',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function Events() {
  return (
    <section id="events" className="py-32 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-amber-500 font-mono text-sm uppercase tracking-[0.3em] font-bold mb-4">Innovation & Growth</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
              Flagship <span className="text-gray-500">Events</span>
            </h2>
          </div>
          <button className="bg-zinc-800 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest border border-white/5 hover:bg-zinc-700 transition-colors">
            View All Events
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, idx) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {event.type}
                  </span>
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center space-x-4 text-gray-500 font-mono text-xs mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white uppercase leading-tight mb-6 group-hover:text-amber-500 transition-colors">
                  {event.title}
                </h3>
                
                <button className="flex items-center space-x-2 text-white font-bold uppercase text-xs tracking-widest group-hover:translate-x-2 transition-transform">
                  <Ticket className="w-4 h-4 text-amber-500" />
                  <span>Reserve Spot</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
