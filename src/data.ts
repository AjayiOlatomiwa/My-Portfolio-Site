/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioProject, Course, FAQItem, ClientRemark } from './types';

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-doc-1',
    title: 'The Most Evil Man in History',
    category: 'Documentary',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/NDgqLD-OaHk?si=ROrDwzUfw2Va7KPj',
    thumbnailUrl: 'https://i.ytimg.com/vi/NDgqLD-OaHk/hqdefault.jpg',
    description: 'A Documentary Edit on Nero, The Most Evil Man in History. I was faced with the constraint, "How do you represent an historical retelling without access to clips?", and yeah, I went to the age-old technique of utilizing parallax & 2.5D techniques.\n\nI loved it as well, and the client loved it too! (Same with the viewers!)',
    client: 'Nils Glenn',
    duration: '8:15',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)',
    process: [
      'Extensive archival research and clip selection',
      'Atmospheric sound design using deep cinematic drones',
      'Advanced historical color grading for "aged" look',
      'High-velocity narrative pacing to maintain viewer retention'
    ],
    results: 'Reached over 1M views in 2 weeks with a 65% average retention rate.'
  },
  {
    id: 'proj-yt-1',
    title: 'How Christianity Changed the World',
    category: 'YouTube',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/lJGz_774b0A?si=o2-fqPjtwWuMjSDB',
    thumbnailUrl: 'https://i.ytimg.com/vi/lJGz_774b0A/hqdefault.jpg',
    description: 'An Epic Documentary Edit on The Absurdity of Christianity. And yeah, I went with the age-old technique of utilizing parallax & 2.5D techniques.\n\nI loved it as well, and the client loved it too! (same with the viewers!)',
    client: 'Nils Glenn',
    duration: '10:15',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  },
  {
    id: 'proj-evt-1',
    title: 'The Most UNDERRATED Bible Story Drawn and Explained',
    category: 'Documentary',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/tcVTMo1wMRI?si=sY4BoSLjFjjsCuGS',
    thumbnailUrl: 'https://i.ytimg.com/vi/tcVTMo1wMRI/hqdefault.jpg',
    description: "A snippet from a scene from a documentary on Jacob, for Bible Animations using their visual style.\n\nI sorta utilised scene building techniques, as opposed to traditional 2d. Incorporating 2d and Parallax as I love!\n\nIt was an interesting one.",
    client: 'Bible Animations',
    duration: '2:30',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  },
  {
    id: 'proj-trl-1',
    title: 'The 40 Roman Soldiers Who Froze Willingly',
    category: 'Documentary',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/fVU3kHoFar4?si=2IRHzai2OmrLyu9u',
    thumbnailUrl: 'https://i.ytimg.com/vi/fVU3kHoFar4/hqdefault.jpg',
    description: 'A Documentary Edit on the 40 Soldiers of Sebaste. I was faced with the constraint, "How do you represent an historical retelling without access to clips?", and yeah, I went to the age-old technique of utilizing parallax & 2.5D techniques.\n\nI loved it as well, and the client loved it too! (same with the viewers!)',
    client: 'Nils Glenn',
    duration: '4:10',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  },
  {
    id: 'proj-cmp-1',
    title: 'Launch Video for NaFFS WebApp',
    category: 'Campaigns',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/BkFsA3xfnSQ',
    thumbnailUrl: 'https://img.youtube.com/vi/BkFsA3xfnSQ/hqdefault.jpg',
    description: 'A Launch Video for NaFFS WebApp, a robust application for management of fellowships nationwide. For: National Fellowship of Foursquare Students.',
    client: 'National Fellowship of Foursquare Students',
    duration: '1:15',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  },
  {
    id: 'proj-reel-1',
    title: 'Killed to Order Book Launch Campaign',
    category: 'Campaigns',
    format: '9:16 FORMAT',
    videoUrl: 'https://youtube.com/shorts/0clsse17ulI?si=BSTITupo_BvU8yup',
    thumbnailUrl: 'https://img.youtube.com/vi/0clsse17ulI/hqdefault.jpg',
    description: 'Jan Jekielek, Senior Editor at Epoch Times called, and we answered!\n\nBook Launch Campaign for "Killed To Order", a book exposing China\'s CCP\'s dirty tricks.\n\nCinematic Storytelling, T-Studios got you.',
    client: 'Epoch Times, Jan Jekielek',
    duration: '0:45',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)',
    results: 'It attained a New York Times Bestseller in the first week of launch, thanks to our series of videos for the book launch.'
  },
  {
    id: 'proj-reel-2',
    title: 'Killed to Order Book Launch Campaign',
    category: 'Campaigns',
    format: '9:16 FORMAT',
    videoUrl: 'https://youtube.com/shorts/PJi4h4lATR8?si=5dTHq8nV4XVRXKVE',
    thumbnailUrl: 'https://img.youtube.com/vi/PJi4h4lATR8/hqdefault.jpg',
    description: 'Jan Jekielek, Senior Editor at Epoch Times called, and we answered!\n\nBook Launch Campaign for "Killed To Order", a book exposing China\'s CCP\'s dirty tricks.\n\nCinematic Storytelling, T-Studios got you.',
    client: 'Epoch Times, Jan Jekielek',
    duration: '0:50',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)',
    results: 'It attained a New York Times Bestseller in the first week of launch, thanks to our series of videos for the book launch.'
  },
  {
    id: 'proj-raj-1',
    title: "Documentary Edit on Raj Rajaratnam (Client's work)",
    category: 'Documentary',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/St_PWBGdbzM',
    thumbnailUrl: 'https://img.youtube.com/vi/St_PWBGdbzM/hqdefault.jpg',
    description: "Documentary Edit on the fall of Raj Rajaratnam, the hedge fund billionaire.\n\nA cinematic, high-impact documentary layout tracking the rise and fall of the Galleon Group founder, styled with tense pacing, sound design, and rich narrative context.",
    client: "Client's work",
    duration: '2:15',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  },
  {
    id: 'proj-reel-3',
    title: 'Docu-Style Podcast Intro Edit',
    category: 'Campaigns',
    format: '9:16 FORMAT',
    videoUrl: 'https://youtube.com/shorts/KTB9EAvW66c',
    thumbnailUrl: 'https://img.youtube.com/vi/KTB9EAvW66c/hqdefault.jpg',
    description: "We were faced with the constraint: No clips, just pictures. How do you present a podcast intro in a way that's engaging with all those constraints?\n\nThe answer? We gat you. Say no more haha.\n\nDocu-style, Parallax, 2.5D, whatever you call it, all the wayy!",
    client: 'The Deep End Podcast',
    duration: '0:30',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  },
  {
    id: 'proj-reel-4',
    title: 'Creative Biblical Social Reel',
    category: 'Campaigns',
    format: '9:16 FORMAT',
    videoUrl: 'https://youtube.com/shorts/zGnUyUfhg00',
    thumbnailUrl: 'https://img.youtube.com/vi/zGnUyUfhg00/hqdefault.jpg',
    description: 'I was faced with the constraint, "How do you represent an abstract or complex biblical reel in an engaging format?"\n\nAnd yeah, I delivered (as usual). 2.5D, Parallax, Documentary Style, whatever it\'s called, it is!',
    client: 'Nils Glenn',
    duration: '0:55',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  },
  {
    id: 'proj-yt-4',
    title: 'iHeal Speakers Profiles',
    category: 'Documentary',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/Xe27Mqqkt-k',
    thumbnailUrl: 'https://img.youtube.com/vi/Xe27Mqqkt-k/hqdefault.jpg',
    description: 'Waterlight x iHeal called, and we answered! They needed a video for the profiles of their speakers. The deadline was tight, 24hrs, and we deliverred a great piece!',
    client: 'Waterlight x iHeal',
    duration: '3:45',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  },
  {
    id: 'proj-yt-6',
    title: 'Eclipsing Glory - Official Trailer',
    category: 'Commercial',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/lm3E6LBgQa4',
    thumbnailUrl: 'https://img.youtube.com/vi/lm3E6LBgQa4/hqdefault.jpg',
    description: 'Official cinematic trailer for the Eclipsing Glory campaign.',
    client: 'Eclipsing Glory',
    duration: '4:00',
    releaseYear: '2026'
  },
  {
    id: 'proj-open-1',
    title: 'Opening Sequence for a Movie that doesn\'t exist',
    category: 'Documentary',
    format: '16:9 FORMAT',
    videoUrl: 'https://youtu.be/sOU-VmFh-2E?si=iEh3-fhfq_wmNMx2',
    thumbnailUrl: 'https://i.ytimg.com/vi/sOU-VmFh-2E/hqdefault.jpg',
    description: 'A cinematic opening sequence exploring historical and architectural textures through a documentary lens.',
    client: 'T-Studios',
    duration: '1:30',
    releaseYear: '2026',
    editor: 'Ajayi Olatomiwa (T-Studios)'
  }
];

