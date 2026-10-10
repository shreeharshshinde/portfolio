import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Header } from '../components/Header';
import { Canvas } from '@react-three/fiber';
import { Stars } from '../components/stars/Stars';
import SpaceDust from '../components/stars/SpaceDust';

const blogNavLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
    { id: 'blogs', title: 'Blogs', path: '/blogs' },
];

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        fetch(`/blogs/${slug}.md`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                return response.text();
            })
            .then((text) => {
                setContent(text);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-orange-400 font-mono text-sm tracking-[0.2em] uppercase">
                <span className="animate-pulse">Decrypting Transmission...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-red-500 font-mono text-sm tracking-[0.2em] uppercase">
                <p className="mb-4">ERROR: Transmission not found or corrupted.</p>
                <button onClick={() => navigate('/blogs')} className="text-white hover:text-orange-400 border border-white/20 hover:border-orange-500/50 px-6 py-2 transition-colors">
                    Return to Archive
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans antialiased relative overflow-hidden">
            <Header navLinks={blogNavLinks} activeSection="blogs" />

            {/* Immersive 3D Background */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                    <Suspense fallback={null}>
                        <color attach="background" args={['#020617']} />
                        <Stars />
                        <SpaceDust count={3000} />
                        <ambientLight intensity={0.2} />
                    </Suspense>
                </Canvas>
            </div>
            
            <div className="container mx-auto px-6 pt-32 pb-32 relative z-10 max-w-4xl">
                {/* Navigation Back */}
                <button 
                    onClick={() => navigate('/blogs')}
                    className="mb-12 text-xs font-mono text-orange-400 hover:text-orange-300 uppercase tracking-widest flex items-center gap-2 group transition-colors"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Archive
                </button>

                {/* Markdown Content rendered via Tailwind Typography */}
                <article className="prose prose-invert prose-orange lg:prose-xl max-w-none bg-black/60 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-sm shadow-2xl relative">
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0"></div>
                    
                    <ReactMarkdown>{content}</ReactMarkdown>
                </article>
            </div>
            
            {/* Scanlines Overlay */}
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] opacity-20 z-50"></div>
        </div>
    );
};

export default BlogPost;
