import image from '/assets/self.jpg';
import { Terminal, Cpu, Globe, Database } from 'lucide-react';

// AboutSection.tsx
// Interstellar Theme: "Crew Profile" / "Mission Log" style

export function AboutSection() {
  const experiences = [
    {
      role: "DATA ANALYSIS",
      subtitle: "REAL WORLD DATA",
      icon: <Database className="w-5 h-5" />,
      technologies: ["Kaggle", "Python", "Numpy", "Pandas", "Plotly"]
    },
    {
      role: "OPEN SOURCE",
      subtitle: "CONTRIBUTOR",
      icon: <Globe className="w-5 h-5" />,
      technologies: ["Maplibre GL JS", "Astropy", "OpenStreetMap"]
    },
    {
      role: "FULL STACK",
      subtitle: "DEVELOPMENT",
      icon: <Terminal className="w-5 h-5" />,
      technologies: ["Spring Boot", "Next.js", "FastAPI", "AWS"]
    }
  ];

  return (
    <section className="relative min-h-screen bg-black text-orange-50 py-20 font-mono overflow-hidden">

      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">

        {/* Header - HUD Style */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="border border-orange-500/30 px-6 py-2 rounded-full mb-4 bg-orange-900/10 backdrop-blur-md">
            <span className="text-orange-400 tracking-[0.3em] text-xs">SYSTEM: ACTIVE</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-2 mix-blend-screen">
            CREW PROFILE
          </h2>
          <div className="w-24 h-1 bg-orange-500 rounded-full mb-8 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Panel: Bio & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group">
              {/* Scanner Frame */}
              <div className="absolute -inset-4 border border-orange-500/20 rounded-lg pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-orange-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-orange-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-orange-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-orange-500"></div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-8 rounded-lg relative overflow-hidden">
                {/* Scanlight effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.5)] animate-scan opacity-20"></div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative w-48 h-48 mb-6 group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full border-2 border-orange-500/30 border-dashed animate-spin-slow"></div>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                      <img src={image} alt="Profile" className="w-full h-full object-cover filter sepia-[0.4] contrast-125 hover:filter-none transition-all duration-500" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-1 tracking-widest uppercase">Shreeharsh</h3>
                  <p className="text-orange-400 text-sm tracking-[0.2em] mb-6">SOFTWARE ENGINEER</p>

                  <div className="text-left w-full space-y-4 text-gray-400 text-sm leading-relaxed border-t border-white/10 pt-6">
                    <p>
                      <strong className="text-white block mb-1">MISSION OBJECTIVE:</strong>
                      Crafting scalable solutions at the intersection of technology and creativity.
                    </p>
                    <p>
                      <strong className="text-white block mb-1">CAPABILITIES:</strong>
                      Experienced in Multithreading (Java), Data Science (Python), and Full Stack Web Archtecture (React/Next.js).
                    </p>
                    <p>
                      <strong className="text-white block mb-1">CURRENT STATUS:</strong>
                      Exploring Open Source frontiers (MapLibre, Astropy).
                    </p>
                  </div>

                  <div className="flex gap-4 mt-8 w-full">
                    <a href="../assets/Shreeharsh_Shinde_CV.pdf" download className="flex-1 py-3 border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 transition-colors uppercase text-xs tracking-widest text-center">
                      Download Data
                    </a>
                    <a href="#contact" className="flex-1 py-3 bg-orange-900/30 border border-transparent hover:border-orange-500/50 text-white transition-colors uppercase text-xs tracking-widest text-center">
                      Signal Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Mission Logs (Experience) */}
          <div className="lg:col-span-7">
            <div className="border-l border-white/10 pl-8 space-y-12">
              <div className="relative">
                <span className="absolute -left-[41px] top-0 w-5 h-5 bg-black border border-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                </span>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Cpu className="text-orange-400" /> MISSION LOGS
                </h3>
              </div>

              {experiences.map((exp, idx) => (
                <div key={idx} className="group relative">
                  {/* Hover Effect Background */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-900/0 via-orange-900/5 to-orange-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  <div className="relative border border-white/5 bg-black/40 backdrop-blur-sm p-6 rounded-sm hover:border-orange-500/30 transition-colors">
                    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                      {exp.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1 tracking-wider">{exp.role}</h4>
                    <p className="text-orange-400/80 text-sm tracking-widest mb-4 uppercase">{exp.subtitle}</p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="text-xs border border-white/10 px-2 py-1 text-gray-400 group-hover:text-white group-hover:border-orange-500/30 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
