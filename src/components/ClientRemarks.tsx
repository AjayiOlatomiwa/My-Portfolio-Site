import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ThumbsUp, Heart, MessageCircle, Youtube, Tv, Sparkles, ShieldCheck } from 'lucide-react';

interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  date: string;
  initials: string;
  avatarColor: string;
}

interface AudienceRemark {
  id: string;
  author: string;
  time: string;
  content: string;
  reply?: string;
  source: 'youtube' | 'chat';
  likes?: number;
  reactions?: string[];
  initial: string;
  avatarColor: string;
}

const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    quote: "Ajayi is an exceptional editor with a strong attention to detail. He clearly understands the craft, delivers exactly what's requested at a high standard, and is very easy to communicate with. His accuracy is truly fantastic; I highly recommend working with him and look forward to continuing our work together.",
    author: "Amit Zur",
    role: "Client",
    date: "May 16, 2026",
    initials: "AZ",
    avatarColor: "bg-blue-600/25 text-blue-400"
  },
  {
    id: 'rev-2',
    quote: "T-Studios produces one of the highest-quality short-form content that I have seen. Their execution is impeccable. Communication was smooth, and they were happy to take feedback, which is one of the highest qualities of a serious and professional vendor. T-Studios asks the right questions before we start and takes the time to understand what you are trying to achieve, then executes with dedication rather than just creating videos. We are very satisfied. 9.5/10",
    author: "Hau Nguyen, Jan Jekielek",
    role: "Client",
    date: "Mar 21, 2026",
    initials: "HJ",
    avatarColor: "bg-indigo-600/25 text-indigo-400"
  },
  {
    id: 'rev-3',
    quote: "First time working with T-Studios and I'm impressed. He communicates well and often, keeps you updated, and delivers phenomenal graphics. Professional, creative, and easy to work with. I'd definitely recommend him.",
    author: "Eunice Diona",
    role: "Client",
    date: "Mar 19, 2026",
    initials: "ED",
    avatarColor: "bg-purple-600/25 text-purple-400"
  }
];

