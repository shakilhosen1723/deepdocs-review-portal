import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Plus,
  Check,
  MessageSquare,
  Send,
  Settings,
  Bookmark,
  Film,
  CheckCircle2,
  Clock,
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
  ExternalLink,
  AlertTriangle,
  Calendar,
  Volume2,
  VolumeX,
  Maximize,
  BellOff,
  PartyPopper,
  Edit3,
  RefreshCw,
  ShieldCheck,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

const DEFAULT_SETTINGS = {
  studioName: 'DeepDox',
  studioBadge: 'PRO SUITE',
  studioSubName: 'Interactive Video Review & Client Portal',
  editorName: 'Shakil Hosen',
  editorEmail: 'shakilhossion917@gmail.com',
  editorWhatsapp: '+8801700000000',
  emailjsServiceId: 'service_eqdjjgl',
  emailjsTemplateId: 'template_khezhvx',
  emailjsPublicKey: 'Jbq66LHL5yNjAx_1h'
};

const MARKER_CATEGORIES = [
  { label: 'Visual / VFX', pill: 'bg-purple-100 text-purple-700 border-purple-200' },
  { label: 'Cut / Timing', pill: 'bg-amber-100 text-amber-800 border-amber-200' },
  { label: 'Color Grade', pill: 'bg-pink-100 text-pink-700 border-pink-200' },
  { label: 'Audio Mix', pill: 'bg-indigo-100 text-indigo-700 border-indigo-200' }
];

const INITIAL_PROJECTS = [
  {
    id: 'proj_1',
    tab_number: 1,
    tab_label: 'Project 1',
    title: 'Global Peace Music Video — Virtual Stage Pass',
    client_name: 'Sepand Studios',
    version_label: 'Cut v1.4',
    status_label: 'Status: In Revision / Fixing Notes',
    source_type: 'r2',
    r2Url: 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4',
    driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    video_url: 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4',
    deadline: '2026-11-12',
    client_whatsapp: '+15550192834',
    client_email: 'production@sepandstudios.example.com',
    created_at: '2026-10-20T14:20:00Z'
  },
  {
    id: 'proj_2',
    tab_number: 2,
    tab_label: 'Project 2',
    title: 'Commercial VFX Pass — Hologram Sequence',
    client_name: 'Sepand Studios',
    version_label: 'Cut v2.1',
    status_label: 'Status: Client Review Active',
    source_type: 'r2',
    r2Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    deadline: '2026-11-18',
    client_whatsapp: '+15550192834',
    client_email: 'production@sepandstudios.example.com',
    created_at: '2026-10-24T09:15:00Z'
  },
  {
    id: 'proj_3',
    tab_number: 3,
    tab_label: 'Project 3',
    title: 'Brand Anthem — Google Drive Preview Cut',
    client_name: 'Sepand Studios',
    version_label: 'Cut v1.0',
    status_label: 'Status: Approved & Completed',
    source_type: 'gdrive',
    r2Url: 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4',
    driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    video_url: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    deadline: '2026-11-25',
    client_whatsapp: '+15550192834',
    client_email: 'production@sepandstudios.example.com',
    created_at: '2026-10-26T11:00:00Z'
  }
];

const INITIAL_MARKERS = [
  {
    id: 'm_101',
    project_id: 'proj_1',
    timestamp_seconds: 14.0,
    category: 'Visual / VFX',
    client_comment: 'Soften the volumetric stage light rays behind the lead vocalist.',
    is_resolved: true,
    editor_reply: 'Fixed! Re-baked the volumetric fog pass with higher sample count.',
    created_at: '2026-10-20T15:00:00Z'
  },
  {
    id: 'm_102',
    project_id: 'proj_1',
    timestamp_seconds: 46.0,
    category: 'Cut / Timing',
    client_comment: 'Cut to the wide holographic stage angle 12 frames earlier right on the drum impact.',
    is_resolved: false,
    editor_reply: '',
    created_at: '2026-10-20T15:04:00Z'
  },
  {
    id: 'm_103',
    project_id: 'proj_1',
    timestamp_seconds: 68.5,
    category: 'Color Grade',
    client_comment: 'Boost golden highlight warmth on the crowd silhouette shots.',
    is_resolved: true,
    editor_reply: 'Fixed! Added warm midtone push and balanced skin highlights.',
    created_at: '2026-10-20T15:15:00Z'
  },
  {
    id: 'm_104',
    project_id: 'proj_1',
    timestamp_seconds: 92.0,
    category: 'Visual / VFX',
    client_comment: 'Check slight edge shimmer on the right LED screen portal frame.',
    is_resolved: false,
    editor_reply: '',
    created_at: '2026-10-20T15:25:00Z'
  },
  {
    id: 'm_201',
    project_id: 'proj_2',
    timestamp_seconds: 5.0,
    category: 'Cut / Timing',
    client_comment: 'Great pacing on the reveal transition.',
    is_resolved: false,
    editor_reply: '',
    created_at: '2026-10-24T10:15:00Z'
  },
  {
    id: 'm_301',
    project_id: 'proj_3',
    timestamp_seconds: 8.0,
    category: 'Color Grade',
    client_comment: 'Final color pass looks crisp and ready for broadcast.',
    is_resolved: true,
    editor_reply: 'Thank you! Master export locked.',
    created_at: '2026-10-26T12:00:00Z'
  }
];

const DEMO_FALLBACK_MP4 = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

