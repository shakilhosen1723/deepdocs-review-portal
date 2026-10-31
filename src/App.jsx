import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Check,
  MessageSquare,
  Send,
  Settings,
  Bookmark,
  Film,
  CheckCircle2,
  Sparkles,
  FolderPlus,
  Eye,
  Sliders,
  Mail,
  Phone,
  Trash2,
  CornerDownRight,
  X,
  Upload,
  Cloud,
  HardDrive,
  AlertTriangle,
  Calendar,
  Volume1,
  Volume2,
  VolumeX,
  Maximize,
  Edit3,
  ChevronDown,
  Image as ImageIcon,
  RefreshCw,
  Download,
  Lock,
  Unlock,
  KeyRound,
  ExternalLink,
  Paperclip,
  PenTool,
  Columns,
  Monitor,
  Smartphone,
  Layers,
  Plus,
  Maximize2,
  Minimize2,
  PanelRight,
  PanelBottom,
  ArrowLeft,
  LayoutGrid,
  MoreVertical,
  Sun,
  Moon,
  Clock,
  FileText,
  Bell,
  MessageCircle
} from 'lucide-react';
import LandingPage from './components/LandingPage';

// ==========================================
// DEFAULT SVG FAVICON FOR BROWSER TAB
// ==========================================
const DEFAULT_FAVICON_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8b5cf6" />
          <stop offset="50%" stop-color="#d946ef" />
          <stop offset="100%" stop-color="#4f46e5" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#g)" />
      <rect x="4" y="4" width="56" height="56" rx="13" fill="#21094e" fill-opacity="0.82" />
      <polygon points="25,18 25,46 47,32" fill="#ffffff" />
    </svg>
  `);

// ==========================================
// INITIAL DEMO DATA & DEEPDOX CONFIGURATION
// ==========================================
const DEFAULT_SETTINGS = {
  studioName: 'DeepDox',
  studioBadge: 'PRO SUITE',
  studioSubName: 'Interactive Video Review & Client Portal',
  studioLogo: '',
  editorName: 'Shakil Hosen',
  editorEmail: 'shakilhossion917@gmail.com',
  editorWhatsapp: '+8801700000000',
  emailjsServiceId: 'service_eqdjjgl',
  emailjsTemplateId: 'template_khezhvx',
  emailjsPublicKey: 'Jbq66LHL5yNjAx_1h'
};

const MARKER_CATEGORIES = [
  {
    label: 'Visual / VFX',
    pill: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-400/40 dark:border-violet-500/30'
  },
  {
    label: 'Video / Timing',
    pill: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-400/40 dark:border-amber-500/30'
  },
  {
    label: 'Color Grade',
    pill: 'bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-400/40 dark:border-fuchsia-500/30'
  },
  {
    label: 'Audio Mix',
    pill: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-400/40 dark:border-cyan-500/30'
  }
];

const DEMO_FALLBACK_MP4 =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const INITIAL_PROJECTS = [
  {
    id: 'proj_1',
    tab_number: 1,
    tab_label: 'Project 1',
    title: 'song 01',
    client_name: 'Sepand Studios',
    version_label: 'Video v1.4',
    active_version_id: 'ver_1_2',
    versions: [
      {
        id: 'ver_1_1',
        version_label: 'Video v1.0',
        source_type: 'r2',
        r2Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
        youtubeUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        created_at: '2026-10-18T10:00:00Z'
      },
      {
        id: 'ver_1_2',
        version_label: 'Video v1.4',
        source_type: 'r2',
        r2Url: DEMO_FALLBACK_MP4,
        driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
        youtubeUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        created_at: '2026-10-20T14:20:00Z'
      }
    ],
    status_label: 'Status: In Revision / Fixing Notes',
    source_type: 'r2',
    r2Url: DEMO_FALLBACK_MP4,
    driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    youtubeUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    video_url: DEMO_FALLBACK_MP4,
    deadline: '2026-11-12',
    client_whatsapp: '+15550192834',
    client_email: 'production@sepandstudios.example.com',
    created_at: '2026-10-20T14:20:00Z'
  },
  {
    id: 'proj_2',
    tab_number: 2,
    tab_label: 'Project 2',
    title: 'Brand Anthem',
    client_name: 'Sepand Studios',
    version_label: 'APPROVED',
    active_version_id: 'ver_2_1',
    versions: [
      {
        id: 'ver_2_1',
        version_label: 'APPROVED',
        source_type: 'r2',
        r2Url: DEMO_FALLBACK_MP4,
        driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
        youtubeUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        created_at: '2026-10-24T09:15:00Z'
      }
    ],
    status_label: 'Status: Approved & Completed',
    source_type: 'r2',
    r2Url: DEMO_FALLBACK_MP4,
    driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    youtubeUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    video_url: DEMO_FALLBACK_MP4,
    deadline: '2026-11-25',
    client_whatsapp: '+15550192834',
    client_email: 'production@sepandstudios.example.com',
    created_at: '2026-10-24T09:15:00Z'
  }
];

const INITIAL_MARKERS = [
  {
    id: 'm_101',
    project_id: 'proj_1',
    version_id: 'ver_1_1',
    version_label: 'Video v1.0',
    timestamp_seconds: 14.0,
    category: 'Visual / VFX',
    client_comment: 'Please check pacing on the opening scene before the first chorus.',
    is_resolved: false,
    editor_reply: 'Noted. Working on it.',
    attachment_url: null,
    drawing_data: null,
    created_at: '2026-10-18T15:00:00Z'
  },
  {
    id: 'm_102',
    project_id: 'proj_1',
    version_id: 'ver_1_1',
    version_label: 'Video v1.0',
    timestamp_seconds: 28.5,
    category: 'Video / Timing',
    client_comment: 'The opening transition needs to be slightly faster by 8 frames.',
    is_resolved: true,
    editor_reply: 'Fixed in Version 2 export!',
    attachment_url: null,
    drawing_data: null,
    created_at: '2026-10-18T15:30:00Z'
  },
  {
    id: 'm_103',
    project_id: 'proj_1',
    version_id: 'ver_1_2',
    version_label: 'Video v1.4',
    timestamp_seconds: 14.0,
    category: 'Visual / VFX',
    client_comment: 'Please adjust the lighting in the final scene.',
    is_resolved: false,
    editor_reply: 'Noted. Working on it.',
    attachment_url: null,
    drawing_data: null,
    created_at: '2026-10-20T15:00:00Z'
  },
  {
    id: 'm_104',
    project_id: 'proj_1',
    version_id: 'ver_1_2',
    version_label: 'Video v1.4',
    timestamp_seconds: 35.0,
    category: 'Visual / VFX',
    client_comment: 'Soften the volumetric stage light rays behind the lead vocalist.',
    is_resolved: true,
    editor_reply: 'Fixed! Re-baked the volumetric fog pass with higher sample count.',
    attachment_url: null,
    drawing_data: null,
    created_at: '2026-10-20T15:04:00Z'
  },
  {
    id: 'm_105',
    project_id: 'proj_1',
    version_id: 'ver_1_2',
    version_label: 'Video v1.4',
    timestamp_seconds: 46.0,
    category: 'Video / Timing',
    client_comment: 'Switch to the wide holographic stage angle 12 frames earlier right on the drum impact.',
    is_resolved: false,
    editor_reply: '',
    attachment_url: null,
    drawing_data: null,
    created_at: '2026-10-20T15:15:00Z'
  },
  {
    id: 'm_106',
    project_id: 'proj_1',
    version_id: 'ver_1_2',
    version_label: 'Video v1.4',
    timestamp_seconds: 68.5,
    category: 'Color Grade',
    client_comment: 'Boost golden highlight warmth on the crowd silhouette shots.',
    is_resolved: true,
    editor_reply: 'Fixed! Added warm midtone push and balanced skin highlights.',
    attachment_url: null,
    drawing_data: null,
    created_at: '2026-10-20T15:25:00Z'
  },
  {
    id: 'm_201',
    project_id: 'proj_2',
    version_id: 'ver_2_1',
    version_label: 'APPROVED',
    timestamp_seconds: 8.0,
    category: 'Color Grade',
    client_comment: 'Final color pass looks crisp and ready for broadcast.',
    is_resolved: true,
    editor_reply: 'Thank you! Master export locked.',
    attachment_url: null,
    drawing_data: null,
    created_at: '2026-10-26T12:00:00Z'
  }
];

// ==========================================
// HELPER UTILITIES
// ==========================================
function formatTimecode(seconds, longFormat = true) {
  if (!seconds || isNaN(seconds) || seconds < 0) {
    return longFormat ? '00:00:00' : '00:00';
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (longFormat) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(
      secs
    ).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function parseTimecodeToSeconds(tcString) {
  if (!tcString) return 0;
  const parts = tcString.trim().split(':').map((p) => parseFloat(p) || 0);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 1) {
    return parts[0];
  }
  return 0;
}

function resolveVideoEngine(project, activeVersion = null) {
  if (!project) {
    return {
      mode: 'r2',
      badge: 'Direct MP4 Stream',
      streamUrl: '',
      embedUrl: ''
    };
  }

  const ver = activeVersion || null;
  const preferredType = ver?.source_type || project.source_type || 'r2';

  const r2Candidate = (
    ver?.r2Url ||
    project.r2Url ||
    (!project.video_url?.includes('drive.google.com') &&
    !project.video_url?.includes('youtube') &&
    !project.video_url?.includes('youtu.be')
      ? project.video_url
      : '') ||
    DEMO_FALLBACK_MP4
  ).trim();

  const driveCandidate = (
    ver?.driveUrl ||
    project.driveUrl ||
    (project.video_url?.includes('drive.google.com') ? project.video_url : '') ||
    'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view'
  ).trim();

  const youtubeCandidate = (
    ver?.youtubeUrl ||
    project.youtubeUrl ||
    (project.video_url?.includes('youtube') || project.video_url?.includes('youtu.be')
      ? project.video_url
      : '') ||
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  ).trim();

  if (preferredType === 'youtube') {
    const ytMatch = youtubeCandidate.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
    );
    const ytId = ytMatch ? ytMatch[1] : null;
    const embedUrl = ytId
      ? `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`
      : youtubeCandidate;
    return {
      mode: 'youtube',
      badge: 'YouTube Embed Stream',
      streamUrl: youtubeCandidate,
      embedUrl
    };
  }

  if (preferredType === 'gdrive') {
    const fileIdMatch =
      driveCandidate.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      driveCandidate.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    const fileId = fileIdMatch && fileIdMatch[1] ? fileIdMatch[1] : null;
    const embedUrl = fileId
      ? `https://drive.google.com/file/d/${fileId}/preview`
      : driveCandidate.includes('/preview')
      ? driveCandidate
      : driveCandidate.replace(/\/view.*$/, '/preview');
    return {
      mode: 'gdrive',
      badge: 'Google Drive Preview',
      streamUrl: driveCandidate,
      embedUrl
    };
  }

  return {
    mode: 'r2',
    badge: 'Direct MP4 Stream',
    streamUrl: r2Candidate,
    embedUrl: r2Candidate
  };
}

function formatDeadlineDisplay(dateString) {
  if (!dateString) return 'No Deadline';
  const target = new Date(dateString + 'T23:59:59');
  if (isNaN(target.getTime())) return dateString;
  return target.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function normalizeProject(p, idx = 0) {
  const versions = (
    p.versions && Array.isArray(p.versions) && p.versions.length > 0
      ? p.versions
      : [
          {
            id: `ver_${p.id}_1`,
            version_label: 'Version 1',
            source_type: p.source_type || 'r2',
            r2Url: p.r2Url || p.video_url || DEMO_FALLBACK_MP4,
            driveUrl: p.driveUrl || '',
            youtubeUrl: p.youtubeUrl || '',
            created_at: p.created_at || new Date().toISOString()
          }
        ]
  ).map((v, vIdx) => {
    // Convert legacy "Cut v..." or empty label to sequential "Version X"
    const isLegacyCut = !v.version_label || /^cut\s*v?\d/i.test(v.version_label);
    const versionLabel = isLegacyCut ? `Version ${vIdx + 1}` : v.version_label;
    return {
      ...v,
      version_label: versionLabel,
      r2Url:
        v.r2Url && !v.r2Url.includes('asldkfasdfsl.mp4')
          ? v.r2Url
          : DEMO_FALLBACK_MP4
    };
  });

  const active_version_id =
    p.active_version_id && versions.some((v) => v.id === p.active_version_id)
      ? p.active_version_id
      : versions[versions.length - 1]?.id || versions[0]?.id;

  const cleanR2 =
    p.r2Url && !p.r2Url.includes('asldkfasdfsl.mp4')
      ? p.r2Url
      : DEMO_FALLBACK_MP4;

  const activeVer = versions.find((v) => v.id === active_version_id);
  const activeVerLabel = activeVer?.version_label || `Version ${versions.length}`;

  const cleanTabLabel =
    !p.tab_label || /^project\s*\d+/i.test(p.tab_label)
      ? `Video ${idx + 1}`
      : p.tab_label;

  return {
    ...p,
    tab_label: cleanTabLabel,
    versions,
    active_version_id,
    r2Url: cleanR2,
    video_url: p.video_url && !p.video_url.includes('asldkfasdfsl.mp4') ? p.video_url : cleanR2,
    version_label: activeVerLabel
  };
}

// DOT MATRIX GRAPHIC COMPONENT
function DotMatrix({ className = '' }) {
  return (
    <div
      className={`grid grid-cols-6 gap-2.5 pointer-events-none select-none opacity-25 ${className}`}
    >
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white block shadow-sm shadow-purple-300/40"
        />
      ))}
    </div>
  );
}

