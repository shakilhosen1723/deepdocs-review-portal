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
  Link2,
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
// IMPORT MODULAR STATE CONTROLLER & UTILITIES
// ==========================================
import {
  AppState,
  useAppState,
  DEFAULT_FAVICON_SVG,
  DEFAULT_SETTINGS,
  MARKER_CATEGORIES,
  DEMO_FALLBACK_MP4,
  formatTimecode,
  parseTimecodeToSeconds,
  formatDeadlineDisplay,
  cleanAndEnhanceVideoUrl,
  resolveVideoEngine,
  isFallbackDemo,
  findProjectByIdOrTitle,
  saveProjectsToStorage,
  saveMarkersToStorage,
  saveSettingsToStorage,
  normalizeProject,
  normalizeMarker,
  STORAGE_KEYS
} from './state/AppState';

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
  // Reactive subscription to modular AppState controller
  const appState = useAppState();

  const urlParams = useMemo(() => new URLSearchParams(typeof window !== 'undefined' ? window.location.search : ''), []);
  const isStrictClientBookmark =
    urlParams.get('view') === 'client' || urlParams.get('role') === 'client';

  // Extract reactive state properties from AppState
  const projects = appState.projects;
  const markers = appState.markers;
  const settings = appState.settings;
  const activeProjectId = appState.activeProjectId;
  const activeVersionId = appState.activeVersionId;
  const currentView = appState.currentView;
  const role = isStrictClientBookmark ? 'client' : appState.role;
  const themeMode = appState.themeMode;
  const syncStatus = appState.syncStatus;
  const isPlaying = appState.isPlaying;
  const currentTime = appState.currentTime;
  const duration = appState.duration;
  const volume = appState.volume;
  const isMuted = appState.isMuted;
  const playbackSpeed = appState.playbackSpeed;
  const videoError = appState.videoError;
  const selectedVersionFilter = appState.selectedVersionFilter;
  const isComparisonMode = appState.isComparisonMode;
  const compareVersionLeftId = appState.compareVersionLeftId;
  const compareVersionRightId = appState.compareVersionRightId;
  const comparisonAudioTrack = appState.comparisonAudioTrack;

  // Active models & video engine
  const activeProject = useMemo(() => appState.getActiveProject(), [projects, activeProjectId]);
  const activeVersion = useMemo(() => appState.getActiveVersion(), [activeProject, activeVersionId]);
  const videoEngine = useMemo(() => appState.getVideoEngine(), [activeProject, activeVersion]);

  // Sync Tailwind .dark class on <html> document element for crisp styling
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

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
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconHref;

    const baseTitle = settings.studioName || 'DeepDox';
    if (activeProject?.title) {
      document.title = `${activeProject.title} — ${baseTitle} Review Portal`;
    } else {
      document.title = `${baseTitle} Pro Suite — Video Review & Client Portal`;
    }
  }, [settings.studioLogo, settings.studioName, activeProject?.title]);

  // Local UI / modal states
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState('');
  const [editingVersion, setEditingVersion] = useState(false);
  const [versionDraft, setVersionDraft] = useState('');
  const [editingDeadline, setEditingDeadline] = useState(false);

  const [markerFilter, setMarkerFilter] = useState('all');
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);
  const [uploadModalTab, setUploadModalTab] = useState('source');
  const [newVideoName, setNewVideoName] = useState('');
  const [newVideoSourceType, setNewVideoSourceType] = useState('r2');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('review');
  const [videoAspectRatio, setVideoAspectRatio] = useState('auto');
  const [detectedVideoAspect, setDetectedVideoAspect] = useState('horizontal');
  const [videoLayoutMode, setVideoLayoutMode] = useState('side-by-side');

  const [newCommentAttachment, setNewCommentAttachment] = useState(null);
  const [newCommentAttachmentName, setNewCommentAttachmentName] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const attachmentFileInputRef = useRef(null);

  const canvasRef = useRef(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [drawColor, setDrawColor] = useState('#facc15');
  const [drawLineWidth, setDrawLineWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnOnCanvas, setHasDrawnOnCanvas] = useState(false);

  const videoRef = useRef(null);
  const compareVideoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const commentInputRef = useRef(null);
  const logoFileInputRef = useRef(null);
  const localVideoFileInputRef = useRef(null);
  const newProjectLocalVideoRef = useRef(null);
  const newVideoLocalRef = useRef(null);

  // Attach video elements to AppState
  useEffect(() => {
    appState.attachVideoElements(videoRef.current, compareVideoRef.current);
  });

  const [useCorsAnonymous, setUseCorsAnonymous] = useState(false);
  const [hoverZone, setHoverZone] = useState(null);
  const [skipFeedback, setSkipFeedback] = useState(null);
  const [timelineHoverTime, setTimelineHoverTime] = useState(null);
  const [timelineHoverPos, setTimelineHoverPos] = useState(0);
  const [isTimelineDragging, setIsTimelineDragging] = useState(false);

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

  // Hydrate sourceUpdateForm with active project
  const syncUploadModalWithActiveProject = useCallback(() => {
    if (!activeProject) return;
    setSourceUpdateForm({
      title: activeProject.title || '',
      client_name: activeProject.client_name || 'Sepand Studios',
      status_label: activeProject.status_label || 'Status: In Revision / Fixing Notes',
      source_type: activeVersion?.source_type || activeProject.source_type || 'r2',
      r2Url: activeVersion?.r2Url || activeProject.r2Url || DEMO_FALLBACK_MP4,
      driveUrl: activeVersion?.driveUrl || activeProject.driveUrl || 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
      youtubeUrl: activeVersion?.youtubeUrl || activeProject.youtubeUrl || '',
      version_label: activeVersion?.version_label || activeProject.version_label || 'Version 1.0',
      client_email: activeProject.client_email || '',
      client_whatsapp: activeProject.client_whatsapp || ''
    });
  }, [activeProject, activeVersion]);

  useEffect(() => {
    syncUploadModalWithActiveProject();
  }, [syncUploadModalWithActiveProject]);

  // Project stats & markers
  const activeStats = useMemo(() => appState.getProjectStats(activeProject?.id), [markers, activeProject?.id]);
  const projectMarkers = useMemo(() => appState.getProjectMarkers(activeProject?.id), [markers, activeProject?.id]);

  // Version-Isolated markers: strictly shows notes for the selected/active version (or all if filter is 'all')
  const filteredMarkers = useMemo(() => {
    let list = projectMarkers;
    const targetVer = selectedVersionFilter !== 'all' ? selectedVersionFilter : activeVersion?.id;
    if (selectedVersionFilter !== 'all') {
      list = list.filter((m) => {
        if (!m.version_id) return targetVer === activeProject?.versions?.[0]?.id;
        return m.version_id === targetVer;
      });
    }
    if (markerFilter === 'pending') list = list.filter((m) => !m.is_resolved);
    if (markerFilter === 'resolved') list = list.filter((m) => m.is_resolved);
    return list;
  }, [projectMarkers, selectedVersionFilter, markerFilter, activeVersion?.id, activeProject?.versions]);

  // Setters for compatibility
  const setCurrentView = (v) => { appState.currentView = v; appState.notify(); };
  const setRole = (r) => { appState.role = r; appState.notify(); };
  const setThemeMode = (t) => { appState.themeMode = t; appState.notify(); };
  const setSelectedVersionFilter = (f) => { appState.selectedVersionFilter = f; appState.notify(); };
  const setIsComparisonMode = (c) => { appState.isComparisonMode = c; appState.notify(); };
  const setCompareVersionLeftId = (id) => { appState.compareVersionLeftId = id; appState.notify(); };
  const setCompareVersionRightId = (id) => { appState.compareVersionRightId = id; appState.notify(); };
  const setComparisonAudioTrack = (t) => { appState.comparisonAudioTrack = t; appState.notify(); };
  const setCurrentTime = (t) => { appState.currentTime = t; appState.notify(); };
  const setDuration = (d) => { appState.duration = d; appState.notify(); };
  const setIsPlaying = (p) => { appState.isPlaying = p; appState.notify(); };
  const setVideoError = (e) => { appState.videoError = e; appState.notify(); };
  const setProjects = (updater) => {
    if (typeof updater === 'function') {
      appState.projects = updater(appState.projects);
    } else {
      appState.projects = updater;
    }
    appState.notify();
  };
  const setMarkers = (updater) => {
    if (typeof updater === 'function') {
      appState.markers = updater(appState.markers);
    } else {
      appState.markers = updater;
    }
    appState.notify();
  };
  const setSettings = (updater) => {
    if (typeof updater === 'function') {
      appState.settings = updater(appState.settings);
    } else {
      appState.settings = updater;
    }
    appState.notify();
  };
  const setActiveProjectId = (id) => {
    appState.selectProject(id);
  };

  // PROJECT SELECTION
  const handleSelectProject = useCallback((projectId, targetView = 'review', versionId = null) => {
    if (!projectId) return;
    appState.selectProject(projectId, versionId, targetView);
    const targetProj = appState.projects.find((p) => p.id === projectId);
    if (targetProj) {
      showToast(`Opened ${targetProj.tab_label || 'Video'}: ${targetProj.title}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [showToast]);

  // VERSION SWITCHING (Clean video swap, isolates notes, no loop glitches)
  const handleSwitchActiveVersion = useCallback((verId) => {
    appState.selectVersion(verId);
    showToast(`Switched active video version`);
  }, [showToast]);

  // SOURCE PLATFORM SWITCHING (r2, gdrive, youtube)
  const handleSwitchSourceView = useCallback((sourceMode) => {
    appState.switchSourcePlatform(sourceMode);
    const modeNames = {
      r2: 'Cloudflare View (Direct Stream)',
      gdrive: 'Google Drive View (Preview Player)',
      youtube: 'YouTube View (Embed Player)'
    };
    showToast(`Switched to ${modeNames[sourceMode] || sourceMode}`);
  }, [showToast]);

  // ADD NEW VERSION
  const handleAddNewVersion = useCallback((e) => {
    e.preventDefault();
    const createdVer = appState.addVersion(activeProject?.id, {
      version_label: newVideoName,
      source_type: newVideoSourceType,
      url: newVideoUrl
    });
    if (createdVer) {
      setNewVideoName('');
      setNewVideoUrl('');
      setShowUploadSourceModal(false);
      showToast(`Added new video: ${createdVer.version_label} (Saved & Synced)`);
    }
  }, [activeProject?.id, newVideoName, newVideoSourceType, newVideoUrl, showToast]);

  // DELETE VERSION
  const handleDeleteVersion = useCallback((verId) => {
    appState.deleteVersion(activeProject?.id, verId);
    showToast('Video version updated (Synced)');
  }, [activeProject?.id, showToast]);

  // QUICK SAVE VIDEO LINK
  const handleQuickSaveVideoLink = useCallback((url, sourceType = 'r2') => {
    const { url: cleanUrl, detectedType } = cleanAndEnhanceVideoUrl(url);
    if (!cleanUrl) return;
    const finalType = detectedType || sourceType;
    const targetVerId = activeVersion?.id || activeProject?.active_version_id;
    appState.projects = appState.projects.map((p) => {
      if (p.id !== activeProject?.id) return p;
      const updatedVersions = (p.versions || []).map((v) => {
        if (v.id === targetVerId) {
          return {
            ...v,
            source_type: finalType,
            r2Url: finalType === 'r2' ? cleanUrl : v.r2Url,
            driveUrl: finalType === 'gdrive' ? cleanUrl : v.driveUrl,
            youtubeUrl: finalType === 'youtube' ? cleanUrl : v.youtubeUrl
          };
        }
        return v;
      });
      return normalizeProject({
        ...p,
        source_type: finalType,
        r2Url: finalType === 'r2' ? cleanUrl : p.r2Url,
        driveUrl: finalType === 'gdrive' ? cleanUrl : p.driveUrl,
        youtubeUrl: finalType === 'youtube' ? cleanUrl : p.youtubeUrl,
        video_url: cleanUrl,
        versions: updatedVersions
      });
    });
    saveProjectsToStorage(appState.projects);
    appState.selectVersion(targetVerId, activeProject?.id);
    appState.pushToCloud(null, true);
    appState.notify();
    showToast('Video URL saved, locked, and synced live across all client devices!');
  }, [activeProject?.id, activeVersion?.id, showToast]);

  // CREATE PROJECT
  const handleCreateProject = useCallback((e) => {
    e.preventDefault();
    const created = appState.createProject(newProjectForm);
    if (created) {
      setShowNewProjectModal(false);
      showToast(`Created ${created.tab_label}: ${created.title} (Synced)`);
    }
  }, [newProjectForm, showToast]);

  // DELETE PROJECT
  const handleDeleteProject = useCallback((e, targetId) => {
    e.stopPropagation();
    const ok = appState.deleteProject(targetId);
    if (ok) {
      showToast('Project deleted successfully (Synced).');
    } else {
      showToast('Cannot delete the last remaining project workspace.', 'error');
    }
  }, [showToast]);

  // INLINE METADATA UPDATES
  const handleSaveInlineTitle = useCallback(() => {
    if (!titleDraft.trim() || !activeProject) return;
    appState.updateProjectMetadata(activeProject.id, { title: titleDraft.trim() });
    setEditingTitle(false);
    showToast(`Updated project title to "${titleDraft.trim()}"`);
  }, [titleDraft, activeProject, showToast]);

  const handleSaveInlineVersion = useCallback(() => {
    if (!versionDraft.trim() || !activeProject) return;
    appState.updateProjectMetadata(activeProject.id, { version_label: versionDraft.trim() });
    setEditingVersion(false);
    showToast(`Updated active video label to "${versionDraft.trim()}"`);
  }, [versionDraft, activeProject, showToast]);

  const handleUpdateDeadline = useCallback((newDate) => {
    if (!activeProject) return;
    appState.updateProjectMetadata(activeProject.id, { deadline: newDate });
    setEditingDeadline(false);
    showToast(`Deadline updated to ${formatDeadlineDisplay(newDate)}`);
  }, [activeProject, showToast]);

  // PLAYBACK CONTROLS (WITHOUT LOOP GLITCHES)
  const skipSeconds = useCallback((delta) => {
    appState.skipSeconds(delta);
    setSkipFeedback(delta > 0 ? `+${delta}s` : `${delta}s`);
    setTimeout(() => setSkipFeedback(null), 500);
  }, []);

  const seekTo = useCallback((seconds) => {
    appState.seekTo(seconds);
  }, []);

  const togglePlayPause = useCallback(() => {
    appState.togglePlayPause();
    setSkipFeedback(appState.isPlaying ? 'play' : 'pause');
    setTimeout(() => setSkipFeedback(null), 500);
  }, []);

  const handleVolumeChange = useCallback((val) => {
    appState.setVolume(val);
  }, []);

  const toggleMute = useCallback(() => {
    appState.toggleMute();
    showToast(appState.isMuted ? 'Muted audio' : 'Unmuted audio');
  }, [showToast]);

  const handlePlaybackSpeedChange = useCallback((speed) => {
    appState.setPlaybackSpeed(speed);
    setSkipFeedback(`${speed}x`);
    setTimeout(() => setSkipFeedback(null), 500);
  }, []);

  // SINGLE CLEAN POPSTATE LISTENER (NEVER STACKED)
  useEffect(() => {
    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      const viewParam = p.get('view');
      const projParam = p.get('project');
      const verParam = p.get('version') || p.get('versionId');

      if (viewParam === 'landing') {
        AppState.currentView = 'landing';
        AppState.notify();
      } else if (viewParam === 'review' || projParam || isStrictClientBookmark) {
        AppState.currentView = 'review';
        AppState.notify();
      }

      if (projParam && AppState.projects.some((pr) => pr.id === projParam)) {
        AppState.selectProject(projParam, verParam);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isStrictClientBookmark]);

  // Video hover tracking
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

  // SINGLE CLEAN KEYBOARD SHORTCUTS LISTENER (NEVER STACKED)
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
        AppState.togglePlayPause();
      } else if (e.code === 'ArrowLeft' || e.key.toLowerCase() === 'j') {
        e.preventDefault();
        AppState.skipSeconds(-1);
      } else if (e.code === 'ArrowRight' || e.key.toLowerCase() === 'l') {
        e.preventDefault();
        AppState.skipSeconds(1);
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        AppState.toggleMute();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // CANVAS DRAWING (ON PAUSED FRAMES)
  const getCanvasCoords = (e) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    if (!isDrawingMode || !canvasRef.current) return;
    if (isPlaying) {
      togglePlayPause();
    }
    const { x, y } = getCanvasCoords(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawLineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
    setHasDrawnOnCanvas(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const { x, y } = getCanvasCoords(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasDrawnOnCanvas(false);
  };

  // ATTACHMENT & MARKERS
  const handleAttachmentSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a PNG, JPG, or SVG image reference.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setNewCommentAttachment(loadEvent.target?.result);
      setNewCommentAttachmentName(file.name);
      showToast(`Attached image reference: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  const handleCommentFocus = () => {
    if (lockedTimestamp === null) {
      setLockedTimestamp(Number(currentTime.toFixed(1)));
    }
  };

  const handleToggleLockTimestamp = () => {
    if (lockedTimestamp === null) {
      const snap = Number(currentTime.toFixed(1));
      setLockedTimestamp(snap);
      showToast(`Locked feedback note timestamp to ${formatTimecode(snap)}`);
    } else {
      setLockedTimestamp(null);
      showToast('Unlocked timestamp. Comment will track active playback head.');
    }
  };

  // ADD MARKER / FEEDBACK NOTE (VERSION-ISOLATED)
  const handleAddMarker = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    let stamp = lockedTimestamp !== null ? lockedTimestamp : Number(currentTime.toFixed(1));
    let drawingData = null;
    if (hasDrawnOnCanvas && canvasRef.current) {
      drawingData = canvasRef.current.toDataURL('image/png');
    }

    const createdMarker = appState.addMarker({
      timestamp: stamp,
      category: newCommentCategory,
      comment: newCommentText,
      attachment_url: newCommentAttachment,
      drawing_data: drawingData
    });

    setNewCommentText('');
    setNewCommentAttachment(null);
    setNewCommentAttachmentName(null);
    setLockedTimestamp(null);
    setIsEditingTimecode(false);
    setIsDrawingMode(false);
    clearCanvas();
    showToast(`Feedback note posted for ${createdMarker.version_label} at ${formatTimecode(createdMarker.timestamp_seconds)} (Synced)`);
  };

  // SEEK TO MARKER
  const handleSeekToMarker = (marker) => {
    if (marker.version_id && marker.version_id !== activeVersion?.id) {
      appState.selectVersion(marker.version_id);
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
    appState.toggleResolveMarker(markerId);
    showToast('Updated feedback note status (Synced)');
  };

  const handleStartEditorReply = (marker) => {
    setEditingReplyId(marker.id);
    setReplyDraftText(marker.editor_reply || '');
  };

  const handleSaveEditorReply = (markerId) => {
    appState.saveEditorReply(markerId, replyDraftText);
    setEditingReplyId(null);
    setReplyDraftText('');
    showToast('Editor reply saved! (Synced)');
  };

  const handleDeleteEditorReply = (markerId) => {
    appState.deleteEditorReply(markerId);
    showToast('Editor reply cleared (Synced)');
  };

  const handleDeleteMarker = (markerId) => {
    appState.deleteMarker(markerId);
    showToast('Feedback note removed (Synced)');
  };

  // UPDATE PROJECT SOURCE & LINK FIELDS
  const handleUpdateProjectSource = (e) => {
    e.preventDefault();
    const { url: cleanR2 } = cleanAndEnhanceVideoUrl(sourceUpdateForm.r2Url.trim());
    const finalR2 = cleanR2 || activeVersion?.r2Url || activeProject?.r2Url || DEMO_FALLBACK_MP4;
    const cleanDrive =
      sourceUpdateForm.driveUrl.trim() ||
      activeVersion?.driveUrl ||
      'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view';
    const cleanYoutube = sourceUpdateForm.youtubeUrl.trim() || activeVersion?.youtubeUrl || '';
    const targetVerId = activeVersion?.id || activeProject?.active_version_id;

    const chosenUrl =
      sourceUpdateForm.source_type === 'youtube'
        ? cleanYoutube
        : sourceUpdateForm.source_type === 'gdrive'
        ? cleanDrive
        : finalR2;

    appState.projects = appState.projects.map((p) => {
      if (p.id !== activeProject?.id) return p;
      const updatedVersions = (p.versions || []).map((v) => {
        if (v.id === targetVerId) {
          return {
            ...v,
            source_type: sourceUpdateForm.source_type,
            r2Url: finalR2,
            driveUrl: cleanDrive,
            youtubeUrl: cleanYoutube,
            version_label: sourceUpdateForm.version_label.trim() || v.version_label
          };
        }
        return v;
      });

      return normalizeProject({
        ...p,
        title: sourceUpdateForm.title.trim() || p.title,
        client_name: sourceUpdateForm.client_name.trim() || p.client_name,
        status_label: sourceUpdateForm.status_label.trim() || p.status_label,
        source_type: sourceUpdateForm.source_type,
        r2Url: finalR2,
        driveUrl: cleanDrive,
        youtubeUrl: cleanYoutube,
        video_url: chosenUrl,
        active_version_id: targetVerId,
        version_label: sourceUpdateForm.version_label.trim() || p.version_label,
        client_email: sourceUpdateForm.client_email.trim(),
        client_whatsapp: sourceUpdateForm.client_whatsapp.trim(),
        versions: updatedVersions
      });
    });

    saveProjectsToStorage(appState.projects);
    appState.selectVersion(targetVerId, activeProject?.id);
    appState.pushToCloud(null, true);

    setShowUploadSourceModal(false);
    showToast('Updated, saved, and synced project video source & URL!');
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
        appState.settings = { ...appState.settings, studioLogo: base64Data };
        saveSettingsToStorage(appState.settings);
        appState.pushToCloud(null, true);
        showToast('Logo & Browser Tab Favicon updated successfully!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetDemoData = () => {
    appState.projects = INITIAL_PROJECTS.map(normalizeProject);
    saveProjectsToStorage(appState.projects);
    appState.markers = INITIAL_MARKERS.map(normalizeMarker);
    saveMarkersToStorage(appState.markers);
    appState.settings = DEFAULT_SETTINGS;
    saveSettingsToStorage(appState.settings);
    appState.selectProject(INITIAL_PROJECTS[0].id);
    setShowSettingsModal(false);
    appState.pushToCloud(null, true);
    showToast('Reset all studio settings & projects to default');
  };

  // BOOKMARK REVIEW URL HELPER
  const getClientBookmarkLink = () => {
    const base = window.location.origin + window.location.pathname;
    const currentVideo =
      activeVersion?.r2Url ||
      activeProject?.r2Url ||
      (!isFallbackDemo(activeProject?.video_url) ? activeProject.video_url : '');
    const currentType = activeVersion?.source_type || activeProject?.source_type || 'r2';

    const params = new URLSearchParams();
    params.set('view', 'client');
    params.set('project', activeProject?.id || '');
    if (currentVideo && !isFallbackDemo(currentVideo)) {
      params.set('video', currentVideo);
      params.set('type', currentType);
    }
    if (activeProject?.title) {
      params.set('title', activeProject.title);
    }
    return `${base}?${params.toString()}`;
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

  // EXPORT NOTES
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
        appState.projects = appState.projects.map((p) =>
          p.id === activeProject?.id ? { ...p, client_email: notifyForm.clientEmail.trim() } : p
        );
        saveProjectsToStorage(appState.projects);
        appState.notify();
        showToast('Notification email sent successfully via EmailJS!');
        setShowNotifyModal(false);
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
      appState.projects = appState.projects.map((p) =>
        p.id === activeProject?.id
          ? { ...p, client_whatsapp: notifyForm.clientWhatsapp.trim() }
          : p
      );
      saveProjectsToStorage(appState.projects);
      appState.notify();
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
      AppState.duration = v.duration;
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

  const isVertical = useMemo(() => {
    if (videoAspectRatio === 'vertical') return true;
    if (videoAspectRatio === 'horizontal') return false;
    return detectedVideoAspect === 'vertical';
  }, [videoAspectRatio, detectedVideoAspect]);

  const activeAspectClass = useMemo(() => {
    if (isVertical) return 'aspect-[9/16] max-w-xs sm:max-w-sm mx-auto shadow-2xl';
    return 'aspect-video w-full';
  }, [isVertical]);

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
        <header className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 pt-2 sm:pt-2.5 pb-1 sm:pb-1.5">
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
              {/* Supabase Live Sync Status Pill */}
              <div
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black border ${
                  syncStatus === 'live'
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : syncStatus === 'syncing'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                }`}
                title="Two-Way Supabase Cloud Sync Status"
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    syncStatus === 'live'
                      ? 'bg-emerald-400 animate-pulse'
                      : syncStatus === 'syncing'
                      ? 'bg-amber-400 animate-spin'
                      : 'bg-rose-400'
                  }`}
                />
                <span>
                  {syncStatus === 'live'
                    ? 'LIVE SYNC'
                    : syncStatus === 'syncing'
                    ? 'SYNCING...'
                    : 'SYNC OFFLINE'}
                </span>
              </div>

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
        <section className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 mt-1 mb-2">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Left: Project Workspaces Dropdown Pill */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNewProjectModal(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-black text-white transition-all shadow-sm group"
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
                  onClick={copyClientBookmarkLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all"
                  title="Copy permanent client review bookmark link"
                >
                  <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Client Link</span>
                </button>
              )}

              {!isStrictClientBookmark && (
                <button
                  type="button"
                  onClick={handleExportNotes}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all"
                  title="Export all feedback notes for NLE editing (.txt)"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Export Notes</span>
                </button>
              )}

              {!isStrictClientBookmark && (
                <button
                  type="button"
                  onClick={() => setShowCloudflareGuideModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all"
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#fed7aa] hover:bg-[#fde68a] text-[#9a3412] text-xs font-black transition-all shadow-sm"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14182b] hover:bg-[#1a2039] border border-white/10 text-xs font-bold text-slate-200 hover:text-white transition-all relative"
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
        <section className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 mb-2 sm:mb-2.5">
          <div className="flex items-stretch gap-3 overflow-x-auto pb-1.5 scrollbar-thin">
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
                    className={`flex items-center justify-between gap-3 px-3.5 py-2 rounded-2xl min-w-[220px] cursor-pointer transition-all border ${
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
                  className={`flex items-center justify-between gap-3 px-3.5 py-2 rounded-2xl min-w-[220px] cursor-pointer transition-all border ${
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
                className="flex items-center gap-3 px-3.5 py-2 rounded-2xl border border-dashed border-white/20 hover:border-white/40 bg-[#13172b]/70 hover:bg-[#181d36] min-w-[185px] cursor-pointer transition-all shrink-0"
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
        <section className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-8 pb-2 sm:pb-2.5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
            {/* Left: Project Title, Version Dropdown Pill, Video Badge, Deadline */}
            <div className="lg:col-span-7 space-y-1.5 sm:space-y-2">
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
                    className="text-2xl sm:text-3xl font-black rounded-xl px-3.5 py-1 focus:outline-none w-full max-w-lg bg-[#0F1426] text-white border-2 border-[#FF6B00]"
                  />
                  <button
                    type="button"
                    onClick={handleSaveInlineTitle}
                    className="p-2 rounded-xl bg-emerald-500 text-white font-bold"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTitle(false)}
                    className="p-2 rounded-xl bg-white/10 text-slate-300 font-bold"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="group/title flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-none">
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
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {/* Deadline Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#14182b] border border-white/10 text-xs font-bold text-slate-200">
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
              <div className="w-full max-w-md bg-[#161B2E] border border-white/10 rounded-2xl p-3 sm:p-3.5 space-y-2 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block">
                      REVISION PROGRESS
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                      {activeStats.resolved} of {activeStats.total} Fixes Resolved
                    </h3>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-lg bg-[#FED7AA] text-[#9A3412] font-black text-xs">
                    {activeStats.percent}%
                  </div>
                </div>

                {/* Vibrant Orange Progress Bar */}
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#FF6B00] shadow-[0_0_12px_rgba(255,107,0,0.6)] transition-all duration-500"
                    style={{ width: `${activeStats.percent}%` }}
                  />
                </div>

                {/* 3 Stat Counter Boxes */}
                <div className="grid grid-cols-3 gap-2 pt-0.5 text-center">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#0F1426] border border-white/5 flex items-center justify-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-black text-white">{activeStats.total}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">TOTAL NOTES</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span className="text-xs font-black">{activeStats.resolved}</span>
                    <span className="text-[9px] font-bold uppercase">FIXED</span>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#3E2313] border border-amber-600/30 flex items-center justify-center gap-1.5 text-amber-400">
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
      <div className="bottom-zone-white border-t border-slate-200/90 text-slate-900 pt-2.5 sm:pt-3 pb-16 relative min-h-[600px]">
        {/* ===================================================================== */}
        {/* MAIN WORKSPACE SECTION                                                */}
        {/* ===================================================================== */}
        <main className="max-w-[1380px] mx-auto px-4 sm:px-8 relative z-20 space-y-3.5 sm:space-y-4">

        {/* POINT 7: SMART DYNAMIC 9:16 REFLOWING GRID */}
        <div
          className={`grid gap-4 sm:gap-5 items-start ${
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
            } p-3.5 sm:p-4`}
          >
            {/* VIDEO PLAYER HEADER BAR WITH MULTI-VERSION, COMPARISON & SOURCE VIEW TOGGLES */}
            <div
              className={`pb-2.5 mb-2.5 border-b space-y-2 ${
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
                      <div
                        key={ver.id}
                        className={`inline-flex items-center rounded-full text-xs font-black transition-all ${
                          isVerActive
                            ? 'bg-[#FF6B00] text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-500/30'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-white/[0.07] dark:text-slate-300 dark:hover:bg-white/15'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            handleSwitchActiveVersion(ver.id);
                            setSelectedVersionFilter(ver.id);
                          }}
                          className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1"
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

                        {role === 'editor' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const isMultiple = (activeProject?.versions || []).length > 1;
                              const confirmMsg = isMultiple
                                ? `Delete ${ver.version_label}? This will remove this video cut and its specific feedback notes.`
                                : `Clear or reset video link for ${ver.version_label}?`;
                              if (window.confirm(confirmMsg)) {
                                handleDeleteVersion(ver.id);
                              }
                            }}
                            className={`p-1 mr-1.5 rounded-full transition-colors cursor-pointer ${
                              isVerActive
                                ? 'hover:bg-black/25 text-white/80 hover:text-white'
                                : 'hover:bg-slate-300 dark:hover:bg-white/20 text-slate-400 hover:text-rose-500'
                            }`}
                            title={
                              (activeProject?.versions || []).length > 1
                                ? `Delete ${ver.version_label}`
                                : `Clear video link for ${ver.version_label}`
                            }
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
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

                  {/* Quick Direct Paste Video Link Button */}
                  {role === 'editor' && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentUrl = activeVersion?.r2Url || activeProject?.r2Url || '';
                        const promptDefault = currentUrl === DEMO_FALLBACK_MP4 ? '' : currentUrl;
                        const inputUrl = window.prompt(
                          'Paste your direct Cloudflare R2 (.mp4) or video stream URL:\n(It will stay saved permanently across page refreshes)',
                          promptDefault
                        );
                        if (inputUrl !== null && inputUrl.trim() !== '') {
                          handleQuickSaveVideoLink(inputUrl.trim(), 'r2');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-orange-500/10 hover:bg-orange-500/20 text-[#ea580c] dark:text-orange-400 border border-orange-500/30 transition-all cursor-pointer shadow-sm"
                      title="Directly paste or edit Cloudflare video link for this version"
                    >
                      <Link2 className="w-3.5 h-3.5 text-[#FF6B00]" />
                      <span>Paste Video Link</span>
                    </button>
                  )}

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
                          onEnded={() => {
                            setIsPlaying(false);
                            AppState.handleVideoEnded();
                          }}
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
                          onEnded={() => {
                            setIsPlaying(false);
                            AppState.handleVideoEnded();
                          }}
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
                      onEnded={() => {
                        setIsPlaying(false);
                        AppState.handleVideoEnded();
                      }}
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

                  {/* Marker Dots (version-specific notes) */}
                  {currentVersionNotes.map((m) => {
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
              className={`min-h-[560px] h-auto rounded-[28px] shadow-xl border p-3.5 sm:p-4 flex flex-col transition-colors ${
                themeMode === 'dark'
                  ? 'glass-panel-dark text-slate-100'
                  : 'bg-white border-[#E9ECEF] shadow-[0_10px_35px_-8px_rgba(15,23,42,0.06),0_1px_3px_0_rgba(15,23,42,0.02)] text-slate-800'
              }`}
            >
              {/* Header & Status Filter & Expansion Toggle (Matching Reference Asset) */}
              <div
                className={`flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b ${
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
                              onClick={() => {
                                if (window.confirm(`Delete ${ver.version_label}? This will remove this video cut and its specific feedback notes.`)) {
                                  handleDeleteVersion(ver.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/10 transition-colors"
                              title={`Delete ${ver.version_label}`}
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
