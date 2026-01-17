import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ChevronRight, ArrowRight } from 'lucide-react';

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [counters, setCounters] = useState({ success: 0, latency: 0, traffic: 0, mttr: 0, cycle: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Intersection observer for fade-in effects
      const elements = document.querySelectorAll('.fade-in-section');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setVisibleSections(prev => new Set([...prev, el.id]));
        }
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (visibleSections.has('metrics')) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounters({
          success: Math.min(99.95, (99.95 * progress).toFixed(2)),
          latency: Math.min(65, Math.floor(65 * progress)),
          traffic: Math.min(3, (3 * progress).toFixed(1)),
          mttr: Math.min(30, Math.floor(30 * progress)),
          cycle: Math.min(80, Math.floor(80 * progress))
        });

        if (currentStep >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [visibleSections]);

  const projects = [
    {
      name: 'Lite KV Store',
      tagline: 'Redis-compatible storage engine',
      description: 'Built in C++17 with multi-threaded TCP server, supporting 25+ commands with crash-safe recovery.',
      impact: 'Validated correctness under concurrent load tests',
      tech: 'C++17 • TCP/IP • Multithreading',
      link: '#',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Taco-DB',
      tagline: 'Relational database system',
      description: 'Complete DBMS implementation with storage management, buffer pool, and query optimization.',
      impact: 'Improved query execution efficiency',
      tech: 'C++17 • Query Optimization • Buffer Pool',
      link: '#',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      name: 'PINTOS OS',
      tagline: 'Operating system kernel',
      description: 'Enhanced Unix-like kernel with priority donation and MLFQ scheduling.',
      impact: '30% faster multithreaded performance',
      tech: 'C • x86 Assembly • OS Internals',
      link: '#',
      gradient: 'from-pink-500 to-red-600'
    },
    {
      name: 'GopherGauge',
      tagline: 'Database benchmarking tool',
      description: 'Distributed framework with modular drivers for SQL and NoSQL databases.',
      impact: '<10ms p95 latency at 100k requests',
      tech: 'Go • Goroutines • Performance Testing',
      link: '#',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  const skills = [
    { category: 'Languages', items: ['Java', 'C++', 'Python', 'SQL', 'JavaScript'], icon: '💻' },
    { category: 'Backend', items: ['Spring Boot', 'FastAPI', 'Kafka', 'Redis', 'REST APIs'], icon: '⚙️' },
    { category: 'Systems', items: ['Distributed Systems', 'Concurrency', 'Multithreading', 'Linux'], icon: '🔧' },
    { category: 'Data', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'BigQuery'], icon: '💾' },
    { category: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'], icon: '☁️' }
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Cursor follower */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0 opacity-20 blur-3xl transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-semibold text-lg">Lohith Kokkanti</div>
          <div className="flex gap-8 text-sm">
            <a href="#experience" className="hover:text-blue-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative pt-32 pb-40 px-6 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
              Available for SWE1/2 Opportunities
            </span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight opacity-0 animate-fadeInUp" 
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              Backend Engineer.
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Systems Builder.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto opacity-0 animate-fadeInUp" 
             style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            3+ years building high-scale distributed systems.<br />
            Specializing in reliability, performance, and event-driven architectures.
          </p>
          
          <div className="flex gap-4 justify-center opacity-0 animate-fadeInUp" 
               style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a href="#contact" 
               className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105">
              Get in touch
            </a>
            <a href="#experience" 
               className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all transform hover:scale-105">
              View work
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="rotate-90 text-gray-500" size={32} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-6xl md:text-7xl font-bold mb-32 text-center transition-all duration-1000 fade-in-section ${
            visibleSections.has('exp-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} id="exp-title">
            Experience
          </h2>
          
          {/* Accenture - Main Feature */}
          <div className={`mb-40 transition-all duration-1000 delay-200 fade-in-section ${
            visibleSections.has('accenture') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} id="accenture">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <div className="text-sm text-blue-400 mb-4 font-semibold">2021 - 2024</div>
                <h3 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Software Engineer
                </h3>
                <p className="text-2xl text-gray-300 mb-2">Accenture</p>
                <p className="text-gray-500">Bangalore, India</p>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10">
                  <div className="text-6xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {counters.success}%
                  </div>
                  <div className="text-xl text-gray-300">Job Success Rate</div>
                  <div className="text-sm text-gray-500 mt-3">5,000+ stores • 50K+ daily events</div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 fade-in-section" id="metrics">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="text-5xl font-bold mb-3 text-cyan-400">{counters.latency}%</div>
                  <div className="text-lg text-gray-300">Latency Reduction</div>
                  <div className="text-sm text-gray-500 mt-2">Redis optimization</div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="text-5xl font-bold mb-3 text-purple-400">{counters.traffic}x</div>
                  <div className="text-lg text-gray-300">Traffic Handling</div>
                  <div className="text-sm text-gray-500 mt-2">Kafka processing</div>
                </div>
              </div>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                  <div className="text-5xl font-bold mb-3 text-pink-400">{counters.mttr}min</div>
                  <div className="text-lg text-gray-300">MTTR Achieved</div>
                  <div className="text-sm text-gray-500 mt-2">Enhanced observability</div>
                </div>
              </div>
            </div>

            <div className="mt-16 space-y-6">
              {[
                'Owned backend services for distributed retail platform serving 5,000+ stores with Spring Boot, Kafka, Redis, and MySQL',
                'Engineered scalable event processing with idempotent, retry-safe workflows and DLQ-based recovery',
                'Fixed high-impact business correctness issues by implementing atomic DB updates and concurrency-safe logic'
              ].map((text, i) => (
                <div key={i} className={`flex gap-4 items-start transition-all duration-700 fade-in-section ${
                  visibleSections.has(`achievement-${i}`) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`} id={`achievement-${i}`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-300">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Baillie Lumber */}
          <div className={`mb-32 transition-all duration-1000 delay-400 fade-in-section ${
            visibleSections.has('baillie') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} id="baillie">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-8">
              <div>
                <div className="text-sm text-green-400 mb-4 font-semibold">May 2025 - Aug 2025</div>
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Software Engineering Intern
                </h3>
                <p className="text-xl text-gray-300 mb-2">Baillie Lumber (UB TCIE)</p>
                <p className="text-gray-500">Hamburg, NY</p>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10">
                  <div className="text-6xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {counters.cycle}%
                  </div>
                  <div className="text-xl text-gray-300">Cycle Reduction</div>
                  <div className="text-sm text-gray-500 mt-3">Production workflow</div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-400 max-w-4xl">
              Built production-grade FastAPI backend with Node.js validation UI, implementing schema validation and audit logging that reduced manual correction cycles by 80% while optimizing Spark SQL queries on 50M+ records.
            </p>
          </div>

          {/* Chloros Technologies */}
          <div className={`transition-all duration-1000 delay-500 fade-in-section ${
            visibleSections.has('chloros') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} id="chloros">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-8">
              <div>
                <div className="text-sm text-orange-400 mb-4 font-semibold">Jun 2019 - Aug 2019</div>
                <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Software Developer Intern
                </h3>
                <p className="text-xl text-gray-300 mb-2">Chloros Technologies</p>
                <p className="text-gray-500">Bangalore, India</p>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10">
                  <div className="text-5xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    DevOps
                  </div>
                  <div className="text-xl text-gray-300">Infrastructure Focus</div>
                  <div className="text-sm text-gray-500 mt-3">Terraform • K8s • AWS</div>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-400 max-w-4xl">
              Configured Nginx routing and Kubernetes health checks behind AWS ALB for safer deployments, automated infrastructure provisioning with Terraform and Jenkins, and implemented CloudWatch and Grafana monitoring.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-32 px-6 bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-6xl md:text-7xl font-bold mb-20 text-center transition-all duration-1000 fade-in-section ${
            visibleSections.has('skills-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} id="skills-title">
            Technical Expertise
          </h2>
          
          <div className="grid md:grid-cols-5 gap-8">
            {skills.map((skill, i) => (
              <div 
                key={skill.category}
                className={`group transition-all duration-700 fade-in-section ${
                  visibleSections.has(`skill-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                id={`skill-${i}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all h-full hover:scale-105">
                  <div className="text-4xl mb-4">{skill.icon}</div>
                  <h3 className="text-sm font-semibold text-blue-400 mb-4 uppercase tracking-wider">
                    {skill.category}
                  </h3>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="text-sm text-gray-400">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-6xl md:text-7xl font-bold mb-20 text-center transition-all duration-1000 fade-in-section ${
            visibleSections.has('projects-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} id="projects-title">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <a 
                key={project.name}
                href={project.link}
                className={`group relative transition-all duration-700 fade-in-section ${
                  visibleSections.has(`project-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                id={`project-${i}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500`}></div>
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/30 transition-all h-full">
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.name}</h3>
                  <p className="text-blue-400 mb-4 text-sm font-semibold">{project.tagline}</p>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="text-sm font-semibold text-white mb-4">{project.impact}</div>
                  <div className="text-sm text-gray-500 mb-6">{project.tech}</div>
                  <div className="flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-2">
                    View project <ArrowRight size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-32 px-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-6xl md:text-7xl font-bold mb-20 text-center transition-all duration-1000 fade-in-section ${
            visibleSections.has('education-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} id="education-title">
            Education
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { school: 'University at Buffalo', degree: 'Master of Science, Data Science', years: '2024 - 2026' },
              { school: 'Presidency University', degree: 'Bachelor of Technology, Computer Science', years: '2017 - 2021' }
            ].map((edu, i) => (
              <div 
                key={edu.school}
                className={`text-center group transition-all duration-700 fade-in-section ${
                  visibleSections.has(`edu-${i}`) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                id={`edu-${i}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-xl p-12 rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all hover:scale-105">
                  <div className="text-6xl mb-6">🎓</div>
                  <h3 className="text-2xl font-bold mb-3">{edu.school}</h3>
                  <p className="text-lg text-gray-400 mb-2">{edu.degree}</p>
                  <p className="text-gray-500">{edu.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-6xl md:text-7xl font-bold mb-8 transition-all duration-1000 fade-in-section ${
            visibleSections.has('contact-title') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`} id="contact-title">
            Let's connect.
          </h2>
          <p className="text-xl text-gray-400 mb-16">
            Open to SWE1/2 opportunities in backend engineering and distributed systems.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {[
              { icon: Mail, label: 'Email', href: 'mailto:venkatalohithk.9@gmail.com' },
              { icon: Phone, label: 'Phone', href: 'tel:+17165335494' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile' },
              { icon: Github, label: 'GitHub', href: 'https://github.com/yourusername' }
            ].map((contact, i) => (
              <a 
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group flex items-center justify-center gap-3 p-8 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all transform hover:scale-105 fade-in-section ${
                  visibleSections.has(`contact-${i}`) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                id={`contact-${i}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <contact.icon size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-semibold">{contact.label}</span>
              </a>
            ))}
          </div>

          <div className="text-sm text-gray-600 border-t border-white/10 pt-8">
            © 2026 Venkata Lohith Kokkanti
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
}