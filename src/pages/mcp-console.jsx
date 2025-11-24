import { useState, useEffect } from 'react';
import { useMCP } from '../hooks/useMCP';

export default function MCPConsole() {
  const { nodes, state, initialized, sendAction, updateState } = useMCP();
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);

  useEffect(() => {
    if (initialized) {
      setOutput(prev => [...prev, { type: 'system', text: '[MCP] Sistema inicializado' }]);
    }
  }, [initialized]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!command.trim()) return;

    setOutput(prev => [...prev, { type: 'input', text: `> ${command}` }]);

    // Processar comando
    const action = sendAction('command', { command });
    setOutput(prev => [...prev, { type: 'output', text: `[MCP] Ação registrada: ${action.id}` }]);

    setCommand('');
    updateState();
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl mb-4 text-green-400 text-shadow-neon">
          MCP Console
        </h1>

        {/* Terminal Output */}
        <div className="bg-black border border-green-400 rounded p-4 mb-4 h-96 overflow-y-auto">
          {output.map((item, idx) => (
            <div key={idx} className={item.type === 'input' ? 'text-green-300' : 'text-green-400'}>
              {item.text}
            </div>
          ))}
        </div>

        {/* Command Input */}
        <form onSubmit={handleCommand} className="flex gap-2">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="flex-1 bg-black border border-green-400 text-green-400 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Digite um comando..."
          />
          <button
            type="submit"
            className="bg-green-400 text-black px-6 py-2 rounded hover:bg-green-300 transition-colors"
          >
            Executar
          </button>
        </form>

        {/* Nodes Scanner */}
        <div className="mt-8">
          <h2 className="text-xl mb-4 text-green-400">Nodes Ativos: {nodes.length}</h2>
          <div className="space-y-2">
            {nodes.map((node) => (
              <div key={node.id} className="bg-gray-900 border border-green-400/30 rounded p-3">
                <div className="text-green-300">ID: {node.id}</div>
                <div className="text-green-400/70 text-sm">Tipo: {node.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* State Debug */}
        {state && (
          <div className="mt-8">
            <h2 className="text-xl mb-4 text-green-400">Estado MCP</h2>
            <pre className="bg-gray-900 border border-green-400/30 rounded p-4 text-green-400 text-xs overflow-x-auto">
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

