
import { Shield, Brain, BarChart3, type LucideIcon } from 'lucide-react';

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
        title: "ERAWA",
        description: "A gamified web platform using Next.js to educate children on sensitive topics like Child Abuse, Child Labour, and more.",
        technologies: ["Next.js", "Tailwind CSS", "PostgreSQL", "Drizzle ORM"],
        link: "https://github.com/shreeharshshinde/ERAWA",
        category: "Full-Stack",
        gradient: "from-blue-500 to-indigo-600",
        icon: Shield
    },
    {
        title: "DreamFields",
        description: "An AI-powered career guidance platform using the MERN stack and Three.js to provide personalized recommendations for students.",
        technologies: ["React.js", "Node.js", "Meta AI", "Three.js"],
        link: "https://github.com/shreeharshshinde/DreamFields",
        category: "AI & Full-Stack",
        gradient: "from-purple-500 to-violet-600",
        icon: Brain
    },
    {
        title: "Olympic Data Analysis",
        description: "An interactive Streamlit web app to analyze and visualize 120 years of Olympic data, from 1896 to 2016.",
        technologies: ["Python", "Streamlit", "Pandas", "Plotly"],
        link: "https://github.com/shreeharshshinde/olympic-analysis",
        category: "Data Science",
        gradient: "from-emerald-500 to-teal-600",
        icon: BarChart3
    }
];
