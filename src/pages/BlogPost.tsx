import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Header } from '../components/Header';
import { CodeBlock } from '../components/blog/CodeBlock';

const blogNavLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
    { id: 'blogs', title: 'Blogs', path: '/blogs' },
];

interface FrontMatter {
    title: string;
    subtitle?: string;
    date: string;
    author: string;
    readTime: string;
    heroImage?: string;
}

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [content, setContent] = useState<string>('');
    const [meta, setMeta] = useState<FrontMatter | null>(null);
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
                // Parse YAML Frontmatter
                const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
                const match = text.match(frontmatterRegex);
                let contentBody = text;
                let parsedMeta: any = null;

                if (match) {
                    contentBody = text.replace(frontmatterRegex, '').trim();
                    const yamlLines = match[1].split('\n');
                    parsedMeta = {} as any;
                    yamlLines.forEach(line => {
                        const [key, ...valueParts] = line.split(':');
                        if (key && valueParts.length > 0) {
                            parsedMeta[key.trim()] = valueParts.join(':').trim().replace(/^"|"$/g, '');
                        }
                    });
                }

                setContent(contentBody);
                setMeta(parsedMeta);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white/50 font-sans text-sm tracking-widest uppercase">
                <span className="animate-pulse">Loading story...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-500 font-sans">
                <p className="mb-4">ERROR: Story not found.</p>
                <button onClick={() => navigate('/blogs')} className="text-white hover:text-gray-300 underline underline-offset-4">
                    Return to archive
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white antialiased">
            <Header navLinks={blogNavLinks} activeSection="blogs" />
            
            <main className="pt-32 pb-32">
                <article className="mx-auto max-w-5xl px-6">
                    {/* Navigation Back */}
                    <button 
                        onClick={() => navigate('/blogs')}
                        className="mb-10 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group font-sans"
                    >
                        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to blogs
                    </button>

                    {/* Medium-style Header */}
                    {meta && (
                        <header className="mb-12">
                            <h1 className="text-4xl md:text-[42px] font-bold tracking-tight text-gray-100 leading-tight mb-4" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                                {meta.title}
                            </h1>
                            {meta.subtitle && (
                                <h2 className="text-xl md:text-2xl text-gray-400 mb-8 font-light" style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                                    {meta.subtitle}
                                </h2>
                            )}
                            
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-lg border border-gray-800">
                                    {meta.author ? meta.author.charAt(0) : '?'}
                                </div>
                                <div className="flex flex-col font-sans">
                                    <span className="text-gray-200 font-medium">{meta.author || 'Unknown'}</span>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <span>{meta.readTime}</span>
                                        <span>·</span>
                                        <span>{meta.date}</span>
                                    </div>
                                </div>
                            </div>
                        </header>
                    )}

                    {/* Hero Image */}
                    {meta?.heroImage && (
                        <div className="mb-12 w-full">
                            <img 
                                src={meta.heroImage} 
                                alt={meta.title} 
                                className="w-full h-auto object-cover rounded-sm border border-gray-900" 
                            />
                        </div>
                    )}

                    {/* Markdown Content - Medium Typography Style */}
                    <div 
                        className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
                        style={{ 
                            fontFamily: 'Charter, "Bitstream Charter", Georgia, Cambria, "Times New Roman", Times, serif',
                            fontSize: '21px',
                            lineHeight: '1.58',
                            letterSpacing: '-0.003em'
                        }}
                    >
                        <style>
                            {`
                                .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                                    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                                    color: #f3f4f6;
                                    font-weight: 700;
                                    letter-spacing: -0.02em;
                                    margin-top: 2em;
                                    margin-bottom: 0.5em;
                                }
                                .prose h2 { font-size: 26px; }
                                .prose h3 { font-size: 22px; }
                                .prose p { margin-bottom: 2em; color: rgba(255, 255, 255, 0.84); }
                                .prose a { color: #fff; text-decoration-color: #fff; text-decoration-thickness: 1px; text-underline-offset: 2px; }
                                .prose pre { background: transparent !important; border: none !important; padding: 0 !important; margin: 0 !important; }
                                .prose code::before, .prose code::after { content: "" !important; }
                                .prose strong { color: #f9fafb; font-weight: 600; }
                            `}
                        </style>
                        <ReactMarkdown
                            components={{
                                pre({ children }) {
                                    return <>{children}</>;
                                },
                                code({ className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const rawCode = String(children);
                                    const isCodeBlock = Boolean(match || rawCode.includes('\n'));

                                    if (isCodeBlock) {
                                        return (
                                            <CodeBlock
                                                language={match ? match[1] : undefined}
                                                value={rawCode.replace(/\n$/, '')}
                                            />
                                        );
                                    }

                                    return (
                                        <code
                                            className="bg-zinc-800/80 text-orange-200 border border-white/10 px-1.5 py-0.5 rounded font-mono text-[0.85em] inline-block font-normal align-middle"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                }
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default BlogPost;