const AUDIENCE_REMARKS: AudienceRemark[] = [
  {
    id: 'aud-nyt',
    author: 'Jan Jekielek',
    time: 'Book Launch DM',
    content: "Hey guys, just want to let you know that we just reached our goal for this book launch getting ourselves on the New York Times bestseller list. This is amazing.",
    reply: "Well, done all of you. Great job. Great job.",
    source: 'chat',
    reactions: ['🔥', '❤️', '🏆'],
    initial: 'JJ',
    avatarColor: 'bg-red-600/20 text-red-400'
  },
  {
    id: 'aud-1',
    author: '@Gares.',
    time: '2 hours ago',
    content: "I'm not Christian but this is the best Christian video I've ever seen. Honestly beautiful.",
    source: 'youtube',
    likes: 24,
    initial: 'G',
    avatarColor: 'bg-emerald-600/20 text-emerald-400'
  },
  {
    id: 'aud-2',
    author: '@NotManny909',
    time: '19 hours ago',
    content: "can you do more of these? this really touched my heart",
    source: 'youtube',
    likes: 12,
    initial: 'M',
    avatarColor: 'bg-amber-600/20 text-amber-400'
  },
  {
    id: 'aud-3',
    author: 'Direct Message',
    time: 'Recent DM',
    content: "dude it might be my favorite thing you'ev made. the music is freaking amazing. everything is amazing.",
    source: 'chat',
    reactions: ['❤️', '🔥'],
    initial: 'DM',
    avatarColor: 'bg-red-600/20 text-red-400'
  },
  {
    id: 'aud-4',
    author: '@FoxGodPrime',
    time: '11 days ago',
    content: "What a beautiful ending. Perfect soundtrack in the background too. Thank you for what you do, this channel is hands down one of my favorites. May God Bless You, May God Bless You, May God Bless You. 💚💙🧡✝️",
    source: 'youtube',
    likes: 18,
    initial: 'F',
    avatarColor: 'bg-cyan-600/20 text-cyan-400'
  },
  {
    id: 'aud-5',
    author: 'Direct Message',
    time: 'Recent DM',
    content: "hoyl crap that goes HARD",
    source: 'chat',
    reactions: ['🔥'],
    initial: 'DM',
    avatarColor: 'bg-zinc-600/20 text-zinc-400'
  },
  {
    id: 'aud-6',
    author: '@neoneelstreamsvideos3471',
    time: '2 weeks ago',
    content: "AWWWW MANNNNN -- I LOVE YOUR VIDEOS !!! as a Christian i've been struggling alot. But your videos help me find that happiness in God again. Thank you so much! God Bless You!",
    source: 'youtube',
    likes: 31,
    initial: 'N',
    avatarColor: 'bg-rose-600/20 text-rose-400'
  },
  {
    id: 'aud-7',
    author: '@AluGames_',
    time: '3 weeks ago',
    content: "This truly is a masterpiece, I have never seen Jacob's story in this way before! You truly do amazing work! ✉️",
    source: 'youtube',
    likes: 8,
    initial: 'A',
    avatarColor: 'bg-violet-600/20 text-violet-400'
  },
  {
    id: 'aud-8',
    author: '@MeloDaizy',
    time: '3 weeks ago',
    content: "You don't know how peak this is when you watch it on a TV screen 🤧 🔥",
    source: 'youtube',
    likes: 7,
    initial: 'M',
    avatarColor: 'bg-yellow-600/20 text-yellow-400'
  },
  {
    id: 'aud-9',
    author: '@kidflixanimations.',
    time: '4 weeks ago',
    content: "The videos keep getting better ❤️❤️",
    source: 'youtube',
    likes: 4,
    initial: 'K',
    avatarColor: 'bg-lime-600/20 text-lime-400'
  },
  {
    id: 'aud-10',
    author: '@JordanMarshall-g8o',
    time: '4 weeks ago',
    content: "My 7 year old loves your videos! Praise God!",
    source: 'youtube',
    likes: 13,
    initial: 'J',
    avatarColor: 'bg-indigo-600/20 text-indigo-400'
  },
  {
    id: 'aud-11',
    author: '@cshgeo',
    time: '4 weeks ago',
    content: "I cried. Thank you for the reminder and fine oiled meal provided by the most High.",
    source: 'youtube',
    likes: 9,
    initial: 'C',
    avatarColor: 'bg-orange-600/20 text-orange-400'
  },
  {
    id: 'aud-12',
    author: '@ninalopez9656',
    time: '2 weeks ago',
    content: "Your work is so thorough and insightful. Is there any way to donate or do more to help than just subscribe?",
    source: 'youtube',
    likes: 5,
    initial: 'N',
    avatarColor: 'bg-blue-600/20 text-blue-400'
  },
  {
    id: 'aud-13',
    author: '@lindaed3594',
    time: '4 weeks ago',
    content: "WOW!! Well done!! 👏👏👏",
    source: 'youtube',
    likes: 2,
    initial: 'L',
    avatarColor: 'bg-teal-600/20 text-teal-400'
  },
  {
    id: 'aud-14',
    author: '@jcklnmwihaki',
    time: '4 weeks ago',
    content: "This was indeed a masterpiece. Be blessed ❤️.",
    source: 'youtube',
    likes: 2,
    initial: 'J',
    avatarColor: 'bg-fuchsia-600/20 text-fuchsia-400'
  },
  {
    id: 'aud-15',
    author: '@gavinbrodie8',
    time: '3 weeks ago',
    content: "This is one of my favorite Bible animations vids yet",
    source: 'youtube',
    likes: 1,
    initial: 'G',
    avatarColor: 'bg-pink-600/20 text-pink-400'
  },
  {
    id: 'aud-16',
    author: '@Afrithrivecapital',
    time: '3 weeks ago',
    content: "best thing I ❤️ 🩹 have watched all day",
    source: 'youtube',
    likes: 3,
    initial: 'A',
    avatarColor: 'bg-sky-600/20 text-sky-400'
  },
  {
    id: 'aud-17',
    author: '@criseichenlaub6527',
    time: '2 weeks ago',
    content: "This video is beautiful.",
    source: 'youtube',
    likes: 1,
    initial: 'C',
    avatarColor: 'bg-slate-600/20 text-slate-400'
  }
];

