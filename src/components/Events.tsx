import { motion } from 'motion/react';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/content/events`)
      .then(res => res.json())
      .then(data => setUpcomingEvents(data))
      .catch(err => console.error("Failed fetching events", err));
  }, []);

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
              key={event._id || event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6">
                <img
                  src={event.image?.startsWith('/uploads') ? `${API_URL}${event.image}` : event.image}
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

        {upcomingEvents.length === 0 && (
          <div className="text-center py-20 text-gray-500 italic">No upcoming events scheduled.</div>
        )}
      </div>
    </section>
  );
}
