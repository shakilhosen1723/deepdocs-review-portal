// ============================================================================
// DeepDox Pro Suite — Complete Modular State Controller (AppState)
// Handles:
// 1. Multi-Project creation, switching, persistence, and cloud sync
// 2. Multi-Version video playback without loop glitches or audio stutter
// 3. Version-Isolated feedback notes & markers
// 4. Clean Real-time Supabase synchronization & WebSocket broadcast
// 5. Clean, non-stacked event delegation
// ============================================================================

import { useState, useEffect } from 'react';

// ==========================================
// DEFAULT SVG FAVICON FOR BROWSER TAB
// ==========================================
export const DEFAULT_FAVICON_SVG =
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
// SUPABASE LIVE CLOUD SYNC CONFIGURATION
// ==========================================
export const SUPABASE_URL = 'https://ysugdxzpixasjycewblg.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_Ny8Rx_02YCDL6SCUBoy0Ig_zH9wa5Xg';
export const SUPABASE_SYNC_TABLE = 'deepdox_portal_state';
export const SUPABASE_ENDPOINT = `${SUPABASE_URL}/rest/v1/${SUPABASE_SYNC_TABLE}`;
export const PORTAL_STATE_ID = 'master_workspace';

export const SUPABASE_REALTIME_URL = `${SUPABASE_URL.replace('https://', 'wss://')}/realtime/v1/websocket`;
export const REALTIME_CHANNEL_NAME = 'deepdox_version_sync';

// ==========================================
// LOCAL STORAGE KEYS
// ==========================================
export const STORAGE_KEYS = {
  PROJECTS: 'deepdox_projects_v7',
  MARKERS: 'deepdox_markers_v7',
  SETTINGS: 'deepdox_settings_v7',
  ROLE: 'deepdox_role_v7',
  THEME: 'deepdox_theme_mode',
  ACTIVE_PROJECT: 'deepdox_activeProjectId',
  ACTIVE_VERSION: 'deepdox_activeVersionId',
  SYNC_TIME: 'deepdox_sync_timestamp_v7',
};

// ==========================================
// INITIAL DEMO DATA & DEEPDOX CONFIGURATION
// ==========================================
export const DEFAULT_SETTINGS = {
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

export const MARKER_CATEGORIES = [
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

export const DEMO_FALLBACK_MP4 =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export const INITIAL_PROJECTS = [
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
        r2Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
        youtubeUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
        created_at: '2026-10-24T09:15:00Z'
      }
    ],
    status_label: 'Status: Approved & Completed',
    source_type: 'r2',
    r2Url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    driveUrl: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view',
    youtubeUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    deadline: '2026-11-25',
    client_whatsapp: '+15550192834',
    client_email: 'production@sepandstudios.example.com',
    created_at: '2026-10-24T09:15:00Z'
  }
];

