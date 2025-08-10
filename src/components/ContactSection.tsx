import React, { useState, useEffect } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Linkedin,
  Github,
  Twitter,
  Briefcase,
  Rocket,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "#",
      icon: <Linkedin className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "GitHub",
      url: "#",
      icon: <Github className="w-8 h-8" />,
      color: "from-gray-700 to-gray-800",
    },
    {
      name: "Twitter",
      url: "#",
      icon: <Twitter className="w-8 h-8" />,
      color: "from-sky-500 to-sky-600",
    },
    {
      name: "Email",
      url: "mailto:shindeshreeharsh157@gmail.com",
      icon: <Mail className="w-8 h-8" />,
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#121225] to-[#000000] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-purple-900/20 via-indigo-900/10 to-transparent rounded-full"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-soft-light blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>


      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full mb-8 shadow-lg shadow-cyan-500/30"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm currently seeking internship opportunities and am excited to
            connect with fellow developers, recruiters, and tech enthusiasts.
            Whether you have a question or just want to say hi, feel free to
            reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Contact Info */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Briefcase className="w-7 h-7 text-cyan-400 mr-3" />
                Let's Connect
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm always open to discussing new opportunities, interesting
                projects, or just having a chat about technology and
                development.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors duration-300">
                    <Mail className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-400">
                      shindeshreeharsh157@gmail.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Location</div>
                    <div className="text-gray-400">
                      Available for remote work worldwide
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Availability</div>
                    <div className="text-gray-400">Open to new opportunities</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <a
                href="mailto:shindeshreeharsh157@gmail.com"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full text-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-500/30 hover:ring-cyan-500/50"
              >
                Say Hello
                <Rocket className="ml-3 w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Rocket className="w-7 h-7 text-cyan-400 mr-3" />
                Connect With Me
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-6 rounded-xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 ${
                      hoveredSocial === social.name
                        ? "ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/30"
                        : ""
                    }`}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>
                    <div className="relative z-10 text-center">
                      <div className="flex justify-center mb-3 text-cyan-400">
                        {social.icon}
                      </div>
                      <div className="text-white font-semibold">
                        {social.name}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-700/30 to-gray-800/30 rounded-xl border border-cyan-400/20 hover:border-cyan-400/30 transition-all duration-300">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <Rocket className="w-6 h-6 text-cyan-400 mr-2" />
                  What I'm Looking For
                </h4>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span> Backend
                    Development Internships
                  </li>
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span> Full-Stack
                    Development Opportunities
                  </li>
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span> Open Source
                    Project Collaborations
                  </li>
                  <li className="flex items-center">
                    <span className="text-cyan-400 mr-2">•</span> Tech Community
                    Engagement
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dots */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
    </div>
  );
};
