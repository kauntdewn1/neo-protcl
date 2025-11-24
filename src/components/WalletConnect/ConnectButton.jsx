import { useAccount, useConnect } from "wagmi";

export default function ConnectButton() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  
  const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;
  const hasProjectId = projectId && 
    projectId !== "SEU_PROJECT_ID_WEB3MODAL" && 
    projectId !== "your-web3modal-project-id-here" &&
    projectId.length > 10;

  // Tenta usar Web3Modal se disponível (só funciona se tiver Project ID válido)
  let openWeb3Modal = null;
  if (hasProjectId) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const web3modal = require("@web3modal/wagmi/react");
      // Não podemos chamar hooks condicionalmente, então vamos usar uma abordagem diferente
      // O Web3Modal já foi inicializado no provider se tiver Project ID
      // Podemos tentar abrir via DOM ou evento
    } catch (e) {
      // Web3Modal não disponível
    }
  }

  const handleConnect = () => {
    if (hasProjectId) {
      // Se tiver Project ID, tenta usar o botão Web3Modal via DOM
      const w3mButton = document.querySelector('w3m-button');
      if (w3mButton) {
        w3mButton.click();
        return;
      }
    }
    
    // Fallback: tenta conectar com injected wallet (MetaMask, etc)
    const injectedConnector = connectors.find(c => c.id === "injected" || c.id === "metaMask");
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  if (isConnected) {
    return (
      <div className="flex justify-center my-6">
        <div className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium w-full text-center">
          ✓ Conectado
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-6">
      <button
        onClick={handleConnect}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl font-medium transition-colors touch-manipulation w-full"
      >
        {hasProjectId ? "Conectar Wallet" : "Conectar Wallet (Preview)"}
      </button>
      {!hasProjectId && (
        <p className="text-xs text-gray-400 mt-2 text-center w-full px-4">
          ⚠️ Preview Mode: Configure VITE_WEB3MODAL_PROJECT_ID no .env para funcionalidade completa
        </p>
      )}
    </div>
  );
}
