import { useEffect } from 'react';

/**
 * Hook para bloquear acesso de dispositivos desktop
 * Redireciona para desktop-redirect.html se detectar desktop
 */
export function useDesktopBlock() {
  useEffect(() => {
    // Detectar se é desktop
    const isDesktop = window.innerWidth > 768 || (!('ontouchstart' in window) && navigator.maxTouchPoints === 0);
    
    if (isDesktop) {
      // Redirecionar para página alternativa com links randômicos
      // Usar caminho absoluto para funcionar em qualquer rota do React Router
      window.location.href = '/desktop-redirect.html';
    }
  }, []);
}