// ==========================================
// MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const isStrictClientBookmark =
    urlParams.get('view') === 'client' || urlParams.get('role') === 'client';

  const [currentView, setCurrentView] = useState(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get('view') === 'review' || p.get('view') === 'client' || p.get('project')) {
      return 'review';
    }
    return 'landing';
  });

  const [role, setRole] = useState(() => {
    if (isStrictClientBookmark) return 'client';
    return localStorage.getItem('deepdox_role_v5') || 'editor';
  });

  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('deepdox_theme_mode') || 'light';
  });

  // Sync Tailwind .dark class on <html> document element for crisp styling
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('deepdox_settings_v5');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('deepdox_projects_v8');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeProject);
        }
      }
      return INITIAL_PROJECTS.map(normalizeProject);
    } catch {
      return INITIAL_PROJECTS.map(normalizeProject);
    }
  });

  const [markers, setMarkers] = useState(() => {
    try {
      const saved = localStorage.getItem('deepdox_markers_v8');
      return saved ? JSON.parse(saved) : INITIAL_MARKERS;
    } catch {
      return INITIAL_MARKERS;
    }
  });

  const [reviewActiveTab, setReviewActiveTab] = useState('review');

  const [activeProjectId, setActiveProjectId] = useState(() => {
    const paramProj = urlParams.get('project');
    if (paramProj && projects.some((p) => p.id === paramProj)) return paramProj;
    return projects[0]?.id || INITIAL_PROJECTS[0].id;
  });

  // Active Project & Active Version Resolution
  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) || projects[0];
  }, [projects, activeProjectId]);

  const activeVersion = useMemo(() => {
    if (!activeProject?.versions || activeProject.versions.length === 0) return null;
    return (
      activeProject.versions.find((v) => v.id === activeProject.active_version_id) ||
      activeProject.versions[0]
    );
  }, [activeProject]);

  const videoEngine = useMemo(() => {
    return resolveVideoEngine(activeProject, activeVersion);
  }, [activeProject, activeVersion]);

  // POINT 1: INLINE PROJECT EDITING STATES
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState('');
  const [editingVersion, setEditingVersion] = useState(false);
  const [versionDraft, setVersionDraft] = useState('');
  const [editingDeadline, setEditingDeadline] = useState(false);

  // POINT 4 & 5: VERSION MANAGEMENT & FEEDBACK FILTERING
  const [selectedVersionFilter, setSelectedVersionFilter] = useState('all');
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);
  const [uploadModalTab, setUploadModalTab] = useState('source'); // 'source' | 'versions'
  const [newVideoName, setNewVideoName] = useState('');
  const [newVideoSourceType, setNewVideoSourceType] = useState('r2');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  // POINT 6: SIDE-BY-SIDE VIDEO COMPARISON MODE
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('review'); // 'review' | 'feedback' | 'annotations' | 'comparison'
  const [compareVersionLeftId, setCompareVersionLeftId] = useState('');
  const [compareVersionRightId, setCompareVersionRightId] = useState('');
  const [comparisonAudioTrack, setComparisonAudioTrack] = useState('left'); // 'left' | 'right' | 'mute'

  // Automatically reset comparison mode if active project only has 1 version
  useEffect(() => {
    if ((activeProject?.versions?.length || 0) <= 1 && isComparisonMode) {
      setIsComparisonMode(false);
    }
  }, [activeProject, isComparisonMode]);

  // POINT 8: TOP-RIGHT WORKSPACE CONTROLS
  const [videoAspectRatio, setVideoAspectRatio] = useState('auto'); // 'auto' | 'horizontal' | 'vertical'
  const [detectedVideoAspect, setDetectedVideoAspect] = useState('horizontal');
  const [videoLayoutMode, setVideoLayoutMode] = useState('side-by-side');

  // POINT 9: IMAGE & LOGO ATTACHMENTS IN MESSAGE NOTES
  const [newCommentAttachment, setNewCommentAttachment] = useState(null);
  const [newCommentAttachmentName, setNewCommentAttachmentName] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const attachmentFileInputRef = useRef(null);

  // POINT 10: PAUSED-FRAME CANVAS DRAWING / PEN TOOL
  const canvasRef = useRef(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawColor, setDrawColor] = useState('#facc15'); // Neon Yellow default
  const [drawLineWidth, setDrawLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnOnCanvas, setHasDrawnOnCanvas] = useState(false);

  // REFS & PLAYER CONTROLS
  const videoRef = useRef(null);
  const compareVideoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const commentInputRef = useRef(null);
  const logoFileInputRef = useRef(null);
  const localVideoFileInputRef = useRef(null);
  const newProjectLocalVideoRef = useRef(null);
  const newVideoLocalRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [useCorsAnonymous, setUseCorsAnonymous] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [hoverZone, setHoverZone] = useState(null);
  const [skipFeedback, setSkipFeedback] = useState(null);
  const [timelineHoverTime, setTimelineHoverTime] = useState(null);
  const [timelineHoverPos, setTimelineHoverPos] = useState(0);
  const [isTimelineDragging, setIsTimelineDragging] = useState(false);

  const [markerFilter, setMarkerFilter] = useState('all');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentCategory, setNewCommentCategory] = useState('Visual / VFX');
  const [lockedTimestamp, setLockedTimestamp] = useState(null);
  const [manualTimecodeInput, setManualTimecodeInput] = useState('');
  const [isEditingTimecode, setIsEditingTimecode] = useState(false);

  const [editingReplyId, setEditingReplyId] = useState(null);
  const [replyDraftText, setReplyDraftText] = useState('');

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showUploadSourceModal, setShowUploadSourceModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCloudflareGuideModal, setShowCloudflareGuideModal] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [toast, setToast] = useState(null);

  // MODAL FORMS
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    client_name: 'Sepand Studios',
    version_label: 'Version 1.0',
    source_type: 'r2',
    r2Url: DEMO_FALLBACK_MP4,
    driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    youtubeUrl: '',
    deadline: '2026-11-20',
    client_email: '',
    client_whatsapp: ''
  });

  const [sourceUpdateForm, setSourceUpdateForm] = useState({
    title: '',
    client_name: '',
    status_label: '',
    source_type: 'r2',
    r2Url: '',
    driveUrl: '',
    youtubeUrl: '',
    version_label: 'Version 1.4',
    client_email: '',
    client_whatsapp: ''
  });

  const [notifyForm, setNotifyForm] = useState({
    clientEmail: '',
    clientWhatsapp: '',
    customMessage: ''
  });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  }, []);

  // Sync comparison versions when active project changes
  useEffect(() => {
    if (activeProject?.versions && activeProject.versions.length >= 2) {
      setCompareVersionLeftId(activeProject.versions[0].id);
      setCompareVersionRightId(activeProject.versions[1].id);
    } else if (activeProject?.versions && activeProject.versions.length === 1) {
      setCompareVersionLeftId(activeProject.versions[0].id);
      setCompareVersionRightId(activeProject.versions[0].id);
    }
  }, [activeProject?.id, activeProject?.versions]);

  // Sync favicon & document title
  useEffect(() => {
    const faviconHref =
      settings.studioLogo && settings.studioLogo.trim() !== ''
        ? settings.studioLogo.trim()
        : DEFAULT_FAVICON_SVG;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = faviconHref;

    let appleLink = document.querySelector("link[rel='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement('link');
      appleLink.rel = 'apple-touch-icon';
      document.head.appendChild(appleLink);
    }
    appleLink.href = faviconHref;

    const studioTitle = settings.studioName || 'DeepDox';
    const projTitle = activeProject?.title ? ` — ${activeProject.title}` : '';
    document.title = `${studioTitle}${projTitle}`;
  }, [settings.studioLogo, settings.studioName, activeProject?.title]);

  // Persistence to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('deepdox_projects_v8', JSON.stringify(projects));
      localStorage.setItem('deepdox_markers_v8', JSON.stringify(markers));
      localStorage.setItem('deepdox_settings_v5', JSON.stringify(settings));
      localStorage.setItem('deepdox_theme_mode', themeMode);
      if (!isStrictClientBookmark) {
        localStorage.setItem('deepdox_role_v5', role);
      }
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [projects, markers, settings, role, themeMode, isStrictClientBookmark]);

  // PROJECT STATS & MARKER FILTERING
  const getProjectStats = useCallback(
    (projectId) => {
      const list = markers.filter((m) => m.project_id === projectId);
      const total = list.length;
      const resolved = list.filter((m) => m.is_resolved).length;
      const pending = total - resolved;
      const percent = total === 0 ? 0 : Math.round((resolved / total) * 100);
      const isComplete = total > 0 && resolved === total;
      return { total, resolved, pending, percent, isComplete };
    },
    [markers]
  );

  const activeStats = useMemo(
    () => getProjectStats(activeProject?.id),
    [getProjectStats, activeProject?.id]
  );

  const projectMarkers = useMemo(() => {
    if (!activeProject) return [];
    return markers
      .filter((m) => m.project_id === activeProject.id)
      .sort((a, b) => Number(a.timestamp_seconds) - Number(b.timestamp_seconds));
  }, [markers, activeProject]);

  // POINT 5: VERSION-SPECIFIC TIMESTAMP COMMENTS & FEEDBACK FILTERING
  const filteredMarkers = useMemo(() => {
    let list = projectMarkers;
    if (selectedVersionFilter !== 'all') {
      list = list.filter((m) => {
        if (!m.version_id) {
          return selectedVersionFilter === activeProject?.versions?.[0]?.id;
        }
        return m.version_id === selectedVersionFilter;
      });
    }
    if (markerFilter === 'pending') list = list.filter((m) => !m.is_resolved);
    if (markerFilter === 'resolved') list = list.filter((m) => m.is_resolved);
    return list;
  }, [projectMarkers, selectedVersionFilter, markerFilter, activeProject?.versions]);

  const syncUploadModalWithActiveProject = useCallback(() => {
    if (!activeProject) return;
    setSourceUpdateForm({
      title: activeProject.title || '',
      client_name: activeProject.client_name || 'Sepand Studios',
      status_label: activeProject.status_label || 'Status: In Revision / Fixing Notes',
      source_type: activeVersion?.source_type || activeProject.source_type || 'r2',
      r2Url:
        activeVersion?.r2Url ||
        activeProject.r2Url ||
        DEMO_FALLBACK_MP4,
      driveUrl:
        activeVersion?.driveUrl ||
        activeProject.driveUrl ||
        'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
      youtubeUrl: activeVersion?.youtubeUrl || activeProject.youtubeUrl || '',
      version_label: activeVersion?.version_label || activeProject.version_label || 'Version 1.0',
      client_email: activeProject.client_email || '',
      client_whatsapp: activeProject.client_whatsapp || ''
    });
  }, [activeProject, activeVersion]);

  useEffect(() => {
    setVideoError(false);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setLockedTimestamp(null);
    setIsEditingTimecode(false);
    setSelectedVersionFilter('all');
    setIsDrawingMode(false);
    setHasDrawnOnCanvas(false);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    setEditingTitle(false);
    setEditingVersion(false);
    setEditingDeadline(false);
    setEditingReplyId(null);
    setNewCommentAttachment(null);
    setNewCommentAttachmentName(null);
    syncUploadModalWithActiveProject();
  }, [activeProject?.id, activeVersion?.id, syncUploadModalWithActiveProject]);

  // PROJECT SELECTION & VIEW SWITCHING ROUTER
  const handleSelectProject = useCallback((projectId, targetView = 'review', versionId = null) => {
    if (!projectId) return;

    setActiveProjectId(projectId);
    if (versionId) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id !== projectId) return p;
          const targetVer = (p.versions || []).find((v) => v.id === versionId);
          return {
            ...p,
            active_version_id: versionId,
            version_label: targetVer?.version_label || p.version_label
          };
        })
      );
    }
    if (targetView) {
      setCurrentView(targetView);
    }

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('project', projectId);
      if (targetView) {
        url.searchParams.set('view', targetView);
      }
      window.history.pushState({ projectId, view: targetView }, '', url.toString());
    } catch {
      // In case history API is restricted
    }

    const targetProj = projects.find((p) => p.id === projectId);
    if (targetProj) {
      const label = targetProj.tab_label || 'Video';
      showToast(`Opened ${label}: ${targetProj.title}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projects, showToast]);

  // BROWSER BACK / FORWARD NAVIGATION ROUTER LISTENER
  useEffect(() => {
    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      const viewParam = p.get('view');
      const projParam = p.get('project');

      if (viewParam === 'landing') {
        setCurrentView('landing');
      } else if (viewParam === 'review' || projParam || isStrictClientBookmark) {
        setCurrentView('review');
      }

      if (projParam && projects.some((pr) => pr.id === projParam)) {
        setActiveProjectId(projParam);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [projects, isStrictClientBookmark]);

  // POINT 1: INLINE PROJECT EDITING ACTIONS
  const handleSaveInlineTitle = () => {
    if (!titleDraft.trim()) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProject.id ? { ...p, title: titleDraft.trim() } : p))
    );
    setEditingTitle(false);
    showToast(`Updated project title to "${titleDraft.trim()}"`);
  };

  const handleSaveInlineVersion = () => {
    if (!versionDraft.trim()) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProject?.id) return p;
        const updatedVersions = (p.versions || []).map((v) =>
          v.id === p.active_version_id ? { ...v, version_label: versionDraft.trim() } : v
        );
        return {
          ...p,
          version_label: versionDraft.trim(),
          versions: updatedVersions
        };
      })
    );
    setEditingVersion(false);
    showToast(`Updated active video label to "${versionDraft.trim()}"`);
  };

  const handleUpdateDeadline = (newDate) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProject.id ? { ...p, deadline: newDate } : p))
    );
    setEditingDeadline(false);
    showToast(`Deadline updated to ${formatDeadlineDisplay(newDate)}`);
  };

  // POINT 4: VERSION MANAGEMENT & SOURCE ENGINE ACTIONS
  const handleSwitchActiveVersion = (verId) => {
    const targetVer = activeProject?.versions?.find((v) => v.id === verId);
    if (!targetVer) return;
    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProject.id
          ? {
              ...p,
              active_version_id: verId,
              version_label: targetVer.version_label
            }
          : p
      )
    );
    setSelectedVersionFilter(verId);
    setCurrentTime(0);
    setIsPlaying(false);
    setVideoError(false);
    showToast(`Switched active video to ${targetVer.version_label}`);
  };

  const handleSwitchSourceView = (sourceMode) => {
    if (!activeProject) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProject.id) return p;
        const currentVerId = activeVersion?.id || p.active_version_id;
        const updatedVersions = (p.versions || []).map((v) => {
          if (v.id !== currentVerId) return v;
          let r2Url = v.r2Url;
          let driveUrl = v.driveUrl;
          let youtubeUrl = v.youtubeUrl;
          if (sourceMode === 'r2' && !r2Url) {
            r2Url = p.r2Url || DEMO_FALLBACK_MP4;
          }
          if (sourceMode === 'gdrive' && !driveUrl) {
            driveUrl = p.driveUrl || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';
          }
          if (sourceMode === 'youtube' && !youtubeUrl) {
            youtubeUrl = p.youtubeUrl || 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
          }
          return {
            ...v,
            source_type: sourceMode,
            r2Url,
            driveUrl,
            youtubeUrl
          };
        });
        return {
          ...p,
          source_type: sourceMode,
          versions: updatedVersions
        };
      })
    );
    const modeNames = {
      r2: 'Cloudflare View (Direct MP4 Stream)',
      gdrive: 'Drive View (Google Preview)',
      youtube: 'YouTube View (Embed Player)'
    };
    showToast(`Switched to ${modeNames[sourceMode] || sourceMode}`);
  };

  const handleAddNewVersion = (e) => {
    e.preventDefault();
    const nextVerIndex = (activeProject?.versions?.length || 0) + 1;
    const resolvedLabel = newVideoName.trim() || `Version ${nextVerIndex}`;
    const createdVer = {
      id: `ver_${Date.now()}`,
      version_label: resolvedLabel,
      source_type: newVideoSourceType,
      r2Url: newVideoSourceType === 'r2' ? newVideoUrl.trim() || DEMO_FALLBACK_MP4 : '',
      driveUrl: newVideoSourceType === 'gdrive' ? newVideoUrl.trim() : '',
      youtubeUrl: newVideoSourceType === 'youtube' ? newVideoUrl.trim() : '',
      created_at: new Date().toISOString()
    };

    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProject.id
          ? {
              ...p,
              versions: [...(p.versions || []), createdVer],
              active_version_id: createdVer.id,
              version_label: createdVer.version_label
            }
          : p
      )
    );
    setNewVideoName('');
    setNewVideoUrl('');
    setShowUploadSourceModal(false);
    setSelectedVersionFilter(createdVer.id);
    showToast(`Added new video: ${createdVer.version_label}`);
  };

  const handleDeleteVersion = (verId) => {
    if (!activeProject?.versions || activeProject.versions.length <= 1) {
      showToast('Cannot delete the only video in this project.', 'error');
      return;
    }
    const remaining = activeProject.versions.filter((v) => v.id !== verId);
    const newActiveId =
      activeProject.active_version_id === verId ? remaining[0].id : activeProject.active_version_id;
    const targetVer = remaining.find((v) => v.id === newActiveId);

    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProject.id
          ? {
              ...p,
              versions: remaining,
              active_version_id: newActiveId,
              version_label: targetVer?.version_label || p.version_label
            }
          : p
      )
    );
    showToast('Video deleted successfully.');
  };

  // POINT 12: 1-SECOND SKIP PRECISION
  const skipSeconds = useCallback((delta) => {
    if (!videoRef.current || isNaN(videoRef.current.duration)) return;
    const newTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + delta));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    if (compareVideoRef.current && !isNaN(compareVideoRef.current.duration)) {
      compareVideoRef.current.currentTime = newTime;
    }
    setSkipFeedback(delta > 0 ? `+${delta}s` : `${delta}s`);
    setTimeout(() => setSkipFeedback(null), 500);
  }, []);

  const seekTo = (seconds) => {
    const targetSec = Math.max(0, Number(seconds) || 0);
    setCurrentTime(targetSec);
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = targetSec;
      } catch {}
    }
    if (compareVideoRef.current) {
      try {
        compareVideoRef.current.currentTime = targetSec;
      } catch {}
    }
  };

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      if (compareVideoRef.current) {
        compareVideoRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
      setSkipFeedback('play');
    } else {
      videoRef.current.pause();
      if (compareVideoRef.current) {
        compareVideoRef.current.pause();
      }
      setIsPlaying(false);
      setSkipFeedback('pause');
    }
    setTimeout(() => setSkipFeedback(null), 500);
  }, []);

  // POINT 11: DEDICATED VOLUME SLIDER CONTROL BAR
  const handleVolumeChange = (val) => {
    const clean = Math.max(0, Math.min(1, val));
    setVolume(clean);
    setIsMuted(clean === 0);
    if (videoRef.current) {
      videoRef.current.volume = clean;
      videoRef.current.muted = clean === 0;
    }
    if (compareVideoRef.current) {
      if (comparisonAudioTrack === 'right') {
        compareVideoRef.current.volume = clean;
        compareVideoRef.current.muted = clean === 0;
      }
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (videoRef.current) {
      videoRef.current.muted = nextMute;
    }
    if (compareVideoRef.current) {
      compareVideoRef.current.muted = nextMute;
    }
    showToast(nextMute ? 'Muted audio' : 'Unmuted audio');
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    if (compareVideoRef.current) {
      compareVideoRef.current.playbackRate = speed;
    }
    setSkipFeedback(`${speed}x`);
    setTimeout(() => setSkipFeedback(null), 500);
  };

  // Keyboard controls with 1s step precision
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowUploadSourceModal(false);
        setShowNewProjectModal(false);
        setShowSettingsModal(false);
        setShowNotifyModal(false);
        setShowCloudflareGuideModal(false);
        setLightboxImage(null);
        setEditingTitle(false);
        setEditingVersion(false);
        setEditingDeadline(false);
        setIsEditingTimecode(false);
        setIsDrawingMode(false);
        setEditingReplyId(null);
        return;
      }

      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowLeft' || e.key.toLowerCase() === 'j') {
        e.preventDefault();
        skipSeconds(-1);
      } else if (e.code === 'ArrowRight' || e.key.toLowerCase() === 'l') {
        e.preventDefault();
        skipSeconds(1);
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlayPause, skipSeconds, toggleMute]);

  // Video hover zone tracking
  const handleVideoMouseMove = (e) => {
    if (videoEngine.mode !== 'r2') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    if (relX < 0.22) {
      setHoverZone('left');
    } else if (relX > 0.78) {
      setHoverZone('right');
    } else {
      setHoverZone('center');
    }
  };

  const handleVideoSurfaceClick = (e) => {
    if (videoEngine.mode !== 'r2' || isDrawingMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    if (relX < 0.22) {
      skipSeconds(-1);
    } else if (relX > 0.78) {
      skipSeconds(1);
    } else {
      togglePlayPause();
    }
  };

  // Timeline scrubber
  const updateScrubFromEvent = (clientX) => {
    if (videoEngine.mode !== 'r2' || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = clickX / rect.width;
    const targetDur = duration > 0 ? duration : 100;
    seekTo(pct * targetDur);
  };

  const handleTimelineMouseDown = (e) => {
    setIsTimelineDragging(true);
    updateScrubFromEvent(e.clientX);
  };

  useEffect(() => {
    if (!isTimelineDragging) return;
    const handleMouseMove = (e) => updateScrubFromEvent(e.clientX);
    const handleMouseUp = () => setIsTimelineDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTimelineDragging]);

  const handleTimelineHover = (e) => {
    if (!timelineRef.current || duration <= 0) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const posX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = posX / rect.width;
    setTimelineHoverPos(posX);
    setTimelineHoverTime(pct * duration);
  };

  const toggleFullscreen = () => {
    const container = playerContainerRef.current;
    const video = videoRef.current;
    if (!container) return;

    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (video && video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  // POINT 10: PAUSED-FRAME CANVAS DRAWING LOGIC
  const startDrawing = (e) => {
    if (!isDrawingMode || isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawLineWidth * scaleX;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
    setHasDrawnOnCanvas(true);
  };

  const draw = (e) => {
    if (!isDrawing || !isDrawingMode || isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnOnCanvas(false);
    showToast('Cleared canvas drawing');
  };

  // POINT 9: ATTACHMENT SELECTION
  const handleAttachmentSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file (PNG, JPG, WEBP)', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      setNewCommentAttachment(evt.target.result);
      setNewCommentAttachmentName(file.name);
      showToast(`Attached image: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Comment input auto-locking
  const handleCommentFocus = () => {
    if (lockedTimestamp === null && videoEngine.mode === 'r2') {
      const snap = Number(currentTime.toFixed(1));
      setLockedTimestamp(snap);
      setManualTimecodeInput(formatTimecode(snap, false));
    }
  };

  const handleToggleLockTimestamp = () => {
    if (lockedTimestamp !== null) {
      setLockedTimestamp(null);
      setIsEditingTimecode(false);
      showToast('Timestamp unlocked. Tracks live playhead.');
    } else {
      const snap = Number(currentTime.toFixed(1));
      setLockedTimestamp(snap);
      setManualTimecodeInput(formatTimecode(snap, false));
      showToast(`Timestamp locked at ${formatTimecode(snap, false)}`);
    }
  };

  // POSTING NEW FEEDBACK NOTE (WITH DRAWING & ATTACHMENT)
  const handleAddMarker = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeProject) return;

    let stamp = lockedTimestamp !== null ? lockedTimestamp : Number(currentTime.toFixed(1));
    if (isEditingTimecode && manualTimecodeInput) {
      stamp = parseTimecodeToSeconds(manualTimecodeInput);
    }

    let drawingData = null;
    if (hasDrawnOnCanvas && canvasRef.current) {
      drawingData = canvasRef.current.toDataURL('image/png');
    }

    const createdMarker = {
      id: `m_${Date.now()}`,
      project_id: activeProject.id,
      version_id: activeVersion?.id || activeProject.versions?.[0]?.id || 'ver_1',
      version_label: activeVersion?.version_label || activeProject.version_label || 'Version 1.0',
      timestamp_seconds: Math.max(0, Number(stamp.toFixed(1))),
      category: newCommentCategory,
      client_comment: newCommentText.trim(),
      attachment_url: newCommentAttachment || null,
      drawing_data: drawingData,
      is_resolved: false,
      editor_reply: '',
      created_at: new Date().toISOString()
    };

    setMarkers((prev) => [...prev, createdMarker]);
    setNewCommentText('');
    setNewCommentAttachment(null);
    setNewCommentAttachmentName(null);
    setLockedTimestamp(null);
    setIsEditingTimecode(false);
    setIsDrawingMode(false);
    clearCanvas();
    showToast(`Feedback note posted for ${createdMarker.version_label} at ${formatTimecode(createdMarker.timestamp_seconds)}`);
  };

  // Clicking a marker jumps to timecode & renders saved canvas drawing
  const handleSeekToMarker = (marker) => {
    if (marker.version_id && marker.version_id !== activeProject?.active_version_id) {
      const targetVer = activeProject?.versions?.find((v) => v.id === marker.version_id);
      if (targetVer) {
        handleSwitchActiveVersion(marker.version_id);
      }
    }
    seekTo(marker.timestamp_seconds);
    if (marker.drawing_data && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setHasDrawnOnCanvas(true);
      };
      img.src = marker.drawing_data;
    } else if (canvasRef.current) {
      clearCanvas();
    }
  };

  const handleToggleResolve = (markerId) => {
    const target = markers.find((m) => m.id === markerId);
    if (!target) return;
    const nextState = !target.is_resolved;

    const updatedMarkers = markers.map((m) =>
      m.id === markerId ? { ...m, is_resolved: nextState } : m
    );
    setMarkers(updatedMarkers);

    const projList = updatedMarkers.filter((m) => m.project_id === activeProject?.id);
    const allResolved = projList.length > 0 && projList.every((m) => m.is_resolved);

    if (nextState && allResolved) {
      showToast(
        '100% Complete! Tab turned Green. Click NOTIFY CLIENT to send completion alert.',
        'milestone'
      );
    } else {
      showToast(nextState ? 'Marked Fixed silently ✓' : 'Re-opened note as Pending');
    }
  };

  const handleStartEditorReply = (marker) => {
    setEditingReplyId(marker.id);
    setReplyDraftText(marker.editor_reply || '');
  };

  const handleSaveEditorReply = (markerId) => {
    setMarkers((prev) =>
      prev.map((m) =>
        m.id === markerId ? { ...m, editor_reply: replyDraftText.trim() } : m
      )
    );
    setEditingReplyId(null);
    setReplyDraftText('');
    showToast('Editor reply saved!');
  };

  const handleDeleteEditorReply = (markerId) => {
    setMarkers((prev) =>
      prev.map((m) => (m.id === markerId ? { ...m, editor_reply: '' } : m))
    );
    showToast('Editor reply cleared');
  };

  const handleDeleteMarker = (markerId) => {
    setMarkers((prev) => prev.filter((m) => m.id !== markerId));
    showToast('Feedback note removed');
  };

  // SWITCHING SOURCE TYPES IN ACTIVE VERSION
  const handleUpdateProjectSource = (e) => {
    e.preventDefault();
    const cleanR2 =
      sourceUpdateForm.r2Url.trim() ||
      activeVersion?.r2Url ||
      DEMO_FALLBACK_MP4;
    const cleanDrive =
      sourceUpdateForm.driveUrl.trim() ||
      activeVersion?.driveUrl ||
      'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';
    const cleanYoutube = sourceUpdateForm.youtubeUrl.trim() || activeVersion?.youtubeUrl || '';

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProject?.id) return p;
        const updatedVersions = (p.versions || []).map((v) => {
          if (v.id === p.active_version_id) {
            return {
              ...v,
              source_type: sourceUpdateForm.source_type,
              r2Url: cleanR2,
              driveUrl: cleanDrive,
              youtubeUrl: cleanYoutube,
              version_label: sourceUpdateForm.version_label.trim() || v.version_label
            };
          }
          return v;
        });

        return {
          ...p,
          title: sourceUpdateForm.title.trim() || p.title,
          client_name: sourceUpdateForm.client_name.trim() || p.client_name,
          status_label: sourceUpdateForm.status_label.trim() || p.status_label,
          source_type: sourceUpdateForm.source_type,
          r2Url: cleanR2,
          driveUrl: cleanDrive,
          youtubeUrl: cleanYoutube,
          video_url:
            sourceUpdateForm.source_type === 'youtube'
              ? cleanYoutube
              : sourceUpdateForm.source_type === 'gdrive'
              ? cleanDrive
              : cleanR2,
          version_label: sourceUpdateForm.version_label.trim() || p.version_label,
          client_email: sourceUpdateForm.client_email.trim(),
          client_whatsapp: sourceUpdateForm.client_whatsapp.trim(),
          versions: updatedVersions
        };
      })
    );

    setShowUploadSourceModal(false);
    showToast('Updated project video source & info!');
  };

  // LOCAL VIDEO UPLOAD HANDLERS
  const handleLocalVideoFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localBlobUrl = URL.createObjectURL(file);
    setSourceUpdateForm((prev) => ({
      ...prev,
      source_type: 'r2',
      r2Url: localBlobUrl
    }));
    showToast(`Loaded local file "${file.name}" for testing`);
  };

  const handleNewProjectLocalVideoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localBlobUrl = URL.createObjectURL(file);
    setNewProjectForm((prev) => ({
      ...prev,
      source_type: 'r2',
      r2Url: localBlobUrl
    }));
    showToast(`Loaded local file "${file.name}" for new project`);
  };

  const handleNewVideoLocalSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localBlobUrl = URL.createObjectURL(file);
    setNewVideoSourceType('r2');
    setNewVideoUrl(localBlobUrl);
    showToast(`Loaded local file "${file.name}" for new video version`);
  };

  const handleLogoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Data = uploadEvent.target?.result;
      if (base64Data) {
        setSettings((prev) => ({ ...prev, studioLogo: base64Data }));
        showToast('Logo & Browser Tab Favicon updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectForm.title.trim()) return;

    const newProjId = `proj_${Date.now()}`;
    const initialVideoVersion = {
      id: `ver_${Date.now()}_1`,
      version_label: newProjectForm.version_label.trim() || 'Version 1.0',
      source_type: newProjectForm.source_type,
      r2Url:
        newProjectForm.source_type === 'r2'
          ? newProjectForm.r2Url.trim() || DEMO_FALLBACK_MP4
          : '',
      driveUrl:
        newProjectForm.source_type === 'gdrive'
          ? newProjectForm.driveUrl.trim() || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view'
          : '',
      youtubeUrl:
        newProjectForm.source_type === 'youtube'
          ? newProjectForm.youtubeUrl.trim()
          : '',
      created_at: new Date().toISOString()
    };

    const created = {
      id: newProjId,
      tab_number: projects.length + 1,
      tab_label: `Project ${projects.length + 1}`,
      title: newProjectForm.title.trim(),
      client_name: newProjectForm.client_name.trim() || 'Client Workspace',
      version_label: initialVideoVersion.version_label,
      active_version_id: initialVideoVersion.id,
      versions: [initialVideoVersion],
      status_label: 'Status: Client Review Active',
      source_type: newProjectForm.source_type,
      r2Url: initialVideoVersion.r2Url,
      driveUrl: initialVideoVersion.driveUrl,
      youtubeUrl: initialVideoVersion.youtubeUrl,
      video_url:
        newProjectForm.source_type === 'youtube'
          ? initialVideoVersion.youtubeUrl
          : newProjectForm.source_type === 'gdrive'
          ? initialVideoVersion.driveUrl
          : initialVideoVersion.r2Url,
      deadline: newProjectForm.deadline,
      client_email: newProjectForm.client_email.trim(),
      client_whatsapp: newProjectForm.client_whatsapp.trim(),
      created_at: new Date().toISOString()
    };

    setProjects((prev) => [...prev, created]);
    setActiveProjectId(created.id);
    setShowNewProjectModal(false);
    showToast(`Created ${created.tab_label}: ${created.title}`);
  };

  const handleDeleteProject = (e, targetId) => {
    e.stopPropagation();
    if (projects.length <= 1) {
      showToast('Cannot delete the last remaining project workspace.', 'error');
      return;
    }
    const remainingProjects = projects.filter((p) => p.id !== targetId);
    const reindexedProjects = remainingProjects.map((p, idx) => ({
      ...p,
      tab_number: idx + 1,
      tab_label: `Project ${idx + 1}`
    }));

    if (activeProjectId === targetId) {
      setActiveProjectId(reindexedProjects[0].id);
    }
    setProjects(reindexedProjects);
    setMarkers((prev) => prev.filter((m) => m.project_id !== targetId));
    showToast('Project deleted successfully.');
  };

  const handleResetDemoData = () => {
    setProjects(INITIAL_PROJECTS.map(normalizeProject));
    setMarkers(INITIAL_MARKERS);
    setSettings(DEFAULT_SETTINGS);
    setActiveProjectId(INITIAL_PROJECTS[0].id);
    setShowSettingsModal(false);
    showToast('Reset all studio settings & projects to default');
  };

  // Bookmark Review URL Helper
  const getClientBookmarkLink = () => {
    const base = window.location.origin + window.location.pathname;
    return `${base}?view=client&project=${activeProject?.id || ''}`;
  };

  const copyClientBookmarkLink = () => {
    const link = getClientBookmarkLink();
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(link).catch(() => {
        try {
          const ta = document.createElement('textarea');
          ta.value = link;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        } catch {}
      });
    }
    showToast('Client Bookmark Link copied to clipboard!');
  };

  // Export Notes for DaVinci / Premiere
  const handleExportNotes = () => {
    if (!projectMarkers.length) {
      showToast('No feedback notes to export.', 'error');
      return;
    }
    let content = `=======================================================\n`;
    content += `${settings.studioName || 'DeepDox'} — Feedback Notes Export\n`;
    content += `Project: ${activeProject?.title} (${activeVersion?.version_label || activeProject?.version_label})\n`;
    content += `Client: ${activeProject?.client_name}\n`;
    content += `Deadline: ${formatDeadlineDisplay(activeProject?.deadline)}\n`;
    content += `Date Exported: ${new Date().toLocaleString()}\n`;
    content += `Completion: ${activeStats.percent}% (${activeStats.resolved}/${activeStats.total} Fixed)\n`;
    content += `=======================================================\n\n`;

    projectMarkers.forEach((m, idx) => {
      content += `[#${idx + 1}] TIME: ${formatTimecode(m.timestamp_seconds, true)} | VIDEO: ${m.version_label || 'v1'} | CATEGORY: ${m.category} | STATUS: ${
        m.is_resolved ? 'FIXED' : 'PENDING'
      }\n`;
      content += `CLIENT NOTE: "${m.client_comment}"\n`;
      if (m.editor_reply) {
        content += `EDITOR REPLY: "${m.editor_reply}"\n`;
      }
      if (m.attachment_url) {
        content += `ATTACHMENT: [Embedded Image Reference]\n`;
      }
      if (m.drawing_data) {
        content += `ANNOTATION: [Canvas Frame Overlay Included]\n`;
      }
      content += `-------------------------------------------------------\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(activeProject?.title || 'project').replace(/[^a-zA-Z0-9_-]/g, '_')}_notes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded feedback notes summary (.txt)');
  };

  const openNotifyCenter = () => {
    const link = getClientBookmarkLink();
    const statusHeader = activeStats.isComplete
      ? `✅ 100% COMPLETE — Ready for Final Sign-Off!`
      : `🎬 Revision Progress Update: ${activeStats.percent}% Complete`;

    const summary = `${statusHeader}\n\n• Project: ${activeProject?.title} (${activeVersion?.version_label || activeProject?.version_label})\n• Client: ${activeProject?.client_name}\n• Notes Fixed: ${activeStats.resolved} of ${activeStats.total} (${activeStats.pending} Open)\n• Deadline: ${formatDeadlineDisplay(
      activeProject?.deadline
    )}\n\nReview & Approve online here:\n${link}`;

    setNotifyForm({
      clientEmail: activeProject?.client_email || '',
      clientWhatsapp: activeProject?.client_whatsapp || '',
      customMessage: summary
    });
    setShowNotifyModal(true);
  };

  const handleSendEmailNotification = async () => {
    if (!notifyForm.clientEmail.trim()) {
      showToast('Please enter a Client Email address', 'error');
      return;
    }
    setIsSendingEmail(true);
    try {
      const payload = {
        service_id: settings.emailjsServiceId,
        template_id: settings.emailjsTemplateId,
        user_id: settings.emailjsPublicKey,
        template_params: {
          to_email: notifyForm.clientEmail.trim(),
          to_name: activeProject?.client_name || 'Client',
          from_name: settings.studioName || 'DeepDox',
          project_title: activeProject?.title,
          completion_percent: `${activeStats.percent}%`,
          message: notifyForm.customMessage,
          review_link: getClientBookmarkLink()
        }
      };

      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === activeProject?.id ? { ...p, client_email: notifyForm.clientEmail.trim() } : p
          )
        );
        showToast(`Email update sent to ${notifyForm.clientEmail}!`);
      } else {
        openMailClientFallback();
      }
    } catch {
      openMailClientFallback();
    } finally {
      setIsSendingEmail(false);
    }
  };

  const openMailClientFallback = () => {
    const subject = `[${settings.studioName || 'DeepDox'}] ${activeProject?.title} — ${activeStats.percent}% Complete`;
    const mailto = `mailto:${encodeURIComponent(notifyForm.clientEmail.trim())}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(notifyForm.customMessage)}`;
    window.location.href = mailto;
    showToast('Opened Mail application with progress summary!');
  };

  const handleSendWhatsAppNotification = () => {
    const cleanedPhone = (notifyForm.clientWhatsapp || '').replace(/[^0-9]/g, '');
    if (notifyForm.clientWhatsapp.trim()) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeProject?.id
            ? { ...p, client_whatsapp: notifyForm.clientWhatsapp.trim() }
            : p
        )
      );
    }
    const encodedText = encodeURIComponent(notifyForm.customMessage);
    const waUrl = cleanedPhone
      ? `https://wa.me/${cleanedPhone}?text=${encodedText}`
      : `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Opened WhatsApp with project progress & review link!');
  };

  const handleLoadedMetadata = (e) => {
    const v = e.currentTarget;
    if (v.duration && !isNaN(v.duration)) {
      setDuration(v.duration);
    }
    if (v.videoWidth && v.videoHeight) {
      const isVert = v.videoHeight > v.videoWidth;
      setDetectedVideoAspect(isVert ? 'vertical' : 'horizontal');
    }
    v.playbackRate = playbackSpeed;
    v.volume = volume;
    v.muted = isMuted;
    setVideoError(false);
  };

  // POINT 7: SMART DYNAMIC 9:16 VERTICAL VIDEO REFLOWING
  const isVertical = useMemo(() => {
    if (videoAspectRatio === 'vertical') return true;
    if (videoAspectRatio === 'horizontal') return false;
    return detectedVideoAspect === 'vertical';
  }, [videoAspectRatio, detectedVideoAspect]);

  const activeAspectClass = useMemo(() => {
    if (isVertical) return 'aspect-[9/16] max-w-xs sm:max-w-sm mx-auto shadow-2xl';
    return 'aspect-video w-full';
  }, [isVertical]);

  // Comparison Version Resolution
  const compVersionLeft = useMemo(() => {
    return (
      activeProject?.versions?.find((v) => v.id === compareVersionLeftId) ||
      activeProject?.versions?.[0] ||
      activeVersion
    );
  }, [activeProject, compareVersionLeftId, activeVersion]);

  const compVersionRight = useMemo(() => {
    return (
      activeProject?.versions?.find((v) => v.id === compareVersionRightId) ||
      activeProject?.versions?.[1] ||
      activeProject?.versions?.[0] ||
      activeVersion
    );
  }, [activeProject, compareVersionRightId, activeVersion]);

  const compEngineLeft = useMemo(() => resolveVideoEngine(activeProject, compVersionLeft), [
    activeProject,
    compVersionLeft
  ]);
  const compEngineRight = useMemo(() => resolveVideoEngine(activeProject, compVersionRight), [
    activeProject,
    compVersionRight
  ]);

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          projects={projects}
          markers={markers}
          onSelectProject={(projectId, versionId) => handleSelectProject(projectId, 'review', versionId)}
          onOpenReview={(projectId, versionId) => handleSelectProject(projectId || projects[0]?.id, 'review', versionId)}
          onNewProject={() => {
            setCurrentView('review');
            setShowNewProjectModal(true);
          }}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
          studioSettings={settings}
          onToast={showToast}
        />
        {/* TOAST ALERTS ON LANDING VIEW */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce-once">
            <div
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-black backdrop-blur-xl ${
                toast.type === 'error'
                  ? 'bg-rose-500/95 text-white border-rose-400/50 shadow-rose-500/30'
                  : 'bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 border-white/20 dark:border-black/10 shadow-2xl shadow-purple-950/40'
              }`}
            >
              <Check className="w-4 h-4 shrink-0" />
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 pb-20 relative overflow-x-hidden ${
        themeMode === 'dark'
          ? 'dark bg-[#07080d] text-slate-100 selection:bg-[#6366F1] selection:text-white'
          : 'bg-[#FFFFFF] text-slate-900 selection:bg-[#6366F1] selection:text-white'
      }`}
    >
      {/* AMBIENT STUDIO LIGHTING MESH & ROYAL VIOLET GRADIENT ORBS */}
      {themeMode === 'dark' ? (
        <>
          <div className="fixed inset-0 ambient-grid opacity-30 pointer-events-none z-0" />
          <div className="fixed -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-[#6366F1]/15 blur-[150px] pointer-events-none z-0 animate-pulse-slow" />
          <div className="fixed top-10 -right-40 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/12 blur-[150px] pointer-events-none z-0 animate-pulse-slow" />
          <div className="fixed top-1/2 left-1/3 w-[550px] h-[550px] rounded-full bg-indigo-600/10 blur-[160px] pointer-events-none z-0" />
        </>
      ) : (
        <>
          <div className="fixed inset-0 ambient-grid-light opacity-60 pointer-events-none z-0" />
          <div className="fixed -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-[#6366F1]/[0.05] blur-[140px] pointer-events-none z-0" />
          <div className="fixed top-10 -right-32 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/[0.04] blur-[140px] pointer-events-none z-0" />
        </>
      )}

      {/* =========================================================================
          AGENT 1 & 2: DUAL-ZONE AESTHETIC - TOP NAVY PREMIUM ZONE (#101426)
          Encompasses: Header, Workspace Toolbar, Project Workspaces Bento Row, and Active Review Header
          ========================================================================= */}
      <div className="top-zone-navy text-white relative">
        {/* Subtle Organic Flowing Wave Vectors & Indigo/Orange Glow Backdrops */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg
            className="absolute inset-0 w-full h-full opacity-35"
            preserveAspectRatio="none"
            viewBox="0 0 1440 480"
            fill="none"
          >
            <path
              d="M-100 240 C 240 380, 520 160, 850 270 C 1180 380, 1320 180, 1560 250 L 1560 500 L -100 500 Z"
              fill="url(#topWaveNavy)"
            />
            <path
              d="M-50 320 C 300 190, 650 360, 980 230 C 1220 140, 1420 290, 1600 210 L 1600 500 L -50 500 Z"
              fill="url(#topWaveOrangeGlow)"
            />
            <defs>
              <linearGradient id="topWaveNavy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e2548" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#2e2150" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#151a30" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="topWaveOrangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4338ca" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#251648" stopOpacity="0.15" />
                <stop offset="90%" stopColor="#ea580c" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.35" />
              </linearGradient>
            </defs>
          </svg>
          {/* Atmospheric Glow Orbs */}
          <div className="absolute -top-20 -right-20 w-[550px] h-[550px] bg-gradient-to-bl from-orange-500/20 via-amber-500/10 to-transparent rounded-full blur-[130px]" />
          <div className="absolute bottom-4 right-1/4 w-[420px] h-[260px] bg-indigo-600/15 rounded-full blur-[110px]" />
        </div>

        {/* 1. TOP HEADER (DeepDox logo, title, Dark Studio, Role toggle, User avatar) */}
        <header className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 pt-5 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: DeepDox Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('landing');
                  try {
                    const url = new URL(window.location.href);
                    url.searchParams.set('view', 'landing');
                    url.searchParams.delete('project');
                    window.history.pushState({ view: 'landing' }, '', url.toString());
                  } catch {}
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
                title="DeepDox — Return to Projects Showcase"
              >
                {/* Orange Play Squircle Logo */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 shrink-0 group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-orange-300 transition-colors">
                    {settings.studioName || 'DeepDox'}
                  </span>
                  <span className="text-slate-600 font-light mx-0.5">|</span>
                  <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
                    {settings.studioSubName || 'Interactive Video Review & Client Portal'}
                  </span>
                </div>
              </button>
            </div>

            {/* Right: Dark Studio toggle, Role Switcher, Portrait Avatar */}
            <div className="flex items-center gap-3">
              {/* Theme Mode Toggle Button */}
              <button
                type="button"
                onClick={() => {
                  const nextTheme = themeMode === 'light' ? 'dark' : 'light';
                  setThemeMode(nextTheme);
                  showToast(
                    `Switched to ${nextTheme === 'dark' ? 'Dark Theme 🌙' : 'Light Theme ☀️'}`
                  );
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border bg-[#14182b] hover:bg-[#1a2039] text-slate-200 border-white/10"
              >
                {themeMode === 'light' ? (
                  <>
                    <span className="text-amber-500">🌙</span>
                    <span>Dark Studio</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </>
                ) : (
                  <>
                    <span className="text-amber-400">☀️</span>
                    <span>Light Studio</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </>
                )}
              </button>

              {/* Role Switcher */}
              {!isStrictClientBookmark ? (
                <div className="flex items-center p-1 rounded-xl border bg-black/40 border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setRole('editor');
                      showToast('Switched to Editor View');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black tracking-wide transition-all ${
                      role === 'editor'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>EDITOR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRole('client');
                      showToast('Switched to Client Workspace');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black tracking-wide transition-all ${
                      role === 'client'
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>CLIENT VIEW</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-orange-500/15 border border-orange-500/30 text-xs font-bold text-orange-400">
                  <Eye className="w-3.5 h-3.5" />
                  <span>CLIENT REVIEW</span>
                </div>
              )}

              {/* Circular User Portrait Avatar (Matching Reference Asset) */}
              <div className="shrink-0" title={`${settings.editorName || 'Editor'} • Lead Editor`}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Client & Editor Portrait Status"
                  className="w-9 h-9 rounded-full object-cover border-2 border-white/20 shadow-md ring-2 ring-orange-500/20"
                />
              </div>
            </div>
          </div>
        </header>

        {/* 2. ACTION TOOLBAR ROW (PROJECT WORKSPACES ▾, Cloudflare Guide, Export, Bookmark, Upload, Notify, Settings) */}
        <section className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 mt-2 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Project Workspaces Dropdown Pill */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNewProjectModal(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-black text-white transition-all shadow-sm group"
                title="Manage Project Workspaces"
              >
                <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
                  <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-[2px]" />
                  <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-[2px]" />
                  <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-[2px]" />
                  <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-[2px]" />
                </div>
                <span className="uppercase tracking-wider">PROJECT WORKSPACES ({projects.length})</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2">
              {!isStrictClientBookmark && (
                <button
                  type="button"
                  onClick={() => setShowCloudflareGuideModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all"
                  title="Cloudflare R2 Direct Streaming Setup"
                >
                  <Cloud className="w-3.5 h-3.5 text-slate-400" />
                  <span>Cloudflare Guide</span>
                </button>
              )}

              {!isStrictClientBookmark && (
                <button
                  type="button"
                  onClick={() => {
                    setUploadModalTab('source');
                    syncUploadModalWithActiveProject();
                    setShowUploadSourceModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all"
                  title="Upload new video version or change source"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-400" />
                  <span>Upload / Switch Video</span>
                </button>
              )}

              {!isStrictClientBookmark && (
                <button
                  type="button"
                  onClick={openNotifyCenter}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#fed7aa] hover:bg-[#fde68a] text-[#9a3412] text-xs font-black transition-all shadow-sm"
                  title="Notify client of review milestones & updates"
                >
                  <Bell className="w-3.5 h-3.5 fill-[#9a3412]" />
                  <span>Notify Client</span>
                </button>
              )}

              {!isStrictClientBookmark && (
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all relative"
                  title="Studio & Logo Settings"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Settings</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 ml-0.5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 3. PROJECT WORKSPACES CARDS (Matching Reference Asset: Project 1 Peach, Project 2 Mint, New Project) */}
        <section className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 mb-5">
          <div className="flex items-stretch gap-3.5 overflow-x-auto pb-2">
            {projects.map((proj, idx) => {
              const isSelected = proj.id === activeProject?.id;
              const stats = getProjectStats(proj.id);
              const shortLabel = proj.tab_label || `Project ${idx + 1}`;
              const cleanSubTitle = proj.title
                .split('—')[0]
                .replace(/^Project \d+:\s*/i, '')
                .trim();

              if (stats.isComplete) {
                // Card 2: Approved Pale Mint Green Card (Brand Anthem)
                return (
                  <div
                    key={proj.id}
                    onClick={() => handleSelectProject(proj.id, 'review')}
                    className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl min-w-[240px] cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#d1fae5] border-[#a7f3d0] ring-2 ring-emerald-500/50 shadow-lg'
                        : 'bg-[#d1fae5]/90 hover:bg-[#d1fae5] border-[#a7f3d0]/80 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                        ✓
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-[#064e3b]">{shortLabel}</span>
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#a7f3d0] text-[#065f46]">
                            APPROVED
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#064e3b] truncate max-w-[130px] mt-0.5">
                          {cleanSubTitle || proj.title}
                        </p>
                        <span className="text-[11px] font-extrabold text-[#047857] block mt-0.5">
                          {stats.percent}% Fixed ({stats.resolved}/{stats.total})
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {role === 'editor' && projects.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete ${shortLabel} (${cleanSubTitle || proj.title})?`)) {
                              handleDeleteProject(e, proj.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-black/10 hover:bg-rose-600 hover:text-white text-[#064e3b] transition-colors"
                          title={`Delete ${shortLabel}`}
                          aria-label={`Delete ${shortLabel}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-[#064e3b] text-xs font-bold">
                        ›
                      </div>
                    </div>
                  </div>
                );
              }

              // Card 1: Warm Peach / Terracotta Card for Project 1 (Active)
              return (
                <div
                  key={proj.id}
                  onClick={() => handleSelectProject(proj.id, 'review')}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl min-w-[240px] cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[#df9672] border-[#c8764e] ring-2 ring-orange-500/40 shadow-lg shadow-orange-950/40'
                      : 'bg-[#df9672]/90 hover:bg-[#df9672] border-[#c8764e]/80 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#f97316] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#201007]">{shortLabel}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/40 text-[#201007]">
                          {proj.version_label || 'Video v1.4'}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#201007] truncate max-w-[130px] mt-0.5">
                        {cleanSubTitle || proj.title}
                      </p>
                      <span className="text-[11px] font-extrabold text-[#3a1b0a] block mt-0.5">
                        {stats.total > 0
                          ? `${stats.percent}% Fixed (${stats.resolved}/${stats.total})`
                          : 'No notes yet'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {role === 'editor' && projects.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete ${shortLabel} (${cleanSubTitle || proj.title})?`)) {
                            handleDeleteProject(e, proj.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-black/10 hover:bg-rose-600 hover:text-white text-[#201007] transition-colors"
                        title={`Delete ${shortLabel}`}
                        aria-label={`Delete ${shortLabel}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-[#201007] text-xs font-bold">
                      ›
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Card 3: New Project Translucent Dashed Card */}
            {!isStrictClientBookmark && (
              <div
                onClick={() => setShowNewProjectModal(true)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-dashed border-white/20 hover:border-white/40 bg-[#13172b]/70 hover:bg-[#181d36] min-w-[210px] cursor-pointer transition-all shrink-0"
              >
                <div className="w-8 h-8 rounded-xl bg-[#ea580c] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
                  +
                </div>
                <div>
                  <span className="text-xs font-black text-white block">New Project</span>
                  <span className="text-[11px] text-slate-400 font-medium">Add video workspace</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. ACTIVE SONG HEADER & REVISION PROGRESS BENTO CARD */}
        <section className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 pb-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Project Title, Version Dropdown Pill, Video Badge, Deadline */}
            <div className="lg:col-span-7 space-y-3">
              {/* Inline Editable Project Title */}
              {editingTitle && role === 'editor' ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    autoFocus
                    value={titleDraft}
                    onChange={(e) => setTitleDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveInlineTitle();
                      if (e.key === 'Escape') setEditingTitle(false);
                    }}
                    className="text-3xl font-black rounded-xl px-4 py-1.5 focus:outline-none w-full max-w-lg bg-[#0F1426] text-white border-2 border-[#FF6B00]"
                  />
                  <button
                    type="button"
                    onClick={handleSaveInlineTitle}
                    className="p-2.5 rounded-xl bg-emerald-500 text-white font-bold"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTitle(false)}
                    className="p-2.5 rounded-xl bg-white/10 text-slate-300 font-bold"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="group/title flex items-center gap-3">
                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
                    {activeProject?.title}
                  </h1>
                  {role === 'editor' && (
                    <button
                      type="button"
                      onClick={() => {
                        setTitleDraft(activeProject?.title || '');
                        setEditingTitle(true);
                      }}
                      className="opacity-0 group-hover/title:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
                      title="Click to Edit Title"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Project Deadline */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {/* Deadline Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#14182b] border border-white/10 text-xs font-bold text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Deadline:</span>
                  {editingDeadline && role === 'editor' ? (
                    <span className="inline-flex items-center gap-1">
                      <input
                        type="date"
                        defaultValue={activeProject?.deadline || ''}
                        onChange={(e) => handleUpdateDeadline(e.target.value)}
                        className="text-xs rounded px-2 py-0.5 border border-orange-400 bg-[#0F1426] text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingDeadline(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <strong className="text-white">
                        {formatDeadlineDisplay(activeProject?.deadline)}
                      </strong>
                      {role === 'editor' && (
                        <button
                          type="button"
                          onClick={() => setEditingDeadline(true)}
                          className="text-amber-400 hover:text-amber-300 ml-0.5"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Revision Progress Widget */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="w-full max-w-md bg-[#161B2E] border border-white/10 rounded-2xl p-5 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                      REVISION PROGRESS
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">
                      {activeStats.resolved} of {activeStats.total} Fixes Resolved
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-[#FED7AA] text-[#9A3412] font-black text-xs">
                    {activeStats.percent}%
                  </div>
                </div>

                {/* Thick Vibrant Orange Progress Bar */}
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#FF6B00] shadow-[0_0_14px_rgba(255,107,0,0.6)] transition-all duration-500"
                    style={{ width: `${activeStats.percent}%` }}
                  />
                </div>

                {/* 3 Stat Counter Boxes */}
                <div className="grid grid-cols-3 gap-2.5 pt-0.5 text-center">
                  <div className="p-2.5 rounded-xl bg-[#0F1426] border border-white/5 flex items-center justify-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-black text-white">{activeStats.total}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">TOTAL NOTES</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span className="text-xs font-black">{activeStats.resolved}</span>
                    <span className="text-[9px] font-bold uppercase">FIXED</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#3E2313] border border-amber-600/30 flex items-center justify-center gap-1.5 text-amber-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-black">{activeStats.pending}</span>
                    <span className="text-[9px] font-bold uppercase">PENDING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div> {/* END TOP ZONE (#101426) */}

      {/* =========================================================================
          AGENT 3: BOTTOM ZONE — CLEAN WHITE WORKSPACE (#FFFFFF / #F8F9FA)
          Encompasses: Pill Navigation Bar, Video Player Console & Feedback Notes
          ========================================================================= */}
      <div className="bottom-zone-white border-t border-slate-200/90 text-slate-900 pt-4 sm:pt-5 pb-20 relative min-h-[600px]">
        {/* ===================================================================== */}
        {/* MAIN WORKSPACE SECTION                                                */}
        {/* ===================================================================== */}
        <main className="max-w-[1380px] mx-auto px-4 sm:px-8 relative z-20 space-y-6">

        {/* POINT 7: SMART DYNAMIC 9:16 REFLOWING GRID */}
        <div
          className={`grid gap-7 items-start ${
            isComparisonMode
              ? 'grid-cols-1'
              : videoLayoutMode === 'top-bottom'
              ? 'grid-cols-1'
              : 'grid-cols-1 lg:grid-cols-12'
          }`}
        >
          {/* VIDEO PLAYER COLUMN */}
          <div
            className={`${
              isComparisonMode
                ? 'w-full'
                : videoLayoutMode === 'top-bottom'
                ? 'w-full max-w-6xl mx-auto'
                : isFeedbackExpanded || isVertical
                ? 'lg:col-span-5'
                : 'lg:col-span-7'
            } rounded-[28px] transition-all duration-300 ${
              themeMode === 'dark'
                ? 'glass-panel-dark text-slate-100'
                : 'bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] text-slate-900'
            } p-4 sm:p-6`}
          >
            {/* VIDEO PLAYER HEADER BAR WITH MULTI-VERSION, COMPARISON & SOURCE VIEW TOGGLES */}
            <div
              className={`pb-4 mb-4 border-b space-y-3 ${
                themeMode === 'dark' ? 'border-white/[0.08]' : 'border-slate-200'
              }`}
            >
              {/* Row 1: Title, Active Version, Engine Badges, Workspace Layout & Aspect Ratio Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00] flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-[#FF6B00]" />
                    <span>
                      {isComparisonMode
                        ? 'Dual Comparison View'
                        : activeVersion?.version_label || activeProject?.version_label || 'Video Player'}
                    </span>
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-500/20">
                    {videoEngine.badge}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Layout Options: Side-by-Side vs Stacked (Icons only) */}
                  <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 shadow-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setVideoLayoutMode('side-by-side');
                        showToast('Layout: Side-by-Side (Video Left, Chat Right)');
                      }}
                      className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${
                        videoLayoutMode === 'side-by-side'
                          ? 'bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                      }`}
                      title="Side-by-Side Layout"
                      aria-label="Side-by-Side Layout"
                    >
                      <PanelRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVideoLayoutMode('top-bottom');
                        showToast('Layout: Stacked (Video Top, Chat Bottom)');
                      }}
                      className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${
                        videoLayoutMode === 'top-bottom'
                          ? 'bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                      }`}
                      title="Stacked Layout"
                      aria-label="Stacked Layout"
                    >
                      <PanelBottom className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Aspect Ratio Sleek Icon Controls */}
                  <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/10 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setVideoAspectRatio('auto')}
                      className={`p-1.5 rounded-lg transition-all ${
                        videoAspectRatio === 'auto'
                          ? 'bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                      title="Auto Aspect Ratio"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoAspectRatio('horizontal')}
                      className={`p-1.5 rounded-lg transition-all ${
                        videoAspectRatio === 'horizontal'
                          ? 'bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                      title="16:9 Landscape"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoAspectRatio('vertical')}
                      className={`p-1.5 rounded-lg transition-all ${
                        videoAspectRatio === 'vertical'
                          ? 'bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                      title="9:16 Reel"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                      activeStats.isComplete
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                        : 'bg-purple-500/15 text-purple-300 border-purple-400/30'
                    }`}
                  >
                    {activeProject?.status_label || 'Status: Active'}
                  </span>
                </div>
              </div>

              {/* Row 2: Version Buttons, 3 Source View Buttons & Dual Comparison Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* Left: Version Selector Buttons (Version 1, Version 2, etc.) */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Versions:</span>
                  </span>

                  {(activeProject?.versions || []).map((ver) => {
                    const isVerActive =
                      (activeVersion?.id || activeProject?.active_version_id) === ver.id;
                    const verMarkersCount = projectMarkers.filter(
                      (m) =>
                        m.version_id === ver.id ||
                        (!m.version_id && ver.id === activeProject?.versions?.[0]?.id)
                    ).length;

                    return (
                      <button
                        key={ver.id}
                        type="button"
                        onClick={() => {
                          handleSwitchActiveVersion(ver.id);
                          setSelectedVersionFilter(ver.id);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all ${
                          isVerActive
                            ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-500/30'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/[0.07] dark:text-slate-300 dark:hover:bg-white/15'
                        }`}
                        title={`Switch to ${ver.version_label} video and view its messages`}
                      >
                        <span>{ver.version_label}</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                            isVerActive
                              ? 'bg-black/20 text-white'
                              : 'bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {verMarkersCount}
                        </span>
                      </button>
                    );
                  })}

                  {/* All Messages Pill Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVersionFilter('all');
                      showToast('Showing all messages across all versions');
                    }}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                      selectedVersionFilter === 'all'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-white/[0.05] dark:text-slate-400'
                    }`}
                    title="Show all messages from every video version"
                  >
                    <span>All Messages</span>
                    <span className="text-[10px] font-semibold opacity-80">
                      ({projectMarkers.length})
                    </span>
                  </button>

                  {/* + New Version Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setUploadModalTab('versions');
                      setShowUploadSourceModal(true);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-500/10 hover:bg-orange-500/20 text-[#FF6B00] border border-orange-500/20 transition-all cursor-pointer"
                    title="Upload or link a new video version"
                  >
                    <Plus className="w-3 h-3" />
                    <span>New Version</span>
                  </button>
                </div>

                {/* Right: Three Source View Buttons + Dual Comparison Toggle */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 mr-1">
                    View:
                  </span>

                  {/* Cloudflare View */}
                  <button
                    type="button"
                    onClick={() => handleSwitchSourceView('r2')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all ${
                      videoEngine.mode === 'r2' && !isComparisonMode
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-400/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/[0.07] dark:text-slate-300 dark:hover:bg-white/15'
                    }`}
                    title="Switch to Cloudflare R2 direct stream (frame-accurate scrubbing & annotations)"
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Cloudflare View</span>
                  </button>

                  {/* Drive View */}
                  <button
                    type="button"
                    onClick={() => handleSwitchSourceView('gdrive')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all ${
                      videoEngine.mode === 'gdrive' && !isComparisonMode
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-400/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/[0.07] dark:text-slate-300 dark:hover:bg-white/15'
                    }`}
                    title="Switch to Google Drive preview player"
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Google Drive View</span>
                  </button>

                  {/* YouTube View */}
                  <button
                    type="button"
                    onClick={() => handleSwitchSourceView('youtube')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all ${
                      videoEngine.mode === 'youtube' && !isComparisonMode
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/25 ring-2 ring-red-400/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/[0.07] dark:text-slate-300 dark:hover:bg-white/15'
                    }`}
                    title="Switch to YouTube embed player"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>YouTube View</span>
                  </button>

                  {/* Dual Comparison Toggle Button */}
                  {activeProject?.versions && activeProject.versions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsComparisonMode(!isComparisonMode);
                        showToast(isComparisonMode ? 'Exited Dual Video Comparison' : 'Opened Dual Video Comparison Mode');
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black transition-all ${
                        isComparisonMode
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 ring-2 ring-purple-400/30'
                          : 'bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50 border border-purple-300/40'
                      }`}
                      title="Compare Version 1 & Version 2 side-by-side"
                    >
                      <Columns className="w-3.5 h-3.5" />
                      <span>{isComparisonMode ? 'Exit Compare' : 'Dual Compare'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* POINT 6: SIDE-BY-SIDE VIDEO COMPARISON SURFACE */}
            {isComparisonMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Player: Video A */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-purple-300 px-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                        <span>Video A:</span>
                        <select
                          value={compareVersionLeftId}
                          onChange={(e) => setCompareVersionLeftId(e.target.value)}
                          className="bg-[#221345] text-white text-xs font-extrabold rounded-lg px-2 py-1 border border-purple-800 focus:outline-none"
                        >
                          {(activeProject?.versions || []).map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.version_label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="text-[10px] font-mono">{compEngineLeft.badge}</span>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden bg-[#07070c] aspect-video flex items-center justify-center border border-purple-500/30">
                      {compEngineLeft.mode === 'gdrive' ? (
                        <iframe
                          src={compEngineLeft.embedUrl}
                          title="Left Comparison"
                          className="w-full h-full border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                        />
                      ) : compEngineLeft.mode === 'youtube' ? (
                        <iframe
                          src={compEngineLeft.embedUrl}
                          title="Left Comparison"
                          className="w-full h-full border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                        />
                      ) : (
                        <video
                          ref={videoRef}
                          src={compEngineLeft.streamUrl}
                          playsInline
                          muted={isMuted || comparisonAudioTrack === 'right'}
                          className="w-full h-full object-contain"
                          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                          onLoadedMetadata={handleLoadedMetadata}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Right Player: Video B */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-fuchsia-300 px-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400" />
                        <span>Video B:</span>
                        <select
                          value={compareVersionRightId}
                          onChange={(e) => setCompareVersionRightId(e.target.value)}
                          className="bg-[#221345] text-white text-xs font-extrabold rounded-lg px-2 py-1 border border-purple-800 focus:outline-none"
                        >
                          {(activeProject?.versions || []).map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.version_label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <span className="text-[10px] font-mono">{compEngineRight.badge}</span>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden bg-[#07070c] aspect-video flex items-center justify-center border border-fuchsia-500/30">
                      {compEngineRight.mode === 'gdrive' ? (
                        <iframe
                          src={compEngineRight.embedUrl}
                          title="Right Comparison"
                          className="w-full h-full border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                        />
                      ) : compEngineRight.mode === 'youtube' ? (
                        <iframe
                          src={compEngineRight.embedUrl}
                          title="Right Comparison"
                          className="w-full h-full border-0"
                          allow="autoplay; encrypted-media; fullscreen"
                        />
                      ) : (
                        <video
                          ref={compareVideoRef}
                          src={compEngineRight.streamUrl}
                          playsInline
                          muted={isMuted || comparisonAudioTrack === 'left'}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Audio Track Switcher for Comparison */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-950/40 border border-purple-800/60 text-xs">
                  <span className="font-bold text-purple-200">Comparison Audio Source:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setComparisonAudioTrack('left')}
                      className={`px-3 py-1 rounded-xl font-extrabold transition-all ${
                        comparisonAudioTrack === 'left'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      Listen to Video A
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonAudioTrack('right')}
                      className={`px-3 py-1 rounded-xl font-extrabold transition-all ${
                        comparisonAudioTrack === 'right'
                          ? 'bg-fuchsia-600 text-white'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      Listen to Video B
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonAudioTrack('mute')}
                      className={`px-3 py-1 rounded-xl font-extrabold transition-all ${
                        comparisonAudioTrack === 'mute'
                          ? 'bg-rose-600 text-white'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      Mute Both
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* STANDARD SINGLE VIDEO PLAYER SURFACE */
              <div
                ref={playerContainerRef}
                onMouseMove={handleVideoMouseMove}
                onMouseLeave={() => setHoverZone(null)}
                onClick={handleVideoSurfaceClick}
                className={`relative rounded-2xl overflow-hidden bg-[#07070c] ${activeAspectClass} flex items-center justify-center select-none cursor-pointer group shadow-inner transition-all duration-300`}
              >
                {/* Timecode Pill */}
                {videoEngine.mode === 'r2' && (
                  <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151226]/90 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-white pointer-events-none shadow-md">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                    <span>TC {formatTimecode(currentTime, true)}</span>
                  </div>
                )}

                {/* POINT 12: 1-SECOND SKIP HOVER ZONE CLUES (-1s / +1s) */}
                {videoEngine.mode === 'r2' && !isDrawingMode && hoverZone === 'left' && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none px-2.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1 border border-white/10">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>-1s</span>
                  </div>
                )}
                {videoEngine.mode === 'r2' && !isDrawingMode && hoverZone === 'right' && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none px-2.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1 border border-white/10">
                    <span>+1s</span>
                    <RotateCw className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Floating HUD overlay on skip / play / pause */}
                {skipFeedback && (
                  <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                    <div className="px-5 py-3 rounded-2xl bg-black/80 backdrop-blur-md text-white text-sm font-black flex items-center gap-2 border border-white/20 shadow-2xl scale-110 transition-transform">
                      {skipFeedback === 'play' && <Play className="w-5 h-5 fill-white" />}
                      {skipFeedback === 'pause' && <Pause className="w-5 h-5 fill-white" />}
                      {skipFeedback.includes('s') && (
                        <RotateCw className="w-5 h-5 text-fuchsia-300" />
                      )}
                      <span>{skipFeedback}</span>
                    </div>
                  </div>
                )}

                {/* POINT 10: PAUSED-FRAME CANVAS DRAWING TOOLBAR OVERLAY */}
                {videoEngine.mode === 'r2' && !isPlaying && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-4 right-4 z-30 flex items-center gap-2 p-1.5 rounded-2xl bg-[#120a26]/90 backdrop-blur-md border border-white/20 shadow-xl"
                  >
                    <button
                      type="button"
                      onClick={() => setIsDrawingMode(!isDrawingMode)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                        isDrawingMode
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                          : 'bg-white/10 text-purple-200 hover:text-white'
                      }`}
                      title="Annotate & draw on this frame"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>{isDrawingMode ? 'Drawing On' : 'Annotate Frame'}</span>
                    </button>

                    {isDrawingMode && (
                      <>
                        {/* Palette */}
                        <div className="flex items-center gap-1.5 pl-1.5 pr-1 border-l border-white/20">
                          {[
                            { color: '#facc15', label: 'Yellow' },
                            { color: '#ef4444', label: 'Red' },
                            { color: '#06b6d4', label: 'Cyan' },
                            { color: '#22c55e', label: 'Green' },
                            { color: '#ec4899', label: 'Pink' },
                            { color: '#ffffff', label: 'White' }
                          ].map((c) => (
                            <button
                              key={c.color}
                              type="button"
                              onClick={() => setDrawColor(c.color)}
                              className={`w-5 h-5 rounded-full transition-transform ${
                                drawColor === c.color
                                  ? 'scale-125 ring-2 ring-white shadow-md'
                                  : 'opacity-80 hover:opacity-100'
                              }`}
                              style={{ backgroundColor: c.color }}
                              title={c.label}
                            />
                          ))}
                        </div>

                        {/* Stroke Size */}
                        <div className="flex items-center gap-1 pl-1 pr-1 border-l border-white/20">
                          {[
                            { size: 2, label: 'Fine' },
                            { size: 4, label: 'Med' },
                            { size: 8, label: 'Thick' }
                          ].map((s) => (
                            <button
                              key={s.size}
                              type="button"
                              onClick={() => setDrawLineWidth(s.size)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                drawLineWidth === s.size
                                  ? 'bg-purple-600 text-white'
                                  : 'text-purple-200 hover:text-white'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>

                        {/* Clear Canvas */}
                        <button
                          type="button"
                          onClick={clearCanvas}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500 text-purple-200 hover:text-white transition-colors"
                          title="Clear drawing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* POINT 10: HTML5 CANVAS OVERLAY */}
                {videoEngine.mode === 'r2' && (
                  <canvas
                    ref={canvasRef}
                    width={1280}
                    height={720}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className={`absolute inset-0 w-full h-full z-20 ${
                      !isPlaying && isDrawingMode
                        ? 'pointer-events-auto cursor-crosshair'
                        : 'pointer-events-none'
                    }`}
                  />
                )}

                {/* VIDEO SOURCE RENDER */}
                {videoEngine.mode === 'gdrive' ? (
                  <iframe
                    src={videoEngine.embedUrl}
                    title={activeProject?.title}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                  />
                ) : videoEngine.mode === 'youtube' ? (
                  <iframe
                    src={videoEngine.embedUrl}
                    title={activeProject?.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      key={`${activeProject?.id}_${activeVersion?.id}_${videoEngine.streamUrl}_${useCorsAnonymous ? 'cors' : 'nocors'}`}
                      src={videoEngine.streamUrl}
                      poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                      {...(useCorsAnonymous ? { crossOrigin: 'anonymous' } : {})}
                      preload="metadata"
                      playsInline
                      muted={isMuted}
                      className="w-full h-full object-contain"
                      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                      onLoadedMetadata={handleLoadedMetadata}
                      onDurationChange={(e) => {
                        if (e.currentTarget.duration && !isNaN(e.currentTarget.duration)) {
                          setDuration(e.currentTarget.duration);
                        }
                      }}
                      onPlay={() => {
                        setIsPlaying(true);
                        setIsDrawingMode(false);
                      }}
                      onPause={() => setIsPlaying(false)}
                      onError={() => setVideoError(true)}
                    />

                    {!isPlaying && !videoError && !isDrawingMode && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110">
                          <Play className="w-7 h-7 fill-white ml-1" />
                        </div>
                      </div>
                    )}

                    {videoError && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 z-30 bg-[#0d0a1a]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center cursor-default text-white"
                      >
                        <AlertTriangle className="w-10 h-10 text-amber-400 mb-2" />
                        <h4 className="text-sm font-extrabold mb-1">
                          Video Stream Unavailable or Needs Public Access
                        </h4>
                        <p className="text-xs text-purple-200 max-w-md mb-4 leading-relaxed">
                          Could not stream{' '}
                          <span className="font-mono text-amber-300 break-all">
                            {videoEngine.streamUrl}
                          </span>
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setProjects((prev) =>
                                prev.map((p) =>
                                  p.id === activeProject.id
                                    ? {
                                        ...p,
                                        r2Url: DEMO_FALLBACK_MP4,
                                        video_url: DEMO_FALLBACK_MP4,
                                        source_type: 'r2'
                                      }
                                    : p
                                )
                              );
                              setVideoError(false);
                              showToast('Loaded sample stream for testing');
                            }}
                            className="px-3.5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold"
                          >
                            Load Demo Stream
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* TIMELINE & PLAYBACK CONTROLS */}
            {videoEngine.mode === 'r2' && (
              <div className="mt-4 pt-2 space-y-3">
                {/* Timeline Bar with Hover Tooltip and Markers */}
                <div
                  ref={timelineRef}
                  onMouseDown={handleTimelineMouseDown}
                  onMouseMove={handleTimelineHover}
                  onMouseLeave={() => setTimelineHoverTime(null)}
                  className={`relative h-3.5 rounded-full cursor-pointer flex items-center border group transition-all ${
                    themeMode === 'dark'
                      ? 'bg-white/[0.06] border-white/10 hover:border-violet-500/40'
                      : 'bg-slate-100 border-slate-300 hover:border-violet-400'
                  }`}
                >
                  {/* Progress Fill */}
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 rounded-full pointer-events-none shadow-glow-sm"
                    style={{
                      width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`
                    }}
                  />

                  {/* Hover Tooltip */}
                  {timelineHoverTime !== null && (
                    <div
                      className="absolute -top-7 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-slate-950 text-white font-mono text-[10px] pointer-events-none shadow-md z-30 border border-white/10"
                      style={{ left: `${timelineHoverPos}px` }}
                    >
                      {formatTimecode(timelineHoverTime, false)}
                    </div>
                  )}

                  {/* Marker Dots */}
                  {projectMarkers.map((m) => {
                    const pct = duration > 0 ? (m.timestamp_seconds / duration) * 100 : 0;
                    return (
                      <div
                        key={m.id}
                        title={`[${m.version_label || 'Video'}] [${m.category}] ${m.client_comment} (${formatTimecode(m.timestamp_seconds)})`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeekToMarker(m);
                        }}
                        className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow cursor-pointer transition-transform hover:scale-150 z-10 ${
                          m.is_resolved ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-amber-500 shadow-amber-500/50 animate-pulse'
                        }`}
                        style={{ left: `${Math.min(100, Math.max(0, pct))}%` }}
                      />
                    );
                  })}
                </div>

                {/* Button Toolbar with 1-Second Skip and Dedicated Volume Slider */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlayPause}
                      className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f97316] text-white flex items-center justify-center shadow-md shadow-orange-500/25 transition-all card-levitate"
                      title="Play / Pause (Space)"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>

                    {/* 1-SECOND SKIP PRECISE BUTTONS */}
                    <button
                      type="button"
                      onClick={() => skipSeconds(-1)}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 border card-levitate ${
                        themeMode === 'dark'
                          ? 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border-white/10'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                      title="Rewind 1 second (Left Arrow / J)"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold">1s</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => skipSeconds(1)}
                      className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 border card-levitate ${
                        themeMode === 'dark'
                          ? 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border-white/10'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                      title="Forward 1 second (Right Arrow / L)"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold">1s</span>
                    </button>

                    <span
                      className={`text-xs font-mono font-bold ml-2 ${
                        themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      {formatTimecode(currentTime, false)} / {formatTimecode(duration, false)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Playback Speed Selector */}
                    <div className="relative inline-flex items-center">
                      <select
                        value={playbackSpeed}
                        onChange={(e) => handlePlaybackSpeedChange(parseFloat(e.target.value))}
                        className={`text-[11px] font-bold rounded-xl px-2.5 py-1.5 border appearance-none pr-6 cursor-pointer focus:outline-none ${
                          themeMode === 'dark'
                            ? 'bg-white/[0.06] text-slate-200 border-white/10'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                        title="Playback Speed"
                      >
                        <option value="0.5">0.5x</option>
                        <option value="1">1.0x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2.0x</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 pointer-events-none" />
                    </div>

                    {/* DEDICATED PRECISE AUDIO VOLUME SLIDER BAR */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border shadow-sm ${
                      themeMode === 'dark'
                        ? 'bg-white/[0.06] border-white/10 text-slate-200'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="text-slate-400 hover:text-violet-400 transition-colors"
                        title="Mute / Unmute (M)"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-rose-400" />
                        ) : volume < 0.5 ? (
                          <Volume1 className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.02"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                        className="w-16 sm:w-24 h-1.5 accent-violet-600 bg-slate-300 dark:bg-white/20 rounded-lg cursor-pointer"
                        title="Audio Loudness Level"
                      />
                      <span className="text-[10px] font-mono font-bold w-8 text-right text-slate-400">
                        {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
                      </span>
                    </div>

                    {/* Fullscreen */}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className={`p-2 rounded-xl transition-all border card-levitate ${
                        themeMode === 'dark'
                          ? 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border-white/10'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                      title="Fullscreen (F)"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* POINT 7: RIGHT COLUMN: EXPANDED FEEDBACK NOTES & REPLIES (SPACIOUS CLIENT WORKSPACE) */}
          <div
            className={`${
              isComparisonMode
                ? 'w-full'
                : videoLayoutMode === 'top-bottom'
                ? 'w-full max-w-6xl mx-auto'
                : isFeedbackExpanded || isVertical
                ? 'lg:col-span-7'
                : 'lg:col-span-5'
            } space-y-5 transition-all duration-300`}
          >
            <div
              className={`min-h-[600px] h-auto rounded-[28px] shadow-xl border p-5 sm:p-6 flex flex-col transition-colors ${
                themeMode === 'dark'
                  ? 'glass-panel-dark text-slate-100'
                  : 'bg-white border-[#E9ECEF] shadow-[0_10px_35px_-8px_rgba(15,23,42,0.06),0_1px_3px_0_rgba(15,23,42,0.02)] text-slate-800'
              }`}
            >
              {/* Header & Status Filter & Expansion Toggle (Matching Reference Asset) */}
              <div
                className={`flex flex-wrap items-center justify-between gap-2.5 pb-3.5 mb-3 border-b ${
                  themeMode === 'dark' ? 'border-white/[0.08]' : 'border-[#F1F3F5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/25">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3
                      className={`text-base font-black leading-tight ${
                        themeMode === 'dark' ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      Feedback &amp; Revision Notes
                    </h3>
                    <span className="text-xs font-semibold text-slate-400">
                      {filteredMarkers.length} of {activeStats.total} Notes ({activeStats.resolved} Fixed)
                    </span>
                  </div>
                </div>

                {/* 3 Sleek Square Control Buttons (Sun, Messages, Expand) */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleToggleTheme('light')}
                    className="w-8 h-8 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 flex items-center justify-center transition-colors shadow-sm"
                    title="Light Studio Mode"
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => showToast('Revision notes thread active')}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/60 flex items-center justify-center transition-colors shadow-sm"
                    title="Notes & Messages"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFeedbackExpanded(!isFeedbackExpanded)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/60 flex items-center justify-center transition-colors shadow-sm"
                    title={isFeedbackExpanded ? "Collapse feedback width" : "Expand feedback width (wider workspace)"}
                  >
                    {isFeedbackExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Filter Pills Row (Matching Reference Asset: All [Orange], Pending, Resolved) */}
              <div className="flex items-center gap-2 mb-3">
                {['all', 'pending', 'resolved'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setMarkerFilter(f)}
                    className={`px-4 py-1.5 rounded-full capitalize text-xs font-bold transition-all ${
                      markerFilter === f
                        ? 'bg-[#ea580c] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* POINT 5: VERSION-SPECIFIC FILTERING SELECTOR TABS */}
              <div className={`flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-2.5 border-b ${
                themeMode === 'dark' ? 'border-white/[0.08]' : 'border-[#F1F3F5]'
              }`}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedVersionFilter('all');
                    showToast('Showing all messages across all versions');
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
                    selectedVersionFilter === 'all'
                      ? 'bg-[#ea580c] text-white shadow-md shadow-orange-500/25'
                      : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  All Messages ({projectMarkers.length})
                </button>
                {(activeProject?.versions || []).map((ver) => {
                  const verCount = projectMarkers.filter(
                    (m) =>
                      m.version_id === ver.id ||
                      (!m.version_id && ver.id === activeProject?.versions?.[0]?.id)
                  ).length;
                  const isSelected = selectedVersionFilter === ver.id;
                  return (
                    <button
                      key={ver.id}
                      type="button"
                      onClick={() => {
                        setSelectedVersionFilter(ver.id);
                        handleSwitchActiveVersion(ver.id);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-black shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#ea580c] text-white shadow-md shadow-orange-500/25'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                      }`}
                      title={`Show ${ver.version_label} messages and switch to its video`}
                    >
                      {ver.version_label} ({verCount})
                    </button>
                  );
                })}
              </div>

              {/* POST COMMENT FORM WITH TIMECODE LOCK, PAPERCLIP & DRAWING BADGE */}
              <form
                onSubmit={handleAddMarker}
                className={`space-y-3.5 p-4 sm:p-5 rounded-2xl border transition-all ${
                  themeMode === 'dark'
                    ? 'bg-black/30 border-white/10 shadow-inner'
                    : 'bg-[#F8F9FA] border-[#E9ECEF] shadow-sm'
                }`}
              >
                {/* Top Controls: Category + Video Version Indicator + Timecode Lock */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#FF6B00]">
                      Category:
                    </span>
                    <select
                      value={newCommentCategory}
                      onChange={(e) => setNewCommentCategory(e.target.value)}
                      className={`text-xs font-black rounded-xl px-3 py-1.5 border focus:outline-none focus:border-[#FF6B00] cursor-pointer shadow-sm ${
                        themeMode === 'dark'
                          ? 'bg-[#111322] text-slate-100 border-white/10'
                          : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      {MARKER_CATEGORIES.map((c) => (
                        <option key={c.label} value={c.label}>
                          {c.label}
                        </option>
                      ))}
                    </select>

                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-500/10 text-[#FF6B00] border border-orange-500/20">
                      🎯 {activeVersion?.version_label || 'Current Video'}
                    </span>
                  </div>

                  {/* Timecode Badge / Lock Toggle */}
                  <div className={`flex items-center gap-1.5 p-1 rounded-xl border ${
                    themeMode === 'dark' ? 'bg-black/40 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    {isEditingTimecode ? (
                      <input
                        type="text"
                        value={manualTimecodeInput}
                        onChange={(e) => setManualTimecodeInput(e.target.value)}
                        placeholder="00:15"
                        className="w-16 text-center font-mono text-xs font-bold rounded-lg px-1.5 py-1 border border-violet-400 bg-white dark:bg-[#111322] text-slate-900 dark:text-white"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={handleToggleLockTimestamp}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-black transition-all ${
                          lockedTimestamp !== null
                            ? 'btn-royal-primary text-white shadow-md shadow-violet-500/30'
                            : themeMode === 'dark'
                            ? 'bg-white/10 text-violet-200 hover:text-white'
                            : 'bg-slate-100 text-slate-700 hover:text-slate-900'
                        }`}
                        title={
                          lockedTimestamp !== null
                            ? 'Timecode locked. Click to unlock.'
                            : 'Click to lock current timecode'
                        }
                      >
                        {lockedTimestamp !== null ? (
                          <Lock className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Unlock className="w-3.5 h-3.5 text-violet-500" />
                        )}
                        <span>
                          {formatTimecode(
                            lockedTimestamp !== null ? lockedTimestamp : currentTime,
                            false
                          )}
                        </span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        if (!isEditingTimecode && !manualTimecodeInput) {
                          setManualTimecodeInput(
                            formatTimecode(
                              lockedTimestamp !== null ? lockedTimestamp : currentTime,
                              false
                            )
                          );
                        }
                        setIsEditingTimecode(!isEditingTimecode);
                      }}
                      className="px-2 py-0.5 text-[11px] text-[#6366F1] hover:text-[#7C3AED] font-bold"
                      title="Edit timecode manually"
                    >
                      {isEditingTimecode ? 'Done' : 'Edit'}
                    </button>
                  </div>
                </div>

                {/* POINT 9: IMAGE ATTACHMENT LIVE THUMBNAIL PREVIEW */}
                {newCommentAttachment && (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-violet-500/10 border border-violet-400/40">
                    <img
                      src={newCommentAttachment}
                      alt="Attachment Preview"
                      className="w-14 h-14 rounded-xl object-cover border-2 border-violet-400 shadow-md shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-violet-700 dark:text-violet-200 truncate">
                        {newCommentAttachmentName || 'Attached Screenshot / Photo'}
                      </p>
                      <span className="text-[11px] text-slate-500 dark:text-violet-300/80">
                        Will be saved and displayed with this revision note
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setNewCommentAttachment(null);
                        setNewCommentAttachmentName(null);
                      }}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500 text-slate-400 hover:text-white transition-colors"
                      title="Remove attachment"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* POINT 10: DRAWING DETECTED NOTICE */}
                {hasDrawnOnCanvas && (
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-xs text-amber-600 dark:text-amber-300 font-extrabold">
                    <span className="flex items-center gap-2">
                      <PenTool className="w-4 h-4" />
                      <span>Canvas Drawing Annotation will be saved with this note</span>
                    </span>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="text-amber-600 dark:text-amber-200 hover:underline text-[11px]"
                    >
                      Clear Drawing
                    </button>
                  </div>
                )}

                {/* SPACIOUS MULTI-LINE TEXTAREA WITH EXPANDED COMFORT */}
                <div className="space-y-1.5">
                  <textarea
                    ref={commentInputRef}
                    rows={4}
                    required
                    value={newCommentText}
                    onFocus={handleCommentFocus}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        handleAddMarker(e);
                      }
                    }}
                    placeholder="Write your feedback note, edit instructions, or timestamped critique here..."
                    className={`w-full min-h-[90px] text-sm leading-relaxed rounded-2xl p-4 border focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-y ${
                      themeMode === 'dark'
                        ? 'bg-[#111322] text-slate-100 border-white/10 placeholder-slate-500'
                        : 'bg-white text-slate-800 border-[#E9ECEF] placeholder-slate-400 shadow-inner'
                    }`}
                  />
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] text-slate-400">
                      💡 Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">Ctrl+Enter</kbd> to submit
                    </span>
                    <span className="text-[11px] font-mono font-bold text-orange-500">
                      {newCommentText.length} characters
                    </span>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    {/* POINT 9: PAPERCLIP FILE ATTACHMENT BUTTON */}
                    <button
                      type="button"
                      onClick={() => attachmentFileInputRef.current?.click()}
                      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all border card-levitate ${
                        newCommentAttachment
                          ? 'bg-[#ea580c] text-white shadow-md'
                          : themeMode === 'dark'
                          ? 'bg-white/10 text-orange-200 hover:text-white border-white/10'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
                      }`}
                      title="Attach Screenshot, Reference Photo, or Logo"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span>{newCommentAttachment ? 'Change Image' : 'Attach Image / Photo'}</span>
                    </button>
                    <input
                      ref={attachmentFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAttachmentSelect}
                      className="hidden"
                    />

                    {videoEngine.mode === 'r2' && !isPlaying && (
                      <button
                        type="button"
                        onClick={() => setIsDrawingMode(!isDrawingMode)}
                        className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all border card-levitate ${
                          isDrawingMode
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                            : themeMode === 'dark'
                            ? 'bg-white/10 text-orange-200 hover:text-white border-white/10'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
                        }`}
                        title="Draw directly on the video frame"
                      >
                        <PenTool className="w-4 h-4" />
                        <span>{isDrawingMode ? 'Drawing Active' : 'Annotate Frame'}</span>
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-[#f97316] hover:from-[#c2410c] hover:to-[#ea580c] text-white font-black text-sm shadow-lg shadow-orange-500/25 transition-all card-levitate flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Post Revision Note</span>
                  </button>
                </div>
              </form>

              {/* LIST OF FEEDBACK NOTES & THREADED EDITOR REPLIES - FULLY VISIBLE & PAGE SCROLLABLE */}
              <div className="space-y-4 pt-3">
                {filteredMarkers.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                    <MessageSquare className="w-8 h-8 mb-2 opacity-40 text-orange-400" />
                    <p className="text-xs font-bold">No feedback notes in this view</p>
                    <p className="text-[11px] opacity-70">
                      Add a note above to leave frame-accurate revision instructions.
                    </p>
                  </div>
                ) : (
                  filteredMarkers.map((marker) => {
                    const catStyle =
                      MARKER_CATEGORIES.find((c) => c.label === marker.category)?.pill ||
                      MARKER_CATEGORIES[0].pill;

                    return (
                      <div
                        key={marker.id}
                        onClick={() => handleSeekToMarker(marker)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 group card-levitate ${
                          marker.is_resolved
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-100 shadow-sm'
                            : 'bg-white dark:bg-[#15192c] text-slate-800 dark:text-slate-100 border-slate-200 dark:border-white/10 shadow-sm hover:border-orange-400'
                        }`}
                      >
                        {/* Top: Orange 'C' Avatar, Client, timestamp, status badge, kebab menu */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            {/* Orange Circle C Avatar */}
                            <div className="w-8 h-8 rounded-full bg-[#FF6B00] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm">
                              C
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-slate-900 dark:text-white">
                                  Client
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  {formatTimecode(marker.timestamp_seconds, true)}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${catStyle}`}
                                >
                                  {marker.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {role === 'editor' ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleResolve(marker.id);
                                }}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold transition-all card-levitate ${
                                  marker.is_resolved
                                    ? 'bg-emerald-500 text-white shadow-sm'
                                    : 'bg-[#FED7AA] hover:bg-emerald-500 text-[#9A3412] hover:text-white border border-[#FDBA74]'
                                }`}
                              >
                                <Check className="w-3 h-3" />
                                <span>{marker.is_resolved ? 'Fixed ✓' : 'Pending'}</span>
                              </button>
                            ) : (
                              <span
                                className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold ${
                                  marker.is_resolved
                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                                    : 'bg-[#FED7AA] text-[#9A3412]'
                                }`}
                              >
                                {marker.is_resolved ? 'Fixed ✓' : 'Pending'}
                              </span>
                            )}

                            {role === 'editor' && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteMarker(marker.id);
                                }}
                                className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                                title="Delete note"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Comment Text with indent */}
                        <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-100 pl-10.5">
                          {marker.client_comment}
                        </p>

                        {/* POINT 9: DISPLAY ATTACHED IMAGE THUMBNAIL */}
                        {marker.attachment_url && (
                          <div className="mt-2 pl-10.5">
                            <img
                              src={marker.attachment_url}
                              alt="Attached reference"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxImage(marker.attachment_url);
                              }}
                              className="max-h-36 rounded-xl border border-orange-200 dark:border-orange-800/80 object-cover cursor-pointer hover:opacity-90 hover:scale-[1.01] transition-all shadow-sm"
                              title="Click to view full image"
                            />
                          </div>
                        )}

                        {/* POINT 10: DRAWING BADGE */}
                        {marker.drawing_data && (
                          <div className="ml-10.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-orange-500/15 text-orange-600 dark:text-orange-300 text-[10px] font-bold">
                            <PenTool className="w-3 h-3 text-orange-500" />
                            <span>Click note to view frame drawing overlay</span>
                          </div>
                        )}

                        {/* RENDERED THREADED EDITOR REPLY WITH 'E' AVATAR (Matching Reference) */}
                        {marker.editor_reply && editingReplyId !== marker.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="mt-2 ml-10.5 pl-3 border-l-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-white/[0.04] p-2.5 rounded-r-xl space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-[10px] shrink-0">
                                  E
                                </div>
                                <span className="text-xs font-black text-slate-800 dark:text-slate-200">
                                  {settings.editorName || 'Editor'} Reply
                                </span>
                              </div>
                              {role === 'editor' && (
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditorReply(marker)}
                                    className="text-[10px] text-[#FF6B00] hover:underline font-bold"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteEditorReply(marker.id)}
                                    className="text-[10px] text-rose-500 hover:underline font-bold ml-1"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-300 pl-8">
                              {marker.editor_reply}
                            </p>
                          </div>
                        )}

                        {/* INLINE EDITOR REPLY COMPOSER */}
                        {editingReplyId === marker.id ? (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="mt-2 p-2.5 rounded-xl border border-violet-400/50 bg-[#F8F9FA] dark:bg-[#111322] space-y-2"
                          >
                            <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#6366F1] dark:text-violet-300">
                              <CornerDownRight className="w-3 h-3 text-[#6366F1]" />
                              <span>Reply as {settings.editorName || 'Editor'}</span>
                            </div>
                            <input
                              type="text"
                              autoFocus
                              value={replyDraftText}
                              onChange={(e) => setReplyDraftText(e.target.value)}
                              placeholder="e.g. Fixed! Re-timed shot on frame 24..."
                              className="w-full text-xs rounded-lg px-2.5 py-1.5 border border-[#E9ECEF] dark:border-white/10 bg-white dark:bg-[#111322] text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#6366F1]"
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReplyId(null);
                                  setReplyDraftText('');
                                }}
                                className="px-2.5 py-1 text-[11px] font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSaveEditorReply(marker.id)}
                                className="px-3 py-1 btn-royal-primary text-white text-[11px] font-extrabold rounded-lg shadow-sm"
                              >
                                Save Reply
                              </button>
                            </div>
                          </div>
                        ) : (
                          role === 'editor' &&
                          !marker.editor_reply && (
                            <div className="pt-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEditorReply(marker);
                                }}
                                className="inline-flex items-center gap-1 text-[11px] text-purple-600 dark:text-purple-300 font-extrabold hover:underline"
                              >
                                <CornerDownRight className="w-3 h-3" />
                                <span>+ Reply to Note</span>
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      </div> {/* END BOTTOM ZONE */}

      {/* ===================================================================== */}
      {/* POINT 3 & 4: UPLOAD / SWITCH VIDEO & VERSION MANAGEMENT MODAL         */}
      {/* ===================================================================== */}
      {showUploadSourceModal && (
        <div
          onClick={() => setShowUploadSourceModal(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border max-h-[92vh] overflow-y-auto space-y-5 transition-all ${
              themeMode === 'dark'
                ? 'glass-panel-dark text-slate-100'
                : 'glass-panel-light text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${
              themeMode === 'dark' ? 'border-white/[0.08]' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  themeMode === 'dark' ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                }`}>
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">Video & Version Management</h3>
                  <p className="text-xs text-slate-400">{activeProject?.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadSourceModal(false)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-purple-900/50 text-slate-500 hover:text-rose-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TAB SELECTOR: SOURCE INFO VS. VERSIONS MANAGEMENT */}
            <div className="flex items-center p-1 rounded-2xl bg-[#221345]/60 border border-purple-800/60">
              <button
                type="button"
                onClick={() => setUploadModalTab('source')}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                  uploadModalTab === 'source'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                Video Source & Info
              </button>
              <button
                type="button"
                onClick={() => setUploadModalTab('versions')}
                className={`flex-1 py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  uploadModalTab === 'versions'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Version Videos ({(activeProject?.versions || []).length})</span>
              </button>
            </div>

            {uploadModalTab === 'source' ? (
              <form onSubmit={handleUpdateProjectSource} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold mb-1.5">Project Title</label>
                    <input
                      type="text"
                      value={sourceUpdateForm.title}
                      onChange={(e) =>
                        setSourceUpdateForm({ ...sourceUpdateForm, title: e.target.value })
                      }
                      className={`w-full rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1.5">Active Video Label</label>
                    <input
                      type="text"
                      value={sourceUpdateForm.version_label}
                      onChange={(e) =>
                        setSourceUpdateForm({
                          ...sourceUpdateForm,
                          version_label: e.target.value
                        })
                      }
                      placeholder="Version 1.5"
                      className={`w-full rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold mb-1.5">Client Name</label>
                    <input
                      type="text"
                      value={sourceUpdateForm.client_name}
                      onChange={(e) =>
                        setSourceUpdateForm({ ...sourceUpdateForm, client_name: e.target.value })
                      }
                      placeholder="Sepand Studios"
                      className={`w-full rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1.5">Project Status</label>
                    <select
                      value={sourceUpdateForm.status_label}
                      onChange={(e) =>
                        setSourceUpdateForm({ ...sourceUpdateForm, status_label: e.target.value })
                      }
                      className={`w-full rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    >
                      <option value="Status: Client Review Active">Status: Client Review Active</option>
                      <option value="Status: In Revision / Fixing Notes">Status: In Revision / Fixing Notes</option>
                      <option value="Status: Approved & Completed">Status: Approved & Completed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-extrabold mb-1.5">Client Email</label>
                    <input
                      type="email"
                      value={sourceUpdateForm.client_email}
                      onChange={(e) =>
                        setSourceUpdateForm({ ...sourceUpdateForm, client_email: e.target.value })
                      }
                      placeholder="client@company.com"
                      className={`w-full rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block font-extrabold mb-1.5">Client WhatsApp</label>
                    <input
                      type="text"
                      value={sourceUpdateForm.client_whatsapp}
                      onChange={(e) =>
                        setSourceUpdateForm({
                          ...sourceUpdateForm,
                          client_whatsapp: e.target.value
                        })
                      }
                      placeholder="+15550192834"
                      className={`w-full rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    />
                  </div>
                </div>

                {/* POINT 3: DYNAMIC SOURCE TYPE TOGGLING */}
                <div>
                  <label className="block font-extrabold mb-1.5">Select Video Source Platform</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setSourceUpdateForm({ ...sourceUpdateForm, source_type: 'r2' })
                      }
                      className={`py-2 px-2 rounded-xl font-extrabold border flex items-center justify-center gap-1.5 transition-all text-xs ${
                        sourceUpdateForm.source_type === 'r2'
                          ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                          : 'bg-slate-100 dark:bg-[#221345] text-slate-400 border-transparent'
                      }`}
                    >
                      <Cloud className="w-3.5 h-3.5" />
                      <span>Cloudflare R2</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSourceUpdateForm({ ...sourceUpdateForm, source_type: 'gdrive' })
                      }
                      className={`py-2 px-2 rounded-xl font-extrabold border flex items-center justify-center gap-1.5 transition-all text-xs ${
                        sourceUpdateForm.source_type === 'gdrive'
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                          : 'bg-slate-100 dark:bg-[#221345] text-slate-400 border-transparent'
                      }`}
                    >
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Google Drive</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSourceUpdateForm({ ...sourceUpdateForm, source_type: 'youtube' })
                      }
                      className={`py-2 px-2 rounded-xl font-extrabold border flex items-center justify-center gap-1.5 transition-all text-xs ${
                        sourceUpdateForm.source_type === 'youtube'
                          ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                          : 'bg-slate-100 dark:bg-[#221345] text-slate-400 border-transparent'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5" />
                      <span>YouTube</span>
                    </button>
                  </div>
                </div>

                {/* DYNAMICALLY SHOWN INPUT FIELD BASED ON PLATFORM */}
                {sourceUpdateForm.source_type === 'r2' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-extrabold">Cloudflare R2 or Direct Video URL (.mp4)</label>
                      <button
                        type="button"
                        onClick={() => localVideoFileInputRef.current?.click()}
                        className="text-purple-500 hover:underline font-extrabold flex items-center gap-1"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Or Pick Local .MP4 File</span>
                      </button>
                      <input
                        ref={localVideoFileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleLocalVideoFileSelect}
                        className="hidden"
                      />
                    </div>
                    <input
                      type="text"
                      value={sourceUpdateForm.r2Url}
                      onChange={(e) =>
                        setSourceUpdateForm({ ...sourceUpdateForm, r2Url: e.target.value })
                      }
                      placeholder="https://pub-xxx.r2.dev/my-video.mp4"
                      className={`w-full font-mono text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-white text-slate-900 border-purple-200'
                      }`}
                    />
                  </div>
                )}

                {sourceUpdateForm.source_type === 'gdrive' && (
                  <div>
                    <label className="block font-extrabold mb-1.5">Google Drive Share Link</label>
                    <input
                      type="text"
                      value={sourceUpdateForm.driveUrl}
                      onChange={(e) =>
                        setSourceUpdateForm({ ...sourceUpdateForm, driveUrl: e.target.value })
                      }
                      placeholder="https://drive.google.com/file/d/.../view"
                      className={`w-full font-mono text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-white text-slate-900 border-purple-200'
                      }`}
                    />
                  </div>
                )}

                {sourceUpdateForm.source_type === 'youtube' && (
                  <div>
                    <label className="block font-extrabold mb-1.5">YouTube Video / Unlisted URL</label>
                    <input
                      type="text"
                      value={sourceUpdateForm.youtubeUrl}
                      onChange={(e) =>
                        setSourceUpdateForm({ ...sourceUpdateForm, youtubeUrl: e.target.value })
                      }
                      placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      className={`w-full font-mono text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none ${
                        themeMode === 'dark'
                          ? 'bg-[#221345] text-white border-purple-800'
                          : 'bg-white text-slate-900 border-purple-200'
                      }`}
                    />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadSourceModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-600 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold shadow-md"
                  >
                    Save & Switch Video
                  </button>
                </div>
              </form>
            ) : (
              /* POINT 4: DEDICATED VERSION UPLOAD & MANAGEMENT SECTION */
              <div className="space-y-4 text-xs">
                {/* Existing Videos List */}
                <div className="space-y-2">
                  <label className="block font-extrabold text-slate-300">
                    Existing Videos & Versions for this Project
                  </label>
                  {(activeProject?.versions || []).map((ver, idx) => {
                    const isActive = ver.id === activeProject?.active_version_id;
                    return (
                      <div
                        key={ver.id}
                        className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                          isActive
                            ? 'bg-purple-900/40 border-purple-500 text-white'
                            : 'bg-[#221345]/50 border-purple-900 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm">{ver.version_label}</span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px]">
                                Active Video
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-purple-300/70 font-mono">
                            Type: {ver.source_type.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {!isActive && (
                            <button
                              type="button"
                              onClick={() => handleSwitchActiveVersion(ver.id)}
                              className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                            >
                              Set Active
                            </button>
                          )}
                          {(activeProject?.versions || []).length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteVersion(ver.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-400"
                              title="Delete this video version"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Add New Video Form */}
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/80 space-y-3">
                  <span className="block font-extrabold text-purple-200">
                    + Add New Video Version
                  </span>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Version Name (e.g. Version 2.0)"
                      value={newVideoName}
                      onChange={(e) => setNewVideoName(e.target.value)}
                      className="rounded-xl px-3 py-2 bg-[#221345] text-white border border-purple-800 focus:outline-none"
                    />

                    <select
                      value={newVideoSourceType}
                      onChange={(e) => setNewVideoSourceType(e.target.value)}
                      className="rounded-xl px-3 py-2 bg-[#221345] text-white border border-purple-800 focus:outline-none"
                    >
                      <option value="r2">Cloudflare R2 (.mp4)</option>
                      <option value="gdrive">Google Drive</option>
                      <option value="youtube">YouTube Embed</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] text-purple-300">
                        {newVideoSourceType === 'r2'
                          ? 'Stream URL (.mp4)'
                          : newVideoSourceType === 'gdrive'
                          ? 'Google Drive Link'
                          : 'YouTube Link'}
                      </label>
                      {newVideoSourceType === 'r2' && (
                        <button
                          type="button"
                          onClick={() => newVideoLocalRef.current?.click()}
                          className="text-purple-400 hover:underline font-bold text-[10px]"
                        >
                          Pick Local File
                        </button>
                      )}
                      <input
                        ref={newVideoLocalRef}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleNewVideoLocalSelect}
                        className="hidden"
                      />
                    </div>
                    <input
                      type="text"
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      placeholder="Paste link here..."
                      className="w-full rounded-xl px-3 py-2 bg-[#221345] text-white font-mono text-xs border border-purple-800 focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddNewVersion}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-extrabold shadow-md"
                  >
                    Add This Video Version to Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* POINT 3: CREATE NEW PROJECT MODAL WITH DYNAMIC PLATFORM TOGGLING      */}
      {/* ===================================================================== */}
      {showNewProjectModal && (
        <div
          onClick={() => setShowNewProjectModal(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border max-h-[92vh] overflow-y-auto space-y-4 transition-all ${
              themeMode === 'dark'
                ? 'glass-panel-dark text-slate-100'
                : 'glass-panel-light text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${
              themeMode === 'dark' ? 'border-white/[0.08]' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  themeMode === 'dark' ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                }`}>
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">Create New Project Workspace</h3>
                  <p className="text-xs text-slate-400">Adds a new project tab immediately</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewProjectModal(false)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-purple-900/50 text-slate-500 hover:text-rose-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newProjectForm.title}
                  onChange={(e) =>
                    setNewProjectForm({ ...newProjectForm, title: e.target.value })
                  }
                  placeholder="e.g. Commercial VFX Pass — Final Video"
                  className={`w-full rounded-xl px-3.5 py-2.5 border ${
                    themeMode === 'dark'
                      ? 'bg-[#221345] text-white border-purple-800'
                      : 'bg-slate-50 text-slate-900 border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Client Name</label>
                  <input
                    type="text"
                    value={newProjectForm.client_name}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, client_name: e.target.value })
                    }
                    className={`w-full rounded-xl px-3 py-2.5 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Initial Video Version</label>
                  <input
                    type="text"
                    value={newProjectForm.version_label}
                    onChange={(e) =>
                      setNewProjectForm({
                        ...newProjectForm,
                        version_label: e.target.value
                      })
                    }
                    className={`w-full rounded-xl px-3 py-2.5 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Deadline</label>
                  <input
                    type="date"
                    value={newProjectForm.deadline}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, deadline: e.target.value })
                    }
                    className={`w-full rounded-xl px-3 py-2.5 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* POINT 3: DYNAMIC SOURCE TOGGLING FOR NEW PROJECT */}
              <div>
                <label className="block font-bold mb-1">Preferred Video Source Platform</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setNewProjectForm({ ...newProjectForm, source_type: 'r2' })
                    }
                    className={`py-2 px-2 rounded-xl font-extrabold border flex items-center justify-center gap-1.5 ${
                      newProjectForm.source_type === 'r2'
                        ? 'bg-purple-600 text-white border-purple-500'
                        : 'bg-slate-100 dark:bg-[#221345] text-slate-400 border-transparent'
                    }`}
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Cloudflare R2</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNewProjectForm({ ...newProjectForm, source_type: 'gdrive' })
                    }
                    className={`py-2 px-2 rounded-xl font-extrabold border flex items-center justify-center gap-1.5 ${
                      newProjectForm.source_type === 'gdrive'
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-100 dark:bg-[#221345] text-slate-400 border-transparent'
                    }`}
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Google Drive</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNewProjectForm({ ...newProjectForm, source_type: 'youtube' })
                    }
                    className={`py-2 px-2 rounded-xl font-extrabold border flex items-center justify-center gap-1.5 ${
                      newProjectForm.source_type === 'youtube'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-100 dark:bg-[#221345] text-slate-400 border-transparent'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </button>
                </div>
              </div>

              {newProjectForm.source_type === 'r2' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold">Cloudflare R2 Stream URL (.mp4)</label>
                    <button
                      type="button"
                      onClick={() => newProjectLocalVideoRef.current?.click()}
                      className="text-purple-500 hover:underline font-extrabold flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Or Pick Local .MP4 File</span>
                    </button>
                    <input
                      ref={newProjectLocalVideoRef}
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={handleNewProjectLocalVideoSelect}
                      className="hidden"
                    />
                  </div>
                  <input
                    type="text"
                    value={newProjectForm.r2Url}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, r2Url: e.target.value })
                    }
                    placeholder="https://...mp4"
                    className={`w-full font-mono rounded-xl px-3.5 py-2.5 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
              )}

              {newProjectForm.source_type === 'gdrive' && (
                <div>
                  <label className="block font-bold mb-1">Google Drive Share Link</label>
                  <input
                    type="text"
                    value={newProjectForm.driveUrl}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, driveUrl: e.target.value })
                    }
                    placeholder="https://drive.google.com/file/d/.../view"
                    className={`w-full font-mono rounded-xl px-3.5 py-2.5 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
              )}

              {newProjectForm.source_type === 'youtube' && (
                <div>
                  <label className="block font-bold mb-1">YouTube Video / Share Link</label>
                  <input
                    type="text"
                    value={newProjectForm.youtubeUrl}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, youtubeUrl: e.target.value })
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full font-mono rounded-xl px-3.5 py-2.5 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl btn-royal-primary text-white font-extrabold shadow-lg"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: STUDIO, LOGO & EMAILJS SETTINGS MODAL                        */}
      {/* ===================================================================== */}
      {showSettingsModal && (
        <div
          onClick={() => setShowSettingsModal(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border max-h-[92vh] overflow-y-auto space-y-5 transition-all ${
              themeMode === 'dark'
                ? 'glass-panel-dark text-slate-100'
                : 'glass-panel-light text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${
              themeMode === 'dark' ? 'border-white/[0.08]' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  themeMode === 'dark' ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                }`}>
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">Studio & Integration Settings</h3>
                  <p className="text-xs text-slate-400">
                    Customize branding, browser tab favicon, editor contact & EmailJS keys
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-purple-900/50 text-slate-400 hover:text-rose-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* LOGO UPLOAD FOR HEADER & BROWSER TAB FAVICON */}
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  themeMode === 'dark'
                    ? 'bg-[#221345]/60 border-purple-800'
                    : 'bg-purple-50/60 border-purple-200'
                }`}
              >
                <label className="block font-extrabold text-sm">
                  Studio Logo & Browser Tab Icon (Favicon)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#2a0f5d] border-2 border-purple-400 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                    {settings.studioLogo ? (
                      <img
                        src={settings.studioLogo}
                        alt="Studio Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => logoFileInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-xl btn-royal-primary text-white font-extrabold flex items-center gap-1.5 shadow-sm"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Upload Logo Image</span>
                      </button>
                      {settings.studioLogo && (
                        <button
                          type="button"
                          onClick={() => {
                            setSettings({ ...settings, studioLogo: '' });
                            showToast('Reverted to default DeepDox icon');
                          }}
                          className="px-3 py-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white font-bold transition-all"
                        >
                          Remove Logo
                        </button>
                      )}
                      <input
                        ref={logoFileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/svg+xml,image/webp,image/x-icon"
                        onChange={handleLogoFileUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Automatically updates both the top-left studio icon and the browser tab
                      favicon!
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Or Paste Direct Logo Image URL</label>
                  <input
                    type="url"
                    value={settings.studioLogo || ''}
                    onChange={(e) =>
                      setSettings({ ...settings, studioLogo: e.target.value })
                    }
                    placeholder="https://example.com/my-logo.png"
                    className={`w-full font-mono rounded-xl px-3.5 py-2 border ${
                      themeMode === 'dark'
                        ? 'bg-[#1b083d] text-white border-purple-800'
                        : 'bg-white text-slate-900 border-purple-200'
                    }`}
                  />
                </div>
              </div>

              {/* STUDIO NAME & BADGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Studio Brand Name</label>
                  <input
                    type="text"
                    value={settings.studioName}
                    onChange={(e) =>
                      setSettings({ ...settings, studioName: e.target.value })
                    }
                    className={`w-full rounded-xl px-3.5 py-2 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={settings.studioBadge}
                    onChange={(e) =>
                      setSettings({ ...settings, studioBadge: e.target.value })
                    }
                    className={`w-full rounded-xl px-3.5 py-2 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* EDITOR CONTACTS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Lead Editor Name</label>
                  <input
                    type="text"
                    value={settings.editorName}
                    onChange={(e) =>
                      setSettings({ ...settings, editorName: e.target.value })
                    }
                    className={`w-full rounded-xl px-3 py-2 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Editor Email</label>
                  <input
                    type="email"
                    value={settings.editorEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, editorEmail: e.target.value })
                    }
                    className={`w-full rounded-xl px-3 py-2 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Editor WhatsApp</label>
                  <input
                    type="text"
                    value={settings.editorWhatsapp}
                    onChange={(e) =>
                      setSettings({ ...settings, editorWhatsapp: e.target.value })
                    }
                    className={`w-full rounded-xl px-3 py-2 border ${
                      themeMode === 'dark'
                        ? 'bg-[#221345] text-white border-purple-800'
                        : 'bg-slate-50 text-slate-900 border-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* EMAILJS API INTEGRATION */}
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  themeMode === 'dark'
                    ? 'bg-[#221345]/50 border-purple-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-purple-400" />
                    <span className="font-extrabold text-sm">
                      EmailJS Client Notification Keys
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-[11px] font-bold text-purple-400 hover:text-purple-300"
                  >
                    {showApiKey ? 'Hide Keys' : 'Reveal Keys'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-[11px]">
                  <div>
                    <label className="block font-sans font-bold text-slate-400 mb-1">
                      Service ID
                    </label>
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.emailjsServiceId}
                      onChange={(e) =>
                        setSettings({ ...settings, emailjsServiceId: e.target.value })
                      }
                      className="w-full rounded-lg px-2.5 py-1.5 bg-black/20 border border-purple-800 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-bold text-slate-400 mb-1">
                      Template ID
                    </label>
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.emailjsTemplateId}
                      onChange={(e) =>
                        setSettings({ ...settings, emailjsTemplateId: e.target.value })
                      }
                      className="w-full rounded-lg px-2.5 py-1.5 bg-black/20 border border-purple-800 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-bold text-slate-400 mb-1">
                      Public Key
                    </label>
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.emailjsPublicKey}
                      onChange={(e) =>
                        setSettings({ ...settings, emailjsPublicKey: e.target.value })
                      }
                      className="w-full rounded-lg px-2.5 py-1.5 bg-black/20 border border-purple-800 text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetDemoData}
                  className="px-3.5 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 font-bold"
                >
                  Reset All to Default
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 font-bold"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowSettingsModal(false);
                      showToast('Saved settings & branding!');
                    }}
                    className="px-5 py-2 rounded-xl btn-royal-primary text-white font-extrabold shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: NOTIFY CLIENT DISPATCH MODAL                                 */}
      {/* ===================================================================== */}
      {showNotifyModal && (
        <div
          onClick={() => setShowNotifyModal(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border max-h-[92vh] overflow-y-auto space-y-4 transition-all ${
              themeMode === 'dark'
                ? 'glass-panel-dark text-slate-100'
                : 'glass-panel-light text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${
              themeMode === 'dark' ? 'border-white/[0.08]' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  themeMode === 'dark' ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
                }`}>
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black">Notify Client of Revision Progress</h3>
                  <p className="text-xs text-slate-400">{activeProject?.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNotifyModal(false)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-purple-900/50 text-slate-500 hover:text-rose-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* EDITABLE MESSAGE PREVIEW */}
              <div>
                <label className="block font-extrabold mb-1.5 text-slate-700 dark:text-slate-300">
                  Notification Summary Message (Editable)
                </label>
                <textarea
                  rows={6}
                  value={notifyForm.customMessage}
                  onChange={(e) =>
                    setNotifyForm({ ...notifyForm, customMessage: e.target.value })
                  }
                  className={`w-full rounded-2xl p-3 border font-sans text-xs focus:outline-none ${
                    themeMode === 'dark'
                      ? 'bg-[#221345] text-white border-purple-800'
                      : 'bg-slate-50 text-slate-900 border-slate-200'
                  }`}
                />
              </div>

              {/* WHATSAPP ACTION */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-2.5">
                <label className="flex items-center gap-1.5 font-extrabold text-emerald-900 dark:text-emerald-300">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Send via WhatsApp</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={notifyForm.clientWhatsapp}
                    onChange={(e) =>
                      setNotifyForm({ ...notifyForm, clientWhatsapp: e.target.value })
                    }
                    placeholder="+15550192834"
                    className="flex-1 bg-white dark:bg-[#120726] text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-emerald-300 dark:border-emerald-700 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendWhatsAppNotification}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold flex items-center gap-1.5 shrink-0 shadow-md card-levitate"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* EMAIL ACTIONS */}
              <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50 space-y-2.5">
                <label className="flex items-center gap-1.5 font-extrabold text-violet-900 dark:text-violet-300">
                  <Mail className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Send via Email</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={notifyForm.clientEmail}
                    onChange={(e) =>
                      setNotifyForm({ ...notifyForm, clientEmail: e.target.value })
                    }
                    placeholder="client@studio.com"
                    className="flex-1 bg-white dark:bg-[#111322] text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-violet-300 dark:border-violet-700 focus:outline-none"
                  />
                  <button
                    type="button"
                    disabled={isSendingEmail}
                    onClick={handleSendEmailNotification}
                    className="px-4 py-2.5 rounded-xl btn-royal-primary text-white font-extrabold flex items-center gap-1.5 shrink-0 shadow-md card-levitate"
                    title="Send automated email alert via EmailJS"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{isSendingEmail ? 'Sending...' : 'EmailJS'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={openMailClientFallback}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-200 dark:bg-purple-900/60 hover:bg-slate-300 dark:hover:bg-purple-900 text-slate-800 dark:text-slate-200 font-extrabold flex items-center gap-1.5 shrink-0 card-levitate"
                    title="Open in your default Mail app"
                  >
                    <span>Mail App</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 5: CLOUDFLARE R2 GUIDE MODAL                                    */}
      {/* ===================================================================== */}
      {showCloudflareGuideModal && (
        <div
          onClick={() => setShowCloudflareGuideModal(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border space-y-4 transition-all ${
              themeMode === 'dark'
                ? 'glass-panel-dark text-slate-100'
                : 'glass-panel-light text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${
              themeMode === 'dark' ? 'border-white/[0.08]' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <Cloud className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-black">Cloudflare R2 Direct Video Setup Guide</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCloudflareGuideModal(false)}
                className="p-1.5 rounded-full bg-slate-100 dark:bg-purple-900/50 text-slate-400 hover:text-rose-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ol className="text-xs text-slate-400 space-y-2.5 list-decimal pl-4 leading-relaxed">
              <li>Upload your master `.mp4` video file to your Cloudflare R2 bucket.</li>
              <li>
                In Cloudflare Dashboard → R2 → select your bucket → Settings → Enable Public
                Development URL (or configure a custom domain).
              </li>
              <li>
                In bucket Settings → CORS Policy, add allowed origins <code>*</code> with GET and HEAD methods.
              </li>
              <li>
                Copy the public URL (e.g. <code>https://pub-xxx.r2.dev/video.mp4</code>) and paste it
                into <strong>+ Upload / Switch Video</strong>.
              </li>
            </ol>
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const corsJson = JSON.stringify(
                      [
                        {
                          AllowedOrigins: ['*'],
                          AllowedMethods: ['GET', 'HEAD'],
                          AllowedHeaders: ['*'],
                          MaxAgeSeconds: 3000
                        }
                      ],
                      null,
                      2
                    );
                    if (navigator?.clipboard?.writeText) {
                      navigator.clipboard.writeText(corsJson).catch(() => {});
                    }
                    showToast('Copied Cloudflare CORS JSON policy to clipboard!');
                  }}
                  className="px-3 py-1.5 rounded-xl border border-amber-500/30 text-amber-500 dark:text-amber-400 hover:bg-amber-500/10 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Copy CORS Policy</span>
                </button>
                <a
                  href="https://dash.cloudflare.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Cloudflare Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <button
                type="button"
                onClick={() => setShowCloudflareGuideModal(false)}
                className="px-5 py-2 rounded-xl btn-royal-primary text-white font-extrabold text-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POINT 9: IMAGE ATTACHMENT FULL LIGHTBOX PREVIEW MODAL */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
            <img
              src={lightboxImage}
              alt="Full resolution attachment"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* TOAST ALERTS */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-extrabold transition-all card-levitate backdrop-blur-xl ${
            toast.type === 'milestone'
              ? 'btn-emerald-gradient text-white border-emerald-300 shadow-emerald-500/25'
              : toast.type === 'error'
              ? 'bg-rose-600 text-white border-rose-400 shadow-rose-600/30'
              : themeMode === 'dark'
              ? 'glass-panel-dark text-white border-violet-500/30 shadow-violet-500/20'
              : 'glass-panel-light text-slate-900 border-violet-300 shadow-xl'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2
              className={`w-4 h-4 ${
                toast.type === 'milestone' ? 'text-white' : 'text-emerald-400'
              }`}
            />
          </div>
          <span className="font-bold">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
