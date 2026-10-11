import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy, Terminal, Code2 } from 'lucide-react';

interface CodeBlockProps {
    language?: string;
    value: string;
}

const LANGUAGE_LABELS: Record<string, string> = {
    ts: 'TypeScript',
    typescript: 'TypeScript',
    tsx: 'React TSX',
    js: 'JavaScript',
    javascript: 'JavaScript',
    jsx: 'React JSX',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    json: 'JSON',
    bash: 'Terminal',
    sh: 'Shell',
    shell: 'Shell',
    zsh: 'Zsh',
    py: 'Python',
    python: 'Python',
    rust: 'Rust',
    rs: 'Rust',
    cpp: 'C++',
    c: 'C',
    glsl: 'GLSL Shader',
    yaml: 'YAML',
    yml: 'YAML',
    sql: 'SQL',
    markdown: 'Markdown',
    md: 'Markdown',
    dockerfile: 'Dockerfile',
};

// Map short or alternate aliases to Prism supported languages
const normalizeLanguage = (lang?: string): string => {
    if (!lang) return 'text';
    const lower = lang.toLowerCase().trim();
    if (lower === 'ts') return 'typescript';
    if (lower === 'js') return 'javascript';
    if (lower === 'py') return 'python';
    if (lower === 'sh' || lower === 'zsh') return 'bash';
    if (lower === 'yml') return 'yaml';
    if (lower === 'md') return 'markdown';
    return lower;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
    const [copied, setCopied] = useState(false);

    const normalizedLang = normalizeLanguage(language);
    const displayLabel = (language && LANGUAGE_LABELS[language.toLowerCase()]) || (language ? language.toUpperCase() : 'CODE');
    const lineCount = value.trim().split('\n').length;
    const showLineNumbers = lineCount > 1;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    return (
        <div className="relative my-8 group rounded-lg overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl transition-all duration-300 hover:border-white/20">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/10 select-none">
                {/* Left: Window Controls + Language Badge */}
                <div className="flex items-center gap-3">
                    {/* Window dots */}
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 hover:bg-[#ff5f56] transition-colors inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 hover:bg-[#ffbd2e] transition-colors inline-block" />
                        <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 hover:bg-[#27c93f] transition-colors inline-block" />
                    </div>

                    <div className="h-3.5 w-px bg-white/10 mx-0.5" />

                    {/* Language Badge */}
                    <div className="flex items-center gap-1.5 text-xs font-mono font-medium tracking-wide text-zinc-300">
                        {normalizedLang === 'bash' || normalizedLang === 'sh' ? (
                            <Terminal className="w-3.5 h-3.5 text-orange-400" />
                        ) : (
                            <Code2 className="w-3.5 h-3.5 text-sky-400" />
                        )}
                        <span>{displayLabel}</span>
                    </div>
                </div>

                {/* Right: Copy Button */}
                <button
                    onClick={handleCopy}
                    type="button"
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-all duration-200 cursor-pointer ${
                        copied
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                    }`}
                    aria-label="Copy code to clipboard"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] font-semibold tracking-wider uppercase">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px] tracking-wider uppercase">Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Body */}
            <div className="overflow-x-auto text-sm font-mono leading-relaxed p-4 bg-[#0d1117]">
                <SyntaxHighlighter
                    language={normalizedLang}
                    style={oneDark}
                    showLineNumbers={showLineNumbers}
                    lineNumberStyle={{
                        minWidth: '2.5em',
                        paddingRight: '1em',
                        color: '#4b5563',
                        textAlign: 'right',
                        userSelect: 'none',
                        borderRight: '1px solid rgba(255, 255, 255, 0.07)',
                        marginRight: '1em',
                    }}
                    customStyle={{
                        margin: 0,
                        padding: 0,
                        background: 'transparent',
                        fontSize: '0.9rem',
                        lineHeight: '1.6',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    }}
                    codeTagProps={{
                        style: {
                            fontFamily: 'inherit',
                        },
                    }}
                >
                    {value}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};
