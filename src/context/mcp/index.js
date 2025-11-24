// MCP Router - Model Context Protocol
// Leitura de nodes, estado global das interações, lógica de persistência

let mcpNodes = [];
let mcpState = {
  connected: false,
  activeNodes: [],
  interactions: []
};

// Inicializar MCP
export function initMCP() {
  mcpState.connected = true;
  console.log('[MCP] Initialized');
  return mcpState;
}

// Registrar node
export function registerNode(nodeId, nodeData) {
  const node = {
    id: nodeId,
    ...nodeData,
    registeredAt: Date.now()
  };
  mcpNodes.push(node);
  mcpState.activeNodes.push(nodeId);
  return node;
}

// Ler nodes
export function readNodes() {
  return mcpNodes;
}

// Obter estado
export function getMCPState() {
  return mcpState;
}

// Registrar interação
export function registerInteraction(interaction) {
  mcpState.interactions.push({
    ...interaction,
    timestamp: Date.now()
  });
  return mcpState.interactions;
}

// Persistir estado (localStorage)
export function persistMCPState() {
  try {
    localStorage.setItem('mcp_state', JSON.stringify(mcpState));
    localStorage.setItem('mcp_nodes', JSON.stringify(mcpNodes));
  } catch (error) {
    console.error('[MCP] Persistence error:', error);
  }
}

// Carregar estado persistido
export function loadMCPState() {
  try {
    const savedState = localStorage.getItem('mcp_state');
    const savedNodes = localStorage.getItem('mcp_nodes');
    if (savedState) mcpState = JSON.parse(savedState);
    if (savedNodes) mcpNodes = JSON.parse(savedNodes);
    return { state: mcpState, nodes: mcpNodes };
  } catch (error) {
    console.error('[MCP] Load error:', error);
    return { state: mcpState, nodes: mcpNodes };
  }
}

