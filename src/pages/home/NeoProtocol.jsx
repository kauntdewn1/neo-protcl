import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import BottomNavigation from '../../components/BottomNavigation';
import { soundManager } from '../../utils/sounds';

const phrases = [
  "auto custódia.",
  "liberdade.",
  "resistência.",
  "blockchain.",
  "moralidade."
];

export default function NeoProtocol() {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const rotate = setInterval(() => {
      setCurrentPhrase((prev) => {
        const i = phrases.indexOf(prev);
        return phrases[(i + 1) % phrases.length];
      });
    }, 5000);
    return () => clearInterval(rotate);
  }, []);

  // Pull to Refresh
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && touchStartY.current > 0) {
        const distance = e.touches[0].clientY - touchStartY.current;
        if (distance > 0) {
          setPullDistance(Math.min(distance, 80));
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > 50) {
        setIsRefreshing(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      setPullDistance(0);
      touchStartY.current = 0;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance]);

  // Smooth scroll para âncoras
  useEffect(() => {
    const handleClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-100 overflow-x-hidden pb-16 safe-area-inset relative scanline"
      style={{ paddingBottom: `calc(60px + env(safe-area-inset-bottom))` }}
    >
      {/* Scanline overlay effect */}
      <div className="scanline"></div>

      {/* Pull to Refresh Indicator */}
      {pullDistance > 0 && (
        <div 
          className="fixed top-0 left-0 right-0 flex justify-center items-center z-50 transition-transform"
          style={{ transform: `translateY(${Math.min(pullDistance, 80)}px)` }}
        >
          <div className={`pull-indicator ${pullDistance > 50 ? 'active' : ''}`}></div>
        </div>
      )}

      {/* Background Effects - 90s style */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Status Bar Spacer */}
        <div className="ios-status-bar"></div>

        <Navbar />

        {/* Hero Section - Terminal/90s Style */}
        <header className="container mx-auto px-4 py-6 pt-safe">
          <div className="mb-6">
            {/* Terminal prompt style */}
            <div className="mb-4 font-mono text-xs text-cyan-400/60 cyber-glow">
              <span className="text-green-400">$</span> <span className="text-cyan-400">neo-protocol</span> <span className="text-gray-500">--init</span>
            </div>
            
            <div className="mb-4 text-center">
              {/* Container circular para a imagem hero */}
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-400/50 bg-gray-800/50 backdrop-blur-sm flex items-center justify-center"
                   style={{
                     boxShadow: '0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.1)'
                   }}>
                <img
                  src="https://gateway.lighthouse.storage/ipfs/bafybeicwktbd4bpuey7w5efaqqzgtrul43hlwn4ison5l4vn37b3cklzdi"
                  alt="NΞØ Protocol Symbol"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 mx-auto mb-4 rounded-full cyber-glow"
                   style={{ boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}></div>
            </div>

            <p className="text-sm md:text-base mb-6 opacity-90 max-w-2xl mx-auto leading-relaxed font-mono px-4"
               style={{ 
                 color: '#d1d5db',
                 textAlign: 'justify',
                 textAlignLast: 'left',
                 hyphens: 'auto',
                 wordSpacing: '0.05em'
               }}>
              Protocolo NΞØ é o mais recente movimento a emergir do submundo digital com a proposta de devolver aos indivíduos o controle sobre sua identidade, sua presença digital e sua capacidade de governança.
              <br /><br />
              Lançado como uma rede neural, o projeto combina blockchain, inteligência artificial, gamificação e arquitetura simbólica para formar um ecossistema autônomo, onde cada participante atua como um <span className="text-cyan-300 font-bold cyber-glow">nó consciente de execução</span>.
            </p>

          </div>
        </header>

        {/* Quick Links Section - Terminal Style */}
        <section id="protocolo" className="container mx-auto px-4 py-4">
          <div className="bg-gray-700/40 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-600/50 p-6 mb-4 paper-texture">
            <div className="mb-4 font-mono text-xs text-cyan-400/60">
              <span className="text-green-400">$</span> <span className="text-cyan-400">ls</span> <span className="text-gray-500">-la /protocol</span>
            </div>
            
            <div className="space-y-3">
              <Link 
                to="/nos" 
                onClick={() => soundManager.playNavigate()}
                className="block p-4 border-l-4 border-cyan-400/50 bg-gray-800/30 hover:bg-gray-800/50 hover:border-cyan-400 transition-all font-mono"
                style={{ borderLeftColor: 'rgba(0, 255, 255, 0.5)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 text-lg">🔗</span>
                  <div>
                    <h3 className="text-base font-bold text-cyan-300 mb-1 ">THE NODES OF NΞØ PROTOCOL</h3>
                    <p className="text-xs text-gray-400">Explore os circuitos simultâneos</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/manifesto" 
                onClick={() => soundManager.playNavigate()}
                className="block p-4 border-l-4 border-blue-400/50 bg-gray-800/30 hover:bg-gray-800/50 hover:border-blue-400 transition-all font-mono"
                style={{ borderLeftColor: 'rgba(59, 130, 246, 0.5)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 text-lg">📖</span>
                  <div>
                    <h3 className="text-base font-bold text-blue-300 mb-1">MANIFESTO</h3>
                    <p className="text-xs text-gray-400">Leia o manifesto público</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Status Section - Terminal ASCII Style */}
        <section id="comunidade" className="container mx-auto px-4 py-4">
          <div className="bg-black/80 backdrop-blur-sm border-2 border-green-500/50 p-4 font-mono text-xs"
               style={{
                 boxShadow: '0 0 20px rgba(34, 197, 94, 0.3), inset 0 0 20px rgba(34, 197, 94, 0.05)',
                 fontFamily: "'Courier New', 'Courier', monospace"
               }}>
            {/* Terminal Header */}
            <div className="mb-3 text-green-400 border-b border-green-500/30 pb-2">
              <span className="text-green-500">┌─</span>
              <span className="text-green-400">[</span>
              <span className="text-cyan-400">neo-protocol@system</span>
              <span className="text-green-400">]</span>
              <span className="text-green-500">─┐</span>
            </div>
            
            {/* Terminal Prompt */}
            <div className="mb-3 text-green-400">
              <span className="text-green-500">└─</span>
              <span className="text-green-400">$</span>
              <span className="text-cyan-400 ml-1">status</span>
            </div>
            
            {/* Terminal Output */}
            <div className="space-y-1 text-green-300/90 ml-2">
              <div className="flex items-start gap-2">
                <span className="text-green-500">│</span>
                <div className="flex-1">
                  <div className="text-green-400">
                    <span className="text-green-500">[</span>
                    <span className="text-green-300">OK</span>
                    <span className="text-green-500">]</span>
                    <span className="ml-2">Sistema operacional</span>
                  </div>
                  <div className="text-cyan-400 ml-4 mt-1">
                    <span className="text-cyan-500">└─</span>
                    <span className="ml-1 italic opacity-90">{currentPhrase}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terminal Footer */}
            <div className="mt-3 pt-2 border-t border-green-500/30 text-green-500/50 text-[10px]">
              <span>└─</span>
              <span className="ml-1">Press 'q' to quit</span>
            </div>
          </div>
        </section>

        {/* Footer - Terminal Style */}
        <footer className="border-t border-gray-600/50 bg-gray-800/50 backdrop-blur-sm mt-6 mb-4">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <img
                src="https://gateway.lighthouse.storage/ipfs/bafkreifm3hzdhem47tfzzqxm4274t3rqkzrgsa2zi2bc72nzjecxaixsxm"
                alt="NEO Protocol"
                className="h-8 w-auto opacity-80"
                loading="lazy"
              />
              <p className="text-xs opacity-70 font-mono text-gray-400">
                © 2025 NΞØ PROTOCOL • BUILT WITH MORAL VALUE
              </p>
              <p className="text-xs text-gray-500 italic font-mono">
                {currentPhrase}
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
