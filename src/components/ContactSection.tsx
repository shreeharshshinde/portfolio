import React, { useState, useEffect } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Wifi
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialLinks = [
    {
      name: "LINKEDIN",
      url: "https://www.linkedin.com/in/shreeharsh-shinde-467501278/",
      icon: <Linkedin className="w-6 h-6" />,
      status: "ACTIVE"
    },
    {
      name: "GITHUB",
      url: "https://www.github.com/shreeharshshinde",
      icon: <Github className="w-6 h-6" />,
      status: "CONNECTED"
    },
    {
      name: "TWITTER",
      url: "https://x.com/Shreeharsh157",
      icon: <Twitter className="w-6 h-6" />,
      status: "ONLINE"
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-cyan-50 font-mono py-20 overflow-hidden">

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 border border-cyan-500/30 px-4 py-1 rounded-full mb-6 bg-cyan-900/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-400 text-xs tracking-[0.2em]">SIGNAL STABLE</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4 mix-blend-screen">
            TRANSMISSION
          </h2>
          <p className="text-cyan-400/60 tracking-widest uppercase text-sm">
            INITIALIZE COMMUNICATION PROTOCOLS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Direct Link (Email) */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="h-full bg-gray-900/80 border border-white/10 p-8 rounded-sm relative group overflow-hidden hover:border-cyan-500/50 transition-colors">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                  <Mail />
                </div>
                <div>
                  <h3 className="text-xl text-white font-bold tracking-wider">DIRECT FEED</h3>
                  <p className="text-xs text-gray-500 tracking-widest uppercase">PRIORITY CHANNEL</p>
                </div>
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                Ready to engage in new mission parameters. Available for internships and collaborative research data exchange.
              </p>

              <a
                href="mailto:shindeshreeharsh157@gmail.com"
                className="w-full block py-4 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 text-center font-bold tracking-[0.2em] hover:bg-cyan-500 hover:text-black transition-all duration-300 uppercase text-sm group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Send Transmission
              </a>
            </div>
          </div>

          {/* Social Frequencies */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="h-full bg-gray-900/80 border border-white/10 p-8 rounded-sm relative">
              <div className="flex items-center gap-4 mb-8">
                <Wifi className="text-cyan-500 animate-pulse" />
                <h3 className="text-xl text-white font-bold tracking-wider">FREQUENCIES</h3>
              </div>

              <div className="space-y-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-white/5 bg-black/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                        {social.icon}
                      </div>
                      <span className="text-white font-bold tracking-widest">{social.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                      <span className="text-[10px] text-green-500 tracking-widest opacity-60">{social.status}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-500 tracking-widest">
                  <span>ENCRYPTION: NONE</span>
                  <span>LAT: {Math.random().toFixed(4)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Transmission */}
        <div className="mt-20 text-center border-t border-white/10 pt-8">
          <p className="text-cyan-500/40 text-xs tracking-[0.5em] animate-pulse">
            END OF TRANSMISSION
          </p>
        </div>

      </div>
    </div>
  );
};
