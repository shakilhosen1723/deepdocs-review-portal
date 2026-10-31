import React, { useState } from 'react';
import {
  Play,
  Film,
  Sparkles,
  CheckCircle2,
  Sliders,
  ExternalLink,
  PenTool,
  Columns,
  Layers,
  ArrowRight,
  ArrowUpRight,
  Shield,
  Zap,
  Star,
  Users,
  Clock,
  Check,
  ChevronRight,
  Search,
  Maximize2,
  FolderPlus,
  Tv,
  MessageSquare,
  HelpCircle,
  Heart,
  ShoppingBag,
  Volume2,
  Palette,
  Sun,
  Moon,
  Linkedin,
  Twitter,
  Mail,
  Video,
  Bookmark
} from 'lucide-react';

export default function LandingPage({
  projects = [],
  markers = [],
  onSelectProject,
  onOpenReview,
  onNewProject,
  themeMode = 'light',
  setThemeMode,
  studioSettings = {},
  onToast
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('all');

  // Filter projects based on search query, category, and review status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client_name?.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCategory && selectedCategory !== 'All' && selectedCategory !== 'All Categories') {
      const catKeyword = selectedCategory.toLowerCase().replace(/pass|videos/gi, '').trim();
      const pCombined = `${project.title || ''} ${project.category || ''} ${project.status_label || ''}`.toLowerCase();
      if (!pCombined.includes(catKeyword)) return false;
    }

    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return project.status_label?.toLowerCase().includes('revision') || project.status_label?.toLowerCase().includes('review');
    if (activeTab === 'approved') return project.status_label?.toLowerCase().includes('approved') || project.status_label?.toLowerCase().includes('locked');
    return true;
  });

  // Calculate live stats
  const totalNotes = markers.length || 0;
  const resolvedNotes = markers.filter((m) => m.is_resolved || m.resolved).length || 0;
  const approvalRate = totalNotes > 0 ? Math.round((resolvedNotes / totalNotes) * 100) : 100;

  // Categories matching screenshot
  const categories = ['All Categories', 'Music Videos', 'Commercials', 'Color Grade', 'VFX Pass'];

  // Features row items matching screenshot (5 colored icons)
  const featuresList = [
    {
      title: '4K Stream Player',
      category: 'Cloud Delivery',
      bgIcon: 'bg-purple-600',
      icon: Film,
      description: 'Zero-buffer playback from Cloudflare R2, Google Drive, or YouTube.'
    },
    {
      title: 'Canvas Pen Tool',
      category: 'Visual Markup',
      bgIcon: 'bg-amber-500',
      icon: PenTool,
      description: 'Pause on any frame, draw arrows, circle details, and attach references.'
    },
    {
      title: 'Dual Video Compare',
      category: 'Side-by-Side',
      bgIcon: 'bg-blue-600',
      icon: Columns,
      description: 'Inspect Video v1 and Video v2 simultaneously with synchronized scrub.'
    },
    {
      title: 'Version Feedback',
      category: 'Client Portal',
      bgIcon: 'bg-rose-500',
      icon: MessageSquare,
      description: 'Version-filtered timestamp comments with email & WhatsApp alerts.'
    },
    {
      title: 'NLE Export & Sign-Off',
      category: 'Editorial Delivery',
      bgIcon: 'bg-yellow-500',
      icon: CheckCircle2,
      description: 'One-click milestone approval locks video and exports EDL/XML markers.'
    }
  ];

  // Process steps (1 to 4 matching workflow)
  const processSteps = [
    {
      step: '1',
      title: 'Upload Video Version',
      desc: 'Connect Cloudflare R2, Google Drive, or YouTube links in seconds with automated multi-version support.',
      isHighlight: true
    },
    {
      step: '2',
      title: 'Annotate & Draw',
      desc: 'Pause on any frame, pick pen colors, sketch feedback directly on video, and upload screenshot references.',
      isHighlight: false
    },
    {
      step: '3',
      title: 'Dual Video Compare',
      desc: 'Play Version 1 and Version 2 side-by-side in real-time sync to verify notes have been fixed accurately.',
      isHighlight: false
    },
    {
      step: '4',
      title: 'Sign-Off & Deliver',
      desc: 'Resolve all client timestamp notes, trigger milestone approvals, and export markers directly to Premiere or DaVinci.',
      isHighlight: false
    }
  ];

  return (
    <div className={`min-h-screen ${themeMode === 'dark' ? 'bg-[#0B0D17] text-white' : 'bg-[#FFFFFF] text-slate-800'} transition-colors duration-200 overflow-x-hidden font-sans`}>
      {/* =========================================================================
          1. NAVIGATION BAR (Exact layout from screenshot)
          ========================================================================= */}
      <header className={`sticky top-0 z-50 border-b ${themeMode === 'dark' ? 'bg-[#0B0D17]/90 border-slate-800' : 'bg-white/95 border-slate-100'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  {studioSettings.studioName || 'DeepDox'}
                </span>
                <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  {studioSettings.studioBadge || 'PRO SUITE'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-bold hidden sm:block">
                Interactive Video Review Portal
              </p>
            </div>
          </div>

          {/* Search bar & Category dropdown (like in screenshot) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full flex items-center">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5" />
              <input
                type="text"
                placeholder="Search active project videos, clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-32 py-2 text-xs rounded-full border transition-all ${
                  themeMode === 'dark'
                    ? 'bg-slate-900/80 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500'
                    : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-600 focus:border-purple-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
              />
              <div className="absolute right-1">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-purple-600 text-white text-[11px] font-bold rounded-full px-3 py-1.5 border-none cursor-pointer hover:bg-purple-700 transition-colors focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Nav Links & Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden md:flex items-center gap-5 text-xs font-bold text-slate-600 dark:text-slate-300">
              <a href="#projects" className="hover:text-purple-600 transition-colors">
                Showcase
              </a>
              <a href="#features" className="hover:text-purple-600 transition-colors">
                Features
              </a>
              <a href="#process" className="hover:text-purple-600 transition-colors">
                Process
              </a>
            </nav>

            {/* Dark / Light Toggle */}
            {setThemeMode && (
              <button
                type="button"
                onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-full border transition-colors ${
                  themeMode === 'dark'
                    ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
                title="Toggle Theme"
              >
                {themeMode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            {/* Primary Action Button -> Opens Video Review Portal */}
            <button
              type="button"
              onClick={() => onOpenReview && onOpenReview(projects[0]?.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:-translate-y-0.5 transition-all"
            >
              <span>Launch Review Room</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. HERO SECTION WITH 3D DEPTH & ORGANIC CURVE (Matching Screenshot & Video)
          ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Pink Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/60 font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Video Review Portal</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
                Creative, Frame-Accurate{' '}
                <span className="relative inline-block text-purple-600">
                  Video Review
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-purple-300 dark:text-purple-900/60 -z-10"
                    viewBox="0 0 200 8"
                    fill="currentColor"
                  >
                    <path d="M0,5 Q80,0 200,5 L200,8 Q80,3 0,8 Z" />
                  </svg>
                </span>{' '}
                Suite
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
                Collaborate directly on videos with frame-accurate timestamp notes, interactive canvas pen drawings, side-by-side version comparison, and instant milestone sign-offs.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenReview && onOpenReview(projects[0]?.id)}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1 transition-all flex items-center gap-2 group"
                >
                  <span>Review Active Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#projects"
                  className={`px-6 py-3.5 rounded-full font-extrabold text-sm border transition-all flex items-center gap-2 ${
                    themeMode === 'dark'
                      ? 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-white'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800 shadow-sm'
                  }`}
                >
                  <Film className="w-4 h-4 text-purple-600" />
                  <span>Explore All Videos</span>
                </a>
              </div>
            </div>

            {/* Right Visual Column (With Organic Purple Shape & 3D Elements) */}
            <div className="lg:col-span-6 relative">
              {/* Organic Royal Purple Curved Backdrop Shape (matching reference screenshot) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-purple-600 to-violet-600 hero-organic-curve shadow-2xl opacity-95 -z-10 translate-x-4 translate-y-4" />
              
              {/* Main Video Preview Container */}
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl p-3 shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    alt="Video Editorial Review Team"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Video Overlay Elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-[10px] tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        REC • 4K PRORES
                      </span>
                      <span className="text-white/80 font-mono text-xs font-bold">
                        TC 00:01:24:18
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base">
                          {projects[0]?.title || 'Global Peace Music Video'}
                        </h4>
                        <p className="text-xs text-white/70">
                          {projects[0]?.version_label || 'Video Version 1'} • Side-by-Side Comparison Ready
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onOpenReview && onOpenReview(projects[0]?.id)}
                        className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-purple-700 flex items-center justify-center transition-all shadow-xl hover:scale-110"
                      >
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING 3D DEPTH ELEMENTS */}
              {/* 3D Floating Isometric Glossy Cube */}
              <div className="hidden sm:block absolute -top-8 -right-6 perspective-container pointer-events-none z-20">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-400 via-purple-600 to-indigo-800 animate-float-3d-slow flex items-center justify-center text-white p-3 shadow-2xl border border-white/40">
                  <Film className="w-8 h-8 text-white drop-shadow-md" />
                </div>
              </div>

              {/* 3D Floating Gold Star / Particle Element */}
              <div className="hidden sm:block absolute top-1/2 -left-8 perspective-container pointer-events-none z-20">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-300 via-orange-400 to-pink-500 animate-float-3d-fast flex items-center justify-center text-white shadow-xl border border-white/50">
                  <Sparkles className="w-7 h-7 text-white drop-shadow" />
                </div>
              </div>

              {/* FLOATING GAUGE PANEL (Exact match: "760 Excellent" gauge meter!) */}
              <div className="absolute -bottom-8 -left-4 sm:-bottom-10 sm:-left-8 bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-100 dark:border-slate-800 animate-float-gentle z-20 max-w-xs">
                <div className="text-left mb-2">
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-white">
                    Review Approval Index
                  </h4>
                  <p className="text-[10px] text-slate-600 font-bold">
                    Client satisfaction benchmark
                  </p>
                </div>

                {/* Circular Gradient Rainbow Gauge Ring */}
                <div className="relative w-32 h-20 mx-auto flex items-center justify-center overflow-hidden">
                  <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="9"
                      fill="transparent"
                      className="text-slate-100 dark:text-slate-800"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#rainbowGauge)"
                      strokeWidth="9"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset="60"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="rainbowGauge" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="35%" stopColor="#EC4899" />
                        <stop offset="70%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                    <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                      760
                    </span>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wider">
                      Excellent
                    </span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-600">Approval Rate</span>
                  <span className="text-purple-600 font-extrabold">98.4%</span>
                </div>
              </div>

              {/* Vertical Social Floating Pill on the Far Right (like in screenshot) */}
              <div className="hidden xl:flex absolute top-12 -right-12 flex-col items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-5 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 z-20 text-slate-400">
                <span className="text-[9px] font-black tracking-widest uppercase rotate-90 my-2 text-purple-600 whitespace-nowrap">
                  Follow Us
                </span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:text-purple-600 transition-colors"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:text-purple-600 transition-colors"
                  title="Follow on Twitter / X"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`mailto:${studioSettings.editorEmail || 'shakilhossion917@gmail.com'}`}
                  className="p-1 hover:text-purple-600 transition-colors"
                  title="Contact Studio"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          DYNAMIC VIDEO VERSIONING SHOWCASE (Matching Inside Dashboard Navy/Indigo Theme)
          ========================================================================= */}
      <section className="py-8 bg-[#07080d] border-t border-b border-white/[0.08] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-indigo-600/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0d17]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6366F1]/15 border border-[#6366F1]/30 text-[11px] font-black uppercase tracking-widest text-[#818cf8]">
                  <Film className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>DYNAMIC VIDEO VERSIONING ENGINE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Frame-Accurate Multi-Video Management &amp; Version Stacking
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sequential auto-tagging for multi-version uploads. Compare versions side-by-side with locked playback scrub or switch videos instantly with single-click precision.
                </p>
              </div>

              {/* Sequential Version Tags & Dynamic Dual Comparison Indicator */}
              <div className="flex flex-wrap items-center gap-2.5 bg-[#07080d]/80 p-3 rounded-2xl border border-white/10 shadow-inner">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-300 text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <span>Video Version 1</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>Video Version 2</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs font-black">
                  <Columns className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Side-by-Side Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PROVIDED FEATURES (5 Video Workflow Features - Dashboard Dark Navy Theme)
          ========================================================================= */}
      <section id="features" className="py-14 bg-[#07080d] border-b border-white/[0.08] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8">
            <span className="text-[#818cf8] font-extrabold text-xs tracking-wider uppercase">
              Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              Provided Features
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuresList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn about ${item.title} in review room`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenReview && onOpenReview(projects[0]?.id);
                    }
                  }}
                  className="p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6366F1] bg-[#0e1322]/90 border-white/10 hover:border-[#6366F1]/50 text-white shadow-lg"
                  onClick={() => onOpenReview && onOpenReview(projects[0]?.id)}
                >
                  <div className={`w-12 h-12 rounded-2xl ${item.bgIcon} flex items-center justify-center text-white mb-4 shadow-md`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-sm text-white tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-bold text-[#818cf8] uppercase tracking-wider block mb-2">
                    {item.category}
                  </span>
                  <p className="text-xs text-slate-300 leading-snug font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. INTERACTIVE PROJECT SHOWCASE GRID
             Clicking ANY video navigates directly into that project's review room!
          ========================================================================= */}
      <section id="projects" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-rose-500 font-extrabold text-xs tracking-wider uppercase">
                Active Projects Showcase
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
                Save Time Managing Video Projects For Your Clients
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl font-medium">
                Click on any project below to instantly open the interactive frame-accurate review suite with drawing tools, timestamp markers, and dual comparison.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'all'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
                }`}
              >
                All Projects ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('in-progress')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'in-progress'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
                }`}
              >
                In Review
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('approved')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  activeTab === 'approved'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
                }`}
              >
                Approved
              </button>
            </div>
          </div>

          {/* Project Video Grid (4 columns × 2 rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                <Film className="w-12 h-12 mx-auto text-purple-400 mb-3 opacity-60" />
                <h3 className="font-extrabold text-base text-slate-800 dark:text-white">
                  No projects match your current filter
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                  Try searching for another video, client name, or reset your category and status filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
                    setActiveTab('all');
                  }}
                  className="mt-5 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredProjects.map((project, index) => {
                // Video specific notes count
                const projectMarkers = markers.filter((m) => m.project_id === project.id);
                const noteCount = projectMarkers.length;
                const resolvedCount = projectMarkers.filter((m) => m.is_resolved || m.resolved).length;
                const percent = noteCount > 0 ? Math.round((resolvedCount / noteCount) * 100) : 100;
                const videoLabel = project.tab_label || `Video Version ${index + 1}`;
                const hasMultipleVersions = (project.versions?.length || 0) > 1;

                return (
                  <div
                    key={project.id}
                    onClick={() => onSelectProject && onSelectProject(project.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectProject && onSelectProject(project.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open review workspace for ${videoLabel}: ${project.title}`}
                    className={`group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      themeMode === 'dark'
                        ? 'bg-slate-900/90 border-slate-800 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10'
                        : 'bg-white border-slate-200/90 hover:border-purple-300 shadow-sm hover:shadow-xl'
                    }`}
                  >
                    {/* Top Badge & Version Indicator */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60">
                          {videoLabel}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const base = window.location.origin + window.location.pathname;
                              const link = `${base}?view=client&project=${project.id}`;
                              if (navigator?.clipboard?.writeText) {
                                navigator.clipboard.writeText(link).catch(() => {});
                              }
                              if (onToast) onToast(`Copied Client Review Link for ${project.title}`);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-purple-100 dark:bg-slate-800 dark:hover:bg-purple-950 text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                            title="Copy Client Direct Bookmark Link"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {project.version_label || 'Version 1'}
                          </span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug">
                        {project.title}
                      </h3>

                      {/* Client Name & Deadline */}
                      <div className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <p className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-purple-500" />
                          <span>Client: {project.client_name || 'Sepand Studios'}</span>
                        </p>
                        {project.deadline && (
                          <p className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            <span>Deadline: {project.deadline}</span>
                          </p>
                        )}
                      </div>

                      {/* Dynamic Sequential Version Buttons upon multiple video uploads */}
                      {hasMultipleVersions && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Versions:
                          </span>
                          {project.versions.map((ver, vIdx) => {
                            const isVerActive = ver.id === (project.active_version_id || project.versions[0]?.id);
                            const seqLabel = `Version ${vIdx + 1}`;
                            return (
                              <button
                                key={ver.id || vIdx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onSelectProject && onSelectProject(project.id, ver.id);
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-black transition-all ${
                                  isVerActive
                                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm ring-1 ring-violet-400'
                                    : 'bg-slate-100 hover:bg-violet-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                                title={`Open ${ver.version_label || seqLabel}`}
                              >
                                {ver.version_label || seqLabel}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Conditional Comparison Button: Only appears when multiple video versions are available */}
                      {hasMultipleVersions && (
                        <div className="mt-2.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject && onSelectProject(project.id, project.versions[1]?.id || project.versions[0]?.id);
                            }}
                            className="w-full py-1.5 px-3 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-600 dark:text-violet-300 border border-violet-500/20 hover:border-violet-500/40 text-[11px] font-black tracking-wide flex items-center justify-center gap-1.5 transition-all shadow-sm"
                            title="Side-by-Side Dual Video Comparison"
                          >
                            <Columns className="w-3.5 h-3.5 text-violet-500 dark:text-violet-400" />
                            <span>⚡ Compare Video Versions</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Bottom Stats & Launch CTA */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span className="text-slate-600 dark:text-slate-300">Review Notes</span>
                        <span className="text-purple-600 font-extrabold">
                          {resolvedCount}/{noteCount || 0} Resolved
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject && onSelectProject(project.id);
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-purple-600 text-slate-700 dark:text-slate-200 group-hover:text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      >
                        <span>Review Video</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            {/* VIDEO 8: HIGH-CONTRAST SOLID ROYAL PURPLE BLOCK (+4 More) */}
            <div
              onClick={() => onNewProject ? onNewProject() : (onOpenReview && onOpenReview(projects[0]?.id))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onNewProject) onNewProject();
                  else if (onOpenReview) onOpenReview(projects[0]?.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload New Video Version"
              className="group relative rounded-2xl p-6 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Decorative Wavy Lines Graphic (matching screenshot) */}
              <div className="absolute top-4 right-4 text-white/30 group-hover:text-white/60 transition-colors">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 10 Q12 4 20 10 T36 10" />
                  <path d="M4 18 Q12 12 20 18 T36 18" />
                  <path d="M4 26 Q12 20 20 26 T36 26" />
                </svg>
              </div>

              <div>
                <span className="text-3xl font-black tracking-tight block mb-2">
                  +4 More
                </span>
                <h3 className="font-extrabold text-lg leading-snug">
                  Upload New Video Version
                </h3>
                <p className="text-xs text-purple-100 mt-2 font-medium leading-relaxed">
                  Import any Cloudflare R2 MP4, Google Drive, or YouTube link to start video review immediately.
                </p>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onNewProject) onNewProject();
                    else if (onOpenReview) onOpenReview(projects[0]?.id);
                  }}
                  className="w-full py-2.5 rounded-xl bg-white text-purple-700 font-black text-xs hover:bg-purple-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>+ Add New Video Version</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. OUR REVIEW PROCESS SECTION
          ========================================================================= */}
      <section id="process" className={`py-16 lg:py-24 border-t ${themeMode === 'dark' ? 'bg-[#0E1322] border-slate-800' : 'bg-slate-50 border-slate-200/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description Column */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-purple-600 font-extrabold text-xs tracking-wider uppercase">
                Our Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                Our Frame-Accurate Review Process Does It Best
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                No more confusing email threads or messy timestamps. DeepDox ties every comment, pen drawing, and version comparison to the exact frame for frictionless delivery.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenReview && onOpenReview(projects[0]?.id)}
                  className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Right 2x2 Grid of Process Steps */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    step.isHighlight
                      ? 'bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-xl shadow-purple-600/20'
                      : themeMode === 'dark'
                      ? 'bg-slate-900/90 border border-slate-800 text-white shadow-sm'
                      : 'bg-white border border-slate-200/80 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span
                      className={`text-2xl font-black ${
                        step.isHighlight ? 'text-white/90' : 'text-purple-600'
                      }`}
                    >
                      {step.step}
                    </span>
                    <h3 className="font-extrabold text-base tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className={`text-xs leading-relaxed font-medium ${
                      step.isHighlight ? 'text-purple-100' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          FULL-WIDTH CTA BANNER
          ========================================================================= */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-700 text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl text-left space-y-2 z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
                Full Set Of Great Tools To Review Your Video Projects
              </h3>
              <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
                Experience the speed of real-time client collaboration with frame-accurate annotations, side-by-side comparison, and 1-second keyboard scrubbing.
              </p>
            </div>

            <div className="z-10 shrink-0">
              <button
                type="button"
                onClick={() => onOpenReview && onOpenReview(projects[0]?.id)}
                className="px-8 py-4 rounded-full bg-white text-purple-700 hover:bg-purple-50 font-black text-sm shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group"
              >
                <span>Launch Review Room Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FOOTER
          ========================================================================= */}
      <footer className={`py-12 border-t ${themeMode === 'dark' ? 'bg-[#080A12] border-slate-900 text-slate-500' : 'bg-white border-slate-100 text-slate-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">
              {studioSettings.studioName || 'DeepDox'}
            </span>
            <span>• Pro Interactive Video Review Portal</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Editor: {studioSettings.editorName || 'Shakil Hosen'}</span>
            <a
              href={`mailto:${studioSettings.editorEmail || 'shakilhossion917@gmail.com'}`}
              className="text-purple-600 hover:underline"
            >
              {studioSettings.editorEmail || 'shakilhossion917@gmail.com'}
            </a>
          </div>

          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} DeepDox Pro Suite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
