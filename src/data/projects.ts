import { Shield, Server, Code, type LucideIcon } from 'lucide-react';

export interface ProjectTheme {
    cardBorderHover: string;
    cardShadowHover: string;
    bgMeshHover: string;
    cornerAccent: string;
    iconBgText: string;
    ledGlow: string;
    barBg: string;
    categoryBadge: string;
    titleHover: string;
    descBorderHover: string;
    techTagHover: string;
    buttonStyle: string;
}

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    category: string;
    gradient: string;
    icon: LucideIcon;
    theme: ProjectTheme;
}

export const projects: Project[] = [
    {
        title: "TileGuard",
        description: "Automated quality analysis & rule-based validation framework for vector tiles and MapLibre style specifications — bringing ESLint-style engineering discipline to geospatial software.",
        technologies: ["TypeScript", "MapLibre", "Node.js", "PBF / MVT", "React", "Biome"],
        link: "https://github.com/shreeharshshinde/tileguard",
        category: "Geospatial & DevTools",
        gradient: "from-emerald-500 to-teal-600",
        icon: Shield,
        theme: {
            cardBorderHover: "border-lime-500/60",
            cardShadowHover: "shadow-[0_0_35px_rgba(132,204,22,0.25)]",
            bgMeshHover: "from-lime-950/30 via-black/90 to-black",
            cornerAccent: "border-lime-400",
            iconBgText: "bg-lime-500/20 text-lime-400 border-lime-500/40 shadow-[0_0_15px_rgba(132,204,22,0.3)]",
            ledGlow: "bg-lime-400 shadow-[0_0_10px_rgba(132,204,22,1)] animate-pulse",
            barBg: "bg-lime-400 shadow-[0_0_12px_rgba(132,204,22,0.9)]",
            categoryBadge: "border-lime-500/60 text-lime-300 bg-lime-500/10 shadow-[0_0_10px_rgba(132,204,22,0.2)]",
            titleHover: "group-hover:text-lime-300",
            descBorderHover: "border-lime-500/60",
            techTagHover: "border-lime-500/30 text-lime-300 bg-lime-950/30",
            buttonStyle: "bg-lime-500/10 border-lime-500/40 text-lime-300 hover:bg-lime-500/20 hover:border-lime-400 hover:text-white hover:shadow-[0_0_15px_rgba(132,204,22,0.4)]"
        }
    },
    {
        title: "Orion",
        description: "Distributed ML job orchestrator for Kubernetes — durable execution platform featuring Redis Streams priority queues, gRPC streaming, atomic state transitions, and DAG pipeline support.",
        technologies: ["Go", "Kubernetes", "Redis Streams", "gRPC", "PostgreSQL", "OpenTelemetry"],
        link: "https://github.com/shreeharshshinde/orion",
        category: "Distributed Systems & Cloud",
        gradient: "from-blue-500 to-indigo-600",
        icon: Server,
        theme: {
            cardBorderHover: "border-cyan-400/60",
            cardShadowHover: "shadow-[0_0_35px_rgba(34,211,238,0.25)]",
            bgMeshHover: "from-cyan-950/30 via-black/90 to-black",
            cornerAccent: "border-cyan-400",
            iconBgText: "bg-cyan-500/20 text-cyan-400 border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
            ledGlow: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)] animate-pulse",
            barBg: "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]",
            categoryBadge: "border-cyan-400/60 text-cyan-300 bg-cyan-500/10 shadow-[0_0_10px_rgba(34,211,238,0.2)]",
            titleHover: "group-hover:text-cyan-300",
            descBorderHover: "border-cyan-400/60",
            techTagHover: "border-cyan-400/30 text-cyan-300 bg-cyan-950/30",
            buttonStyle: "bg-cyan-500/10 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-300 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
        }
    },
    {
        title: "InspectAI",
        description: "AI-powered automated code review platform leveraging CodeT5, CodeBERT, FAISS RAG, and Model Context Protocol (MCP) orchestration with GitHub & Jira integrations.",
        technologies: ["Python", "FastAPI", "CodeT5 / CodeBERT", "FAISS RAG", "React", "MCP"],
        link: "https://github.com/shreeharshshinde/InspectAI",
        category: "AI & Developer Tools",
        gradient: "from-orange-500 to-amber-600",
        icon: Code,
        theme: {
            cardBorderHover: "border-orange-500/60",
            cardShadowHover: "shadow-[0_0_35px_rgba(249,115,22,0.25)]",
            bgMeshHover: "from-orange-950/30 via-black/90 to-black",
            cornerAccent: "border-orange-500",
            iconBgText: "bg-orange-500/20 text-orange-400 border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.3)]",
            ledGlow: "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)] animate-pulse",
            barBg: "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.9)]",
            categoryBadge: "border-orange-500/60 text-orange-300 bg-orange-500/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]",
            titleHover: "group-hover:text-orange-300",
            descBorderHover: "border-orange-500/60",
            techTagHover: "border-orange-500/30 text-orange-300 bg-orange-950/30",
            buttonStyle: "bg-orange-500/10 border-orange-500/40 text-orange-300 hover:bg-orange-500/20 hover:border-orange-400 hover:text-white hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
        }
    }
];