export const COURSES: Course[] = [
  {
    id: 'course-doc',
    title: 'The Art of the Documentary Cut',
    subtitle: 'Master the pacing, structure, and editorial choices of world-class storytelling.',
    description: 'Learn the principles of documentary editing from pre-production to final export. Discover how to craft a compelling narrative out of hundreds of hours of raw footage, balance talking-head interviews with engaging B-roll, use music and sound design to direct emotional flows, and use professional color styling to make your film look truly global.',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    level: 'Advanced',
    price: 349,
    lessonsCount: 5,
    totalDuration: '4h 15m',
    studentsCount: 1420,
    syllabus: [
      'Understanding the Footage & Sifting the Gold',
      'The Narrative Arc: Crafting Story from Chaos',
      'Pacing & Rhythms: When to cut and when to hold',
      'Atmospheric Soundscapes & Sound Design',
      'Creative Color Styling & Narrative Grit'
    ],
    skillsAcquired: [
      'Non-linear documentary storytelling',
      'Advanced dialogue matching and audio stitching',
      'Complex multi-track sound design layering',
      'Cinematic color styling matching cold/warm tones',
      'Adobe Premiere & DaVinci Resolve workflows'
    ],
    lessons: [
      {
        id: 'c1-l1',
        courseId: 'course-doc',
        title: 'Introduction & Analyzing the Raw Story',
        duration: '22:15',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
        description: 'Welcome to the course. In this first lesson, we analyze how to triage hundreds of hours of raw interviews, label clips, and form a narrative blueprint before placing a single clip on the timeline.',
        order: 1
      },
      {
        id: 'c1-l2',
        courseId: 'course-doc',
        title: 'Developing the Narrative Backbone',
        duration: '45:30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description: 'Explore the 3-act structure in non-fiction. Learn how to arrange character testimonials, archive footage, and drone perspectives to build a cohesive message that grips the audience.',
        order: 2
      },
      {
        id: 'c1-l3',
        courseId: 'course-doc',
        title: 'Rhythm and Invisible Cuts',
        duration: '38:12',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        description: 'Discover how to cut on movement, breaths, and micro-expressions. We break down the differences between structural cuts, dramatic jumps, and ambient transitions.',
        order: 3
      },
      {
        id: 'c1-l4',
        courseId: 'course-doc',
        title: 'Soundscapes: Voice, Music & Sub-basses',
        duration: '52:40',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description: 'Sound is 70% of a great film. Learn how to mix ambient field recordings, voiceover EQ, sound design elements (foley), and subtle cinematic drones to support the story.',
        order: 4
      },
      {
        id: 'c1-l5',
        courseId: 'course-doc',
        title: 'Grading the Frame: From Log to Cinematic Reality',
        duration: '56:20',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description: 'Convert raw LOG profile clips into gorgeous, moody, high-contrast imagery. We cover primary balance, custom node structures, masks, and film grain emulation.',
        order: 5
      }
    ]
  }
];

