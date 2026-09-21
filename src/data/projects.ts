import { Shield, Server, Code, type LucideIcon } from 'lucide-react';

export interface Project {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    category: string;
    gradient: string;
    icon: LucideIcon;
}

export const projects: Project[] = [
    {
        title: "TileGuard",
        description: "Automated quality analysis & rule-based validation framework for vector tiles and MapLibre style specifications — bringing ESLint-style engineering discipline to geospatial software.",
        technologies: ["TypeScript", "MapLibre", "Node.js", "PBF / MVT", "React", "Biome"],
        link: "https://github.com/shreeharshshinde/tileguard",
        category: "Geospatial & DevTools",
        gradient: "from-emerald-500 to-teal-600",
        icon: Shield
    },
    {
        title: "Orion",
        description: "Distributed ML job orchestrator for Kubernetes — durable execution platform featuring Redis Streams priority queues, gRPC streaming, atomic state transitions, and DAG pipeline support.",
        technologies: ["Go", "Kubernetes", "Redis Streams", "gRPC", "PostgreSQL", "OpenTelemetry"],
        link: "https://github.com/shreeharshshinde/orion",
        category: "Distributed Systems & Cloud",
        gradient: "from-blue-500 to-indigo-600",
        icon: Server
    },
    {
        title: "InspectAI",
        description: "AI-powered automated code review platform leveraging CodeT5, CodeBERT, FAISS RAG, and Model Context Protocol (MCP) orchestration with GitHub & Jira integrations.",
        technologies: ["Python", "FastAPI", "CodeT5 / CodeBERT", "FAISS RAG", "React", "MCP"],
        link: "https://github.com/shreeharshshinde/InspectAI",
        category: "AI & Developer Tools",
        gradient: "from-orange-500 to-amber-600",
        icon: Code
    }
];

