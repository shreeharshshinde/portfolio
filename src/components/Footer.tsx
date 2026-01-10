import React from "react";
import { Github, Linkedin, Twitter, Mail, Activity, Radio, MapPin, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-orange-500/20 text-orange-50/80 font-mono overflow-hidden">

      {/* Decorative Top Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-900/50 to-transparent"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl"></div>
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">

        {/* System Status Indicators */}
        <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-4">
          <div className="flex items-center gap-4 text-xs text-orange-400/60 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Nominal</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Activity size={12} />
              <span>Telemetry Active</span>
            </div>
          </div>
          <div className="text-xs text-orange-400/40 font-mono">
            SECURE_CHANNEL_v2.4
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tighter" style={{ fontFamily: '"Dune Rise", sans-serif' }}>
                SHREEHARSH
              </h3>
              <p className="text-orange-500/50 text-xs tracking-[0.3em] uppercase mt-1">
                Explorer // Dev
              </p>
            </div>
            <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
              Navigating the digital frontier. Building scalable systems for the next generation of web technologies.
            </p>
          </div>

          {/* Navigation Coordinates */}
          <div className="md:col-span-1">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-orange-500 pl-3">
              <MapPin size={14} className="text-orange-500" /> Coordinates
            </h4>
            <ul className="space-y-3 text-xs">
              {[
                { label: "Home Base", href: "#home", code: "SEC-01" },
                { label: "Crew Profile", href: "#about", code: "SEC-02" },
                { label: "Skill Matrix", href: "#skills", code: "SEC-03" },
                { label: "Mission Archives", href: "#projects", code: "SEC-04" },
                { label: "Comms Relay", href: "#contact", code: "SEC-05" },
              ].map((link) => (
                <li key={link.code}>
                  <a href={link.href} className="group flex items-center justify-between hover:text-orange-400 transition-colors">
                    <span>{link.label}</span>
                    <span className="text-white/10 group-hover:text-orange-500/30 transition-colors font-mono text-[10px]">{link.code}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Frequencies */}
          <div className="md:col-span-1">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-orange-500 pl-3">
              <Radio size={14} className="text-orange-500" /> Frequencies
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="https://www.linkedin.com/in/shreeharsh-shinde-467501278/" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-orange-400 transition-colors group">
                  <Linkedin size={14} /> <span className="group-hover:translate-x-1 transition-transform">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/shreeharshshinde" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-orange-400 transition-colors group">
                  <Github size={14} /> <span className="group-hover:translate-x-1 transition-transform">GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/Shreeharsh157" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-orange-400 transition-colors group">
                  <Twitter size={14} /> <span className="group-hover:translate-x-1 transition-transform">Twitter</span>
                </a>
              </li>
              <li>
                <a href="mailto:shindeshreeharsh157@gmail.com" className="flex items-center gap-3 hover:text-orange-400 transition-colors group">
                  <Mail size={14} /> <span className="group-hover:translate-x-1 transition-transform">Direct Feed</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Spec */}
          <div className="md:col-span-1">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-orange-500 pl-3">
              <Database size={14} className="text-orange-500" /> Tech Spec
            </h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Three.js", "TypeScript", "Tailwind"].map(tech => (
                <span key={tech} className="text-[10px] uppercase border border-white/10 px-2 py-1 rounded-sm text-gray-500 hover:text-orange-300 hover:border-orange-500/30 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="text-[10px] text-gray-600">
                <div className="mb-1">LAST UPDATE: {new Date().toLocaleDateString()}</div>
                <div>LOC: EARTH / SOLAR SYSTEM</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-600">
          <p className="uppercase tracking-widest">
            &copy; {currentYear} Shreeharsh Shinde.
          </p>
          <p className="mt-2 md:mt-0 font-mono text-[10px] opacity-50">
            DESIGNED FOR INTERSTELLAR EXPLORATION
          </p>
        </div>

      </div>
    </footer>
  );
};
