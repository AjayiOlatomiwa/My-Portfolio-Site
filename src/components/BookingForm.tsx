/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { ProjectInquiry } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onBookingSubmitted: (inquiry: ProjectInquiry) => void;
}

export default function BookingForm({
  isOpen,
  onClose,
  preselectedService = '',
  onBookingSubmitted
}: BookingFormProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [customSource, setCustomSource] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customService, setCustomService] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [customBudget, setCustomBudget] = useState<string>('');
  const [businessDesc, setBusinessDesc] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  
  const [validationError, setValidationError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Synchronize preselectedService whenever it changes or form opens
  useEffect(() => {
    if (isOpen) {
      if (preselectedService) {
        setSelectedServices([preselectedService]);
      } else {
        setSelectedServices([]);
      }
    }
  }, [isOpen, preselectedService]);

  if (!isOpen) return null;

  const sourcesList = ["Friend Referral", "Instagram", "Facebook", "Speaking", "Podcast", "Other"];
  const servicesList = [
    "Documentary Edit",
    "Event Campaign (Videos)",
    "VSL",
    "YouTube Edit",
    "Event Promo",
    "Book Launch Campaign",
    "Podcast Intro Edit",
    "Other"
  ];
  const budgetList = ["$500 - $1k", "$1k - $3k", "$3k - $5k", "$5k - $10k", "$10k +", "Other"];

  const handleServiceToggle = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Strict validation
    if (!name.trim()) {
      setValidationError('Please specify your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please specify a valid email address.');
      return;
    }
    if (!source) {
      setValidationError('Please select where you heard about us.');
      return;
    }
    if (source === 'Other' && !customSource.trim()) {
      setValidationError('Please specify how you heard about us.');
      return;
    }
    if (selectedServices.length === 0) {
      setValidationError('Please select at least one service of interest.');
      return;
    }
    if (selectedServices.includes('Other') && !customService.trim()) {
      setValidationError('Please specify the service you are interested in.');
      return;
    }
    if (!budget) {
      setValidationError('Please select your project budget tier.');
      return;
    }
    if (budget === 'Other' && !customBudget.trim()) {
      setValidationError('Please specify your target budget.');
      return;
    }
    if (!startDate.trim()) {
      setValidationError('Please specify when you would like to get started.');
      return;
    }
    if (!deadline.trim()) {
      setValidationError('Please specify your target project deadline.');
      return;
    }
    if (!businessDesc.trim()) {
      setValidationError('Please briefly describe your business or project scope.');
      return;
    }

    // Resolve "Other" entries
    const finalSource = source === 'Other' ? `Other: ${customSource}` : source;
    const finalServices = selectedServices.map(s => s === 'Other' ? `Other: ${customService}` : s);
    const finalBudget = budget === 'Other' ? `Custom: ${customBudget}` : budget;

    const newInquiry: ProjectInquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      source: finalSource,
      services: finalServices,
      startDate,
      deadline,
      budget: finalBudget,
      businessDesc,
      website: website || undefined,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    onBookingSubmitted(newInquiry);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setSource('');
    setCustomSource('');
    setSelectedServices([]);
    setCustomService('');
    setStartDate('');
    setDeadline('');
    setBudget('');
    setCustomBudget('');
    setBusinessDesc('');
    setWebsite('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black w-full h-full text-white">
      {/* Absolute Floating Close Button */}
      <button
        onClick={resetForm}
        aria-label="Close"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[60] flex items-center space-x-2 border border-neutral-800 bg-black px-4 py-2 text-neutral-400 hover:border-white hover:text-white hover:bg-neutral-900 transition-all focus:outline-none"
      >
        <span className="font-mono text-[10px] tracking-[0.2em]">CLOSE</span>
        <X className="h-4 w-4" />
      </button>

      {/* Grid Layout (Full width / height split) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen w-full bg-black">
        
        {/* Left Column (Sticky Title Panel) */}
        <div className="lg:col-span-5 bg-black lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between px-6 md:px-16 py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-neutral-900">
          <div className="hidden lg:block">
            {/* Ambient indicator */}
            <div className="flex items-center space-x-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[9px] text-neutral-600 tracking-[0.2em]">// ACTIVE SESSION</span>
            </div>
          </div>

          <div className="my-auto py-8 flex flex-col items-start">
            {/* Highly pronounced, close-set Go Back button */}
            <button 
              onClick={resetForm}
              className="group flex items-center space-x-4 text-neutral-400 hover:text-white transition-all duration-300 focus:outline-none mb-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-850 bg-neutral-950 text-neutral-400 group-hover:border-neutral-500 group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-xl">
                <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1.5 transition-transform duration-300" />
              </div>
              <span className="font-sans text-xs tracking-[0.25em] font-extrabold uppercase text-neutral-300 group-hover:text-white transition-colors">Go back</span>
            </button>

            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-6">
              START A<br />PROJECT
            </h1>
            <p className="text-neutral-400 text-sm md:text-base font-sans font-normal leading-relaxed max-w-sm">
              To embark on this exciting journey, please take a moment to share a few essential details with us.
            </p>
          </div>

          <div className="hidden lg:block">
            <span className="font-mono text-[9px] text-neutral-600 tracking-[0.3em] block">
              // T-Studios direct brief engine
            </span>
          </div>
        </div>

        {/* Right Column (Scrollable Form Panel) */}
        <div className="lg:col-span-7 bg-black px-6 md:px-16 py-12 md:py-20 lg:py-24 flex flex-col justify-center">
          <div className="max-w-2xl w-full mx-auto">
            {/* Mobile Only: Back link removed since we have the prominent header Go back */}
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Validation Error Banner */}
                  {validationError && (
                    <div className="flex items-center space-x-3 rounded-none border border-red-900 bg-red-950/20 p-4 text-xs text-red-400 font-sans">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                    
                    {/* 1. Name */}
                    <div className="space-y-2">
                      <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm md:text-base text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* 2. Your Email Address */}
                    <div className="space-y-2">
                      <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                        Your email address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm md:text-base text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* 3. Where did you hear about us? */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                          Where did you hear about us? <span className="text-red-500">*</span>
                        </label>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {sourcesList.map((src) => {
                          const isSelected = source === src;
                          return (
                            <button
                              key={src}
                              type="button"
                              onClick={() => setSource(src)}
                              className={`rounded-none border p-3.5 font-sans text-xs md:text-sm text-center transition-all duration-200 ${
                                isSelected
                                  ? 'border-white bg-white text-black font-semibold'
                                  : 'border-neutral-850 bg-black text-neutral-400 hover:border-neutral-700 hover:text-white'
                              }`}
                            >
                              {src}
                            </button>
                          );
                        })}
                      </div>

                      {/* Interactive Custom Source Field */}
                      <AnimatePresence>
                        {source === 'Other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2 overflow-hidden"
                          >
                            <input
                              type="text"
                              required
                              value={customSource}
                              onChange={(e) => setCustomSource(e.target.value)}
                              placeholder="Please specify where you heard about us..."
                              className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 4. Which of our services are you interested in? */}
                    <div className="space-y-3">
                      <div>
                        <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                          Which of our services are you interested in? <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] md:text-xs font-sans text-neutral-500 block mt-1">
                          Please select more than one if applicable
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {servicesList.map((srv) => {
                          const isSelected = selectedServices.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => handleServiceToggle(srv)}
                              className={`rounded-none border p-3.5 font-sans text-xs md:text-sm text-center transition-all duration-200 ${
                                isSelected
                                  ? 'border-white bg-white text-black font-semibold'
                                  : 'border-neutral-850 bg-black text-neutral-400 hover:border-neutral-700 hover:text-white'
                              }`}
                            >
                              {srv}
                            </button>
                          );
                        })}
                      </div>

                      {/* Interactive Custom Service Field */}
                      <AnimatePresence>
                        {selectedServices.includes('Other') && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2 overflow-hidden"
                          >
                            <input
                              type="text"
                              required
                              value={customService}
                              onChange={(e) => setCustomService(e.target.value)}
                              placeholder="Please specify custom service of interest..."
                              className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 5. Budget Range Selection */}
                    <div className="space-y-3">
                      <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                        Target budget range <span className="text-red-500">*</span>
                      </label>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {budgetList.map((tier) => {
                          const isSelected = budget === tier;
                          return (
                            <button
                              key={tier}
                              type="button"
                              onClick={() => setBudget(tier)}
                              className={`rounded-none border p-3.5 font-sans text-xs md:text-sm text-center transition-all duration-200 ${
                                isSelected
                                  ? 'border-white bg-white text-black font-semibold'
                                  : 'border-neutral-850 bg-black text-neutral-400 hover:border-neutral-700 hover:text-white'
                              }`}
                            >
                              {tier}
                            </button>
                          );
                        })}
                      </div>

                      {/* Interactive Custom Budget Field */}
                      <AnimatePresence>
                        {budget === 'Other' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-2 overflow-hidden"
                          >
                            <input
                              type="text"
                              required
                              value={customBudget}
                              onChange={(e) => setCustomBudget(e.target.value)}
                              placeholder="Describe your budget (e.g., $15k - $20k, or fixed cap)..."
                              className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 6. When would you like to get started? */}
                    <div className="space-y-2">
                      <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                        When would you like to get started? <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="e.g. Immediately / Next month / Specific date"
                        className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm md:text-base text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* 7. Target Project Deadline */}
                    <div className="space-y-2">
                      <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                        Target project deadline <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        placeholder="e.g. By end of autumn / Within 2 weeks / Flexible"
                        className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm md:text-base text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* 8. Brief Description */}
                    <div className="space-y-2">
                      <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                        Please briefly describe your project <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        value={businessDesc}
                        onChange={(e) => setBusinessDesc(e.target.value)}
                        rows={5}
                        placeholder="Tell us about your objectives, video requirements, format details, and theme references..."
                        className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm md:text-base text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* 9. Website URL (Optional) */}
                    <div className="space-y-2">
                      <label className="block font-sans text-xs md:text-sm font-semibold tracking-wider text-neutral-300">
                        Website or media channel URL <span className="text-neutral-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="w-full rounded-none border border-neutral-800 bg-black p-4 font-sans text-sm md:text-base text-white placeholder-neutral-700 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Submit Section */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full rounded-none bg-white text-black py-4.5 px-8 font-sans text-xs md:text-sm font-extrabold uppercase tracking-[0.25em] hover:bg-neutral-200 hover:scale-[1.01] active:scale-[0.99] transition-all text-center cursor-pointer"
                      >
                        SUBMIT BRIEF
                      </button>
                    </div>

                  </form>
                </motion.div>
              ) : (
                // Super elegant Full-Screen success card representation
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="text-center py-12 md:py-20 space-y-8"
                >
                  <div className="flex justify-center">
                    <div className="relative flex h-24 w-24 items-center justify-center border border-neutral-800 bg-black text-white">
                      <CheckCircle className="h-10 w-10 text-white" />
                      <div className="absolute inset-0 border border-dashed border-neutral-700 animate-spin" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-red-500 tracking-[0.3em] block">
                      // Brief logged successfully
                    </span>
                    <h2 className="font-sans text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                      Thank you, {name}
                    </h2>
                  </div>

                  <p className="max-w-md mx-auto font-sans text-sm text-neutral-400 leading-relaxed">
                    Your brief has been registered with T-Studios. Our creative team will review the details and reach out to you at <span className="text-white font-mono">{email}</span> within 24 business hours to lock in the kick-off meeting.
                  </p>

                  <div className="border border-neutral-900 bg-black p-6 max-w-sm mx-auto font-mono text-[10px] text-neutral-500 tracking-widest space-y-2 text-left">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-red-500">Assigning producer</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ref ID:</span>
                      <span className="text-white">{Math.floor(Math.random() * 900000 + 100000)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-neutral-900">
                      <span>Est. audit:</span>
                      <span className="text-white">Under 24 hours</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={resetForm}
                      className="rounded-none border border-neutral-800 px-10 py-4 font-sans text-xs font-bold tracking-[0.2em] text-white hover:bg-neutral-900 hover:border-white transition-all"
                    >
                      CLOSE WINDOW
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </div>
  );
}
