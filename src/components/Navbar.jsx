import { Link } from 'react-router-dom';
import { soundManager } from '../utils/sounds';
import WalletIconButton from './WalletConnect/WalletIconButton';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-800/95 backdrop-blur-sm border-b border-gray-600/50 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          onClick={() => soundManager.playClick()}
          className="flex items-center"
        >
          <img
            src="https://gateway.lighthouse.storage/ipfs/bafkreifm3hzdhem47tfzzqxm4274t3rqkzrgsa2zi2bc72nzjecxaixsxm"
            alt="NΞØ Protocol"
            className="h-8 md:h-10 w-auto drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
            loading="eager"
          />
        </Link>
        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="hidden md:flex items-center gap-3">
            <Link 
              to="/nos" 
              onClick={() => soundManager.playNavigate()}
              className="text-cyan-400/80 hover:text-cyan-300 transition-colors cyber-glow"
              style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.3)' }}
            >
              &gt; NÓS
            </Link>
            <Link 
              to="/manifesto" 
              onClick={() => soundManager.playNavigate()}
              className="text-blue-400/80 hover:text-blue-300 transition-colors cyber-glow"
              style={{ textShadow: '0 0 5px rgba(59, 130, 246, 0.3)' }}
            >
              &gt; MANIFESTO
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-green-400/60 font-mono text-xs flex items-center gap-1.5">
              <span className="text-green-500" style={{ fontSize: '16px', lineHeight: '1', fontFamily: 'monospace' }}>
                {'\u23DA'}
              </span>
              <span>STATUS: SYNCED</span>
            </div>
            <WalletIconButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

