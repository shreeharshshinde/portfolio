import React from "react";

// AboutSection.tsx
// Dark-cosmos themed About section built with TailwindCSS
// Default export React component (TypeScript JSX)

export function AboutSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#121225] to-[#000000] overflow-hidden text-white">

      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Nebula-like background elements */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-purple-900/20 via-indigo-900/10 to-transparent rounded-full"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#0ea5e9]/30 to-[#7c3aed]/20 blur-[120px] animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[#06b6d4]/20 to-[#ef4444]/15 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-[#8b5cf6]/20 to-[#06b6d4]/10 blur-[100px] animate-blob animation-delay-4000" />

        {/* Enhanced starfield (decorative) */}
        <div className="absolute inset-0">
          {Array.from({ length: 120 }).map((_, i) => (
            <span
              key={i}
              className="absolute block bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.9 + 0.1,
                animation: `twinkle ${2 + Math.random() * 3}s infinite ease-in-out`
              }}
            />
          ))}
        </div>

        {/* Enhanced grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a78bfa' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E\")"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24">
        {/* Header */}
        <header className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-2xl mb-6">
            Exploring My Universe
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A cosmic wanderer in the realm of code — I build clean, reliable software and contribute to open source. I blend curiosity with craft to turn ideas into reliable products.
          </p>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">

          {/* Left column: portrait + CTA */}
          <div className="flex flex-col items-center lg:items-start space-y-6">
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden ring-2 ring-cyan-400/30 shadow-2xl bg-gradient-to-tr from-[#051029] to-[#0e1224] relative">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 blur-xl animate-pulse"></div>
                {/* replace src with your photo path */}
                <img
                  src="/avatar.png"
                  alt="Shreeharsh Shinde"
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse ring-4 ring-cyan-400/30" />
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold">Hi, I’m Shreeharsh</h3>
              <p className="mt-2 text-gray-300 max-w-sm">
                I craft backend systems, build full-stack apps, and contribute to open-source — always learning, always iterating. Currently aiming for research and opportunities in Japan.
              </p>
            </div>

            <div className="flex space-x-4 mt-2">
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan-400/20 text-cyan-300 hover:bg-cyan-400/8 transition-shadow shadow-sm"
                download
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 text-black font-semibold hover:scale-[1.02] transition-transform"
              >
                Let’s Connect
              </a>
            </div>
          </div>

          {/* Right column: mission + stats + timeline */}
          <div className="space-y-6">

            {/* Mission card */}
            <article className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-cyan-400/20 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
              <h4 className="text-xl font-bold mb-2 text-cyan-300">My Mission</h4>
              <blockquote className="text-gray-200 italic">
                “To create technology that feels alive — blending precision with imagination to build products that help people and spark curiosity.”
              </blockquote>
            </article>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3+", label: "Years Experience", icon: "🪐", color: "from-[#06b6d4] to-[#7c3aed]" },
                { value: "20+", label: "Projects", icon: "🚀", color: "from-[#34d399] to-[#06b6d4]" },
                { value: "10+", label: "Technologies", icon: "🌌", color: "from-[#f97316] to-[#f43f5e]" },
                { value: "5+", label: "Open Source", icon: "🌍", color: "from-[#60a5fa] to-[#7c3aed]" }
              ].map((s, idx) => (
                <div
                  key={idx}
                  className={`relative overflow-hidden rounded-2xl p-6 shadow-xl border border-cyan-400/20 bg-gradient-to-br ${s.color} bg-opacity-10 hover:scale-[1.025] transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{s.icon}</div>
                    <div>
                      <div className="text-2xl font-extrabold text-white">{s.value}</div>
                      <div className="text-sm text-gray-200">{s.label}</div>
                    </div>
                  </div>
                  {/* subtle glow */}
                  <div className="absolute -right-20 -top-10 w-56 h-56 rounded-full opacity-30 blur-3xl bg-white/20" />
                </div>
              ))}
            </div>

            {/* Timeline */}
            {/* <div className="mt-2">
              <h4 className="text-lg font-semibold mb-4 text-cyan-300">My Journey</h4>
              <ol className="relative border-l border-cyan-400/30 ml-4">
                {[
                  { year: "2022", title: "Started B.Tech in CS", desc: "Laid the foundation: data-structures, algorithms, and systems." },
                  { year: "2023", title: "First Open Source Contribution", desc: "Contributed to MapLibre — began open-source journey." },
                  { year: "2024", title: "Built ML & Web Projects", desc: "Projects combining ML and web — handwriting recognition prototypes." },
                  { year: "2025", title: "Preparing for MEXT & GSoC", desc: "Focused on research alignment and open-source impact." }
                ].map((item, idx) => (
                  <li key={idx} className="mb-6 ml-6 group">
                    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs shadow-lg"> </span>
                    <div className="mb-1 text-sm text-cyan-400 font-medium">{item.year}</div>
                    <h5 className="font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">{item.title}</h5>
                    <p className="text-gray-300 text-sm mt-1">{item.desc}</p>
                  </li>
                ))}
              </ol>
            </div> */}

          </div>
        </div>
      </div>

      {/* small floating decorations */}
      <div className="absolute right-10 top-24 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
      <div className="absolute left-12 bottom-36 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />

      {/* animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-blob { animation: blob 8s infinite; }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
}
