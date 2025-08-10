import image from '/assets/self.jpg'
// AboutSection.tsx
// Completely restructured and enhanced About section with professional cosmic theme

export function AboutSection() {
  // Professional experience data
  const experiences = [
    {
      role: "Data Analysis of Real World Data",
      company: "",
      period: "",
      description: "",
      technologies: ["Kaggle", "Python", "Numpy", "Pandas", "Plotly", "Matplotlib"]
    },
    {
      role: "Open Source Contribution",
      company: "",
      period: "",
      description: "",
      technologies: ["Maplibre GL JS", "Astropy", "OpenStreetMap"]
    },
    {
      role: "Full Stack Develoment",
      company: "",
      period: "",
      description: "",
      technologies: ["Spring Boot", "Next js", "FastAPI", "AWS"]
    }
  ];


  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#121225] to-[#000000] overflow-hidden text-white py-20">
      {/* Enhanced cosmic background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Nebula background */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_rgba(125,80,220,0.1)_0%,_rgba(15,15,35,0.8)_100%)]"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 150 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 4 + 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header section */}
        <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-200 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                About Me
            </h2>
          <div className="w-48 h-1 bg-gradient-to-r from-white via-blue-600 to-white mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate software engineer crafting innovative solutions at the intersection of technology and creativity.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Left column - Profile and introduction */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile card */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-cyan-400/20 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-cyan-400/30 shadow-2xl bg-gradient-to-tr from-[#051029] to-[#0e1224] relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 blur-xl animate-pulse"></div>
                    <img
                      src={image}
                      alt="Shreeharsh Shinde"
                      className="w-full h-full object-cover relative z-10 transform scale-175"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse ring-4 ring-cyan-400/30"></div>
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Shreeharsh Shinde</h2>
                <p className="text-cyan-400 font-medium mb-4">Student | Tech Enthusiast | Open Source</p>
                <p className="text-gray-300 mb-6">
                  I am a Computer Science undergraduate passionate about diverse software technologies,
                  building scalable web applications for high user reach, and solving complex problems
                  with the power of software. Experienced with multiple languages for various purposes:
                  Java for multithreading and object-oriented programming, Python for data science and
                  machine learning, TypeScript for web applications, and Go or C++ for backend and server
                  applications, as well as problem-solving and DSA.
                  <br /><br />
                  Currently deep diving into the vast ocean of open source, starting with MapLibre GL JS —
                  a TypeScript library that uses WebGL to render interactive maps from vector tiles in a
                  browser — and Astropy, a community effort to develop a common core package for Astronomy
                  in Python. Always excited to explore, learn, and contribute more to these domains.
                </p>

                
                <div className="flex space-x-4">
                  <a 
                    href="../assets/Shreeharsh_Shinde_CV.pdf" 
                    download
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500/40 to-blue-600/40 text-white font-semibold rounded-xl hover:from-cyan-400/60 hover:to-blue-500/60 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
                  >
                    Download Resume
                  </a>
                  <a 
                    href="#contact" 
                    className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-400/20 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Experience and education */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience section */}
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-lg rounded-3xl p-8 border border-cyan-400/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="text-cyan-400 mr-3">💼</span>
                What I love to do ?
              </h3>
              
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l-2 border-cyan-400/30 group">
                    <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-cyan-400 border-4 border-gray-900"></div>
                    <div className="bg-gray-800/30 p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300">
                      <div className="flex flex-wrap justify-between items-start mb-3">
                        <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                        {/* <span className="text-cyan-400 font-medium text-sm bg-cyan-400/10 px-3 py-1 rounded-full">
                          {exp.period}
                        </span> */}
                      </div>
                      <p className="text-lg text-cyan-300 mb-4">{exp.company}</p>
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="px-3 py-1 text-xs font-medium bg-gray-700/50 text-cyan-300 rounded-full border border-gray-600/50"
                          >
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
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute top-20 left-10 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
    </section>
  );
}

