/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ArrowLeft, CheckCircle, Clock, BookOpen, GraduationCap, Calendar, Zap, FastForward } from 'lucide-react';
import { Course, Lesson } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { getYouTubeEmbedUrl } from '../utils';

interface CoursePlayerProps {
  course: Course;
  onBackToCatalog: () => void;
  onBook1on1: (courseTitle: string) => void;
}

export default function CoursePlayer({ course, onBackToCatalog, onBook1on1 }: CoursePlayerProps) {
  const [activeLessonId, setActiveLessonId] = useState<string>(course.lessons[0].id);
  const activeLesson = course.lessons.find((l) => l.id === activeLessonId) || course.lessons[0];
  const ytEmbedUrl = getYouTubeEmbedUrl(activeLesson.videoUrl);

  // Video States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'details' | 'skills' | 'mentor'>('details');

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Sync state when lesson changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeLessonId]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => console.log('Autoplay blocked:', err));
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      // Auto-mark lesson as completed when passing 90%
      if (videoRef.current.duration && videoRef.current.currentTime / videoRef.current.duration > 0.9) {
        if (!completedLessonIds.includes(activeLessonId)) {
          setCompletedLessonIds([...completedLessonIds, activeLessonId]);
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const nextIndex = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen().catch((err) => console.log(err));
      }
    }
  };

  const formatTime = (timeInSecs: number) => {
    if (isNaN(timeInSecs)) return '00:00';
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2500) as unknown as number;
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) window.clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  // Compute progress percent
  const progressPercent = Math.round((completedLessonIds.length / course.lessons.length) * 100);

  return (
    <div className="bg-neutral-950 text-white min-h-screen py-12 px-6 md:px-12 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl">
        
        {/* Course LMS Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-neutral-900 pb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToCatalog}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-neutral-800 hover:border-white hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Academy Classroom &bull; {course.level} Series
              </span>
              <h1 className="font-sans text-xl font-bold tracking-tight md:text-2xl text-white">
                Module {course.id.split('-').pop()}
              </h1>
            </div>
          </div>

          {/* Student Progress Bar */}
          <div className="flex items-center space-x-4 bg-neutral-900 border border-neutral-800/60 rounded-xl px-4 py-3 min-w-[240px]">
            <GraduationCap className="h-6 w-6 text-white" />
            <div className="flex-grow">
              <div className="flex justify-between font-mono text-[9px] text-neutral-400 mb-1">
                <span>CURRICULUM PROGRESS</span>
                <span className="text-white font-bold">{progressPercent}% DONE</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* LMS Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Content Stage: Video & Tabs */}
          <div className="lg:col-span-8">
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className="group relative overflow-hidden rounded-xl border border-neutral-900 bg-black aspect-video shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            >
              {/* YouTube Iframe or Active Video Stream */}
              {ytEmbedUrl ? (
                isPlaying ? (
                  <iframe
                    src={ytEmbedUrl}
                    className="h-full w-full border-0 object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div 
                    onClick={() => setIsPlaying(true)}
                    className="relative h-full w-full cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
                      <span className="font-sans text-xs text-neutral-500">Lesson Video Stream Ready</span>
                    </div>
                    {/* Big Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] hover:bg-black/40 transition-all duration-300">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/80 text-white hover:scale-110 hover:border-white hover:text-white transition-all duration-300">
                        <Play className="h-6 w-6 fill-white text-white translate-x-[1px]" />
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={activeLesson.videoUrl}
                    referrerPolicy="no-referrer"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onClick={togglePlay}
                    className="h-full w-full object-cover cursor-pointer"
                  />

                  {/* Big Play Overlay */}
                  {!isPlaying && (
                    <div 
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] hover:bg-black/40 cursor-pointer transition-all duration-300"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/80 text-white hover:scale-110 hover:border-white hover:text-white transition-all duration-300">
                        <Play className="h-6 w-6 fill-white text-white translate-x-[1px]" />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Header tags */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <div className="rounded bg-black/80 border border-neutral-800/80 px-2.5 py-1.5 font-mono text-[9px] tracking-wider text-neutral-300">
                  LESSON {activeLesson.order}
                </div>
              </div>

              {/* Custom controls overlay - Only show for native HTML5 video */}
              {!ytEmbedUrl && (
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-5 transition-all duration-300 ${
                  showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}>
                  {/* Timeline slider */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="font-mono text-[10px] text-neutral-400">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-neutral-800 accent-white hover:h-1.5 transition-all outline-none"
                    />
                    <span className="font-mono text-[10px] text-neutral-400">{formatTime(duration)}</span>
                  </div>

                  {/* Bottom tool section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={togglePlay}
                        className="text-white hover:text-neutral-300 transition-colors focus:outline-none"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
                      </button>

                      {/* Mute section */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={toggleMute}
                          className="text-neutral-400 hover:text-white transition-colors focus:outline-none"
                        >
                          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        </button>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-14 h-0.5 cursor-pointer appearance-none bg-neutral-800 accent-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Speed Selector */}
                      <button
                        onClick={handleSpeedChange}
                        className="font-mono text-[10px] bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white rounded px-2.5 py-1 flex items-center space-x-1.5"
                      >
                        <FastForward className="h-3 w-3 text-white" />
                        <span>{playbackSpeed}X SPEED</span>
                      </button>

                      {/* Fullscreen */}
                      <button
                        onClick={handleFullscreen}
                        className="text-neutral-400 hover:text-white transition-colors focus:outline-none"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Tabs Section */}
            <div className="mt-8 rounded-xl border border-neutral-900 bg-neutral-950 p-6 md:p-8">
              <div className="flex items-center space-x-6 border-b border-neutral-900 pb-4 mb-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`font-mono text-xs tracking-wider uppercase pb-2 border-b-2 transition-all duration-300 ${
                    activeTab === 'details'
                      ? 'border-white text-white'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Chapter Details
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`font-mono text-xs tracking-wider uppercase pb-2 border-b-2 transition-all duration-300 ${
                    activeTab === 'skills'
                      ? 'border-white text-white'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Skills Acquired
                </button>
                <button
                  onClick={() => setActiveTab('mentor')}
                  className={`font-mono text-xs tracking-wider uppercase pb-2 border-b-2 transition-all duration-300 ${
                    activeTab === 'mentor'
                      ? 'border-white text-white'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  Book 1-on-1 Review
                </button>
              </div>

              {/* Tab Contents */}
              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-sans text-base font-bold text-white mb-2">
                      Lesson {activeLesson.order}
                    </h3>
                    <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                      {activeLesson.description}
                    </p>
                    <div className="mt-6 flex items-center space-x-3 text-xs font-mono text-neutral-500 bg-neutral-900 p-3 rounded">
                      <Clock className="h-4 w-4 text-neutral-450" />
                      <span>ESTIMATED DURATION: {activeLesson.duration} MIN</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'skills' && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {course.skillsAcquired.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-neutral-900 p-4 rounded-lg border border-neutral-900">
                        <CheckCircle className="h-5 w-5 text-white shrink-0" />
                        <span className="font-sans text-xs text-neutral-300">{skill}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'mentor' && (
                  <motion.div
                    key="mentor"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center py-6"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="font-sans text-base font-bold text-white mb-2">
                      Need direct critical critique on your project?
                    </h3>
                    <p className="max-w-md mx-auto font-sans text-sm text-neutral-400 leading-relaxed mb-6">
                      Schedule a 45-minute Live Timeline Critique or project sync directly with T-Studios. Get timeline pacing review and color audit feedback.
                    </p>
                    <button
                      onClick={() => onBook1on1(course.title)}
                      className="border border-neutral-700 bg-transparent text-white font-sans text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                      Lock in Critique Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column Sidebar: Curriculum Chapters */}
          <div className="lg:col-span-4 rounded-xl border border-neutral-900 bg-neutral-950 p-6">
            <div className="flex items-center justify-between mb-6 border-b border-neutral-900 pb-4">
              <span className="font-mono text-xs font-semibold text-white tracking-wider uppercase">
                Course chapters
              </span>
              <span className="font-mono text-[10px] text-neutral-500">
                {course.lessons.length} LESSONS
              </span>
            </div>

            <div className="space-y-3">
              {course.lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isCompleted = completedLessonIds.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonId(lesson.id)}
                    className={`group flex w-full items-start space-x-3 rounded-lg p-3 text-left transition-all duration-200 ${
                      isActive 
                        ? 'bg-neutral-900 border border-neutral-800' 
                        : 'border border-transparent bg-transparent hover:bg-neutral-900/40'
                    }`}
                  >
                    {/* Chapter Order Badge */}
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold ${
                      isActive
                        ? 'bg-white text-black'
                        : isCompleted
                        ? 'bg-neutral-800 text-white'
                        : 'bg-neutral-900 text-neutral-500'
                    }`}>
                      {lesson.order}
                    </div>

                    <div className="flex-grow min-w-0">
                      <span className={`font-sans text-xs font-medium block truncate ${
                        isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                      }`}>
                        Lesson {lesson.order}
                      </span>
                      <div className="flex items-center space-x-2 mt-1.5 font-mono text-[9px] text-neutral-600">
                        <Clock className="h-3 w-3 text-neutral-700" />
                        <span>{lesson.duration} MIN</span>
                        {isCompleted && (
                          <span className="text-white font-bold ml-auto">[ COMPLETED ]</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-900 text-center">
              <span className="font-mono text-[9px] text-neutral-600 uppercase tracking-widest block mb-1">Academy Support</span>
              <span className="font-sans text-xs font-semibold text-neutral-400 block">T-Studios CRM CONNECT</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
