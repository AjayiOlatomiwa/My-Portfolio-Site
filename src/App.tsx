/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectInquiry, CourseBooking, Course } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedCompanies from './components/TrustedCompanies';
import ExploreWork from './components/ExploreWork';
import CoursePlayer from './components/CoursePlayer';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import FAQ from './components/FAQ';
import ReadyToScale from './components/ReadyToScale';
import ClientRemarks from './components/ClientRemarks';
import Footer from './components/Footer';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, X, FastForward } from 'lucide-react';
import AboutSection from './components/AboutSection';
import PlayAssetsView from './components/PlayAssetsView';
import AllWorkView from './components/AllWorkView';
import { PortfolioProject } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<'client' | 'admin'>('client');
  const [clientSubView, setClientSubView] = useState<'home' | 'play' | 'about' | 'all-work'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [selectedWorkCategory, setSelectedWorkCategory] = useState<string | undefined>(undefined);
  
  // Demo Reel Modal state
  const [isDemoReelOpen, setIsDemoReelOpen] = useState<boolean>(false);

  // CRM inquiries and course bookings state loaded from LocalStorage
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [bookings, setBookings] = useState<CourseBooking[]>([]);

  // Passcode modal state
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState<boolean>(false);
  const [passcodeAttempt, setPasscodeAttempt] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  useEffect(() => {
    const savedInquiries = localStorage.getItem('t_studios_inquiries');
    const savedBookings = localStorage.getItem('t_studios_bookings');
    if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
    if (savedBookings) setBookings(JSON.parse(savedBookings));

    // Secret admin portal query parameter listener
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('admin') !== null) {
      setIsPasscodeModalOpen(true);
      // Strip the ?admin=true query parameter immediately to keep the address bar clean
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeAttempt.trim() === '1454' || passcodeAttempt.trim().toLowerCase() === 'admin123') {
      setActiveView('admin');
      setIsPasscodeModalOpen(false);
      setPasscodeError(false);
      setPasscodeAttempt('');
    } else {
      setPasscodeError(true);
    }
  };

  const saveInquiries = (newInquiries: ProjectInquiry[]) => {
    setInquiries(newInquiries);
    localStorage.setItem('t_studios_inquiries', JSON.stringify(newInquiries));
  };

  const saveBookings = (newBookings: CourseBooking[]) => {
    setBookings(newBookings);
    localStorage.setItem('t_studios_bookings', JSON.stringify(newBookings));
  };

  const handleBookingSubmitted = (inquiry: ProjectInquiry) => {
    const nextInquiries = [inquiry, ...inquiries];
    saveInquiries(nextInquiries);

    // If it was a course critique service, automatically create a linked Academy slot
    if (inquiry.services.includes('Course Critique & Feedback')) {
      const newBooking: CourseBooking = {
        id: `book-${Date.now()}`,
        courseId: 'course-critique',
        courseTitle: selectedCourse ? selectedCourse.title : 'General Editing Critique',
        studentName: inquiry.name,
        studentEmail: inquiry.email,
        bookingDate: 'Scheduled & Pending Coord.',
        preferredTimeSlot: 'Weekday Morning',
        experienceLevel: 'Intermediate student',
        status: 'Pending',
        createdAt: new Date().toISOString()
      };
      const nextBookings = [newBooking, ...bookings];
      saveBookings(nextBookings);
    }
  };

  const handleUpdateInquiryStatus = (id: string, nextStatus: 'New' | 'Contacted' | 'Booked' | 'Completed') => {
    const nextInquiries = inquiries.map((inq) => 
      inq.id === id ? { ...inq, status: nextStatus } : inq
    );
    saveInquiries(nextInquiries);
  };

  const handleUpdateBookingStatus = (id: string, nextStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => {
    const nextBookings = bookings.map((book) => 
      book.id === id ? { ...book, status: nextStatus } : book
    );
    saveBookings(nextBookings);
  };

  const handleSeedSampleData = () => {
    const sampleInquiries: ProjectInquiry[] = [
      {
        id: 'inq-sample-1',
        name: 'Raymart Murray',
        email: 'raymart@novoagent.ai',
        source: 'Friend Referral',
        services: ['Documentary', 'Campaigns'],
        startDate: 'Next Month',
        businessDesc: 'A high-impact series documenting our AI scaling in Tokyo. Need cinematic LOG footage color matched and pacing that feels corporate yet raw.',
        website: 'https://novoagent.ai',
        successMeasure: '40% boost in executive click rates, elegant look.',
        deadline: 'Yes',
        budget: '$10k +',
        status: 'Booked',
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'inq-sample-2',
        name: 'Sarah Jenkins',
        email: 's.jenkins@ziplinemedia.com',
        source: 'Instagram',
        services: ['YouTube Edits'],
        startDate: 'Immediately',
        businessDesc: 'Pacing out MrBeast style Retention-Engine cuts for our tech gadgets channel. Our current editors miss retention marks by 30%.',
        website: 'https://ziplinemedia.com',
        successMeasure: 'Keep average retention over 60%.',
        deadline: 'As soon as possible',
        budget: '$1k - $5k',
        status: 'New',
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'inq-sample-3',
        name: 'Johnathan Cole',
        email: 'johnathan@thedeependpod.com',
        source: 'Podcast',
        services: ['Podcast Edits'],
        startDate: 'Next Week',
        businessDesc: 'Multi-cam recording of 3 speakers. Need voice EQ restoration, room echo cleaning, and 15 viral shorts extracted weekly.',
        website: 'https://thedeependpod.com',
        successMeasure: 'Crisp audio and viral short engagement multipliers.',
        deadline: "No, I'm in no rush",
        budget: '$5k - $10k',
        status: 'Contacted',
        createdAt: new Date().toISOString()
      }
    ];

    const sampleBookings: CourseBooking[] = [
      {
        id: 'book-sample-1',
        courseId: 'course-doc',
        courseTitle: 'The Art of the Documentary Cut',
        studentName: 'Raymart Murray',
        studentEmail: 'raymart@novoagent.ai',
        bookingDate: 'June 30th, 2026',
        preferredTimeSlot: '10:00 AM UTC',
        experienceLevel: 'Professional content lead',
        status: 'Confirmed',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'book-sample-2',
        courseId: 'course-yt',
        courseTitle: 'High-Retention YouTube Editing',
        studentName: 'Sarah Jenkins',
        studentEmail: 's.jenkins@ziplinemedia.com',
        bookingDate: 'July 5th, 2026',
        preferredTimeSlot: '3:00 PM UTC',
        experienceLevel: 'Intermediate video manager',
        status: 'Pending',
        createdAt: new Date().toISOString()
      }
    ];

    saveInquiries(sampleInquiries);
    saveBookings(sampleBookings);
  };

  const handleOpenBooking = () => {
    setPreselectedService('');
    setIsBookingOpen(true);
  };

  const handleBook1on1 = (courseTitle: string) => {
    setPreselectedService('Course Critique & Feedback');
    setIsBookingOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    // If we are in admin view, switch back to client first
    if (activeView === 'admin') {
      setActiveView('client');
    }

    if (sectionId === 'about') {
      setClientSubView('about');
      setSelectedCourse(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'home') {
      setClientSubView('home');
      setSelectedCourse(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'play') {
      setClientSubView('play');
      setSelectedCourse(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'portfolio') {
      setClientSubView('all-work');
      setSelectedCourse(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setClientSubView('home');
      setSelectedCourse(null);
      // Wait a frame for component re-render on home view
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* Navigation Header */}
      <Header
        activeView={activeView}
        clientSubView={clientSubView}
        onToggleView={(view) => {
          setActiveView(view);
          setClientSubView('home');
          setSelectedCourse(null);
        }}
        onOpenBooking={handleOpenBooking}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Container Views */}
      {activeView === 'client' ? (
        <main className="relative">
          <AnimatePresence mode="wait">
            {clientSubView === 'play' ? (
              <motion.div
                key="play"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PlayAssetsView onBack={() => setClientSubView('home')} />
              </motion.div>
            ) : clientSubView === 'about' ? (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AboutSection />
                <Footer />
              </motion.div>
            ) : clientSubView === 'all-work' ? (
              <motion.div
                key="all-work"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <AllWorkView onBack={() => setClientSubView('home')} />
                <Footer />
              </motion.div>
            ) : (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Main Visitor Home Screen */}
                <Hero 
                  onOpenBooking={handleOpenBooking} 
                  onPlayDemoReel={() => setIsDemoReelOpen(true)} 
                />
                
                <TrustedCompanies />
                
                <ExploreWork 
                  onSelectCategory={(catId) => {
                    setSelectedWorkCategory(catId);
                    setClientSubView('home');
                  }} 
                  onViewAll={() => setClientSubView('all-work')}
                />

                <ClientRemarks />
                
                <FAQ />

                <ReadyToScale onStartProject={handleOpenBooking} />
                
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      ) : (
        /* Admin CRM Dashboard */
        <AdminDashboard
          inquiries={inquiries}
          bookings={bookings}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onSeedSampleData={handleSeedSampleData}
        />
      )}

      {/* Onboarding Booking Form Modal */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={preselectedService}
        onBookingSubmitted={handleBookingSubmitted}
      />

      {/* ADMIN PORTAL ACCESS PASSCODE MODAL */}
      <AnimatePresence>
        {isPasscodeModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-sm rounded-lg border border-neutral-900 bg-neutral-950 p-6 md:p-8 relative shadow-2xl"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    setIsPasscodeModalOpen(false);
                    setPasscodeAttempt('');
                    setPasscodeError(false);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-6 flex flex-col items-center text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900 bg-neutral-950">
                  <span className="font-mono text-xs text-neutral-400">#</span>
                </div>
                <h3 className="font-sans text-lg font-bold tracking-tight text-white">ADMIN VERIFICATION</h3>
                <p className="mt-1 font-mono text-[9px] text-neutral-500 tracking-wider uppercase">
                  t-studios post suite access
                </p>
              </div>

              <form onSubmit={handleVerifyPasscode} className="space-y-4">
                <div>
                  <label className="block font-mono text-[8px] text-neutral-500 tracking-widest uppercase mb-1">
                    Enter Passcode
                  </label>
                  <input
                    type="password"
                    autoFocus
                    value={passcodeAttempt}
                    onChange={(e) => {
                      setPasscodeAttempt(e.target.value);
                      if (passcodeError) setPasscodeError(false);
                    }}
                    placeholder="••••"
                    className="w-full rounded border border-neutral-900 bg-black py-3 px-4 text-center font-mono text-sm tracking-[0.4em] text-white focus:border-white focus:outline-none transition-colors"
                  />
                  {passcodeError && (
                    <p className="mt-1.5 font-mono text-[8px] text-red-500 tracking-widest uppercase text-center">
                      Incorrect admin passcode
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded border border-white bg-white py-3 font-mono text-[9px] font-extrabold tracking-widest text-black hover:bg-transparent hover:text-white transition-all duration-300"
                >
                  ACCESS PORTAL
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN IMMERSIVE DEMO REEL PLAYER MODAL */}
      <AnimatePresence>
        {isDemoReelOpen && (
          <DemoReelPlayerModal onClose={() => setIsDemoReelOpen(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}

// Sub-component for Demo Reel Playback Overlay to isolate its timeline logic cleanly
interface DemoReelPlayerModalProps {
  onClose: () => void;
}

function DemoReelPlayerModal({ onClose }: DemoReelPlayerModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black p-6 md:p-12"
    >
      {/* Top Controls Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <div />
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:border-white hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>

      {/* Video Content Center */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="relative max-w-5xl mx-auto w-full aspect-video rounded-md border border-neutral-900 bg-black overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.02)] my-auto"
      >
        <iframe
          src="https://www.youtube.com/embed/mFH9L5cAj-M?rel=0&showinfo=0&autoplay=1&mute=1&enablejsapi=1"
          className="h-full w-full border-0 object-cover"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </motion.div>

      {/* Bottom info deck */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto w-full text-center pb-4"
      >
        <span className="font-mono text-[10px] text-neutral-600 tracking-widest">
          Resolution: 2160p HEVC | Retention optimized flow
        </span>
      </motion.div>
    </motion.div>
  );
}

