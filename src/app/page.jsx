'use client';
import React, { useState, useEffect } from 'react';
import ForestSnapLogo from '../components/ForestSnapLogo';
import Loader from '../components/Loader';
import SmokeBackground from '../components/SmokeBackground';
import Map3DCanvas from '../components/Map3DCanvas';
import LeafInteractiveDemo from '../components/LeafInteractiveDemo';
import Reveal from '../components/Reveal';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Calculate scroll progress for the top loading bar
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(totalScroll / windowHeight || 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => { clearTimeout(timer); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative selection:bg-[#FF4500] selection:text-white transition-colors duration-500 ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#FAFAFA] text-gray-900'}`}>
      
      {/* Dynamic Backgrounds */}
      <SmokeBackground theme={theme} />
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#FF4500] to-amber-400 z-[100] origin-left shadow-[0_0_10px_#FF4500]"
        style={{ width: '100%', transform: `scaleX(${scrollProgress})`, transition: 'transform 0.1s ease-out' }}
      />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? (theme === 'dark' ? 'bg-[#050505]/80 backdrop-blur-md border-b border-gray-800' : 'bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm') : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <ForestSnapLogo theme={theme} />
            <span className="text-xl font-bold tracking-tight">ForestSnap</span>
          </div>
          <div className={`hidden md:flex gap-8 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <a href="#how-it-works" className={`relative pb-1 transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#FF4500] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100`}>How it Works</a>
            <a href="#architecture" className={`relative pb-1 transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#FF4500] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100`}>Architecture</a>
            <a href="#team" className={`relative pb-1 transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'} after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-[#FF4500] after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100`}>Team</a>
          </div>
          <div className="flex items-center gap-4">
            <button aria-label="Toggle Theme" onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            {/* Updated GitHub Repo Link */}
            <a 
              href="https://github.com/DarkWarrior411/forestsnap-web"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 border rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${theme === 'dark' ? 'bg-gray-900 border-gray-700 hover:border-[#FF4500] hover:text-[#FF4500]' : 'bg-white border-gray-300 hover:border-[#FF4500] hover:text-[#FF4500] shadow-sm'}`}
            >
              GitHub Repo
              {/* Optional: Adds a tiny external link icon for a premium feel */}
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-10 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          
          {/* Left Text */}
          <div className="space-y-8 animate-[fadeInUp_1s_ease-out]">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4500]/10 border border-[#FF4500]/30 text-[#FF4500] text-xs font-mono tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
              Intelligence for Off-Grid Forests
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
              From Offline Trails to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-amber-500">
                Live Fire Risk Maps.
              </span>
            </h1>
            <p className={`text-lg max-w-xl leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              ForestSnap bridges the ground-truth gap. Empowering hikers and rangers to capture vital forest fuel data offline, automatically syncing to deep-learning cloud models when connected.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3.5 bg-[#FF4500] text-white rounded-lg font-medium hover:bg-[#E03E00] transition-colors shadow-[0_0_20px_rgba(255,69,0,0.3)] flex items-center gap-2 hover:-translate-y-0.5 duration-300">
                Download App (Soon)
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
              <a href="#architecture" className={`px-6 py-3.5 border rounded-lg font-medium transition-all hover:-translate-y-0.5 duration-300 ${theme === 'dark' ? 'bg-gray-900/50 backdrop-blur border-gray-800 text-white hover:bg-gray-800' : 'bg-white/50 backdrop-blur border-gray-300 text-gray-900 hover:bg-white shadow-sm'}`}>
                View Architecture
              </a>
            </div>
          </div>

          {/* Right Visual (Interactive Parallax 3D Map) */}
          <div 
            className="h-[500px] w-full relative group animate-[fadeInUp_1.5s_ease-out]"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{ perspective: '1000px' }}
          >
            <div 
              className="w-full h-full relative transition-transform duration-200 ease-out"
              style={{ transform: `rotateX(${mousePos.y * -15}deg) rotateY(${mousePos.x * 15}deg)` }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4500] to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className={`w-full h-full rounded-2xl border overflow-hidden relative ${theme === 'dark' ? 'border-gray-800/50 bg-[#0a0a0c] shadow-[0_0_40px_rgba(255,69,0,0.1)]' : 'border-gray-200 bg-white shadow-xl'}`}>
                <Map3DCanvas theme={theme} />
              </div>
              
              <div 
                className={`absolute top-6 left-6 p-4 rounded-lg flex items-center gap-3 border transition-colors shadow-2xl ${theme === 'dark' ? 'bg-black/60 backdrop-blur-md border-gray-700' : 'bg-white/90 backdrop-blur-md border-gray-200'}`}
                style={{ transform: 'translateZ(50px)' }}
              >
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                   <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <div>
                   <p className={`text-xs font-mono uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>ResNet Classification</p>
                   <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>Eucalyptus - Dryness: High</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Tech Stack Marquee */}
        <div className="mt-16 w-full overflow-hidden relative border-y py-4 flex items-center bg-black/5 backdrop-blur-sm">
          <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap opacity-60 font-mono text-sm tracking-widest text-gray-500">
            <span className="mx-8">• AWS INGESTION</span>
            <span className="mx-8">• U-NET SEGMENTATION</span>
            <span className="mx-8">• RESNET-50</span>
            <span className="mx-8">• OFFLINE CACHING</span>
            <span className="mx-8">• GEOSPATIAL FUSION</span>
            <span className="mx-8">• iNATURALIST</span>
            <span className="mx-8">• PLANTVILLAGE</span>
            
            {/* Duplicated for seamless scrolling */}
            <span className="mx-8">• AWS INGESTION</span>
            <span className="mx-8">• U-NET SEGMENTATION</span>
            <span className="mx-8">• RESNET-50</span>
            <span className="mx-8">• OFFLINE CACHING</span>
            <span className="mx-8">• GEOSPATIAL FUSION</span>
            <span className="mx-8">• iNATURALIST</span>
            <span className="mx-8">• PLANTVILLAGE</span>
          </div>
        </div>

        {/* The Problem Section */}
        <Reveal delay={100} className="mt-32 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-[#FF4500] font-semibold tracking-widest uppercase mb-3">The Problem</h2>
            <h3 className="text-4xl font-bold">The Ground-Truth Gap</h3>
            <p className={`mt-4 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Current models rely on top-down data that misses the reality below the canopy. Mobile analysis fails due to battery drain and lack of connectivity.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Low-Res Satellite Data', value: 'Canopy Only', desc: 'Satellites cannot detect the dangerous "fuel load" hidden beneath the trees.' },
              { title: 'Computational Drain', value: 'High Cost', desc: 'Real-time ground AI inference on mobile devices severely drains off-grid batteries.' },
              { title: 'Data Synchronization', value: 'Zero Signal', desc: 'Deep forests lack internet, making instant risk reporting impossible for rangers.' }
            ].map((stat, i) => (
              <div key={i} className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${theme === 'dark' ? 'bg-[#0a0a0c] border-gray-800/60 hover:border-[#FF4500]/50 hover:shadow-[0_8px_30px_rgba(255,69,0,0.1)]' : 'bg-white border-gray-200 hover:border-[#FF4500]/40 hover:shadow-xl'}`}>
                <p className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
                <p className="text-[#FF4500] font-mono text-sm tracking-wide uppercase font-semibold mb-4">{stat.title}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Interactive Try AI Demo */}
        <Reveal delay={200} className="mb-32">
           <LeafInteractiveDemo theme={theme} />
        </Reveal>

        {/* How It Works Pipeline */}
        <Reveal id="how-it-works" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-[#FF4500] font-semibold tracking-widest uppercase mb-3">The Solution</h2>
            <h3 className="text-4xl font-bold">Three Phases to Intelligence</h3>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className={`absolute top-10 bottom-10 left-[47px] md:left-[55px] w-[2px] overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="absolute w-full h-1/3 bg-gradient-to-b from-transparent via-[#FF4500] to-transparent animate-[lineScroll_2.5s_linear_infinite]" />
            </div>

            <div className="space-y-6">
              {[
                {
                  phase: 1, title: 'Edge Data Collection & Store-and-Forward',
                  desc: 'Hikers and rangers capture geo-tagged images offline. The app extracts metadata, encrypts the payload, and queues it locally. It automatically bulk-syncs when cellular connection is restored, saving crucial battery life.',
                  tags: ['Offline Caching', 'Batch Sync']
                },
                {
                  phase: 2, title: 'Cloud AI Inference Pipeline',
                  desc: 'Once synced via API Gateway, AWS infrastructure takes over. High-performance models perform semantic segmentation (U-Net) and fuel classification (ResNet) based on datasets like iNaturalist and PlantVillage.',
                  tags: ['ResNet Classification', 'U-Net Segmentation']
                },
                {
                  phase: 3, title: 'Geospatial Fusion & Risk Calculation',
                  desc: 'The AI output is fused with geospatial data and external weather APIs. The system calculates a localized Fire Risk Index, updates global heatmaps, and pushes automated alerts to relevant authorities.',
                  tags: ['Heatmap Generation', 'Push Alerts']
                }
              ].map((item) => (
                <div key={item.phase} className={`relative flex gap-6 md:gap-8 p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${theme === 'dark' ? 'bg-[#0a0a0c] border-gray-800/60 hover:border-[#FF4500]/50 hover:shadow-[#FF4500]/10' : 'bg-white border-gray-200 shadow-sm hover:border-[#FF4500]/40 hover:shadow-gray-200/50'}`}>
                  <div className={`relative z-10 w-12 h-12 font-mono shrink-0 rounded-full border-2 flex items-center justify-center font-bold text-lg transition-transform hover:scale-110 ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-[#FF4500]' : 'bg-white border-gray-200 text-[#FF4500]'}`}>{item.phase}</div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
                    <div className="flex gap-2 text-xs font-mono text-gray-500">
                      {item.tags.map(tag => (
                        <span key={tag} className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-gray-100 border border-gray-200 text-gray-600'}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Architecture Flow Diagram */}
        <Reveal id="architecture" className="py-20" delay={200}>
           <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-[#FF4500] font-semibold tracking-widest uppercase mb-3">System Blueprint</h2>
            <h3 className="text-4xl font-bold">Built on Scalable Cloud Native</h3>
          </div>

          <div className={`w-full rounded-3xl p-8 overflow-hidden relative border transition-colors group ${theme === 'dark' ? 'bg-[#0a0a0c] border-gray-800' : 'bg-white border-gray-200 shadow-xl'}`}>
            <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full pointer-events-none ${theme === 'dark' ? 'bg-[#FF4500]/10' : 'bg-[#FF4500]/5'}`}></div>
            
            <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
               <svg className="w-full h-full" preserveAspectRatio="none">
                 <path d="M 23% 80 C 27% 80, 23% 80, 27% 80" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} strokeWidth="2" strokeDasharray="4 4" fill="none" />
                 <path d="M 23% 80 L 27% 80" stroke="#FF4500" strokeWidth="3" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[flow_2s_linear_infinite]" strokeDasharray="50 100" />
                 
                 <path d="M 48% 80 C 52% 80, 48% 80, 52% 80" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} strokeWidth="2" strokeDasharray="4 4" fill="none" />
                 <path d="M 48% 80 L 52% 80" stroke="#FF4500" strokeWidth="3" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[flow_2s_linear_infinite_0.5s]" strokeDasharray="50 100" />
                 
                 <path d="M 73% 80 C 77% 80, 73% 80, 77% 80" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} strokeWidth="2" strokeDasharray="4 4" fill="none" />
                 <path d="M 73% 80 L 77% 80" stroke="#FF4500" strokeWidth="3" fill="none" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[flow_2s_linear_infinite_1s]" strokeDasharray="50 100" />
               </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 relative z-10">
              {[
                { name: 'Edge Data Collection', color: 'green', steps: ['Image Capture', 'Metadata Extraction', 'Quality Check', 'Encryption'] },
                { name: 'Store & Forward', color: 'blue', steps: ['State Detection', 'Database Queuing', 'Batch Sync', 'Cache Clearing'] },
                { name: 'AI/ML Pipeline', color: 'orange', steps: ['API Gateway (AWS)', 'Image Normalization', 'U-Net Segmentation', 'ResNet Classification'] },
                { name: 'Geospatial Fusion', color: 'purple', steps: ['Aggregation', 'API Integration', 'Risk Index Calc', 'Map Updating'] }
              ].map((box, idx) => (
                <div key={idx} className={`space-y-4 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${theme === 'dark' ? 'bg-gray-900/50 hover:bg-gray-900' : 'bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200'}`}>
                  <div className={`border p-4 rounded-xl text-center ${theme === 'dark' ? `bg-${box.color}-900/20 border-${box.color}-800/50` : `bg-${box.color}-50 border-${box.color}-200`}`}>
                    <p className={`font-mono text-sm font-semibold tracking-wide ${theme === 'dark' ? `text-${box.color}-400` : `text-${box.color}-700`}`}>{box.name}</p>
                  </div>
                  <div className="space-y-2">
                    {box.steps.map(step => (
                      <div key={step} className={`border text-xs font-mono py-2 text-center rounded-md ${theme === 'dark' ? 'bg-gray-900 border-gray-800 text-gray-400' : 'bg-white border-gray-200 text-gray-600 shadow-sm'}`}>{step}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <p className={`text-center font-mono text-xs mt-12 pt-8 border-t ${theme === 'dark' ? 'text-gray-500 border-gray-800/50' : 'text-gray-400 border-gray-200'}`}>
              *Architecture adapted from CIP67 Phase 1 Proposal
            </p>
          </div>
        </Reveal>

        {/* Team Section with dynamic GitHub Avatars */}
        <Reveal id="team" className="py-20 mb-20" delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-[#FF4500] font-semibold tracking-widest uppercase mb-3">The Team</h2>
            <h3 className="text-4xl font-bold">Built by Engineers</h3>
            <p className={`mt-4 font-mono text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Ramaiah Institute of Technology • CSE (AI&ML)</p>
          </div>

          <div className="flex justify-center mb-12">
             <div className={`p-6 rounded-2xl flex items-center gap-4 w-full max-w-md border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${theme === 'dark' ? 'bg-[#0a0a0c] border-gray-800 hover:border-[#FF4500]/30' : 'bg-white border-gray-200 hover:border-[#FF4500]/40'}`}>
                <div className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-xl font-bold font-mono ${theme === 'dark' ? 'bg-gray-800 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
                  DR
                </div>
                <div>
                  <h4 className="font-bold text-lg">Dr. Naveen N C</h4>
                  <p className="text-[#FF4500] font-mono text-xs font-medium uppercase tracking-widest mb-1">Project Guide</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Professor, Dept. of CSE (AIML)</p>
                </div>
             </div>
          </div>

          {/* Students */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Arya N.', usn: '1MS23CI017', username: 'ARYA-N-24', github: 'https://github.com/ARYA-N-24' },
              { name: 'Ishan Gupta', usn: '1MS23CI043', username: 'ishan8351', github: 'https://github.com/ishan8351' },
              { name: 'Kotagi Shashank', usn: '1MS23CI058', username: 'Shashankckotagi', github: 'https://github.com/Shashankckotagi' },
              { name: 'Kumar Aadarsh Suman', usn: '1MS23CI059', username: 'DarkWarrior411', github: 'https://github.com/DarkWarrior411' }
            ].map((member) => (
              <div key={member.usn} className={`p-6 rounded-2xl text-center group border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${theme === 'dark' ? 'bg-[#0a0a0c] border-gray-800 hover:border-[#FF4500]/40 hover:shadow-[0_10px_30px_rgba(255,69,0,0.1)]' : 'bg-white border-gray-200 hover:border-[#FF4500]/40 shadow-sm'}`}>
                
                {/* Dynamically Fetched GitHub Profile Images */}
                <div className={`relative w-20 h-20 mx-auto rounded-full border-2 mb-4 overflow-hidden transition-all duration-300 group-hover:border-[#FF4500] group-hover:scale-105 ${theme === 'dark' ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-100'}`}>
                  <img 
                    src={`https://github.com/${member.username}.png`} 
                    alt={`${member.name}'s profile picture`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = `https://ui-avatars.com/api/?name=${member.name.replace(' ', '+')}&background=random`;
                    }}
                  />
                </div>

                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className={`text-xs font-mono mt-1 ${theme === 'dark' ? 'text-[#FF4500]' : 'text-[#FF4500]'}`}>{member.usn}</p>
                
                <a 
                  href={member.github}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`mt-6 block px-4 py-2 border text-xs font-mono rounded-lg transition-colors w-full ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-300 hover:text-white hover:border-gray-500' : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-300'}`}
                >
                  View GitHub
                </a>
              </div>
            ))}
          </div>
        </Reveal>

      </main>

      {/* Footer */}
      <footer className={`border-t py-12 relative z-10 transition-colors ${theme === 'dark' ? 'border-gray-800/50 bg-black/50' : 'border-gray-200 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className={`flex items-center gap-2 ${theme === 'dark' ? 'opacity-50' : 'opacity-70'}`}>
            <ForestSnapLogo className="w-6 h-6 grayscale" theme={theme} />
            <span className="font-semibold text-sm tracking-widest font-mono">FORESTSNAP</span>
          </div>
          <p className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>© 2026 Ramaiah Institute of Technology (Mini Project CIP67). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}