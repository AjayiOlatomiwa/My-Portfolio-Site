/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ProjectInquiry, CourseBooking } from '../types';
import { 
  Users, DollarSign, Calendar, TrendingUp, Sparkles, Filter, CheckCircle2, 
  XCircle, Clock, Check, RefreshCw, AlertCircle, FileText, Send 
} from 'lucide-react';

interface AdminDashboardProps {
  inquiries: ProjectInquiry[];
  bookings: CourseBooking[];
  onUpdateInquiryStatus: (id: string, nextStatus: 'New' | 'Contacted' | 'Booked' | 'Completed') => void;
  onUpdateBookingStatus: (id: string, nextStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => void;
  onSeedSampleData: () => void;
}

export default function AdminDashboard({
  inquiries,
  bookings,
  onUpdateInquiryStatus,
  onUpdateBookingStatus,
  onSeedSampleData
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'academy' | 'analytics'>('inquiries');
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);

  const selectedInquiry = inquiries.find((i) => i.id === selectedInquiryId);

  // Stats Calculations
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const activeBookingsCount = inquiries.filter((i) => i.status === 'Booked').length;
  
  // Calculate est revenue
  const estRevenue = inquiries.reduce((sum, item) => {
    if (item.status === 'Booked' || item.status === 'Completed') {
      let bVal = 0;
      if (item.budget === '$500 - $1k') bVal = 750;
      else if (item.budget === '$1k - $5k') bVal = 3000;
      else if (item.budget === '$5k - $10k') bVal = 7500;
      else if (item.budget === '$10k +') bVal = 12000;
      return sum + bVal;
    }
    return sum;
  }, 0);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 text-white">
      {/* Dashboard Heading Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-900 pb-8 mb-10">
        <div>
          <div className="flex items-center space-x-2 font-mono text-[10px] text-neutral-450 tracking-widest mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>T-Studios post suite admin portal</span>
          </div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight md:text-4xl">
            Post &amp; academy CRM
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onSeedSampleData}
            className="flex items-center space-x-2 rounded border border-neutral-800 bg-neutral-950 px-4 py-2.5 font-mono text-[10px] tracking-widest text-neutral-400 hover:border-neutral-700 hover:text-white transition-all duration-200"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Seed live test bookings</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="rounded-xl border border-neutral-900 bg-neutral-950/40 p-6">
          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 tracking-widest mb-3">
            <span>Gross project value</span>
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <div className="font-sans text-xl font-bold text-white">${estRevenue.toLocaleString()} USD</div>
          <div className="mt-2 flex items-center space-x-1 font-mono text-[9px] text-neutral-600">
            <TrendingUp className="h-3 w-3 text-emerald-500" />
            <span>Based on booked project averages</span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-900 bg-neutral-950/40 p-6">
          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 tracking-widest mb-3">
            <span>Pending inquiries</span>
            <Clock className="h-4 w-4 text-white" />
          </div>
          <div className="font-sans text-xl font-bold text-white">{newInquiriesCount} incoming</div>
          <div className="mt-2 flex items-center space-x-1 font-mono text-[9px] text-neutral-600">
            <span>Requires review within 24h</span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-900 bg-neutral-950/40 p-6">
          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 tracking-widest mb-3">
            <span>Active post-pipelines</span>
            <CheckCircle2 className="h-4 w-4 text-white" />
          </div>
          <div className="font-sans text-xl font-bold text-white">{activeBookingsCount} deals</div>
          <div className="mt-2 flex items-center space-x-1 font-mono text-[9px] text-neutral-600">
            <span>In production or feedback loop</span>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-900 bg-neutral-950/40 p-6">
          <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 tracking-widest mb-3">
            <span>Course book sessions</span>
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <div className="font-sans text-xl font-bold text-white">{bookings.length} logs</div>
          <div className="mt-2 flex items-center space-x-1 font-mono text-[9px] text-neutral-600">
            <span>1-on-1 curriculum critique sessions</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: CRM Tabs and Grid tables */}
        <div className="lg:col-span-8 space-y-6">
          {/* Workspace Menu Bar Selector */}
          <div className="flex items-center space-x-4 border-b border-neutral-900 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`font-mono text-xs tracking-wider pb-2 border-b-2 transition-all duration-300 ${
                activeTab === 'inquiries'
                  ? 'border-white text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Project inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('academy')}
              className={`font-mono text-xs tracking-wider pb-2 border-b-2 transition-all duration-300 ${
                activeTab === 'academy'
                  ? 'border-white text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              1-on-1 academy bookings ({bookings.length})
            </button>
          </div>

          {/* Render Active Inquiries Pipeline */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              {inquiries.length === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-900 py-16 text-center text-neutral-500 font-sans text-sm">
                  <FileText className="h-10 w-10 text-neutral-700 mx-auto mb-4" />
                  <span>No inquiries registered yet. Click &apos;Seed Live Test Bookings&apos; to view!</span>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-neutral-900 bg-neutral-950/20">
                  <table className="w-full text-left font-sans text-xs">
                    <thead className="bg-neutral-950 font-mono text-[9px] tracking-widest text-neutral-500 border-b border-neutral-900">
                      <tr>
                        <th className="p-4">Client name</th>
                        <th className="p-4">Services requested</th>
                        <th className="p-4">Budget tier</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-950">
                      {inquiries.map((inq) => (
                        <tr 
                          key={inq.id}
                          onClick={() => setSelectedInquiryId(inq.id)}
                          className={`cursor-pointer transition-colors ${
                            selectedInquiryId === inq.id ? 'bg-neutral-900/60' : 'hover:bg-neutral-900/20'
                          }`}
                        >
                          <td className="p-4 font-semibold text-white">
                            {inq.name}
                            <span className="block font-mono text-[9px] text-neutral-500 font-normal mt-0.5">{inq.email}</span>
                          </td>
                          <td className="p-4 text-neutral-300">
                            <div className="flex flex-wrap gap-1">
                              {inq.services.map((s, idx) => (
                                <span key={idx} className="bg-neutral-900 text-neutral-400 px-1.5 py-0.5 rounded text-[9px] font-mono">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 font-mono font-medium text-neutral-300">{inq.budget}</td>
                          <td className="p-4">
                            <span className={`inline-block px-2 py-0.5 rounded font-mono text-[9px] tracking-wider ${
                              inq.status === 'New' 
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                : inq.status === 'Contacted'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : inq.status === 'Booked'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}>
                              {inq.status}
                            </span>
                          </td>
                          <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <select
                               value={inq.status}
                               onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                               className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 font-mono text-[9px] text-neutral-300 focus:outline-none focus:border-white"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Booked">Booked</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Render Active Academy Booking Logs */}
          {activeTab === 'academy' && (
            <div className="space-y-4">
              {bookings.length === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-900 py-16 text-center text-neutral-500 font-sans text-sm">
                  <Calendar className="h-10 w-10 text-neutral-700 mx-auto mb-4" />
                  <span>No 1-on-1 critique bookings filed. Student registrations will log here instantly!</span>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-neutral-900 bg-neutral-950/20">
                  <table className="w-full text-left font-sans text-xs">
                    <thead className="bg-neutral-950 font-mono text-[9px] tracking-widest text-neutral-500 uppercase border-b border-neutral-900">
                      <tr>
                        <th className="p-4">Student Name</th>
                        <th className="p-4">Course Program</th>
                        <th className="p-4">Target Slot</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-950">
                      {bookings.map((book) => (
                        <tr key={book.id} className="hover:bg-neutral-900/20">
                          <td className="p-4 font-semibold text-white">
                            {book.studentName}
                            <span className="block font-mono text-[9px] text-neutral-500 font-normal mt-0.5">{book.studentEmail}</span>
                          </td>
                          <td className="p-4 text-neutral-300 font-medium">
                            {book.courseTitle}
                            <span className="block font-mono text-[9px] text-neutral-600 mt-0.5">Exp level: {book.experienceLevel}</span>
                          </td>
                          <td className="p-4 font-mono text-neutral-400">
                            {book.bookingDate}
                            <span className="block text-[9px] text-neutral-600 mt-0.5">{book.preferredTimeSlot}</span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2 py-0.5 rounded font-mono text-[9px] tracking-wider ${
                              book.status === 'Pending' 
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                                : book.status === 'Confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}>
                              {book.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <select
                              value={book.status}
                              onChange={(e) => onUpdateBookingStatus(book.id, e.target.value as any)}
                              className="bg-neutral-900 border border-neutral-800 rounded px-2 py-1 font-mono text-[9px] text-neutral-300 focus:outline-none focus:border-white"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirm</option>
                              <option value="Completed">Complete</option>
                              <option value="Cancelled">Cancel</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side Column: Detailed CRM Inquiry Audit Panel */}
        <div className="lg:col-span-4 rounded-xl border border-neutral-900 bg-neutral-950 p-6">
          <div className="border-b border-neutral-900 pb-4 mb-6 flex items-center justify-between font-mono text-xs text-white">
            <span className="font-semibold">Client inquiry brief</span>
            <span className="text-neutral-500">Audit panel</span>
          </div>

          {selectedInquiry ? (
            <div className="space-y-6">
              <div>
                <span className="font-mono text-[9px] text-neutral-500 block mb-1">Requester</span>
                <span className="text-white font-sans text-base font-bold block">{selectedInquiry.name}</span>
                <span className="font-mono text-xs text-neutral-400 block">{selectedInquiry.email}</span>
                {selectedInquiry.website && (
                  <a 
                    href={selectedInquiry.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="font-mono text-[10px] text-white flex items-center space-x-1 hover:underline mt-2"
                  >
                    <span>Visit website</span>
                    <FileText className="h-3 w-3 shrink-0" />
                  </a>
                )}
              </div>

              <div className="border-t border-neutral-900 pt-4">
                <span className="font-mono text-[9px] text-neutral-500 block mb-2">Footage details / business goal</span>
                <p className="font-sans text-xs text-neutral-300 leading-relaxed bg-neutral-900/40 p-3 rounded border border-neutral-900">
                  {selectedInquiry.businessDesc}
                </p>
              </div>

              {selectedInquiry.successMeasure && (
                <div className="border-t border-neutral-900 pt-4">
                  <span className="font-mono text-[9px] text-neutral-500 block mb-2">Metrics of success</span>
                  <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                    {selectedInquiry.successMeasure}
                  </p>
                </div>
              )}

              <div className="border-t border-neutral-900 pt-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-mono text-[9px] text-neutral-500 block mb-1">Deadline plan</span>
                  <span className="text-white font-medium">{selectedInquiry.deadline}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-neutral-500 block mb-1">Target start</span>
                  <span className="text-white font-medium">{selectedInquiry.startDate}</span>
                </div>
              </div>

              <div className="border-t border-neutral-900 pt-6">
                <span className="font-mono text-[9px] text-neutral-500 block mb-3">Production status</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onUpdateInquiryStatus(selectedInquiry.id, 'Booked')}
                    className="rounded bg-white hover:bg-neutral-200 px-3 py-2 text-center font-mono text-[9px] font-bold tracking-wider text-black transition-colors"
                  >
                    Accept deal
                  </button>
                  <button
                    onClick={() => onUpdateInquiryStatus(selectedInquiry.id, 'Completed')}
                    className="rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-3 py-2 text-center font-mono text-[9px] font-bold tracking-wider text-neutral-400 transition-colors"
                  >
                    Finish project
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-neutral-500 font-sans text-sm">
              <AlertCircle className="h-8 w-8 text-neutral-700 mx-auto mb-3" />
              <span>Select an inquiry from the pipeline log table to audit and analyze details.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