function formatTimecode(seconds, longFormat = true) {
  if (!seconds || isNaN(seconds) || seconds < 0) {
    return longFormat ? '00:00:00' : '00:00';
  }
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (longFormat) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function resolveVideoEngine(project) {
  if (!project) {
    return { mode: 'r2', badge: 'Direct MP4 Stream', streamUrl: '', embedUrl: '' };
  }
  const preferredType = project.source_type || 'r2';
  const r2Candidate = (project.r2Url || (!project.video_url?.includes('drive.google.com') ? project.video_url : '') || 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4').trim();
  const driveCandidate = (project.driveUrl || (project.video_url?.includes('drive.google.com') ? project.video_url : '') || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view').trim();

  if (preferredType === 'gdrive') {
    const fileIdMatch = driveCandidate.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || driveCandidate.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    const fileId = fileIdMatch && fileIdMatch[1] ? fileIdMatch[1] : null;
    const embedUrl = fileId ? `https://drive.google.com/file/d/${fileId}/preview` : (driveCandidate.includes('/preview') ? driveCandidate : driveCandidate.replace(/\/view.*$/, '/preview'));
    return { mode: 'gdrive', badge: 'Google Drive Preview', streamUrl: driveCandidate, embedUrl };
  }

  return { mode: 'r2', badge: 'Direct MP4 Stream', streamUrl: r2Candidate, embedUrl: r2Candidate };
}

function formatDeadlineDisplay(dateString) {
  if (!dateString) return 'No Deadline';
  const target = new Date(dateString + 'T23:59:59');
  if (isNaN(target.getTime())) return dateString;
  return target.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function DotMatrix({ className = '' }) {
  return (
    <div className={`grid grid-cols-6 gap-2 pointer-events-none select-none opacity-25 ${className}`}>
      {Array.from({ length: 36 }).map((_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-white block" />
      ))}
    </div>
  );
}

export default function App() {
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const isStrictClientBookmark = urlParams.get('view') === 'client' || urlParams.get('role') === 'client';

  const [role, setRole] = useState(() => {
    if (isStrictClientBookmark) return 'client';
    return localStorage.getItem('deepdox_role_v5') || 'editor';
  });

  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('deepdox_theme_mode') || 'light';
  });

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
      const saved = localStorage.getItem('deepdox_projects_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((p) => ({
          ...p,
          r2Url: p.r2Url || (!p.video_url?.includes('drive.google.com') ? p.video_url : 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4'),
          driveUrl: p.driveUrl || (p.video_url?.includes('drive.google.com') ? p.video_url : 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view')
        }));
      }
      return INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [markers, setMarkers] = useState(() => {
    try {
      const saved = localStorage.getItem('deepdox_markers_v6');
      return saved ? JSON.parse(saved) : INITIAL_MARKERS;
    } catch {
      return INITIAL_MARKERS;
    }
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    const paramProj = urlParams.get('project');
    if (paramProj) return paramProj;
    return INITIAL_PROJECTS[0].id;
  });

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const commentInputRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [useCorsAnonymous, setUseCorsAnonymous] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [hoverZone, setHoverZone] = useState(null);
  const [skipFeedback, setSkipFeedback] = useState(null);

  const [markerFilter, setMarkerFilter] = useState('all');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentCategory, setNewCommentCategory] = useState('Visual / VFX');
  const [lockedTimestamp, setLockedTimestamp] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [replyDraftText, setReplyDraftText] = useState('');

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showUploadSourceModal, setShowUploadSourceModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCloudflareGuideModal, setShowCloudflareGuideModal] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState(false);

  const [videoLayoutMode, setVideoLayoutMode] = useState('side-by-side');
  const [videoAspectRatio, setVideoAspectRatio] = useState('auto');
  const [detectedVideoAspect, setDetectedVideoAspect] = useState('horizontal');

  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [toast, setToast] = useState(null);

  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    client_name: 'Sepand Studios',
    version_label: 'Cut v1.0',
    source_type: 'r2',
    r2Url: 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4',
    driveUrl: '',
    deadline: '2026-11-20',
    client_email: '',
    client_whatsapp: ''
  });

  const [sourceUpdateForm, setSourceUpdateForm] = useState({
    source_type: 'r2',
    r2Url: '',
    driveUrl: '',
    version_label: 'Cut v1.4'
  });

  const [notifyForm, setNotifyForm] = useState({
    clientEmail: '',
    clientWhatsapp: '',
    customMessage: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  useEffect(() => {
    try {
      localStorage.setItem('deepdox_projects_v6', JSON.stringify(projects));
      localStorage.setItem('deepdox_markers_v6', JSON.stringify(markers));
      localStorage.setItem('deepdox_settings_v5', JSON.stringify(settings));
      localStorage.setItem('deepdox_theme_mode', themeMode);
      if (!isStrictClientBookmark) {
        localStorage.setItem('deepdox_role_v5', role);
      }
    } catch (e) {
      console.error('Storage error:', e);
    }
  }, [projects, markers, settings, role, themeMode, isStrictClientBookmark]);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) || projects[0];
  }, [projects, activeProjectId]);

  const getProjectStats = (projectId) => {
    const list = markers.filter((m) => m.project_id === projectId);
    const total = list.length;
    const resolved = list.filter((m) => m.is_resolved).length;
    const pending = total - resolved;
    const percent = total === 0 ? 0 : Math.round((resolved / total) * 100);
    const isComplete = total > 0 && resolved === total;
    return { total, resolved, pending, percent, isComplete };
  };

  const activeStats = useMemo(
    () => getProjectStats(activeProject?.id),
    [markers, activeProject?.id]
  );

  const projectMarkers = useMemo(() => {
    if (!activeProject) return [];
    return markers
      .filter((m) => m.project_id === activeProject.id)
      .sort((a, b) => Number(a.timestamp_seconds) - Number(b.timestamp_seconds));
  }, [markers, activeProject]);

  const filteredMarkers = useMemo(() => {
    if (markerFilter === 'pending') return projectMarkers.filter((m) => !m.is_resolved);
    if (markerFilter === 'resolved') return projectMarkers.filter((m) => m.is_resolved);
    return projectMarkers;
  }, [projectMarkers, markerFilter]);

  const videoEngine = useMemo(() => {
    return resolveVideoEngine(activeProject);
  }, [activeProject]);

  useEffect(() => {
    setVideoError(false);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    setLockedTimestamp(null);
    if (activeProject) {
      setSourceUpdateForm({
        source_type: activeProject.source_type || 'r2',
        r2Url: activeProject.r2Url || (!activeProject.video_url?.includes('drive.google.com') ? activeProject.video_url : 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4'),
        driveUrl: activeProject.driveUrl || (activeProject.video_url?.includes('drive.google.com') ? activeProject.video_url : 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view'),
        version_label: activeProject.version_label || 'Cut v1.0'
      });
    }
  }, [activeProject?.id]);

  const handleSwitchSourceMode = (targetMode) => {
    if (!activeProject) return;
    setVideoError(false);
    setIsPlaying(false);
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== activeProject.id) return p;
        const nextR2 = p.r2Url || 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4';
        const nextDrive = p.driveUrl || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';
        return {
          ...p,
          source_type: targetMode,
          r2Url: nextR2,
          driveUrl: nextDrive,
          video_url: targetMode === 'gdrive' ? nextDrive : nextR2
        };
      })
    );
    showToast(targetMode === 'r2' ? 'Switched to Cloudflare R2 Direct Stream' : 'Switched to Google Drive Preview Mode');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || tag === 'select' || document.activeElement?.isContentEditable;
      if (isTyping) return;

      if (e.code === 'Space' && videoEngine.mode === 'r2') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.code === 'ArrowLeft' && videoEngine.mode === 'r2') {
        e.preventDefault();
        skipSeconds(-3);
      } else if (e.code === 'ArrowRight' && videoEngine.mode === 'r2') {
        e.preventDefault();
        skipSeconds(3);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const triggerOverlayFeedback = (label) => {
    setSkipFeedback(label);
    setTimeout(() => {
      setSkipFeedback((prev) => (prev === label ? null : prev));
    }, 650);
  };

  const togglePlayPause = () => {
    if (videoEngine.mode !== 'r2') return;
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play()
        .then(() => {
          setIsPlaying(true);
          setVideoError(false);
          triggerOverlayFeedback('play');
        })
        .catch(() => {
          setVideoError(true);
        });
    } else {
      v.pause();
      setIsPlaying(false);
      triggerOverlayFeedback('pause');
    }
  };

  const skipSeconds = (delta) => {
    if (videoEngine.mode !== 'r2') return;
    const v = videoRef.current;
    if (!v) return;
    const maxDur = v.duration && !isNaN(v.duration) ? v.duration : duration || 3600;
    const nextTime = Math.max(0, Math.min(v.currentTime + delta, maxDur));
    v.currentTime = nextTime;
    setCurrentTime(nextTime);
    triggerOverlayFeedback(delta < 0 ? `${delta}s` : `+${delta}s`);
  };

  const seekTo = (timeInSeconds) => {
    if (videoEngine.mode !== 'r2') return;
    const v = videoRef.current;
    const maxDur = v && v.duration && !isNaN(v.duration) ? v.duration : duration || 3600;
    const clamped = Math.max(0, Math.min(Number(timeInSeconds), maxDur));
    setCurrentTime(clamped);
    if (v) {
      v.currentTime = clamped;
    }
  };

  const handleVideoMouseMove = (e) => {
    if (videoEngine.mode !== 'r2') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    if (relX < 0.25) {
      setHoverZone('left');
    } else if (relX > 0.75) {
      setHoverZone('right');
    } else {
      setHoverZone('center');
    }
  };

  const handleVideoSurfaceClick = (e) => {
    if (videoEngine.mode !== 'r2') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    if (relX < 0.25) {
      skipSeconds(-3);
    } else if (relX > 0.75) {
      skipSeconds(3);
    } else {
      togglePlayPause();
    }
  };

  const handleTimelineClick = (e) => {
    if (videoEngine.mode !== 'r2' || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = clickX / rect.width;
    const targetDur = duration > 0 ? duration : 100;
    seekTo(pct * targetDur);
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const handleAddMarker = (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeProject) return;
    const stamp = lockedTimestamp !== null ? lockedTimestamp : Number(currentTime.toFixed(1));

    const createdMarker = {
      id: `m_${Date.now()}`,
      project_id: activeProject.id,
      timestamp_seconds: stamp,
      category: newCommentCategory,
      client_comment: newCommentText.trim(),
      is_resolved: false,
      editor_reply: '',
      created_at: new Date().toISOString()
    };

    setMarkers((prev) => [...prev, createdMarker]);
    setNewCommentText('');
    setLockedTimestamp(null);
    showToast(`Feedback note posted at ${formatTimecode(stamp)}`);
  };

  const handleToggleResolve = (markerId) => {
    const target = markers.find((m) => m.id === markerId);
    if (!target) return;
    const nextState = !target.is_resolved;

    const updatedMarkers = markers.map((m) =>
      m.id === markerId ? { ...m, is_resolved: nextState } : m
    );
    setMarkers(updatedMarkers);

    const projList = updatedMarkers.filter((m) => m.project_id === activeProject.id);
    const allResolved = projList.length > 0 && projList.every((m) => m.is_resolved);

    if (nextState && allResolved) {
      showToast('100% Complete! Tab turned Green. Click NOTIFY CLIENT to send completion alert.', 'milestone');
    } else {
      showToast(nextState ? 'Marked Fixed silently' : 'Re-opened note as Pending');
    }
  };

  const handleSaveEditorReply = (markerId) => {
    setMarkers((prev) =>
      prev.map((m) => (m.id === markerId ? { ...m, editor_reply: replyDraftText.trim() } : m))
    );
    setEditingReplyId(null);
    setReplyDraftText('');
    showToast('Editor reply saved');
  };

  const handleDeleteMarker = (markerId) => {
    setMarkers((prev) => prev.filter((m) => m.id !== markerId));
    showToast('Feedback note removed');
  };

  const handleUpdateDeadline = (newDate) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProject.id ? { ...p, deadline: newDate } : p))
    );
    setEditingDeadline(false);
    showToast(`Deadline updated to ${formatDeadlineDisplay(newDate)}`);
  };

  const handleUpdateProjectSource = (e) => {
    e.preventDefault();
    const cleanR2 = sourceUpdateForm.r2Url.trim() || activeProject?.r2Url || 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4';
    const cleanDrive = sourceUpdateForm.driveUrl.trim() || activeProject?.driveUrl || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';

    setProjects((prev) =>
      prev.map((p) =>
        p.id === activeProject.id
          ? {
              ...p,
              source_type: sourceUpdateForm.source_type,
              r2Url: cleanR2,
              driveUrl: cleanDrive,
              video_url: sourceUpdateForm.source_type === 'gdrive' ? cleanDrive : cleanR2,
              version_label: sourceUpdateForm.version_label.trim() || p.version_label
            }
          : p
      )
    );
    setVideoError(false);
    setShowUploadSourceModal(false);
    showToast(`Saved URLs & switched to ${sourceUpdateForm.source_type === 'gdrive' ? 'Google Drive Preview' : 'Cloudflare R2 Direct Stream'}`);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectForm.title.trim()) return;

    const cleanR2 = newProjectForm.r2Url.trim() || 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4';
    const cleanDrive = newProjectForm.driveUrl.trim() || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';

    const nextNum = projects.length + 1;
    const created = {
      id: `proj_${Date.now()}`,
      tab_number: nextNum,
      tab_label: `Project ${nextNum}`,
      title: newProjectForm.title.trim(),
      client_name: newProjectForm.client_name.trim() || 'Sepand Studios',
      version_label: newProjectForm.version_label.trim() || 'Cut v1.0',
      status_label: 'Status: In Revision / Fixing Notes',
      source_type: newProjectForm.source_type,
      r2Url: cleanR2,
      driveUrl: cleanDrive,
      video_url: newProjectForm.source_type === 'gdrive' ? cleanDrive : cleanR2,
      deadline: newProjectForm.deadline,
      client_email: newProjectForm.client_email.trim(),
      client_whatsapp: newProjectForm.client_whatsapp.trim(),
      created_at: new Date().toISOString()
    };

    setProjects((prev) => [...prev, created]);
    setActiveProjectId(created.id);
    setShowNewProjectModal(false);
    setNewProjectForm({
      title: '',
      client_name: 'Sepand Studios',
      version_label: 'Cut v1.0',
      source_type: 'r2',
      r2Url: 'https://pub-5b8238b2b8084659bd705080ea7f8fed.r2.dev/asldkfasdfsl.mp4',
      driveUrl: '',
      deadline: '2026-11-20',
      client_email: '',
      client_whatsapp: ''
    });
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

  const getClientBookmarkLink = () => {
    const base = window.location.origin + window.location.pathname;
    return `${base}?view=client&project=${activeProject?.id || ''}`;
  };

  const copyClientBookmarkLink = () => {
    navigator.clipboard.writeText(getClientBookmarkLink());
    showToast('Client Bookmark Link copied!');
  };

  const openNotifyCenter = () => {
    const link = getClientBookmarkLink();
    const statusHeader = activeStats.isComplete ? `✅ 100% COMPLETE — Ready for Final Sign-Off!` : `🎬 Revision Progress Update: ${activeStats.percent}% Complete`;

    const summary = `${statusHeader}\n• Project: ${activeProject?.title} (${activeProject?.version_label})\n• Fixes Completed: ${activeStats.resolved} of ${activeStats.total} Fixed (${activeStats.pending} Open)\n• Deadline: ${formatDeadlineDisplay(activeProject?.deadline)}\n• Client Review Link: ${link}`;

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
        showToast(`Email update sent to ${notifyForm.clientEmail}!`);
      } else {
        window.open(`mailto:${encodeURIComponent(notifyForm.clientEmail.trim())}?subject=${encodeURIComponent(`[DeepDox] ${activeProject?.title} — ${activeStats.percent}% Complete`)}&body=${encodeURIComponent(notifyForm.customMessage)}`, '_blank');
        showToast('Opened Email Client with progress summary!');
      }
    } catch {
      window.open(`mailto:${encodeURIComponent(notifyForm.clientEmail.trim())}?subject=${encodeURIComponent(`[DeepDox] ${activeProject?.title} — ${activeStats.percent}% Complete`)}&body=${encodeURIComponent(notifyForm.customMessage)}`, '_blank');
      showToast('Opened Email Client with progress summary!');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSendWhatsAppNotification = () => {
    const cleanedPhone = (notifyForm.clientWhatsapp || '').replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(notifyForm.customMessage);
    const waUrl = cleanedPhone ? `https://wa.me/${cleanedPhone}?text=${encodedText}` : `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Opened WhatsApp with project progress & link!');
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
    setVideoError(false);
  };

  const activeAspectClass = useMemo(() => {
    if (videoAspectRatio === 'vertical') return 'aspect-[9/16] max-w-sm mx-auto';
    if (videoAspectRatio === 'horizontal') return 'aspect-video';
    return detectedVideoAspect === 'vertical' ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-video';
  }, [videoAspectRatio, detectedVideoAspect]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 pb-16 ${
      themeMode === 'dark' ? 'bg-[#0b0716] text-slate-100 selection:bg-purple-500 selection:text-white' : 'bg-[#f5f3fa] text-slate-800 selection:bg-purple-600 selection:text-white'
    }`}>
      <div
        className="relative overflow-hidden text-white pb-24 lg:pb-28"
        style={{
          background: 'linear-gradient(135deg, #21094e 0%, #381078 40%, #6420aa 78%, #8338ec 100%)'
        }}
      >
        <DotMatrix className="absolute top-24 right-[36%] hidden md:grid" />
        <DotMatrix className="absolute bottom-24 left-[26%] hidden md:grid" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-600 p-0.5 shadow-lg shadow-purple-950/50">
                <div className="w-full h-full bg-[#2a0f5d]/85 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xl font-extrabold tracking-tight text-white">{settings.studioName}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/15 text-purple-100 border border-white/20">
                    {settings.studioBadge}
                  </span>
                </div>
                <p className="text-xs text-purple-200/80 mt-0.5">{settings.studioSubName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const nextTheme = themeMode === 'light' ? 'dark' : 'light';
                  setThemeMode(nextTheme);
                  showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Theme 🌙' : 'Light Theme ☀️'}`);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all shadow-sm"
              >
                {themeMode === 'light' ? (
                  <><span>🌙</span><span>Dark Mode</span></>
                ) : (
                  <><span>☀️</span><span>Light Mode</span></>
                )}
              </button>

              {!isStrictClientBookmark ? (
                <div className="flex items-center bg-[#180736]/80 backdrop-blur-md p-1.5 rounded-full border border-white/15 shadow-inner">
                  <button
                    type="button"
                    onClick={() => { setRole('editor'); showToast('Switched to Editor View'); }}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide transition-all ${
                      role === 'editor' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/40' : 'text-purple-200/75 hover:text-white'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>EDITOR VIEW</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setRole('client'); showToast('Switched to Client Workspace'); }}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide transition-all ${
                      role === 'client' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/40' : 'text-purple-200/75 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>CLIENT VIEW</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-purple-100">
                  <Eye className="w-3.5 h-3.5 text-purple-300" />
                  <span>CLIENT REVIEW WORKSPACE</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pb-5 border-b border-white/15 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/25 border border-fuchsia-300/30 text-[11px] font-black uppercase tracking-widest text-fuchsia-200">
                  <Film className="w-3.5 h-3.5 text-fuchsia-300" />
                  <span>SWITCH ACTIVE PROJECT</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {role === 'editor' && (
                  <button
                    type="button"
                    onClick={() => setShowCloudflareGuideModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3d2254]/90 hover:bg-[#4d2c6a] text-amber-200 border border-amber-400/30 text-xs font-bold transition-all"
                  >
                    <Cloud className="w-3.5 h-3.5 text-amber-400" />
                    <span>Cloudflare Guide</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={copyClientBookmarkLink}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all"
                >
                  <Bookmark className="w-3.5 h-3.5 text-purple-300" />
                  <span>Bookmark Link</span>
                </button>

                {role === 'editor' && (
                  <button
                    type="button"
                    onClick={() => setShowUploadSourceModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all"
                  >
                    <Upload className="w-3.5 h-3.5 text-purple-300" />
                    <span>+ Upload / Switch Video</span>
                  </button>
                )}

                {role === 'editor' && (
                  <button
                    type="button"
                    onClick={openNotifyCenter}
                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide transition-all shadow-lg ${
                      activeStats.isComplete ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30' : 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:opacity-95 text-white shadow-fuchsia-500/30'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{activeStats.isComplete ? 'NOTIFY CLIENT (100%)' : 'NOTIFY CLIENT'}</span>
                  </button>
                )}

                {role === 'editor' && (
                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(true)}
                    className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#2a0f5d]" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-stretch gap-3.5 overflow-x-auto pb-1.5 pt-1">
              {projects.map((proj, idx) => {
                const isSelected = proj.id === activeProject?.id;
                const stats = getProjectStats(proj.id);
                const shortLabel = proj.tab_label || `Project ${idx + 1}`;
                const cleanSubTitle = proj.title.split('—')[0].replace(/^Project \d+:\s*/i, '').trim();

                return (
                  <div
                    key={proj.id}
                    onClick={() => setActiveProjectId(proj.id)}
                    className={`group relative flex items-center gap-3.5 px-5 py-3.5 rounded-2xl text-left transition-all duration-200 shrink-0 border-2 cursor-pointer ${
                      stats.isComplete
                        ? isSelected
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 border-white shadow-xl shadow-emerald-500/40 scale-[1.03]'
                          : 'bg-emerald-500/25 hover:bg-emerald-500/35 text-white border-emerald-400/60 shadow-lg shadow-emerald-950/30'
                        : isSelected
                        ? 'bg-white text-[#23094d] border-fuchsia-300 shadow-2xl shadow-purple-950/60 scale-[1.03]'
                        : 'bg-[#2a0e60]/90 hover:bg-[#38147b] text-white border-white/20 hover:border-purple-300/60 shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <span className={`absolute -top-1.5 left-4 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow ${
                        stats.isComplete ? 'bg-slate-950 text-emerald-300' : 'bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white'
                      }`}>
                        ACTIVE
                      </span>
                    )}

                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-black text-sm shadow-inner ${
                      stats.isComplete
                        ? isSelected ? 'bg-slate-950/15 text-slate-950' : 'bg-emerald-400 text-slate-950'
                        : isSelected ? 'bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-md' : 'bg-white/10 text-purple-200 group-hover:bg-white/20'
                    }`}>
                      {stats.isComplete ? <CheckCircle2 className="w-6 h-6" /> : <Film className="w-5 h-5" />}
                    </div>

                    <div className="min-w-[135px] max-w-[200px]">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black tracking-tight leading-none">{shortLabel}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          stats.isComplete
                            ? isSelected ? 'bg-slate-950/15 text-slate-950' : 'bg-emerald-400/30 text-emerald-200'
                            : isSelected ? 'bg-purple-100 text-purple-800' : 'bg-white/10 text-purple-200'
                        }`}>
                          {proj.version_label}
                        </span>
                      </div>
                      <p className={`text-xs font-bold truncate mt-1 ${
                        stats.isComplete
                          ? isSelected ? 'text-slate-900' : 'text-emerald-100'
                          : isSelected ? 'text-slate-600' : 'text-purple-200/85'
                      }`}>
                        {cleanSubTitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-wide shrink-0 ${
                        stats.isComplete
                          ? isSelected ? 'bg-slate-950 text-emerald-400 shadow' : 'bg-emerald-400 text-slate-950 shadow'
                          : isSelected ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 'bg-black/30 text-purple-100 border border-white/10'
                      }`}>
                        {stats.isComplete ? '✓ 100%' : `${stats.percent}%`}
                      </div>

                      {role === 'editor' && projects.length > 1 && (
                        <button
                          type="button"
                          onClick={(e) => handleDeleteProject(e, proj.id)}
                          className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-black/20 transition-all opacity-60 hover:opacity-100"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {role === 'editor' && (
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(true)}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30 hover:from-fuchsia-500/45 hover:to-purple-500/45 text-white border-2 border-dashed border-fuchsia-300/70 hover:border-white text-sm font-black shrink-0 transition-all shadow-lg hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <FolderPlus className="w-5 h-5 text-fuchsia-200" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-black leading-tight">+ New Project</span>
                    <span className="block text-[11px] font-semibold text-purple-200">Add video workspace</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-extrabold uppercase tracking-widest text-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-300" />
                <span>CLIENT REVIEW PORTAL</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                {activeProject?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <div className="relative inline-flex items-center">
                  <select
                    value={activeProject?.id}
                    onChange={(e) => setActiveProjectId(e.target.value)}
                    className="appearance-none bg-[#230b4f]/80 hover:bg-[#2c0f63] text-white text-xs font-bold pl-4 pr-9 py-2 rounded-full border border-white/25 focus:outline-none cursor-pointer shadow-sm"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#230b4f] text-white">
                        {p.client_name} — {p.title} ({p.version_label})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-purple-300 absolute right-3.5 pointer-events-none" />
                </div>

                <span className="px-3.5 py-2 rounded-full bg-purple-500/30 border border-purple-300/30 text-xs font-extrabold text-white">
                  {activeProject?.version_label}
                </span>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-purple-100">
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span>Deadline:</span>
                  {editingDeadline && role === 'editor' ? (
                    <span className="inline-flex items-center gap-1">
                      <input
                        type="date"
                        defaultValue={activeProject?.deadline || ''}
                        onChange={(e) => handleUpdateDeadline(e.target.value)}
                        className="bg-[#1b083d] text-white text-xs rounded px-2 py-0.5 border border-purple-400 focus:outline-none"
                      />
                      <button type="button" onClick={() => setEditingDeadline(false)} className="text-purple-200 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <strong className="text-white">{formatDeadlineDisplay(activeProject?.deadline)}</strong>
                      {role === 'editor' && (
                        <button type="button" onClick={() => setEditingDeadline(true)} className="text-amber-300 hover:text-white ml-0.5">
                          <Edit3 className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={`rounded-3xl p-6 backdrop-blur-xl border transition-all shadow-2xl ${
                activeStats.isComplete ? 'bg-emerald-500/20 border-emerald-300/50 shadow-emerald-950/30' : 'bg-white/10 border-white/20 shadow-purple-950/40'
              }`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-200 block">LIVE REVISION PROGRESS</span>
                    <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                      {activeStats.resolved} of {activeStats.total} Fixes Completed
                    </h2>
                  </div>
                  <div className={`px-3.5 py-2 rounded-2xl text-sm font-black shadow-md transition-all ${
                    activeStats.isComplete ? 'bg-emerald-400 text-slate-950' : 'bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white border border-white/25'
                  }`}>
                    {activeStats.percent}%
                  </div>
                </div>

                <div className="w-full h-2.5 bg-[#1e0942]/80 rounded-full overflow-hidden mb-5 p-0.5">
                  <div className={`h-full rounded-full transition-all duration-500 ${
                    activeStats.isComplete ? 'bg-emerald-400' : 'bg-gradient-to-r from-pink-500 via-purple-400 to-emerald-400'
                  }`} style={{ width: `${activeStats.percent}%` }} />
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-white/10 border border-white/15 py-2.5 px-2">
                    <span className="text-base font-black text-white block">{activeStats.total}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-purple-200">TOTAL NOTES</span>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/20 border border-emerald-300/30 py-2.5 px-2">
                    <span className="text-base font-black text-emerald-300 block">{activeStats.resolved}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-200">FIXED (GREEN)</span>
                  </div>
                  <div className="rounded-2xl bg-amber-400/15 border border-amber-300/30 py-2.5 px-2">
                    <span className="text-base font-black text-amber-200 block">{activeStats.pending}</span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-200">OPEN NOTES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 sm:h-16 lg:h-20 preserve-3d" preserveAspectRatio="none">
            <path d="M0 40L80 45C160 50 320 60 480 55C640 50 800 30 960 22C1120 15 1280 20 1360 24L1440 28V90H1360C1280 90 1120 90 960 90C800 90 640 90 480 90C320 90 160 90 80 90H0V40Z" fill={themeMode === 'dark' ? '#0b0716' : '#f5f3fa'} />
          </svg>
        </div>
      </div>

      <main className="relative z-20 max-w-[1380px] mx-auto px-4 sm:px-8 -mt-14 lg:-mt-16">
        <div className={`mb-4 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md px-4 py-2.5 rounded-2xl border shadow-sm transition-colors ${
          themeMode === 'dark' ? 'bg-[#150d2c]/90 border-purple-900/50 text-slate-200' : 'bg-white/80 border-purple-100 text-slate-700'
        }`}>
          <div className="flex items-center gap-2 text-xs font-extrabold">
            <Sliders className="w-4 h-4 text-purple-500" />
            <span>Workspace Controls:</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setVideoAspectRatio('auto')}
                className={`p-1.5 rounded-lg text-xs font-extrabold transition-all ${videoAspectRatio === 'auto' ? 'bg-purple-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'}`}
              >
                Auto
              </button>
              <button
                type="button"
                onClick={() => setVideoAspectRatio('horizontal')}
                className={`p-1.5 rounded-lg transition-all ${videoAspectRatio === 'horizontal' ? 'bg-purple-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'}`}
              >
                🖥️
              </button>
              <button
                type="button"
                onClick={() => setVideoAspectRatio('vertical')}
                className={`p-1.5 rounded-lg transition-all ${videoAspectRatio === 'vertical' ? 'bg-purple-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'}`}
              >
                📱
              </button>
            </div>
            <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setVideoLayoutMode('side-by-side')}
                className={`p-1.5 rounded-lg transition-all ${videoLayoutMode === 'side-by-side' ? 'bg-purple-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'}`}
              >
                🔲
              </button>
              <button
                type="button"
                onClick={() => setVideoLayoutMode('top-bottom')}
                className={`p-1.5 rounded-lg transition-all ${videoLayoutMode === 'top-bottom' ? 'bg-purple-600 text-white shadow-sm' : 'opacity-70 hover:opacity-100'}`}
              >
                Stacked
              </button>
            </div>
          </div>
        </div>

        <div className={`grid gap-7 items-start ${videoLayoutMode === 'top-bottom' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
          <div className={`${videoLayoutMode === 'top-bottom' ? 'w-full max-w-4xl mx-auto' : 'lg:col-span-8'} rounded-[28px] shadow-xl border p-4 sm:p-6 transition-all duration-300 ${
            themeMode === 'dark' ? 'bg-[#150d2c] border-purple-900/60 shadow-purple-950/20 text-slate-100' : 'bg-white border-purple-100 shadow-purple-950/5 text-slate-800'
          }`}>
            <div className={`flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b ${themeMode === 'dark' ? 'border-purple-900/50' : 'border-slate-100'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <div className={`inline-flex items-center p-1 rounded-full border ${themeMode === 'dark' ? 'bg-[#221345] border-purple-900' : 'bg-slate-100 border-slate-200'}`}>
                  <button
                    type="button"
                    onClick={() => handleSwitchSourceMode('r2')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                      videoEngine.mode === 'r2' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25' : themeMode === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-purple-700'
                    }`}
                  >
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Cloudflare R2 Direct</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchSourceMode('gdrive')}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                      videoEngine.mode === 'gdrive' ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25' : themeMode === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-amber-700'
                    }`}
                  >
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Google Drive Preview</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={playerContainerRef}
              onMouseMove={handleVideoMouseMove}
              onMouseLeave={() => setHoverZone(null)}
              onClick={handleVideoSurfaceClick}
              className={`relative rounded-2xl overflow-hidden bg-[#07070c] ${activeAspectClass} flex items-center justify-center select-none cursor-pointer group shadow-inner transition-all duration-300`}
            >
              {videoEngine.mode === 'r2' && (
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151226]/90 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-white pointer-events-none shadow-md">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
                  <span>TC {formatTimecode(currentTime, true)}</span>
                </div>
              )}

              {videoEngine.mode === 'gdrive' ? (
                <iframe
                  src={videoEngine.embedUrl}
                  title={activeProject?.title}
                  className="w-full h-full border-0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              ) : (
                <>
                  <video
                    ref={videoRef}
                    key={`${videoEngine.streamUrl}_${useCorsAnonymous ? 'cors' : 'nocors'}`}
                    src={videoEngine.streamUrl}
                    {...(useCorsAnonymous ? { crossOrigin: 'anonymous' } : {})}
                    preload="metadata"
                    playsInline
                    muted={isMuted}
                    className="w-full h-full object-contain"
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={() => setVideoError(true)}
                  />

                  {!isPlaying && !videoError && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 border-2 border-white/40 flex items-center justify-center text-white shadow-2xl shadow-purple-600/50 transition-transform group-hover:scale-110">
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {videoError && (
                    <div onClick={(e) => e.stopPropagation()} className="absolute inset-0 z-30 bg-[#0d0a1a]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
                      <AlertTriangle className="w-10 h-10 text-amber-400 mb-2" />
                      <h4 className="text-sm font-extrabold mb-1">Stream Error or CORS Block</h4>
                      <button
                        type="button"
                        onClick={() => {
                          setProjects((prev) => prev.map((p) => p.id === activeProject.id ? { ...p, r2Url: DEMO_FALLBACK_MP4, video_url: DEMO_FALLBACK_MP4, source_type: 'r2' } : p));
                          setVideoError(false);
                          showToast('Loaded sample stream');
                        }}
                        className="px-3.5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold mt-3"
                      >
                        Load Working Demo Stream
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-4 pt-2 space-y-3">
              {videoEngine.mode === 'r2' && (
                <>
                  <div
                    ref={timelineRef}
                    onClick={handleTimelineClick}
                    className={`relative h-3 rounded-full cursor-pointer flex items-center border ${
                      themeMode === 'dark' ? 'bg-purple-950/60 border-purple-900' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full pointer-events-none"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                    <div
                      className="absolute w-4 h-4 rounded-full bg-white border-2 border-purple-600 shadow-md transform -translate-x-1/2 pointer-events-none"
                      style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                    {projectMarkers.map((m) => {
                      const pct = duration > 0 ? (m.timestamp_seconds / duration) * 100 : 0;
                      return (
                        <div
                          key={m.id}
                          onClick={(e) => { e.stopPropagation(); seekTo(m.timestamp_seconds); }}
                          className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white shadow cursor-pointer transition-transform hover:scale-125 z-10 ${
                            m.is_resolved ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ left: `${Math.min(100, Math.max(0, pct))}%` }}
                        />
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlayPause}
                        className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-md shadow-purple-600/30 transition-all"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </button>
                      <button type="button" onClick={() => skipSeconds(-3)} className={`p-2 rounded-xl ${themeMode === 'dark' ? 'bg-purple-950/60 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => skipSeconds(3)} className={`p-2 rounded-xl ${themeMode === 'dark' ? 'bg-purple-950/60 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                        <RotateCw className="w-4 h-4" />
                      </button>
                      <span className={`text-xs font-mono font-bold ml-2 ${themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {formatTimecode(currentTime, false)} / {formatTimecode(duration, false)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setIsMuted(!isMuted)} className={`p-2 rounded-xl ${themeMode === 'dark' ? 'bg-purple-950/60 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button type="button" onClick={toggleFullscreen} className={`p-2 rounded-xl ${themeMode === 'dark' ? 'bg-purple-950/60 text-slate-200' : 'bg-slate-100 text-slate-700'}`}>
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={`${videoLayoutMode === 'top-bottom' ? 'w-full max-w-4xl mx-auto' : 'lg:col-span-4'} space-y-5`}>
            <div className={`h-[620px] rounded-[28px] shadow-xl border p-5 sm:p-6 flex flex-col transition-colors ${
              themeMode === 'dark' ? 'bg-[#150d2c] border-purple-900/60 shadow-purple-950/20 text-slate-100' : 'bg-white border-purple-100 shadow-purple-950/5 text-slate-800'
            }`}>
              <div className={`flex flex-wrap items-start justify-between gap-2 pb-4 mb-4 border-b ${themeMode === 'dark' ? 'border-purple-900/50' : 'border-slate-100'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-black leading-tight ${themeMode === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>
                      Timestamp Feedback Notes
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {activeStats.total} Total Notes ({activeStats.resolved} Fixed)
                    </span>
                  </div>
                </div>

                <div className={`flex items-center p-1 rounded-full text-[11px] font-bold ${themeMode === 'dark' ? 'bg-[#221345]' : 'bg-slate-100'}`}>
                  {['all', 'pending', 'resolved'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setMarkerFilter(f)}
                      className={`px-2.5 py-1 rounded-full capitalize transition-all ${
                        markerFilter === f ? 'bg-purple-600 text-white shadow-sm' : themeMode === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {videoEngine.mode === 'r2' ? (
                <form onSubmit={handleAddMarker} className={`flex items-center gap-2 pb-4 mb-4 border-b ${themeMode === 'dark' ? 'border-purple-900/50' : 'border-slate-100'}`}>
                  <select
                    value={newCommentCategory}
                    onChange={(e) => setNewCommentCategory(e.target.value)}
                    className={`text-xs font-bold rounded-xl px-2.5 py-2.5 border focus:outline-none focus:border-purple-500 shrink-0 ${
                      themeMode === 'dark' ? 'bg-[#221345] text-slate-200 border-purple-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {MARKER_CATEGORIES.map((c) => (
                      <option key={c.label} value={c.label}>{c.label}</option>
                    ))}
                  </select>

                  <input
                    ref={commentInputRef}
                    type="text"
                    required
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder={`Add note at ${formatTimecode(currentTime, false)}...`}
                    className={`flex-1 min-w-0 text-xs rounded-xl px-3 py-2.5 border focus:outline-none focus:border-purple-500 ${
                      themeMode === 'dark' ? 'bg-[#221345] text-slate-100 border-purple-800' : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  />

                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shrink-0 shadow-md shadow-purple-600/20 transition-all"
                  >
                    Post
                  </button>
                </form>
              ) : (
                <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-center font-medium">
                  Switch to <strong>Cloudflare R2 Direct Stream</strong> to post timecode notes.
                </div>
              )}

              <div className="flex-1 overflow-y-auto pr-1 space-y-3.5">
                {filteredMarkers.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs space-y-2">
                    <MessageSquare className="w-8 h-8 mx-auto opacity-30" />
                    <p>No feedback notes in this view.</p>
                  </div>
                ) : (
                  filteredMarkers.map((marker) => {
                    const catStyle = MARKER_CATEGORIES.find((c) => c.label === marker.category)?.pill || MARKER_CATEGORIES[0].pill;

                    return (
                      <div
                        key={marker.id}
                        onClick={() => seekTo(marker.timestamp_seconds)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 ${
                          marker.is_resolved
                            ? themeMode === 'dark' ? 'bg-emerald-950/30 border-emerald-800/60' : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                            : themeMode === 'dark' ? 'bg-[#221345]/70 border-purple-900 hover:border-purple-700' : 'bg-white border-slate-200 hover:border-purple-300 shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-mono text-[11px] font-extrabold">
                              {formatTimecode(marker.timestamp_seconds, true)}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${catStyle}`}>
                              {marker.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {role === 'editor' ? (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleToggleResolve(marker.id); }}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold transition-all ${
                                  marker.is_resolved ? 'bg-emerald-500 text-white shadow-sm' : 'bg-amber-100 hover:bg-emerald-500 text-amber-900 hover:text-white border border-amber-300'
                                }`}
                              >
                                <Check className="w-3 h-3" />
                                <span>{marker.is_resolved ? 'Fixed ✓' : 'Mark Fixed'}</span>
                              </button>
                            ) : (
                              <span className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold ${marker.is_resolved ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
                                {marker.is_resolved ? 'Fixed ✓' : 'Pending'}
                              </span>
                            )}

                            {role === 'editor' && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleDeleteMarker(marker.id); }}
                                className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <p className={`text-xs font-medium leading-relaxed ${themeMode === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                          {marker.client_comment}
                        </p>

                        {marker.editor_reply ? (
                          <div className={`border rounded-xl p-3 text-xs space-y-1 ${themeMode === 'dark' ? 'bg-purple-950/40 border-purple-900 text-slate-300' : 'bg-purple-50/80 border-purple-100 text-slate-600'}`}>
                            <div className="flex items-center justify-between">
                              <span className="font-extrabold text-purple-400 flex items-center gap-1 text-[11px]">
                                <CornerDownRight className="w-3 h-3" />
                                <span>Editor Reply:</span>
                              </span>
                              {role === 'editor' && (
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); setEditingReplyId(marker.id); setReplyDraftText(marker.editor_reply); }}
                                  className="text-[11px] font-bold text-purple-400 hover:underline"
                                >
                                  Edit
                                </button>
                              )}
                            </div>
                            <p className="text-[11px] leading-relaxed">{marker.editor_reply}</p>
                          </div>
                        ) : (
                          role === 'editor' && editingReplyId !== marker.id && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setEditingReplyId(marker.id); setReplyDraftText(''); }}
                              className="text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 pt-0.5"
                            >
                              <CornerDownRight className="w-3 h-3" />
                              <span>Add Editor Reply...</span>
                            </button>
                          )
                        )}

                        {role === 'editor' && editingReplyId === marker.id && (
                          <div onClick={(e) => e.stopPropagation()} className={`pt-2 space-y-2 border-t ${themeMode === 'dark' ? 'border-purple-900' : 'border-slate-100'}`}>
                            <input
                              type="text"
                              value={replyDraftText}
                              onChange={(e) => setReplyDraftText(e.target.value)}
                              placeholder="Type editor reply..."
                              className={`w-full text-xs rounded-xl px-3 py-2 border border-purple-500 focus:outline-none ${themeMode === 'dark' ? 'bg-[#180e36] text-slate-100' : 'bg-slate-50 text-slate-800'}`}
                            />
                            <div className="flex justify-end gap-2">
                              <button type="button" onClick={() => setEditingReplyId(null)} className="px-2.5 py-1 text-[11px] font-bold text-slate-400">Cancel</button>
                              <button type="button" onClick={() => handleSaveEditorReply(marker.id)} className="px-3 py-1 rounded-lg bg-purple-600 text-white text-[11px] font-bold">Save</button>
                            </div>
                          </div>
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

      {/* Modal Placeholders for completeness */}
      {showNotifyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-lg w-full p-6 shadow-2xl border space-y-5 ${themeMode === 'dark' ? 'bg-[#150d2c] border-purple-900 text-slate-100' : 'bg-white border-purple-100 text-slate-900'}`}>
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="text-base font-black">Notify Client</h3>
              <button type="button" onClick={() => setShowNotifyModal(false)}><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4 text-xs">
              <button type="button" onClick={handleSendWhatsAppNotification} className="w-full py-3 rounded-xl bg-emerald-500 text-white font-extrabold">Send via WhatsApp</button>
              <button type="button" onClick={handleSendEmailNotification} className="w-full py-3 rounded-xl bg-purple-600 text-white font-extrabold">Send via Email</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-2.5 text-xs font-extrabold bg-[#21094e] text-white border-purple-400/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};
