/**
 * Tipagens do protocolo LiveTerminal
 * Define estruturas de dados para comandos, zonas e estado do agente
 */

export type CommandResponse = {
  output: string[];
  triggerZone?: string;
  sound?: "confirm" | "error" | "access" | "pulse";
  updateState?: Partial<AgentState>;
};

export type AgentState = {
  resonance: number;
  zonesUnlocked: string[];
  memory: string[];
  zone?: string | null;
  coherence?: number;
};

export type Zone = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  component?: React.ComponentType;
};

export type CommandHandler = (
  command: string,
  state: AgentState,
  updateState: (updates: Partial<AgentState>) => void
) => CommandResponse;

