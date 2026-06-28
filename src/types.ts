/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'Documentary' | 'YouTube' | 'Podcast' | 'Events' | 'Intros' | 'Campaigns' | 'Music Video' | 'Commercial';
  format: '16:9 FORMAT' | '9:16 FORMAT';
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  client: string;
  duration: string;
  releaseYear: string;
  process?: string[];
  results?: string;
  editor?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  lessonsCount: number;
  totalDuration: string;
  studentsCount: number;
  lessons: Lesson[];
  syllabus: string[];
  skillsAcquired: string[];
}

export interface ProjectInquiry {
  id: string;
  name: string;
  email: string;
  source: string; // "Friend Referral", "Instagram", "Facebook", "Speaking", "Podcast", "Other"
  services: string[]; // "Documentary", "YouTube Edits", "Podcast Edits", "Events", "Trailers", "Campaigns"
  startDate: string;
  businessDesc: string;
  website?: string;
  successMeasure?: string;
  deadline: string;
  budget: string;
  status: 'New' | 'Contacted' | 'Booked' | 'Completed';
  createdAt: string;
}

export interface CourseBooking {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentEmail: string;
  bookingDate: string;
  preferredTimeSlot: string;
  experienceLevel: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ClientRemark {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
