/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, MapPin, Star, ArrowRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { ROOMS, Room, Booking } from './types';

export default function App() {
  const [view, setView] = useState<'home' | 'booking' | 'confirmation'>('home');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    checkIn: '',
    checkOut: ''
  });

  const handleBookClick = (room: Room) => {
    setSelectedRoom(room);
    setView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoom) return;

    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: formData.name,
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      roomType: selectedRoom.type,
      timestamp: new Date().toISOString()
    };

    // Save to localStorage (VG Requirement)
    const existingBookings = JSON.parse(localStorage.getItem('hotel_bookings') || '[]');
    localStorage.setItem('hotel_bookings', JSON.stringify([...existingBookings, newBooking]));

    setView('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-paper/80 backdrop-blur-sm border-b border-ink/5 px-6 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-serif tracking-widest cursor-pointer"
          onClick={() => setView('home')}
        >
          ANNA HOTEL
        </div>
        <div className="hidden md:flex space-x-8 text-xs font-semibold tracking-widest uppercase">
          <button onClick={() => setView('home')} className="hover:text-gold transition-colors">Home</button>
          <button className="hover:text-gold transition-colors">Rooms</button>
          <button onClick={() => {
            setView('home');
            setTimeout(() => {
              document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }} className="hover:text-gold transition-colors">Experience</button>
          <button onClick={() => {
            setView('home');
            setTimeout(() => {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100);
          }} className="hover:text-gold transition-colors">Contact</button>
        </div>
        <button 
          onClick={() => {
            if (view === 'home') {
              setSelectedRoom(ROOMS[0]);
              setView('booking');
            }
          }}
          className="text-xs font-bold tracking-widest uppercase border-b border-ink hover:text-gold hover:border-gold transition-all"
        >
          Book Now
        </button>
      </nav>

      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-20 pb-20"
            >
              {/* Hero Section */}
              <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://picsum.photos/seed/vietnam-hotel/1920/1080" 
                    alt="Luxury Hotel in Vietnam" 
                    className="w-full h-full object-cover brightness-50"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="relative z-10 text-center text-paper px-6">
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="uppercase tracking-[0.3em] text-sm mb-4"
                  >
                    Welcome to Elegance
                  </motion.p>
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-6xl md:text-8xl font-serif mb-8"
                  >
                    Anna Hotel
                  </motion.h1>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button 
                      onClick={() => {
                        const roomsSection = document.getElementById('rooms');
                        roomsSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn-primary bg-paper text-ink hover:bg-gold hover:text-paper"
                    >
                      Explore Rooms
                    </button>
                  </motion.div>
                </div>
              </section>

              {/* Rooms Section */}
              <section id="rooms" className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl mb-4">Our Accommodations</h2>
                  <div className="w-20 h-px bg-gold mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {ROOMS.map((room, index) => (
                    <motion.div 
                      key={room.id}
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer"
                      onClick={() => handleBookClick(room)}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden mb-6">
                        <img 
                          src={room.image} 
                          alt={room.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent text-paper">
                          <p className="text-xs uppercase tracking-widest mb-1">From {room.price} SEK / Night</p>
                        </div>
                      </div>
                      <h3 className="text-2xl mb-2 group-hover:text-gold transition-colors">{room.name}</h3>
                      <p className="text-sm text-ink/60 leading-relaxed mb-4">{room.description}</p>
                      <div className="flex items-center text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                        Book This Room <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Experience Nha Trang Section */}
              <section id="experience" className="bg-ink text-paper py-24">
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-4xl md:text-6xl font-serif mb-8">Discover Nha Trang</h2>
                      <p className="text-paper/60 leading-relaxed mb-6 text-lg">
                        Known as the "Riviera of the East Sea," Nha Trang is a coastal paradise where turquoise waters meet pristine white sands. 
                        Anna Hotel is perfectly situated to offer you the very best of this vibrant city.
                      </p>
                      <p className="text-paper/60 leading-relaxed mb-8">
                        From exploring the ancient Po Nagar Cham Towers to diving in the crystal-clear waters of Hon Mun Island, 
                        Nha Trang offers a unique blend of cultural heritage and modern seaside luxury. 
                        Enjoy world-class seafood, vibrant night markets, and the gentle sea breeze from your private balcony.
                      </p>
                      <div className="flex space-x-12">
                        <div>
                          <p className="text-gold text-2xl font-serif">7km</p>
                          <p className="text-[10px] uppercase tracking-widest opacity-50">Pristine Beach</p>
                        </div>
                        <div>
                          <p className="text-gold text-2xl font-serif">19+</p>
                          <p className="text-[10px] uppercase tracking-widest opacity-50">Tropical Islands</p>
                        </div>
                        <div>
                          <p className="text-gold text-2xl font-serif">8th C.</p>
                          <p className="text-[10px] uppercase tracking-widest opacity-50">Ancient History</p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="relative aspect-square"
                    >
                      <img 
                        src="https://picsum.photos/seed/nhatrang-beach/1000/1000" 
                        alt="Nha Trang Coastline" 
                        className="w-full h-full object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gold/20 -z-10"></div>
                    </motion.div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto px-6 py-12"
            >
              <button 
                onClick={() => setView('home')}
                className="flex items-center text-xs font-bold uppercase tracking-widest mb-12 hover:text-gold transition-colors"
              >
                <ChevronLeft className="mr-2 w-4 h-4" /> Back to Rooms
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-4xl mb-6">Complete Your Reservation</h2>
                  <p className="text-ink/60 mb-8">Please provide your details to secure your stay at Anna Hotel.</p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                        <input 
                          required
                          type="text" 
                          placeholder="John Doe"
                          className="input-field pl-8"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40">Check-In</label>
                        <div className="relative">
                          <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                          <input 
                            required
                            type="date" 
                            className="input-field pl-8"
                            value={formData.checkIn}
                            onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-ink/40">Check-Out</label>
                        <div className="relative">
                          <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                          <input 
                            required
                            type="date" 
                            className="input-field pl-8"
                            value={formData.checkOut}
                            onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn-primary w-full">
                      Confirm Booking
                    </button>
                  </form>
                </div>

                <div className="bg-ink/5 p-8 border border-ink/10">
                  <h3 className="text-xl mb-6 border-b border-ink/10 pb-4">Reservation Summary</h3>
                  {selectedRoom && (
                    <div className="space-y-6">
                      <img 
                        src={selectedRoom.image} 
                        alt={selectedRoom.name} 
                        className="w-full aspect-video object-cover mb-4"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">Selected Room</p>
                        <p className="text-lg font-serif">{selectedRoom.name}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">Price per night</p>
                          <p className="text-xl font-serif">{selectedRoom.price} SEK</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">Total</p>
                          <p className="text-2xl font-serif text-gold">{selectedRoom.price} SEK</p>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-ink/10 space-y-3">
                        <div className="flex items-center text-xs text-ink/60">
                          <CheckCircle className="w-3 h-3 mr-2 text-gold" /> Free High-Speed WiFi
                        </div>
                        <div className="flex items-center text-xs text-ink/60">
                          <CheckCircle className="w-3 h-3 mr-2 text-gold" /> Complimentary Breakfast
                        </div>
                        <div className="flex items-center text-xs text-ink/60">
                          <CheckCircle className="w-3 h-3 mr-2 text-gold" /> 24/7 Concierge Service
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {view === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto px-6 py-24 text-center"
            >
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-10 h-10 text-gold" />
              </div>
              <h2 className="text-5xl mb-6">Bokningen är bekräftad</h2>
              <p className="text-ink/60 mb-12 text-lg">
                Thank you, {formData.name}. We have received your reservation for the {selectedRoom?.name}. 
                A confirmation email has been sent to your inbox.
              </p>
              
              <div className="bg-ink/5 p-8 border border-ink/10 mb-12 text-left space-y-4">
                <div className="flex justify-between">
                  <span className="text-xs uppercase tracking-widest text-ink/40">Guest</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs uppercase tracking-widest text-ink/40">Room</span>
                  <span className="font-medium">{selectedRoom?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs uppercase tracking-widest text-ink/40">Dates</span>
                  <span className="font-medium">{formData.checkIn} — {formData.checkOut}</span>
                </div>
              </div>

              <button 
                onClick={() => setView('home')}
                className="btn-primary"
              >
                Return to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-paper py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-serif mb-6 tracking-widest">ANNA HOTEL</h3>
            <p className="text-paper/60 max-w-md leading-relaxed">
              Experience the art of hospitality in the heart of Nha Trang. 
              Our boutique hotel combines timeless elegance with modern luxury 
              to create an unforgettable stay in Vietnam's premier coastal destination.
              Discover the turquoise waters and golden sands of the Riviera of the East Sea.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gold">Location</h4>
            <div className="flex items-start text-paper/60 space-x-2">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <p>Nha Trang, Vietnam</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-gold">Contact</h4>
            <p className="text-paper/60">diepannanhatrang@gmail.com</p>
            <p className="text-paper/60">+848094732</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-paper/40">
          <p>© 2026 Anna Hotel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
