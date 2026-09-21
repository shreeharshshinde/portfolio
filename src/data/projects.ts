import { Shield, Server, Code, type LucideIcon } from 'lucide-react';

export interface ProjectTheme {
    cardBorderHover: string;
    cardShadowHover: string;
    iconBgText: string;
    ledGlow: string;
    barBg: string;
    categoryBadge: string;
    titleHover: string;
    descBorderHover: string;
    techBorderHover: string;
    linkText: string;
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
            cardBorderHover: "border-lime-500/50",
            cardShadowHover: "shadow-[0_0_30px_rgba(132,204,22,0.25)]",
            iconBgText: "bg-lime-500/20 text-lime-400",
            ledGlow: "bg-lime-400 shadow-[0_0_8px_rgba(132,204,22,0.9)]",
            barBg: "bg-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.8)]",
            categoryBadge: "border-lime-500 text-lime-400 bg-lime-500/10",
            titleHover: "group-hover:text-lime-300",
            descBorderHover: "group-hover:border-lime-500/50",
            techBorderHover: "group-hover:border-lime-500/30",
            linkText: "text-lime-400 hover:text-white"
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
            cardBorderHover: "border-cyan-400/50",
            cardShadowHover: "shadow-[0_0_30px_rgba(34,211,238,0.25)]",
            iconBgText: "bg-cyan-500/20 text-cyan-400",
            ledGlow: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]",
            barBg: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]",
            categoryBadge: "border-cyan-400 text-cyan-400 bg-cyan-500/10",
            titleHover: "group-hover:text-cyan-300",
            descBorderHover: "group-hover:border-cyan-400/50",
            techBorderHover: "group-hover:border-cyan-400/30",
            linkText: "text-cyan-400 hover:text-white"
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
            cardBorderHover: "border-orange-500/50",
            cardShadowHover: "shadow-[0_0_30px_rgba(249,115,22,0.25)]",
            iconBgText: "bg-orange-500/20 text-orange-400",
            ledGlow: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]",
            barBg: "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]",
            categoryBadge: "border-orange-500 text-orange-400 bg-orange-500/10",
            titleHover: "group-hover:text-orange-300",
            descBorderHover: "group-hover:border-orange-500/50",
            techBorderHover: "group-hover:border-orange-500/30",
            linkText: "text-orange-400 hover:text-white"
        }
    }
];

