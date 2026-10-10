import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        // Fetch the markdown file from the public directory
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
            {/* Background effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_80%)]"></div>
            </div>
            
            <div className="container mx-auto px-6 pt-32 pb-32 relative z-10 max-w-4xl">
                {/* Navigation Back */}
                <button 
                    onClick={() => navigate('/blogs')}
                    className="mb-12 text-xs font-mono text-orange-400 hover:text-orange-300 uppercase tracking-widest flex items-center gap-2 group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Archive
                </button>

                {/* Markdown Content rendered via Tailwind Typography */}
                <article className="prose prose-invert prose-orange lg:prose-xl max-w-none font-mono">
                    <ReactMarkdown>{content}</ReactMarkdown>
                </article>
            </div>
            
            {/* Scanlines */}
            <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] opacity-20 z-50"></div>
        </div>
    );
};

export default BlogPost;