export const INITIAL_MARKERS = [
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
// PURE UTILITY FUNCTIONS
// ==========================================
export function formatTimecode(seconds, longFormat = true) {
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

export function parseTimecodeToSeconds(tcString) {
  if (!tcString) return 0;
  const parts = tcString.trim().split(':').map((p) => parseFloat(p) || 0);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 1) return parts[0];
  return 0;
}

export function formatDeadlineDisplay(dateString) {
  if (!dateString) return 'No Deadline';
  const target = new Date(dateString + 'T23:59:59');
  if (isNaN(target.getTime())) return dateString;
  return target.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export const isFallbackDemo = (url) => {
  if (!url || typeof url !== 'string') return true;
  const u = url.trim();
  return (
    u === '' ||
    u === DEMO_FALLBACK_MP4 ||
    u.includes('sample/BigBuckBunny.mp4') ||
    u.includes('sample/ForBiggerBlazes.mp4') ||
    u.includes('asldkfasdfsl.mp4')
  );
};

export function cleanAndEnhanceVideoUrl(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') return { url: '', detectedType: 'r2' };
  let url = rawInput.trim();
  const mdMatch = url.match(/\((https?:\/\/[^\s)]+)\)/);
  if (mdMatch) {
    url = mdMatch[1];
  } else {
    url = url.replace(/^["'`]|["'`]$/g, '').trim();
  }
  let detectedType = 'r2';
  if (url.includes('drive.google.com')) {
    detectedType = 'gdrive';
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    detectedType = 'youtube';
  }
  return { url, detectedType };
}

export function resolveVideoEngine(project, activeVersion = null) {
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
    'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
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

export function findProjectByIdOrTitle(projectsList, idOrTitle) {
  if (!idOrTitle || !Array.isArray(projectsList) || projectsList.length === 0) {
    return projectsList?.[0] || null;
  }
  const clean = String(idOrTitle).trim().toLowerCase();
  return (
    projectsList.find((p) => String(p.id).toLowerCase() === clean) ||
    projectsList.find((p) => p.title && p.title.trim().toLowerCase() === clean) ||
    projectsList.find((p) => p.tab_label && p.tab_label.trim().toLowerCase() === clean) ||
    projectsList[0]
  );
}

export function normalizeProject(p, idx = 0) {
  const versions = (
    p.versions && Array.isArray(p.versions) && p.versions.length > 0
      ? p.versions
      : [
          {
            id: `ver_${p.id}_1`,
            version_label: p.version_label || 'Version 1',
            source_type: p.source_type || 'r2',
            r2Url: p.r2Url || p.video_url || DEMO_FALLBACK_MP4,
            driveUrl: p.driveUrl || '',
            youtubeUrl: p.youtubeUrl || '',
            created_at: p.created_at || new Date().toISOString()
          }
        ]
  ).map((v, vIdx) => {
    const versionLabel =
      v.version_label && v.version_label.trim() !== ''
        ? v.version_label.trim()
        : `Version ${vIdx + 1}`;

    let r2Url = v.r2Url && v.r2Url.trim() !== '' ? v.r2Url.trim() : '';
    if (isFallbackDemo(r2Url) && !isFallbackDemo(p.r2Url)) {
      r2Url = p.r2Url.trim();
    }
    if (!r2Url) {
      r2Url = DEMO_FALLBACK_MP4;
    }

    return {
      ...v,
      version_label: versionLabel,
      r2Url
    };
  });

  const active_version_id =
    p.active_version_id && versions.some((v) => v.id === p.active_version_id)
      ? p.active_version_id
      : versions[versions.length - 1]?.id || versions[0]?.id;

  const activeVer = versions.find((v) => v.id === active_version_id) || versions[versions.length - 1] || versions[0];
  const activeVerLabel = activeVer?.version_label || `Version ${versions.length}`;
  const activeSourceType = activeVer?.source_type || p.source_type || 'r2';

  let activeR2 = activeVer?.r2Url || p.r2Url || '';
  if (isFallbackDemo(activeR2) && !isFallbackDemo(p.r2Url)) {
    activeR2 = p.r2Url;
  }
  if (!activeR2) {
    activeR2 = DEMO_FALLBACK_MP4;
  }
  activeR2 = activeR2.trim();

  const activeDrive = activeVer?.driveUrl || p.driveUrl || '';
  const activeYoutube = activeVer?.youtubeUrl || p.youtubeUrl || '';
  const activeVideoUrl =
    activeSourceType === 'youtube'
      ? activeYoutube
      : activeSourceType === 'gdrive'
      ? activeDrive
      : activeR2;

  const cleanTabLabel =
    !p.tab_label || /^project\s*\d+/i.test(p.tab_label)
      ? `Video ${idx + 1}`
      : p.tab_label;

  return {
    ...p,
    tab_label: cleanTabLabel,
    versions,
    active_version_id,
    source_type: activeSourceType,
    r2Url: activeR2,
    driveUrl: activeDrive,
    youtubeUrl: activeYoutube,
    video_url: activeVideoUrl,
    version_label: activeVerLabel
  };
}

export function normalizeMarker(m) {
  return {
    id: m.id || `m_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    project_id: m.project_id || '',
    version_id: m.version_id || '',
    version_label: m.version_label || 'Version 1.0',
    timestamp_seconds: Math.max(0, Number(m.timestamp_seconds) || 0),
    category: m.category || 'Visual / VFX',
    client_comment: m.client_comment || m.content || '',
    attachment_url: m.attachment_url || null,
    drawing_data: m.drawing_data || null,
    is_resolved: Boolean(m.is_resolved),
    editor_reply: m.editor_reply || '',
    created_at: m.created_at || new Date().toISOString()
  };
}

// Safe storage helpers
export function safeGetStorage(key) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    }
  } catch {}
  return null;
}

export function safeSetStorage(key, val) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, String(val));
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, String(val));
    }
  } catch {}
}

export const getStoredSyncTime = () => {
  const val = safeGetStorage(STORAGE_KEYS.SYNC_TIME);
  return val ? Number(val) : 0;
};

export const setStoredSyncTime = (time) => {
  safeSetStorage(STORAGE_KEYS.SYNC_TIME, String(time));
};

export function saveProjectsToStorage(updatedProjects) {
  try {
    safeSetStorage(STORAGE_KEYS.PROJECTS, JSON.stringify(updatedProjects));
  } catch (err) {
    console.warn('Projects storage write failed:', err);
  }
}

export function saveMarkersToStorage(updatedMarkers) {
  try {
    safeSetStorage(STORAGE_KEYS.MARKERS, JSON.stringify(updatedMarkers));
  } catch (err) {
    console.warn('Markers storage write failed:', err);
  }
}

export function saveSettingsToStorage(settings) {
  try {
    safeSetStorage(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.warn('Settings storage write failed:', err);
  }
}

// ============================================================================
// COMPLETE MODULAR APP STATE CONTROLLER
// ============================================================================
export class AppStateController {
  constructor() {
    this.subscribers = new Set();
    this.videoRef = null;
    this.compareVideoRef = null;
    this.realtimeWs = null;
    this.heartbeatInterval = null;
    this.pollInterval = null;
    this.lastSyncTimestamp = getStoredSyncTime();
    this.isApplyingRemote = false;
    this.hasLoadedInitialCloud = false;

    // Load initial state
    this.projects = this.loadInitialProjects();
    this.markers = this.loadInitialMarkers();
    this.settings = this.loadInitialSettings();

    // Active project & version
    this.activeProjectId = this.resolveInitialProjectId();
    const activeProj = this.getActiveProject();
    this.activeVersionId = activeProj?.active_version_id || activeProj?.versions?.[0]?.id || 'ver_1';

    // Version-Isolated notes filter: defaults to active version!
    this.selectedVersionFilter = this.activeVersionId;
    this.markerStatusFilter = 'all'; // 'all' | 'pending' | 'resolved'

    // UI state
    this.currentView = this.resolveInitialView();
    this.role = this.resolveInitialRole();
    this.themeMode = safeGetStorage(STORAGE_KEYS.THEME) || 'light';
    this.syncStatus = 'live'; // 'live' | 'syncing' | 'error'

    // Video playback state
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 1;
    this.isMuted = false;
    this.playbackSpeed = 1;
    this.videoError = false;

    // Side-by-side comparison state
    this.isComparisonMode = false;
    this.compareVersionLeftId = activeProj?.versions?.[0]?.id || '';
    this.compareVersionRightId = activeProj?.versions?.[1]?.id || activeProj?.versions?.[0]?.id || '';
    this.comparisonAudioTrack = 'left';

    // Start background sync
    this.initRealtimeWebSocket();
    this.startSupabasePolling();
  }

  // --------------------------------------------------------------------------
  // Subscription System
  // --------------------------------------------------------------------------
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  notify() {
    for (const fn of this.subscribers) {
      try {
        fn(this);
      } catch (err) {
        console.error('AppState listener error:', err);
      }
    }
  }

  // --------------------------------------------------------------------------
  // Media Element Attachment
  // --------------------------------------------------------------------------
  attachVideoElements(mainEl, compareEl = null) {
    this.videoRef = mainEl;
    this.compareVideoRef = compareEl;
  }

  // --------------------------------------------------------------------------
  // Initial State Hydrators
  // --------------------------------------------------------------------------
  loadInitialProjects() {
    try {
      const saved = safeGetStorage(STORAGE_KEYS.PROJECTS);
      let list = INITIAL_PROJECTS.map(normalizeProject);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed.map(normalizeProject);
        }
      }

      // Check URL query parameters (?project=..., ?video=..., ?vurl=...)
      if (typeof window !== 'undefined' && window.location) {
        const p = new URLSearchParams(window.location.search);
        const urlVideo = p.get('video') || p.get('vurl');
        const urlProjId = p.get('project');
        const urlType = p.get('type') ||
          (urlVideo?.includes('drive.google.com')
            ? 'gdrive'
            : urlVideo?.includes('youtube') || urlVideo?.includes('youtu.be')
            ? 'youtube'
            : 'r2');
        const urlTitle = p.get('title');

        if (urlVideo && urlVideo.trim() && !urlVideo.includes('asldkfasdfsl.mp4')) {
          const { url: cleanUrl } = cleanAndEnhanceVideoUrl(urlVideo);
          const targetProj = urlProjId ? findProjectByIdOrTitle(list, urlProjId) : list[0];
          const targetProjId = targetProj ? targetProj.id : list[0]?.id;
          list = list.map((proj) => {
            if (proj.id !== targetProjId) return proj;
            const activeVerId = proj.active_version_id || proj.versions?.[0]?.id;
            const updatedVers = (proj.versions || []).map((v) => {
              if (v.id === activeVerId) {
                return {
                  ...v,
                  source_type: urlType,
                  r2Url: urlType === 'r2' ? cleanUrl : v.r2Url,
                  driveUrl: urlType === 'gdrive' ? cleanUrl : v.driveUrl,
                  youtubeUrl: urlType === 'youtube' ? cleanUrl : v.youtubeUrl
                };
              }
              return v;
            });
            return {
              ...proj,
              title: urlTitle ? decodeURIComponent(urlTitle) : proj.title,
              source_type: urlType,
              r2Url: urlType === 'r2' ? cleanUrl : proj.r2Url,
              driveUrl: urlType === 'gdrive' ? cleanUrl : proj.driveUrl,
              youtubeUrl: urlType === 'youtube' ? cleanUrl : proj.youtubeUrl,
              video_url: cleanUrl,
              versions: updatedVers
            };
          });
        }
      }

      return list;
    } catch {
      return INITIAL_PROJECTS.map(normalizeProject);
    }
  }

  loadInitialMarkers() {
    try {
      const saved = safeGetStorage(STORAGE_KEYS.MARKERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(normalizeMarker);
        }
      }
      return INITIAL_MARKERS.map(normalizeMarker);
    } catch {
      return INITIAL_MARKERS.map(normalizeMarker);
    }
  }

  loadInitialSettings() {
    try {
      const saved = safeGetStorage(STORAGE_KEYS.SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  resolveInitialProjectId() {
    if (typeof window !== 'undefined' && window.location) {
      const p = new URLSearchParams(window.location.search);
      const urlProj = p.get('project');
      if (urlProj) {
        const match = findProjectByIdOrTitle(this.projects, urlProj);
        if (match) return match.id;
      }
    }
    const saved = safeGetStorage(STORAGE_KEYS.ACTIVE_PROJECT);
    if (saved && this.projects.some((pr) => pr.id === saved)) {
      return saved;
    }
    return this.projects[0]?.id || INITIAL_PROJECTS[0].id;
  }

  resolveInitialView() {
    if (typeof window !== 'undefined' && window.location) {
      const p = new URLSearchParams(window.location.search);
      if (p.get('view') === 'review' || p.get('view') === 'client' || p.get('project')) {
        return 'review';
      }
    }
    return 'landing';
  }

  resolveInitialRole() {
    if (typeof window !== 'undefined' && window.location) {
      const p = new URLSearchParams(window.location.search);
      if (p.get('view') === 'client' || p.get('role') === 'client') {
        return 'client';
      }
    }
    return safeGetStorage(STORAGE_KEYS.ROLE) || 'editor';
  }

  // --------------------------------------------------------------------------
  // Getters for Active Models & Computed Engines
  // --------------------------------------------------------------------------
  getActiveProject() {
    return this.projects.find((p) => p.id === this.activeProjectId) || this.projects[0];
  }

  getActiveVersion() {
    const proj = this.getActiveProject();
    if (!proj?.versions || proj.versions.length === 0) return null;
    return (
      proj.versions.find((v) => v.id === this.activeVersionId) ||
      proj.versions.find((v) => v.id === proj.active_version_id) ||
      proj.versions[0]
    );
  }

  getVideoEngine() {
    return resolveVideoEngine(this.getActiveProject(), this.getActiveVersion());
  }

  // --------------------------------------------------------------------------
  // Multi-Project Creation & Switching
  // --------------------------------------------------------------------------
  createProject(formData) {
    if (!formData.title?.trim()) return null;

    const newProjId = `proj_${Date.now()}`;
    const initialVerId = `ver_${Date.now()}_1`;
    const { url: cleanR2 } = cleanAndEnhanceVideoUrl(formData.r2Url || '');
    const { url: cleanDrive } = cleanAndEnhanceVideoUrl(formData.driveUrl || '');
    const { url: cleanYoutube } = cleanAndEnhanceVideoUrl(formData.youtubeUrl || '');

    const initialVideoVersion = {
      id: initialVerId,
      version_label: formData.version_label?.trim() || 'Version 1.0',
      source_type: formData.source_type || 'r2',
      r2Url: formData.source_type === 'r2' ? cleanR2 || DEMO_FALLBACK_MP4 : '',
      driveUrl: formData.source_type === 'gdrive' ? cleanDrive || '' : '',
      youtubeUrl: formData.source_type === 'youtube' ? cleanYoutube || '' : '',
      created_at: new Date().toISOString()
    };

    const newProject = normalizeProject({
      id: newProjId,
      tab_number: this.projects.length + 1,
      tab_label: `Project ${this.projects.length + 1}`,
      title: formData.title.trim(),
      client_name: formData.client_name?.trim() || 'Client Workspace',
      version_label: initialVideoVersion.version_label,
      active_version_id: initialVideoVersion.id,
      versions: [initialVideoVersion],
      status_label: 'Status: Client Review Active',
      source_type: formData.source_type || 'r2',
      r2Url: initialVideoVersion.r2Url,
      driveUrl: initialVideoVersion.driveUrl,
      youtubeUrl: initialVideoVersion.youtubeUrl,
      video_url:
        formData.source_type === 'youtube'
          ? initialVideoVersion.youtubeUrl
          : formData.source_type === 'gdrive'
          ? initialVideoVersion.driveUrl
          : initialVideoVersion.r2Url,
      deadline: formData.deadline || '2026-11-20',
      client_email: formData.client_email?.trim() || '',
      client_whatsapp: formData.client_whatsapp?.trim() || '',
      created_at: new Date().toISOString()
    }, this.projects.length);

    this.projects = [...this.projects, newProject];
    saveProjectsToStorage(this.projects);

    // Switch cleanly to the newly created project
    this.selectProject(newProject.id, initialVerId, 'review');
    this.pushToCloud(null, true);
    this.notify();
    return newProject;
  }

  selectProject(projectId, overrideVersionId = null, targetView = 'review') {
    if (!projectId) return;

    const targetProj = this.projects.find((p) => p.id === projectId);
    if (!targetProj) return;

    // 1. Teardown any playing video to prevent loop glitches & phantom audio
    this.stopPlaybackCleanly();

    // 2. Set active project
    this.activeProjectId = projectId;
    if (targetView) {
      this.currentView = targetView;
    }

    // 3. Resolve target version: override -> URL param -> active_version_id -> latest
    const sortedVersions = [...(targetProj.versions || [])].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    const targetVer =
      (overrideVersionId && sortedVersions.find((v) => v.id === overrideVersionId)) ||
      (targetProj.active_version_id && sortedVersions.find((v) => v.id === targetProj.active_version_id)) ||
      sortedVersions[sortedVersions.length - 1] ||
      sortedVersions[0];

    const targetVerId = targetVer?.id || 'ver_1';
    this.activeVersionId = targetVerId;

    // 4. VERSION-ISOLATED NOTES: filter strictly to this version
    this.selectedVersionFilter = targetVerId;

    // 5. Update comparison IDs if available
    if (sortedVersions.length >= 2) {
      this.compareVersionLeftId = sortedVersions[0].id;
      this.compareVersionRightId = sortedVersions[1].id;
    } else if (sortedVersions.length === 1) {
      this.compareVersionLeftId = sortedVersions[0].id;
      this.compareVersionRightId = sortedVersions[0].id;
    }

    // 6. Update URL & Storage
    try {
      safeSetStorage(STORAGE_KEYS.ACTIVE_PROJECT, projectId);
      safeSetStorage(STORAGE_KEYS.ACTIVE_VERSION, targetVerId);

      const url = new URL(window.location.href);
      url.searchParams.set('project', projectId);
      url.searchParams.set('version', targetVerId);
      if (targetView) url.searchParams.set('view', targetView);
      window.history.replaceState({ projectId, versionId: targetVerId, view: targetView }, '', url.toString());
    } catch {}

    // 7. Update HTML5 media element source cleanly without loop glitch
    const engine = resolveVideoEngine(targetProj, targetVer);
    if (engine.mode === 'r2' && this.videoRef) {
      try {
        this.videoRef.pause();
        this.videoRef.currentTime = 0;
        this.videoRef.src = engine.streamUrl;
        this.videoRef.load();
      } catch {}
    }

    // 8. Broadcast over Realtime channel
    this.broadcastVersionSync(projectId, targetVerId, engine.streamUrl);

    this.notify();
  }

  deleteProject(projectId) {
    if (this.projects.length <= 1) return false;

    const remaining = this.projects.filter((p) => p.id !== projectId);
    this.projects = remaining.map(normalizeProject);
    saveProjectsToStorage(this.projects);

    // Remove associated markers
    this.markers = this.markers.filter((m) => m.project_id !== projectId);
    saveMarkersToStorage(this.markers);

    if (this.activeProjectId === projectId) {
      this.selectProject(remaining[0].id);
    }

    this.pushToCloud(null, true);
    this.notify();
    return true;
  }

  updateProjectMetadata(projectId, updates) {
    this.projects = this.projects.map((p) => {
      if (p.id !== projectId) return p;
      return normalizeProject({ ...p, ...updates });
    });

    saveProjectsToStorage(this.projects);
    this.pushToCloud(null, true);
    this.notify();
  }

  // --------------------------------------------------------------------------
  // Multi-Version Video Management & Playback Without Loop Glitches
  // --------------------------------------------------------------------------
  addVersion(projectId, { version_label, source_type, url }) {
    const proj = this.projects.find((p) => p.id === projectId);
    if (!proj) return null;

    const nextIdx = (proj.versions?.length || 0) + 1;
    const resolvedLabel = version_label?.trim() || `Version ${nextIdx}`;
    const { url: cleanUrl, detectedType } = cleanAndEnhanceVideoUrl(url || '');
    const finalType = detectedType || source_type || 'r2';

    const newVer = {
      id: `ver_${Date.now()}`,
      version_label: resolvedLabel,
      source_type: finalType,
      r2Url: finalType === 'r2' ? cleanUrl || DEMO_FALLBACK_MP4 : '',
      driveUrl: finalType === 'gdrive' ? cleanUrl : '',
      youtubeUrl: finalType === 'youtube' ? cleanUrl : '',
      created_at: new Date().toISOString()
    };

    const chosenUrl =
      finalType === 'youtube'
        ? newVer.youtubeUrl
        : finalType === 'gdrive'
        ? newVer.driveUrl
        : newVer.r2Url;

    this.projects = this.projects.map((p) => {
      if (p.id !== projectId) return p;
      return normalizeProject({
        ...p,
        versions: [...(p.versions || []), newVer],
        active_version_id: newVer.id,
        version_label: newVer.version_label,
        source_type: newVer.source_type,
        r2Url: newVer.r2Url || p.r2Url,
        driveUrl: newVer.driveUrl || p.driveUrl,
        youtubeUrl: newVer.youtubeUrl || p.youtubeUrl,
        video_url: chosenUrl || p.video_url
      });
    });

    saveProjectsToStorage(this.projects);
    // Smoothly select the new version & isolate notes
    this.selectVersion(newVer.id, projectId);
    this.pushToCloud(null, true);
    this.notify();
    return newVer;
  }

  selectVersion(versionId, projectId = null) {
    const currentProjId = projectId || this.activeProjectId;
    const proj = this.projects.find((p) => p.id === currentProjId);
    if (!proj) return;

    const targetVer = proj.versions?.find((v) => v.id === versionId);
    if (!targetVer) return;

    // 1. PREVENT LOOP GLITCH & AUDIO CLASH: Pause any active playback first
    this.stopPlaybackCleanly();

    // 2. Set active version ID in state
    this.activeVersionId = versionId;

    // 3. VERSION-ISOLATED NOTES: filter notes to this version
    this.selectedVersionFilter = versionId;

    // 4. Update project record
    const engine = resolveVideoEngine(proj, targetVer);
    this.projects = this.projects.map((p) => {
      if (p.id !== currentProjId) return p;
      return normalizeProject({
        ...p,
        active_version_id: versionId,
        version_label: targetVer.version_label,
        source_type: targetVer.source_type,
        r2Url: targetVer.r2Url || p.r2Url,
        driveUrl: targetVer.driveUrl || p.driveUrl,
        youtubeUrl: targetVer.youtubeUrl || p.youtubeUrl,
        video_url: engine.streamUrl
      });
    });
    saveProjectsToStorage(this.projects);

    // 5. Swap video player source cleanly (pause -> src -> load)
    if (this.videoRef && engine.mode === 'r2') {
      try {
        this.videoRef.pause();
        this.videoRef.currentTime = 0;
        this.videoRef.src = engine.streamUrl;
        this.videoRef.load();
      } catch (err) {
        console.warn('Video source swap:', err);
      }
    }

    // 6. Persist URL & LocalStorage
    try {
      safeSetStorage(STORAGE_KEYS.ACTIVE_PROJECT, currentProjId);
      safeSetStorage(STORAGE_KEYS.ACTIVE_VERSION, versionId);

      const url = new URL(window.location.href);
      url.searchParams.set('project', currentProjId);
      url.searchParams.set('version', versionId);
      window.history.replaceState({ projectId: currentProjId, versionId }, '', url.toString());
    } catch {}

    // 7. Broadcast over Realtime channel
    this.broadcastVersionSync(currentProjId, versionId, engine.streamUrl);

    this.notify();
  }

  deleteVersion(projectId, versionId) {
    const proj = this.projects.find((p) => p.id === projectId);
    if (!proj || !proj.versions) return;

    // If only one version, reset it to demo
    if (proj.versions.length <= 1) {
      this.projects = this.projects.map((p) => {
        if (p.id !== projectId) return p;
        const updatedVers = (p.versions || []).map((v) => ({
          ...v,
          r2Url: DEMO_FALLBACK_MP4,
          driveUrl: '',
          youtubeUrl: ''
        }));
        return normalizeProject({
          ...p,
          r2Url: DEMO_FALLBACK_MP4,
          driveUrl: '',
          youtubeUrl: '',
          video_url: DEMO_FALLBACK_MP4,
          versions: updatedVers
        });
      });
      saveProjectsToStorage(this.projects);
      this.pushToCloud(null, true);
      this.notify();
      return;
    }

    // Multiple versions: remove this one
    const remaining = proj.versions.filter((v) => v.id !== versionId);
    const newActiveId =
      proj.active_version_id === versionId ? remaining[remaining.length - 1].id : proj.active_version_id;

    this.projects = this.projects.map((p) => {
      if (p.id !== projectId) return p;
      return normalizeProject({
        ...p,
        versions: remaining,
        active_version_id: newActiveId
      });
    });
    saveProjectsToStorage(this.projects);

    // Clean up isolated markers tied to deleted version
    this.markers = this.markers.filter((m) => m.version_id !== versionId);
    saveMarkersToStorage(this.markers);

    if (this.selectedVersionFilter === versionId) {
      this.selectedVersionFilter = newActiveId;
    }

    this.selectVersion(newActiveId, projectId);
    this.pushToCloud(null, true);
    this.notify();
  }

  switchSourcePlatform(sourceMode) {
    const proj = this.getActiveProject();
    const ver = this.getActiveVersion();
    if (!proj || !ver) return;

    // Pause any playing HTML5 video before switching to iframe to prevent background audio clash
    this.stopPlaybackCleanly();

    this.projects = this.projects.map((p) => {
      if (p.id !== proj.id) return p;
      const updatedVersions = (p.versions || []).map((v) => {
        if (v.id !== ver.id) return v;
        return {
          ...v,
          source_type: sourceMode
        };
      });

      const activeVerItem = updatedVersions.find((v) => v.id === ver.id);
      const chosenUrl =
        sourceMode === 'youtube'
          ? activeVerItem?.youtubeUrl || ''
          : sourceMode === 'gdrive'
          ? activeVerItem?.driveUrl || ''
          : activeVerItem?.r2Url || DEMO_FALLBACK_MP4;

      return normalizeProject({
        ...p,
        source_type: sourceMode,
        video_url: chosenUrl,
        versions: updatedVersions
      });
    });

    saveProjectsToStorage(this.projects);
    this.pushToCloud(null, true);
    this.notify();
  }

  // --------------------------------------------------------------------------
  // Glitch-Free Video Playback Controller
  // --------------------------------------------------------------------------
  stopPlaybackCleanly() {
    this.isPlaying = false;
    this.currentTime = 0;
    this.videoError = false;

    if (this.videoRef) {
      try {
        this.videoRef.pause();
        this.videoRef.currentTime = 0;
      } catch {}
    }

    if (this.compareVideoRef) {
      try {
        this.compareVideoRef.pause();
        this.compareVideoRef.currentTime = 0;
      } catch {}
    }
  }

  togglePlayPause() {
    if (!this.videoRef) return;

    if (this.videoRef.paused) {
      // Safe play call with promise rejection handling to silence AbortError
      const playPromise = this.videoRef.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            if (err.name !== 'AbortError') {
              console.warn('Playback play request was prevented:', err);
            }
          });
      }

      if (this.compareVideoRef && this.isComparisonMode) {
        this.compareVideoRef.play().catch(() => {});
      }

      this.isPlaying = true;
    } else {
      this.videoRef.pause();
      if (this.compareVideoRef) {
        this.compareVideoRef.pause();
      }
      this.isPlaying = false;
    }
    this.notify();
  }

  seekTo(seconds) {
    const target = Math.max(0, Number(seconds) || 0);
    this.currentTime = target;

    if (this.videoRef) {
      try {
        this.videoRef.currentTime = target;
      } catch {}
    }
    if (this.compareVideoRef && this.isComparisonMode) {
      try {
        this.compareVideoRef.currentTime = target;
      } catch {}
    }
    this.notify();
  }

  skipSeconds(delta) {
    if (!this.videoRef) return;
    const dur = this.videoRef.duration || this.duration || 100;
    const newTime = Math.max(0, Math.min(dur, (this.videoRef.currentTime || 0) + delta));
    this.seekTo(newTime);
  }

  handleVideoEnded() {
    // Video ended cleanly: no loop glitch!
    this.isPlaying = false;
    if (this.videoRef) {
      this.videoRef.pause();
      this.videoRef.currentTime = 0;
    }
    if (this.compareVideoRef) {
      this.compareVideoRef.pause();
      this.compareVideoRef.currentTime = 0;
    }
    this.currentTime = 0;
    this.notify();
  }

  handleTimeUpdate(time) {
    this.currentTime = time;
    this.notify();
  }

  handleLoadedMetadata(duration) {
    this.duration = duration;
    this.notify();
  }

  setVolume(val) {
    const clean = Math.max(0, Math.min(1, val));
    this.volume = clean;
    this.isMuted = clean === 0;

    if (this.videoRef) {
      this.videoRef.volume = clean;
      this.videoRef.muted = clean === 0;
    }
    if (this.compareVideoRef && this.comparisonAudioTrack === 'right') {
      this.compareVideoRef.volume = clean;
      this.compareVideoRef.muted = clean === 0;
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.videoRef) {
      this.videoRef.muted = this.isMuted;
    }
    if (this.compareVideoRef) {
      this.compareVideoRef.muted = this.isMuted;
    }
    this.notify();
  }

  setPlaybackSpeed(speed) {
    this.playbackSpeed = speed;
    if (this.videoRef) {
      this.videoRef.playbackRate = speed;
    }
    if (this.compareVideoRef) {
      this.compareVideoRef.playbackRate = speed;
    }
    this.notify();
  }

  // --------------------------------------------------------------------------
  // Version-Isolated Notes & Markers Management
  // --------------------------------------------------------------------------
  getProjectMarkers(projectId = null) {
    const pId = projectId || this.activeProjectId;
    return this.markers
      .filter((m) => m.project_id === pId)
      .sort((a, b) => Number(a.timestamp_seconds) - Number(b.timestamp_seconds));
  }

  getFilteredMarkers() {
    const list = this.getProjectMarkers();
    return list.filter((m) => {
      // Version isolation check
      if (this.selectedVersionFilter !== 'all') {
        const activeProj = this.getActiveProject();
        const primaryVerId = activeProj?.versions?.[0]?.id;
        const matchesVer = m.version_id === this.selectedVersionFilter ||
          (!m.version_id && this.selectedVersionFilter === primaryVerId);
        if (!matchesVer) return false;
      }

      // Status check
      if (this.markerStatusFilter === 'pending' && m.is_resolved) return false;
      if (this.markerStatusFilter === 'resolved' && !m.is_resolved) return false;

      return true;
    });
  }

  addMarker({ timestamp, category, comment, attachment_url, drawing_data }) {
    const activeProj = this.getActiveProject();
    const activeVer = this.getActiveVersion();

    const created = normalizeMarker({
      id: `m_${Date.now()}`,
      project_id: activeProj?.id || this.activeProjectId,
      version_id: activeVer?.id || this.activeVersionId,
      version_label: activeVer?.version_label || 'Version 1.0',
      timestamp_seconds: Math.max(0, Number(Number(timestamp).toFixed(1))),
      category: category || 'Visual / VFX',
      client_comment: (comment || '').trim(),
      attachment_url: attachment_url || null,
      drawing_data: drawing_data || null,
      is_resolved: false,
      editor_reply: '',
      created_at: new Date().toISOString()
    });

    this.markers = [...this.markers, created];
    saveMarkersToStorage(this.markers);

    this.pushToCloud(null, true);
    this.notify();
    return created;
  }

  toggleResolveMarker(markerId) {
    this.markers = this.markers.map((m) =>
      m.id === markerId ? { ...m, is_resolved: !m.is_resolved } : m
    );
    saveMarkersToStorage(this.markers);
    this.pushToCloud(null, true);
    this.notify();
  }

  saveEditorReply(markerId, replyText) {
    this.markers = this.markers.map((m) =>
      m.id === markerId ? { ...m, editor_reply: (replyText || '').trim() } : m
    );
    saveMarkersToStorage(this.markers);
    this.pushToCloud(null, true);
    this.notify();
  }

  deleteEditorReply(markerId) {
    this.saveEditorReply(markerId, '');
  }

  deleteMarker(markerId) {
    this.markers = this.markers.filter((m) => m.id !== markerId);
    saveMarkersToStorage(this.markers);
    this.pushToCloud(null, true);
    this.notify();
  }

  getProjectStats(projectId) {
    const list = this.markers.filter((m) => m.project_id === projectId);
    const total = list.length;
    const resolved = list.filter((m) => m.is_resolved).length;
    const pending = total - resolved;
    const percent = total === 0 ? 0 : Math.round((resolved / total) * 100);
    const isComplete = total > 0 && resolved === total;
    return { total, resolved, pending, percent, isComplete };
  }

  // --------------------------------------------------------------------------
  // Real-Time Supabase Cloud Sync & Realtime WebSocket
  // --------------------------------------------------------------------------
  initRealtimeWebSocket() {
    if (typeof window === 'undefined' || typeof WebSocket === 'undefined') return;

    try {
      if (this.realtimeWs && this.realtimeWs.readyState === WebSocket.OPEN) {
        return;
      }

      const ws = new WebSocket(`${SUPABASE_REALTIME_URL}?vsn=1.0.0&apikey=${SUPABASE_KEY}`);

      ws.onopen = () => {
        // Join Realtime channel topic
        ws.send(
          JSON.stringify({
            topic: `realtime:${REALTIME_CHANNEL_NAME}`,
            event: 'phx_join',
            payload: {},
            ref: 'join_1'
          })
        );

        // Keep-alive heartbeat ping every 25 seconds
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                topic: 'phoenix',
                event: 'heartbeat',
                payload: {},
                ref: String(Date.now())
              })
            );
          }
        }, 25000);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          // Handle remote version_sync broadcast
          if (msg.event === 'broadcast' && msg.payload?.event === 'version_sync') {
            const data = msg.payload.payload;
            if (data && data.projectId === this.activeProjectId && data.versionId !== this.activeVersionId) {
              // Smoothly adopt active version broadcasted by peer
              this.selectVersion(data.versionId, data.projectId);
            }
          }
        } catch {}
      };

      ws.onerror = () => {
        // Silent error handler — polling handles fallback
      };

      ws.onclose = () => {
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
      };

      this.realtimeWs = ws;
    } catch {}
  }

  broadcastVersionSync(projectId, versionId, videoUrl) {
    if (!this.realtimeWs || this.realtimeWs.readyState !== WebSocket.OPEN) {
      this.initRealtimeWebSocket();
      return;
    }

    try {
      this.realtimeWs.send(
        JSON.stringify({
          topic: `realtime:${REALTIME_CHANNEL_NAME}`,
          event: 'broadcast',
          payload: {
            type: 'broadcast',
            event: 'version_sync',
            payload: { projectId, versionId, videoUrl }
          },
          ref: String(Date.now())
        })
      );
    } catch {}
  }

  async pushToCloud(customTimestamp = null, force = false) {
    if (this.isApplyingRemote && !force) return;

    const now = customTimestamp || Date.now();
    this.lastSyncTimestamp = Math.max(this.lastSyncTimestamp, now);
    setStoredSyncTime(this.lastSyncTimestamp);
    this.syncStatus = 'syncing';
    this.notify();

    try {
      const res = await fetch(`${SUPABASE_ENDPOINT}?on_conflict=id`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates,return=minimal'
        },
        body: JSON.stringify({
          id: PORTAL_STATE_ID,
          updated_at: now,
          projects: this.projects,
          markers: this.markers,
          settings: this.settings
        })
      });

      if (res.ok) {
        this.syncStatus = 'live';
      } else {
        this.syncStatus = 'error';
      }
    } catch {
      this.syncStatus = 'error';
    }
    this.notify();
  }

  async pullFromCloud() {
    try {
      const res = await fetch(`${SUPABASE_ENDPOINT}?id=eq.${PORTAL_STATE_ID}&select=*`, {
        method: 'GET',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`
        }
      });

      if (!res.ok) {
        this.syncStatus = 'error';
        this.notify();
        return;
      }

      const rows = await res.json();
      if (!Array.isArray(rows) || rows.length === 0) {
        // Seed initial data if remote is empty
        this.hasLoadedInitialCloud = true;
        await this.pushToCloud(null, true);
        return;
      }

      const remote = rows[0];
      this.hasLoadedInitialCloud = true;
      const localTime = Math.max(this.lastSyncTimestamp, getStoredSyncTime());

      if (remote.updated_at && remote.updated_at > localTime) {
        this.isApplyingRemote = true;
        this.lastSyncTimestamp = remote.updated_at;
        setStoredSyncTime(remote.updated_at);

        if (Array.isArray(remote.projects) && remote.projects.length > 0) {
          const currentLocals = this.projects || [];
          this.projects = remote.projects.map((remProj, idx) => {
            const localProj = currentLocals.find((lp) => lp.id === remProj.id);
            if (!localProj) return normalizeProject(remProj, idx);

            const keepLocalR2 = !isFallbackDemo(localProj.r2Url) && isFallbackDemo(remProj.r2Url);
            const keepLocalVideo = !isFallbackDemo(localProj.video_url) && isFallbackDemo(remProj.video_url);

            const mergedVersions = (remProj.versions || []).map((remVer) => {
              const localVer = localProj.versions?.find((lv) => lv.id === remVer.id);
              if (!localVer) return remVer;
              const keepVerR2 = !isFallbackDemo(localVer.r2Url) && isFallbackDemo(remVer.r2Url);
              return {
                ...remVer,
                r2Url: keepVerR2 ? localVer.r2Url : remVer.r2Url,
                video_url: keepVerR2 ? localVer.r2Url : remVer.video_url
              };
            });

            return normalizeProject(
              {
                ...remProj,
                r2Url: keepLocalR2 ? localProj.r2Url : remProj.r2Url,
                video_url: keepLocalVideo ? localProj.video_url : remProj.video_url,
                versions: mergedVersions
              },
              idx
            );
          });
          saveProjectsToStorage(this.projects);
        }

        if (Array.isArray(remote.markers)) {
          this.markers = remote.markers.map(normalizeMarker);
          saveMarkersToStorage(this.markers);
        }

        if (remote.settings && Object.keys(remote.settings).length > 0) {
          this.settings = { ...this.settings, ...remote.settings };
          saveSettingsToStorage(this.settings);
        }

        setTimeout(() => {
          this.isApplyingRemote = false;
        }, 300);
      } else if (localTime > (remote.updated_at || 0)) {
        await this.pushToCloud(localTime, true);
      }

      this.syncStatus = 'live';
      this.notify();
    } catch {
      this.syncStatus = 'error';
      this.notify();
    }
  }

  startSupabasePolling() {
    if (typeof window === 'undefined') return;
    this.pullFromCloud();
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      this.pullFromCloud();
    }, 3500);
  }

  destroy() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    if (this.pollInterval) clearInterval(this.pollInterval);
    if (this.realtimeWs) {
      try {
        this.realtimeWs.close();
      } catch {}
      this.realtimeWs = null;
    }
    this.subscribers.clear();
  }
}

// Global Singleton Instance of AppState
export const AppState = new AppStateController();

// React Hook for Reactive Component Subscriptions
export function useAppState() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = AppState.subscribe(() => {
      setTick((t) => (t + 1) % 1000000);
    });
    return unsubscribe;
  }, []);

  return AppState;
}
