import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AgentState } from './types/protocol';

const defaultState: AgentState = {
  resonance: 0,
  zonesUnlocked: [],
  memory: [],
  zone: null,
  coherence: 0,
};

const AgentContext = createContext<{
  agentState: AgentState;
  updateAgentState: (updates: Partial<AgentState>) => void;
}>({
  agentState: defaultState,
  updateAgentState: () => {},
});

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agentState, setAgentState] = useState<AgentState>(defaultState);

  // Carregar estado do localStorage na inicialização
  useEffect(() => {
    const saved = localStorage.getItem('neo_agent_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Garantir que zonesUnlocked e memory sejam arrays
        const restoredState = {
          ...defaultState,
          ...parsed,
          zonesUnlocked: Array.isArray(parsed.zonesUnlocked) ? parsed.zonesUnlocked : [],
          memory: Array.isArray(parsed.memory) ? parsed.memory : [],
        };
        setAgentState(restoredState);
      } catch (e) {
        console.error('Erro ao carregar estado do agente:', e);
      }
    }
  }, []);

  // Salvar estado no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('neo_agent_state', JSON.stringify(agentState));
  }, [agentState]);

  const updateAgentState = (updates: Partial<AgentState>) => {
    setAgentState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AgentContext.Provider value={{ agentState, updateAgentState }}>
      {children}
    </AgentContext.Provider>
  );
}

export { AgentContext };

