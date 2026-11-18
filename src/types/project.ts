export interface SFXEvent {
  frame: number;
  type: string;
  volume: number;
}

export interface AudioConfig {
  useOriginalVideoAudio: boolean;
  customAudioPath?: string | null;
  customAudioVolume?: number;
  backgroundMusicPath?: string | null;
  bgmVolume?: number;
  sfxEvents: SFXEvent[];
}

export interface LightingConfig {
  problemEndFrame: number;
  flashFrame: number;
  darkVignetteIntensity: number;
  brightContrast: number;
  brightSaturation: number;
}

export interface ParallaxCardConfig {
  enabled: boolean;
  startFrame: number;
  endFrame: number;
  stampTextTop: string;
  stampTextBottom: string;
}

export interface KineticPanel {
  startFrame: number;
  endFrame: number;
  type:
    | 'problem_alert'
    | 'warning_tilted'
    | 'danger_pulse'
    | 'bounce_drop'
    | 'glitch_stress'
    | 'solution_double'
    | 'action_press'
    | 'result_neat'
    | 'safe_shield'
    | 'climax_cta';
  tagText?: string;
  line1?: string;
  line2?: string;
  badgeColor?: string;
  textColor?: string;
  icon?: string;
}

export interface ContextualSticker {
  startFrame: number;
  endFrame: number;
  stickerType:
    | 'heartbeat_ekg'
    | 'bouncing_apple'
    | 'sweat_drops'
    | 'downward_arrows'
    | 'sparkles'
    | 'water_drops'
    | 'custom_svg';
  position?: string;
  impactFrame?: number;
  svgContent?: string;
}

export interface ChecklistPillItem {
  text: string;
  triggerFrame: number;
}

export interface ChecklistPillsConfig {
  startFrame: number;
  endFrame: number;
  header: string;
  items: ChecklistPillItem[];
}

export interface CalloutPin {
  startFrame: number;
  endFrame: number;
  label: string;
  badgeX: number;
  badgeY: number;
  targetX: number;
  targetY: number;
  badgeBg: string;
  badgeColor: string;
}

export interface SubtitleWord {
  text: string;
  start: number;
  end: number;
}

export interface SubtitleSegment {
  startFrame: number;
  endFrame: number;
  words: SubtitleWord[];
}

export interface BrandingBarConfig {
  headerText: string;
  footerText: string;
  footerTag: string;
  showProgressBar: boolean;
}

export interface ProjectMetadata {
  title: string;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
}

export interface VideoClip {
  source: string;
  startFrame: number;
  endFrame: number;
  durationInFrames: number;
}

export interface ProjectSpec {
  projectId: string;
  metadata: ProjectMetadata;
  videoSource: string;
  clips?: VideoClip[];
  audioConfig: AudioConfig;
  lighting: LightingConfig;
  parallaxCard: ParallaxCardConfig;
  kineticPanels: KineticPanel[];
  contextualStickers: ContextualSticker[];
  checklistPills: ChecklistPillsConfig;
  interactiveCallouts: CalloutPin[];
  subtitles: SubtitleSegment[];
  brandingBar: BrandingBarConfig;
}
