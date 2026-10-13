// ─── Hashira ────────────────────────────────────────────────────────────────

export type BreathingStyle =
    | 'flame'
    | 'water'
    | 'sound'
    | 'love'
    | 'mist'
    | 'stone'
    | 'wind'
    | 'serpent'
    | 'insect';

export interface Hashira {
    id: string;
    name: string;           // English name
    nameJP: string;         // Japanese kanji
    title: string;          // e.g. "Flame Hashira"
    titleJP: string;        // e.g. "炎柱"
    breathingStyle: BreathingStyle;
    color: string;          // Primary hex — used for particle effects
    accentColor: string;    // Secondary hex
    rank: number;           // Display order (1–9)
}

// ─── Castle Wings ────────────────────────────────────────────────────────────

export type CastleWing =
    | 'freefall'        // 0–10%   — opening fall sequence
    | 'corridor'        // 10–25%  — grand corridor entry
    | 'rengoku'         // 25–40%  — projects
    | 'akaza'           // 40–55%  — skills
    | 'douma'           // 55–70%  — about
    | 'kokushibo'       // 70–85%  — blog
    | 'grandhall';      // 85–100% — contact

export interface WingConfig {
    id: CastleWing;
    label: string;
    demonName: string;
    scrollStart: number;    // 0–1
    scrollEnd: number;      // 0–1
    accentColor: string;
    fogColor: string;
    lightColor: string;
    lightIntensity: number;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
    id: string;
    title: string;
    subtitle: string;           // "battle scroll" descriptor
    description: string;
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
    featured: boolean;
    wing: CastleWing;           // which section it belongs to
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export type SkillCategory =
    | 'frontend'
    | 'backend'
    | 'devops'
    | 'tools'
    | 'languages';

export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: number;              // 0–100
    breathingForm?: string;     // Creative lore name e.g. "First Form: React Strike"
    icon?: string;              // path or emoji
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

export interface LoadingState {
    phase: 'idle' | 'sequence' | 'complete';
    currentHashira: number;     // index 0–8
    progress: number;           // 0–100 (actual asset loading)
    assetsLoaded: boolean;
}

// ─── Scroll / Camera ─────────────────────────────────────────────────────────

export interface ScrollState {
    progress: number;           // 0–1 global scroll progress
    activeWing: CastleWing;
    velocity: number;           // for momentum effects
}