export default function ClientRemarks() {
  const [activeTab, setActiveTab] = useState<'clients' | 'audience'>('clients');

  return (
    <section id="remarks" className="relative bg-black py-32 md:py-48 px-6 md:px-12 border-b border-neutral-900/40 overflow-hidden">
      
      {/* Absolute Ambient Blurs */}
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-red-600/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-neutral-900/[0.4] rounded-full blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="flex items-center space-x-2.5 font-mono text-[10px] tracking-wider text-red-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>Testimonial matrix</span>
          </div>
          <h2 className="font-sans text-2xl md:text-4xl font-black tracking-tight text-neutral-300">
            Client remarks &amp; reviews
          </h2>
          <p className="font-sans text-xs text-neutral-500 max-w-md">
            Unfiltered feedback from the premium creators we build for, and the global audience that watches.
          </p>
        </div>

        {/* Tab Selection Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-neutral-900/60 border border-neutral-800/80 rounded-full relative z-0">
            <button
              onClick={() => setActiveTab('clients')}
              className={`relative px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-wider rounded-full transition-colors duration-300 focus:outline-none ${
                activeTab === 'clients' ? 'text-black font-extrabold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'clients' && (
                <motion.div
                  layoutId="activeRemarksTabGlow"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Professional Clients</span>
            </button>
            <button
              onClick={() => setActiveTab('audience')}
              className={`relative px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-wider rounded-full transition-colors duration-300 focus:outline-none ${
                activeTab === 'audience' ? 'text-black font-extrabold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {activeTab === 'audience' && (
                <motion.div
                  layoutId="activeRemarksTabGlow"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Audience &amp; Community</span>
            </button>
          </div>
        </div>

        {/* Animated Container */}
        <AnimatePresence mode="wait">
          {activeTab === 'clients' ? (
            <motion.div
              key="clients-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {REVIEWS.map((review, idx) => (
                <div
                  key={review.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-neutral-900 bg-neutral-950/40 p-8 hover:border-neutral-800 hover:bg-neutral-950/90 hover:shadow-[0_10px_30px_rgba(255,255,255,0.01)] transition-all duration-300"
                >
                  <div className="absolute top-0 right-10 w-24 h-24 bg-red-500/[0.01] rounded-full blur-2xl group-hover:bg-red-500/[0.03] transition-all duration-300" />
                  
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                    ))}
                    <span className="font-mono text-[9px] text-neutral-600 tracking-wider ml-2">// Verified Contract</span>
                  </div>

                  {/* Comment */}
                  <p className="font-sans text-sm text-neutral-200 leading-relaxed font-normal mb-8 group-hover:text-white transition-colors">
                    &ldquo;{review.quote}&rdquo;
                  </p>

                  {/* Author metadata */}
                  <div className="flex items-center space-x-4 pt-6 border-t border-neutral-900/60 mt-auto">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${review.avatarColor}`}>
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-bold text-white tracking-wide">
                        {review.author}
                      </h4>
                      <p className="font-sans text-[11px] text-neutral-500 mt-0.5">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="audience-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
            >
              {AUDIENCE_REMARKS.map((item) => (
                <div
                  key={item.id}
                  className={`break-inside-avoid relative flex flex-col justify-between rounded-xl border border-neutral-900 bg-neutral-950/20 p-6 transition-all duration-300 ${
                    item.source === 'chat' 
                      ? 'bg-gradient-to-br from-neutral-950/60 to-neutral-900/40 border-neutral-800/80 hover:border-neutral-700' 
                      : 'hover:border-neutral-850 hover:bg-neutral-950/50'
                  }`}
                >
                  {/* Top source/metadata line */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {item.source === 'youtube' ? (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600/10">
                          <Youtube className="h-3 w-3 text-red-500" />
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800">
                          <MessageCircle className="h-3 w-3 text-neutral-400" />
                        </div>
                      )}
                      <span className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase">
                        {item.source === 'youtube' ? 'YouTube Comment' : 'Direct Message'}
                      </span>
                    </div>
                    <span className="font-sans text-[10px] text-neutral-600">{item.time}</span>
                  </div>

                  {/* Comment Bubble style or comment content */}
                  {item.source === 'chat' ? (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {/* Client/Sender Message */}
                        <div className={`relative rounded-2xl bg-neutral-900/95 px-4 py-3 border border-neutral-800/50 ${item.reply ? 'mr-6' : ''}`}>
                          <p className="font-sans text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal italic">
                            &ldquo;{item.content}&rdquo;
                          </p>
                          
                          {/* DM Reactions overlapping bottom border for single message */}
                          {item.reactions && !item.reply && (
                            <div className="absolute -bottom-2.5 right-4 flex items-center space-x-1 px-1.5 py-0.5 rounded-full bg-neutral-950 border border-neutral-850 shadow-md">
                              {item.reactions.map((react, rIdx) => (
                                <span key={rIdx} className="text-xs select-none">{react}</span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* T-Studios Response (Reply) */}
                        {item.reply && (
                          <div className="relative rounded-2xl bg-red-950/20 px-4 py-3 border border-red-900/30 ml-6">
                            <p className="font-sans text-xs sm:text-sm text-red-200 leading-relaxed font-normal italic">
                              &ldquo;{item.reply}&rdquo;
                            </p>
                            
                            {/* DM Reactions overlapping bottom border for replied threads */}
                            {item.reactions && (
                              <div className="absolute -bottom-2.5 right-4 flex items-center space-x-1 px-1.5 py-0.5 rounded-full bg-neutral-950 border border-neutral-800 shadow-md">
                                {item.reactions.map((react, rIdx) => (
                                  <span key={rIdx} className="text-xs select-none">{react}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* DM sender metadata */}
                      <div className="flex items-center space-x-2.5 pt-2 pl-1">
                        <div className="h-5 w-5 rounded-full bg-neutral-800 flex items-center justify-center text-[8px] font-mono font-bold text-neutral-400">
                          DM
                        </div>
                        <span className="font-sans text-[11px] text-neutral-400 font-medium">
                          {item.reply ? `${item.author} (Epoch Times)` : 'Collaborative Creator'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Main comment text */}
                      <p className="font-sans text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal mb-5">
                        &ldquo;{item.content}&rdquo;
                      </p>

                      {/* Commenter profile info & Like button */}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-900/50">
                        <div className="flex items-center space-x-3">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-full font-sans text-[10px] font-bold ${item.avatarColor}`}>
                            {item.initial}
                          </div>
                          <span className="font-sans text-[11px] text-neutral-400 font-medium tracking-wide">
                            {item.author}
                          </span>
                        </div>

                        {item.likes && (
                          <div className="flex items-center space-x-1.5 text-neutral-500">
                            <ThumbsUp className="h-3 w-3 text-neutral-600" />
                            <span className="font-sans text-[10px] text-neutral-500">{item.likes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