export const CLIENT_REMARKS: ClientRemark[] = [
  {
    id: 'rem-1',
    quote: "Working with T-Studios transformed our media presence completely. Their documentary-style edits gave our campaign a level of visual integrity and emotional depth that drove a 340% increase in conversions. Simply the best globally.",
    author: "Murray, Raymart",
    role: "CEO, NovoAgent AI"
  },
  {
    id: 'rem-2',
    quote: "Our YouTube retention curve was flatlining. T-Studios stepped in with their high-velocity cuts, retention hooks, and pristine soundscapes. Our average watch duration jumped from 35% to a whopping 68% in just 4 videos!",
    author: "Sarah Jenkins",
    role: "Founder, Zipline Media"
  },
  {
    id: 'rem-3',
    quote: "We stream podcast recordings with 3 cameras. T-Studios set up our custom workflow, cleans our audio to broadcast-quality standards, and turns our episodes into 20+ viral short clips. Their service pays for itself instantly.",
    author: "Johnathan Cole",
    role: "Host, The Deep End Podcast"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is the typical cost for a custom video project?',
    answer: 'Our rates vary based on style, duration, scope & complexity.'
  },
  {
    id: 'faq-2',
    question: 'How long does a typical editing project take?',
    answer: 'Timelines can vary based on the deadlines and type of edit. Complex longforms can take close to a month. Shorter forms, less than a week.'
  },
  {
    id: 'faq-3',
    question: 'How many feedback revisions are included?',
    answer: '2 rounds of revisions are included. More can be added if required'
  },
  {
    id: 'faq-4',
    question: 'How does payment and onboarding work?',
    answer: 'A 50% upfront payment is required to start the project. The remaining 50% on Completion'
  },
  {
    id: 'faq-5',
    question: 'Can I book custom coaching or course packages?',
    answer: 'Coaching and courses aren\'t available yet, but you can join my community through https://tstudios.gumroad.com/l/odghw'
  }
];
